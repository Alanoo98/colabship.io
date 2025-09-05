#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Colabship - Complete Platform Setup\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description, cwd = process.cwd()) {
  try {
    log(`\n📦 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit', cwd });
    log(`✅ ${description} completed!`, 'green');
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    throw error;
  }
}

async function main() {
  try {
    // Check if we're in the right directory
    if (!fs.existsSync('package.json') || !fs.existsSync('backend')) {
      log('❌ Please run this script from the root directory of the Colabship project', 'red');
      process.exit(1);
    }

    log('🎯 Colabship Platform Setup', 'bright');
    log('Making everything free and fully functional!\n', 'cyan');

    // Step 1: Frontend setup
    log('📱 Setting up Frontend...', 'magenta');
    runCommand('npm install', 'Installing frontend dependencies');

    // Step 2: Backend setup
    log('\n🔧 Setting up Backend...', 'magenta');
    runCommand('npm install', 'Installing backend dependencies', 'backend');

    // Step 3: Create backend .env if it doesn't exist
    const backendEnvPath = path.join('backend', '.env');
    if (!fs.existsSync(backendEnvPath)) {
      log('\n📝 Creating backend .env file...', 'blue');
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
      fs.writeFileSync(backendEnvPath, envContent);
      log('✅ Backend .env file created!', 'green');
    } else {
      log('✅ Backend .env file already exists', 'green');
    }

    // Step 4: Generate Prisma client
    runCommand('npx prisma generate', 'Generating Prisma client', 'backend');

    log('\n🎉 Setup completed successfully!', 'green');
    log('\n📋 Next steps:', 'bright');
    log('1. Set up your PostgreSQL database', 'yellow');
    log('2. Update DATABASE_URL in backend/.env file', 'yellow');
    log('3. Run: cd backend && npm run db:dev', 'yellow');
    log('4. Run: cd backend && npm run db:migrate-seed', 'yellow');
    log('5. Start the backend: cd backend && npm run dev', 'yellow');
    log('6. Start the frontend: npm run dev', 'yellow');
    log('7. Test everything: node test-functionality.js', 'yellow');
    log('\n🌐 The platform will be available at:', 'bright');
    log('   Frontend: http://localhost:5173', 'cyan');
    log('   Backend:  http://localhost:3001', 'cyan');
    log('\n✨ Everything is now FREE and ready to use!', 'green');

  } catch (error) {
    log(`\n❌ Setup failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
