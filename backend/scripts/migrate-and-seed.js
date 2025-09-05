#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database migration and seeding...');

  try {
    // Check if database is accessible
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Insert default skills
    const skills = [
      // Frontend
      { name: 'React', category: 'frontend' },
      { name: 'Vue.js', category: 'frontend' },
      { name: 'Angular', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'JavaScript', category: 'frontend' },
      { name: 'HTML/CSS', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'Nuxt.js', category: 'frontend' },
      { name: 'Svelte', category: 'frontend' },

      // Backend
      { name: 'Node.js', category: 'backend' },
      { name: 'Python', category: 'backend' },
      { name: 'Django', category: 'backend' },
      { name: 'Flask', category: 'backend' },
      { name: 'FastAPI', category: 'backend' },
      { name: 'Ruby on Rails', category: 'backend' },
      { name: 'PHP', category: 'backend' },
      { name: 'Laravel', category: 'backend' },
      { name: 'Java', category: 'backend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'Go', category: 'backend' },
      { name: 'Rust', category: 'backend' },
      { name: 'C#', category: 'backend' },
      { name: '.NET', category: 'backend' },

      // Database
      { name: 'PostgreSQL', category: 'backend' },
      { name: 'MySQL', category: 'backend' },
      { name: 'MongoDB', category: 'backend' },
      { name: 'Redis', category: 'backend' },
      { name: 'Supabase', category: 'backend' },
      { name: 'Firebase', category: 'backend' },

      // DevOps
      { name: 'Docker', category: 'devops' },
      { name: 'Kubernetes', category: 'devops' },
      { name: 'AWS', category: 'devops' },
      { name: 'Google Cloud', category: 'devops' },
      { name: 'Azure', category: 'devops' },
      { name: 'CI/CD', category: 'devops' },
      { name: 'Terraform', category: 'devops' },

      // Design
      { name: 'UI/UX Design', category: 'design' },
      { name: 'Figma', category: 'design' },
      { name: 'Adobe XD', category: 'design' },
      { name: 'Sketch', category: 'design' },
      { name: 'Graphic Design', category: 'design' },
      { name: 'Product Design', category: 'design' },

      // Product
      { name: 'Product Management', category: 'product' },
      { name: 'User Research', category: 'product' },
      { name: 'Analytics', category: 'product' },
      { name: 'A/B Testing', category: 'product' },
      { name: 'Growth Hacking', category: 'product' },

      // Marketing
      { name: 'Digital Marketing', category: 'marketing' },
      { name: 'SEO', category: 'marketing' },
      { name: 'Content Marketing', category: 'marketing' },
      { name: 'Social Media', category: 'marketing' },
      { name: 'Email Marketing', category: 'marketing' },
      { name: 'Paid Advertising', category: 'marketing' },

      // Other
      { name: 'Mobile Development', category: 'other' },
      { name: 'Flutter', category: 'other' },
      { name: 'React Native', category: 'other' },
      { name: 'Swift', category: 'other' },
      { name: 'Kotlin', category: 'other' },
      { name: 'Blockchain', category: 'other' },
      { name: 'AI/ML', category: 'other' },
      { name: 'Data Science', category: 'other' },
      { name: 'DevOps', category: 'other' },
      { name: 'QA Testing', category: 'other' },
    ];

    console.log('📝 Inserting skills...');
    for (const skill of skills) {
      await prisma.skill.upsert({
        where: { name: skill.name },
        update: {},
        create: skill,
      });
    }
    console.log(`✅ Inserted ${skills.length} skills`);


    // Create demo users for testing
    console.log('👥 Creating demo users...');
    
    const demoUsers = [
      {
        email: 'alice@colabship.io',
        password: await bcrypt.hash('password123', 12),
        name: 'Alice Chen',
        bio: 'Full-stack developer with 5 years of experience. Passionate about React and Node.js.',
        experienceLevel: 'advanced',
        timezone: 'America/New_York',
        availabilityHours: 20,
        workStyle: 'async',
        commsPref: 'text',
        values: ['collaboration', 'innovation', 'quality'],
        isOnboarded: true
      },
      {
        email: 'bob@colabship.io',
        password: await bcrypt.hash('password123', 12),
        name: 'Bob Rodriguez',
        bio: 'UI/UX designer and frontend developer. Love creating beautiful, functional interfaces.',
        experienceLevel: 'intermediate',
        timezone: 'America/Los_Angeles',
        availabilityHours: 15,
        workStyle: 'hybrid',
        commsPref: 'mixed',
        values: ['creativity', 'user-experience', 'collaboration'],
        isOnboarded: true
      },
      {
        email: 'carol@colabship.io',
        password: await bcrypt.hash('password123', 12),
        name: 'Carol Kim',
        bio: 'Backend developer specializing in Python and databases. Interested in AI/ML projects.',
        experienceLevel: 'expert',
        timezone: 'Europe/London',
        availabilityHours: 25,
        workStyle: 'sync',
        commsPref: 'video',
        values: ['innovation', 'learning', 'excellence'],
        isOnboarded: true
      }
    ];

    for (const userData of demoUsers) {
      await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: userData,
      });
    }
    console.log(`✅ Created ${demoUsers.length} demo users`);

    // Add skills to demo users
    console.log('🔧 Adding skills to demo users...');
    
    const alice = await prisma.user.findUnique({ where: { email: 'alice@colabship.io' } });
    const bob = await prisma.user.findUnique({ where: { email: 'bob@colabship.io' } });
    const carol = await prisma.user.findUnique({ where: { email: 'carol@colabship.io' } });

    if (alice) {
      // Alice's skills
      const aliceSkills = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'];
      for (const skillName of aliceSkills) {
        const skill = await prisma.skill.findUnique({ where: { name: skillName } });
        if (skill) {
          await prisma.userOffer.upsert({
            where: {
              userId_skillId: {
                userId: alice.id,
                skillId: skill.id
              }
            },
            update: {},
            create: {
              userId: alice.id,
              skillId: skill.id,
              proficiency: 4
            }
          });
        }
      }
    }

    if (bob) {
      // Bob's skills
      const bobSkills = ['UI/UX Design', 'Figma', 'React', 'JavaScript', 'HTML/CSS'];
      for (const skillName of bobSkills) {
        const skill = await prisma.skill.findUnique({ where: { name: skillName } });
        if (skill) {
          await prisma.userOffer.upsert({
            where: {
              userId_skillId: {
                userId: bob.id,
                skillId: skill.id
              }
            },
            update: {},
            create: {
              userId: bob.id,
              skillId: skill.id,
              proficiency: 4
            }
          });
        }
      }
    }

    if (carol) {
      // Carol's skills
      const carolSkills = ['Python', 'Django', 'PostgreSQL', 'AI/ML', 'Docker'];
      for (const skillName of carolSkills) {
        const skill = await prisma.skill.findUnique({ where: { name: skillName } });
        if (skill) {
          await prisma.userOffer.upsert({
            where: {
              userId_skillId: {
                userId: carol.id,
                skillId: skill.id
              }
            },
            update: {},
            create: {
              userId: carol.id,
              skillId: skill.id,
              proficiency: 5
            }
          });
        }
      }
    }

    console.log('✅ Added skills to demo users');

    console.log('\n🎉 Database migration and seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${skills.length} skills inserted`);
    console.log(`- ${demoUsers.length} demo users created`);
    console.log('- Skills assigned to demo users');
    
    console.log('\n🔑 Demo user credentials:');
    console.log('Email: alice@colabship.io | Password: password123');
    console.log('Email: bob@colabship.io | Password: password123');
    console.log('Email: carol@colabship.io | Password: password123');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
