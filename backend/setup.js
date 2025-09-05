#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Colabship Backend...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/colabship"

# JWT
JWT_SECRET="colabship-super-secret-jwt-key-2024"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"

# OAuth (for future implementation)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created!');
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed!');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Generate Prisma client
console.log('\n🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated!');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message);
  process.exit(1);
}

console.log('\n🎉 Backend setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Set up your PostgreSQL database');
console.log('2. Update DATABASE_URL in .env file');
console.log('3. Run: npm run db:migrate');
console.log('4. Run: npm run db:seed');
console.log('5. Run: npm run dev');
