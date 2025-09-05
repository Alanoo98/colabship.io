import { UserProfile, MatchResult } from './matching-algorithm';

// Mock skills data
export const mockSkills = [
  { id: 1, name: 'React', category: 'frontend' },
  { id: 2, name: 'TypeScript', category: 'frontend' },
  { id: 3, name: 'Node.js', category: 'backend' },
  { id: 4, name: 'Python', category: 'backend' },
  { id: 5, name: 'PostgreSQL', category: 'backend' },
  { id: 6, name: 'Docker', category: 'devops' },
  { id: 7, name: 'AWS', category: 'devops' },
  { id: 8, name: 'UI/UX Design', category: 'design' },
  { id: 9, name: 'Product Management', category: 'product' },
  { id: 10, name: 'Digital Marketing', category: 'marketing' },
];

// Mock current user profile
export const mockCurrentUser: UserProfile = {
  id: 'current-user',
  name: 'Alex Chen',
  bio: 'Full-stack developer passionate about building scalable web applications. Love working with React, Node.js, and cloud technologies.',
  experience_level: 'advanced',
  timezone: 'America/New_York',
  availability_hours: 20,
  work_style: 'async',
  comms_pref: 'mixed',
  values: ['Innovation', 'Quality', 'Collaboration', 'Learning'],
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  offers: [
    { skill_id: 1, skill_name: 'React', proficiency: 5 },
    { skill_id: 2, skill_name: 'TypeScript', proficiency: 4 },
    { skill_id: 3, skill_name: 'Node.js', proficiency: 4 },
    { skill_id: 5, skill_name: 'PostgreSQL', proficiency: 3 },
  ],
  needs: [
    { skill_id: 8, skill_name: 'UI/UX Design', must_have: true, priority: 5 },
    { skill_id: 9, skill_name: 'Product Management', must_have: false, priority: 4 },
    { skill_id: 6, skill_name: 'Docker', must_have: false, priority: 3 },
  ],
  match_preferences: {
    skill_weight: 30,
    availability_weight: 20,
    timezone_weight: 15,
    collab_style_weight: 20,
    personality_weight: 15,
  },
};

