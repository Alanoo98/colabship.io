#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Test configuration
const TEST_USER = {
  email: 'test@colabship.io',
  password: 'testpassword123',
  name: 'Test User'
};

const API_BASE_URL = 'http://localhost:3001/api';

// Test utilities
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Test functions
async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testUserSignup() {
  console.log('🔍 Testing user signup...');
  try {
    // Clean up existing test user
    await prisma.user.deleteMany({
      where: { email: TEST_USER.email }
    });

    const response = await makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(TEST_USER)
    });

    if (response.user && response.token) {
      console.log('✅ User signup successful');
      return { user: response.user, token: response.token };
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ User signup failed:', error.message);
    return null;
  }
}

async function testUserSignin(token) {
  console.log('🔍 Testing user signin...');
  try {
    const response = await makeRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password
      })
    });

    if (response.user && response.token) {
      console.log('✅ User signin successful');
      return response.token;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ User signin failed:', error.message);
    return null;
  }
}

async function testTokenVerification(token) {
  console.log('🔍 Testing token verification...');
  try {
    const response = await makeRequest('/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.user) {
      console.log('✅ Token verification successful');
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return false;
  }
}

async function testUserProfile(token) {
  console.log('🔍 Testing user profile...');
  try {
    const response = await makeRequest('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.user) {
      console.log('✅ User profile retrieval successful');
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ User profile retrieval failed:', error.message);
    return false;
  }
}

async function testSkillsAPI() {
  console.log('🔍 Testing skills API...');
  try {
    const response = await makeRequest('/skills');
    
    if (response.skills && Array.isArray(response.skills)) {
      console.log(`✅ Skills API successful - found ${response.skills.length} skills`);
      return response.skills;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Skills API failed:', error.message);
    return null;
  }
}

async function testSkillCategories() {
  console.log('🔍 Testing skill categories...');
  try {
    const response = await makeRequest('/skills/categories');
    
    if (response.categories && Array.isArray(response.categories)) {
      console.log(`✅ Skill categories successful - found ${response.categories.length} categories`);
      return response.categories;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Skill categories failed:', error.message);
    return null;
  }
}

async function testAddSkillOffer(token, skills) {
  console.log('🔍 Testing add skill offer...');
  try {
    if (!skills || skills.length === 0) {
      console.log('⚠️ No skills available to test');
      return false;
    }

    const firstSkill = skills[0];
    const response = await makeRequest('/users/skills/offers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        skillId: firstSkill.id,
        proficiency: 4
      })
    });

    if (response.offer) {
      console.log('✅ Add skill offer successful');
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Add skill offer failed:', error.message);
    return false;
  }
}

async function testAddSkillNeed(token, skills) {
  console.log('🔍 Testing add skill need...');
  try {
    if (!skills || skills.length < 2) {
      console.log('⚠️ Not enough skills available to test');
      return false;
    }

    const secondSkill = skills[1];
    const response = await makeRequest('/users/skills/needs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        skillId: secondSkill.id,
        mustHave: true,
        priority: 5
      })
    });

    if (response.need) {
      console.log('✅ Add skill need successful');
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Add skill need failed:', error.message);
    return false;
  }
}

async function testPotentialMatches(token) {
  console.log('🔍 Testing potential matches...');
  try {
    const response = await makeRequest('/matches/potential', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.matches && Array.isArray(response.matches)) {
      console.log(`✅ Potential matches successful - found ${response.matches.length} matches`);
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Potential matches failed:', error.message);
    return false;
  }
}

async function testUpdateProfile(token) {
  console.log('🔍 Testing update profile...');
  try {
    const response = await makeRequest('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Updated Test User',
        bio: 'This is a test bio',
        experienceLevel: 'intermediate',
        timezone: 'UTC',
        availabilityHours: 20,
        workStyle: 'async',
        commsPref: 'text',
        values: ['collaboration', 'innovation']
      })
    });

    if (response.user) {
      console.log('✅ Update profile successful');
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Update profile failed:', error.message);
    return false;
  }
}

async function testMarkOnboarded(token) {
  console.log('🔍 Testing mark onboarded...');
  try {
    const response = await makeRequest('/users/onboard', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.user) {
      console.log('✅ Mark onboarded successful');
      return true;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Mark onboarded failed:', error.message);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Colabship Functionality Tests\n');

  const results = {
    database: false,
    signup: false,
    signin: false,
    tokenVerification: false,
    userProfile: false,
    skills: false,
    skillCategories: false,
    addSkillOffer: false,
    addSkillNeed: false,
    potentialMatches: false,
    updateProfile: false,
    markOnboarded: false
  };

  let token = null;
  let skills = null;

  // Test database connection
  results.database = await testDatabaseConnection();
  if (!results.database) {
    console.log('\n❌ Database connection failed. Please check your database setup.');
    return;
  }

  // Test user signup
  const signupResult = await testUserSignup();
  if (signupResult) {
    results.signup = true;
    token = signupResult.token;
  }

  // Test user signin
  if (token) {
    const signinToken = await testUserSignin();
    if (signinToken) {
      results.signin = true;
      token = signinToken;
    }
  }

  // Test token verification
  if (token) {
    results.tokenVerification = await testTokenVerification(token);
  }

  // Test user profile
  if (token) {
    results.userProfile = await testUserProfile(token);
  }

  // Test skills API
  skills = await testSkillsAPI();
  if (skills) {
    results.skills = true;
  }

  // Test skill categories
  const categories = await testSkillCategories();
  if (categories) {
    results.skillCategories = true;
  }

  // Test add skill offer
  if (token && skills) {
    results.addSkillOffer = await testAddSkillOffer(token, skills);
  }

  // Test add skill need
  if (token && skills) {
    results.addSkillNeed = await testAddSkillNeed(token, skills);
  }

  // Test potential matches
  if (token) {
    results.potentialMatches = await testPotentialMatches(token);
  }

  // Test update profile
  if (token) {
    results.updateProfile = await testUpdateProfile(token);
  }

  // Test mark onboarded
  if (token) {
    results.markOnboarded = await testMarkOnboarded(token);
  }

  // Print results
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  const passed = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });

  console.log(`\n🎯 Overall: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 All tests passed! The platform is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please check the errors above.');
  }

  // Cleanup
  try {
    await prisma.user.deleteMany({
      where: { email: TEST_USER.email }
    });
    console.log('\n🧹 Test cleanup completed');
  } catch (error) {
    console.log('\n⚠️ Test cleanup failed:', error.message);
  }

  await prisma.$disconnect();
}

// Run tests
runTests().catch(console.error);
