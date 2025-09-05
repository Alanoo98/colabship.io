#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Initializing database...');

  try {
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

    // Insert default badges
    const badges = [
      {
        name: 'First Match',
        description: 'Connected with your first collaborator',
        icon: '🎯',
        criteria: 'Complete first successful match'
      },
      {
        name: 'Profile Complete',
        description: 'Fully completed your profile',
        icon: '✅',
        criteria: 'Complete all onboarding steps'
      },
      {
        name: 'Active Member',
        description: 'Been active for 30 days',
        icon: '🔥',
        criteria: 'Active for 30 consecutive days'
      },
      {
        name: 'Collaboration Champion',
        description: 'Completed 3 successful collaborations',
        icon: '🏆',
        criteria: 'Complete 3 collaborations with positive feedback'
      },
      {
        name: 'Skill Sharer',
        description: 'Helped others with your expertise',
        icon: '🤝',
        criteria: 'Receive 5 positive skill-related feedback'
      },
      {
        name: 'Community Builder',
        description: 'Contributed to the community',
        icon: '🌱',
        criteria: 'Participate in community events or discussions'
      },
      {
        name: 'Perfect Match',
        description: 'Received 5-star feedback',
        icon: '⭐',
        criteria: 'Receive 5-star feedback from a collaborator'
      },
      {
        name: 'Early Adopter',
        description: 'Joined during launch phase',
        icon: '🚀',
        criteria: 'Joined before public launch'
      },
    ];

    console.log('🏆 Inserting badges...');
    for (const badge of badges) {
      await prisma.badge.upsert({
        where: { name: badge.name },
        update: {},
        create: badge,
      });
    }

    console.log('✅ Database initialization completed!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
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