// Mock potential matches
export const mockPotentialMatches: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    bio: 'UI/UX designer with 5+ years of experience creating beautiful, user-centered digital experiences. Passionate about accessibility and design systems.',
    experience_level: 'expert',
    timezone: 'America/New_York',
    availability_hours: 25,
    work_style: 'hybrid',
    comms_pref: 'mixed',
    values: ['Quality', 'User Experience', 'Accessibility', 'Innovation'],
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    offers: [
      { skill_id: 8, skill_name: 'UI/UX Design', proficiency: 5 },
      { skill_id: 9, skill_name: 'Product Management', proficiency: 4 },
      { skill_id: 10, skill_name: 'Digital Marketing', proficiency: 3 },
    ],
    needs: [
      { skill_id: 1, skill_name: 'React', must_have: true, priority: 5 },
      { skill_id: 2, skill_name: 'TypeScript', must_have: false, priority: 4 },
      { skill_id: 3, skill_name: 'Node.js', must_have: false, priority: 3 },
    ],
    match_preferences: {
      skill_weight: 25,
      availability_weight: 20,
      timezone_weight: 20,
      collab_style_weight: 15,
      personality_weight: 20,
    },
  },
  {
    id: 'user-2',
    name: 'Marcus Rodriguez',
    bio: 'DevOps engineer specializing in cloud infrastructure and CI/CD pipelines. Love automating everything and making deployments smooth.',
    experience_level: 'advanced',
    timezone: 'America/Chicago',
    availability_hours: 15,
    work_style: 'async',
    comms_pref: 'text',
    values: ['Reliability', 'Automation', 'Efficiency', 'Quality'],
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    offers: [
      { skill_id: 6, skill_name: 'Docker', proficiency: 5 },
      { skill_id: 7, skill_name: 'AWS', proficiency: 5 },
      { skill_id: 3, skill_name: 'Node.js', proficiency: 3 },
    ],
    needs: [
      { skill_id: 1, skill_name: 'React', must_have: false, priority: 3 },
      { skill_id: 8, skill_name: 'UI/UX Design', must_have: false, priority: 2 },
    ],
    match_preferences: {
      skill_weight: 30,
      availability_weight: 25,
      timezone_weight: 15,
      collab_style_weight: 20,
      personality_weight: 10,
    },
  },
  {
    id: 'user-3',
    name: 'Emma Thompson',
    bio: 'Product manager with a technical background. Love bridging the gap between business needs and technical implementation.',
    experience_level: 'advanced',
    timezone: 'Europe/London',
    availability_hours: 30,
    work_style: 'sync',
    comms_pref: 'video',
    values: ['Strategy', 'Execution', 'Teamwork', 'Growth'],
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    offers: [
      { skill_id: 9, skill_name: 'Product Management', proficiency: 5 },
      { skill_id: 10, skill_name: 'Digital Marketing', proficiency: 4 },
      { skill_id: 1, skill_name: 'React', proficiency: 2 },
    ],
    needs: [
      { skill_id: 3, skill_name: 'Node.js', must_have: true, priority: 5 },
      { skill_id: 5, skill_name: 'PostgreSQL', must_have: false, priority: 4 },
      { skill_id: 8, skill_name: 'UI/UX Design', must_have: false, priority: 3 },
    ],
    match_preferences: {
      skill_weight: 20,
      availability_weight: 25,
      timezone_weight: 20,
      collab_style_weight: 15,
      personality_weight: 20,
    },
  },
  {
    id: 'user-4',
    name: 'David Kim',
    bio: 'Backend developer specializing in Python and data engineering. Building scalable APIs and data pipelines.',
    experience_level: 'intermediate',
    timezone: 'America/Los_Angeles',
    availability_hours: 18,
    work_style: 'async',
    comms_pref: 'text',
    values: ['Data', 'Performance', 'Learning', 'Collaboration'],
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    offers: [
      { skill_id: 4, skill_name: 'Python', proficiency: 4 },
      { skill_id: 5, skill_name: 'PostgreSQL', proficiency: 4 },
      { skill_id: 6, skill_name: 'Docker', proficiency: 3 },
    ],
    needs: [
      { skill_id: 1, skill_name: 'React', must_have: true, priority: 5 },
      { skill_id: 8, skill_name: 'UI/UX Design', must_have: false, priority: 4 },
    ],
    match_preferences: {
      skill_weight: 35,
      availability_weight: 20,
      timezone_weight: 15,
      collab_style_weight: 15,
      personality_weight: 15,
    },
  },
  {
    id: 'user-5',
    name: 'Lisa Wang',
    bio: 'Full-stack developer with a focus on frontend. Love creating beautiful, performant user interfaces.',
    experience_level: 'advanced',
    timezone: 'America/New_York',
    availability_hours: 22,
    work_style: 'hybrid',
    comms_pref: 'mixed',
    values: ['Creativity', 'Performance', 'User Experience', 'Innovation'],
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    offers: [
      { skill_id: 1, skill_name: 'React', proficiency: 5 },
      { skill_id: 2, skill_name: 'TypeScript', proficiency: 5 },
      { skill_id: 8, skill_name: 'UI/UX Design', proficiency: 3 },
    ],
    needs: [
      { skill_id: 3, skill_name: 'Node.js', must_have: true, priority: 5 },
      { skill_id: 5, skill_name: 'PostgreSQL', must_have: false, priority: 4 },
      { skill_id: 6, skill_name: 'Docker', must_have: false, priority: 3 },
    ],
    match_preferences: {
      skill_weight: 25,
      availability_weight: 20,
      timezone_weight: 20,
      collab_style_weight: 15,
      personality_weight: 20,
    },
  },
];

// Generate mock match results
export const generateMockMatches = (): MatchResult[] => {
  return mockPotentialMatches.map((user, index) => {
    // Calculate mock scores based on complementarity
    const skillScore = calculateMockSkillScore(mockCurrentUser, user);
    const availabilityScore = calculateMockAvailabilityScore(mockCurrentUser, user);
    const timezoneScore = calculateMockTimezoneScore(mockCurrentUser, user);
    const collabStyleScore = calculateMockCollabStyleScore(mockCurrentUser, user);
    const personalityScore = calculateMockPersonalityScore(mockCurrentUser, user);
    
    const totalScore = (
      skillScore * mockCurrentUser.match_preferences.skill_weight +
      availabilityScore * mockCurrentUser.match_preferences.availability_weight +
      timezoneScore * mockCurrentUser.match_preferences.timezone_weight +
      collabStyleScore * mockCurrentUser.match_preferences.collab_style_weight +
      personalityScore * mockCurrentUser.match_preferences.personality_weight
    ) / 100;

    return {
      user,
      score: Math.round(totalScore * 100) / 100,
      breakdown: {
        skill_score: Math.round(skillScore * 100) / 100,
        availability_score: Math.round(availabilityScore * 100) / 100,
        timezone_score: Math.round(timezoneScore * 100) / 100,
        collab_style_score: Math.round(collabStyleScore * 100) / 100,
        personality_score: Math.round(personalityScore * 100) / 100,
      },
      complementarity: {
        user_offers_fulfill_needs: user.offers
          .filter(offer => mockCurrentUser.needs.some(need => need.skill_id === offer.skill_id))
          .map(offer => offer.skill_name),
        user_needs_fulfilled_by_offers: mockCurrentUser.offers
          .filter(offer => user.needs.some(need => need.skill_id === offer.skill_id))
          .map(offer => offer.skill_name),
        must_have_matches: user.offers
          .filter(offer => mockCurrentUser.needs.some(need => 
            need.skill_id === offer.skill_id && need.must_have
          ))
          .map(offer => offer.skill_name),
      },
    };
  }).sort((a, b) => b.score - a.score);
};

// Mock calculation functions
const calculateMockSkillScore = (userA: UserProfile, userB: UserProfile): number => {
  const aNeedsFulfilled = userA.needs.filter(need => 
    userB.offers.some(offer => offer.skill_id === need.skill_id)
  );
  const bNeedsFulfilled = userB.needs.filter(need => 
    userA.offers.some(offer => offer.skill_id === need.skill_id)
  );
  
  const totalMatches = aNeedsFulfilled.length + bNeedsFulfilled.length;
  const maxPossibleMatches = userA.needs.length + userB.needs.length;
  
  if (maxPossibleMatches === 0) return 0;
  
  let score = (totalMatches / maxPossibleMatches) * 50;
  
  // Bonus for must-have matches
  const mustHaveMatches = aNeedsFulfilled.filter(need => need.must_have).length +
                         bNeedsFulfilled.filter(need => need.must_have).length;
  score += mustHaveMatches * 10;
  
  return Math.min(score, 100);
};

const calculateMockAvailabilityScore = (userA: UserProfile, userB: UserProfile): number => {
  const hoursDiff = Math.abs(userA.availability_hours - userB.availability_hours);
  
  if (hoursDiff <= 5) return 100;
  if (hoursDiff <= 10) return 80;
  if (hoursDiff <= 20) return 60;
  
  return Math.max(20, 100 - hoursDiff * 2);
};

const calculateMockTimezoneScore = (userA: UserProfile, userB: UserProfile): number => {
  if (userA.timezone === userB.timezone) return 100;
  
  // Mock timezone overlap calculation
  const timezoneOverlaps: { [key: string]: number } = {
    'America/New_York-America/Chicago': 4,
    'America/New_York-America/Los_Angeles': 2,
    'America/New_York-Europe/London': 3,
    'America/Chicago-America/Los_Angeles': 4,
    'America/Chicago-Europe/London': 2,
    'America/Los_Angeles-Europe/London': 1,
  };
  
  const key = `${userA.timezone}-${userB.timezone}`;
  const reverseKey = `${userB.timezone}-${userA.timezone}`;
  const overlap = timezoneOverlaps[key] || timezoneOverlaps[reverseKey] || 2;
  
  if (overlap >= 6) return 100;
  if (overlap >= 4) return 80;
  if (overlap >= 2) return 60;
  if (overlap >= 1) return 40;
  
  return 20;
};

const calculateMockCollabStyleScore = (userA: UserProfile, userB: UserProfile): number => {
  let score = 0;
  
  // Work style compatibility
  if (userA.work_style === userB.work_style) {
    score += 50;
  } else if (userA.work_style === 'hybrid' || userB.work_style === 'hybrid') {
    score += 40;
  } else if (
    (userA.work_style === 'async' && userB.work_style === 'sync') ||
    (userA.work_style === 'sync' && userB.work_style === 'async')
  ) {
    score += 20;
  }
  
  // Communication preference compatibility
  if (userA.comms_pref === userB.comms_pref) {
    score += 50;
  } else if (userA.comms_pref === 'mixed' || userB.comms_pref === 'mixed') {
    score += 40;
  } else {
    score += 30;
  }
  
  return score;
};

const calculateMockPersonalityScore = (userA: UserProfile, userB: UserProfile): number => {
  if (userA.values.length === 0 || userB.values.length === 0) return 50;
  
  const sharedValues = userA.values.filter(value => userB.values.includes(value));
  const valueOverlap = sharedValues.length / Math.max(userA.values.length, userB.values.length);
  
  return Math.round(valueOverlap * 100);
}; 