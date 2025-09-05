#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗄️ Colabship Database Setup');
console.log('===========================\n');

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

// Check if Docker is available
function checkDocker() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Check if PostgreSQL is running locally
function checkLocalPostgres() {
  try {
    execSync('pg_isready -h localhost -p 5432', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Setup Docker PostgreSQL
function setupDockerPostgres() {
  log('🐳 Setting up PostgreSQL with Docker...', 'blue');
  
  try {
    // Check if container already exists
    try {
      execSync('docker ps -a --filter name=colabship-db --format "{{.Names}}"', { stdio: 'pipe' });
      const existingContainer = execSync('docker ps -a --filter name=colabship-db --format "{{.Names}}"', { encoding: 'utf8' }).trim();
      
      if (existingContainer) {
        log('📦 Starting existing PostgreSQL container...', 'yellow');
        execSync('docker start colabship-db', { stdio: 'inherit' });
      } else {
        log('📦 Creating new PostgreSQL container...', 'yellow');
        execSync('docker run --name colabship-db -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=colabship -p 5432:5432 -d postgres:15', { stdio: 'inherit' });
      }
      
      // Wait for database to be ready
      log('⏳ Waiting for database to be ready...', 'yellow');
      let attempts = 0;
      while (attempts < 30) {
        try {
          execSync('docker exec colabship-db pg_isready -U postgres', { stdio: 'ignore' });
          break;
        } catch {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      if (attempts >= 30) {
        log('❌ Database failed to start within 30 seconds', 'red');
        return false;
      }
      
      log('✅ PostgreSQL container is running!', 'green');
      return true;
      
    } catch (error) {
      log('❌ Failed to setup Docker PostgreSQL:', 'red');
      log(error.message, 'red');
      return false;
    }
  } catch (error) {
    log('❌ Docker not available or failed:', 'red');
    log(error.message, 'red');
    return false;
  }
}

// Update .env file with database URL
function updateEnvFile(databaseUrl) {
  const envPath = path.join(__dirname, 'backend', '.env');
  
  try {
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Update or add DATABASE_URL
    if (envContent.includes('DATABASE_URL=')) {
      envContent = envContent.replace(/DATABASE_URL=.*/, `DATABASE_URL="${databaseUrl}"`);
    } else {
      envContent += `\nDATABASE_URL="${databaseUrl}"\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    log('✅ Updated backend/.env file', 'green');
    return true;
  } catch (error) {
    log('❌ Failed to update .env file:', 'red');
    log(error.message, 'red');
    return false;
  }
}

// Run database migration
function runMigration() {
  log('🚀 Running database migration...', 'blue');
  
  try {
    execSync('npm run db:dev', { 
      cwd: path.join(__dirname, 'backend'),
      stdio: 'inherit' 
    });
    log('✅ Database migration completed!', 'green');
    return true;
  } catch (error) {
    log('❌ Database migration failed:', 'red');
    log(error.message, 'red');
    return false;
  }
}

// Seed the database
function seedDatabase() {
  log('🌱 Seeding database...', 'blue');
  
  try {
    execSync('npm run db:migrate-seed', { 
      cwd: path.join(__dirname, 'backend'),
      stdio: 'inherit' 
    });
    log('✅ Database seeding completed!', 'green');
    return true;
  } catch (error) {
    log('❌ Database seeding failed:', 'red');
    log(error.message, 'red');
    return false;
  }
}

// Main setup function
async function setupDatabase() {
  log('🔍 Checking database options...\n', 'blue');
  
  const hasDocker = checkDocker();
  const hasLocalPostgres = checkLocalPostgres();
  
  log('Available options:', 'bright');
  log(`🐳 Docker: ${hasDocker ? '✅ Available' : '❌ Not available'}`, hasDocker ? 'green' : 'red');
  log(`🐘 Local PostgreSQL: ${hasLocalPostgres ? '✅ Running' : '❌ Not running'}`, hasLocalPostgres ? 'green' : 'red');
  log(`☁️ Railway/Supabase: ✅ Always available (manual setup)`, 'green');
  
  console.log('\n');
  
  if (hasLocalPostgres) {
    log('✅ Local PostgreSQL is already running!', 'green');
    log('Using existing PostgreSQL database...', 'blue');
    
    const databaseUrl = 'postgresql://postgres:password@localhost:5432/colabship';
    updateEnvFile(databaseUrl);
    
  } else if (hasDocker) {
    log('🐳 Setting up PostgreSQL with Docker...', 'blue');
    
    const success = setupDockerPostgres();
    if (success) {
      const databaseUrl = 'postgresql://postgres:password123@localhost:5432/colabship';
      updateEnvFile(databaseUrl);
    } else {
      log('❌ Docker setup failed. Please try manual setup.', 'red');
      return;
    }
    
  } else {
    log('⚠️ No local database options available.', 'yellow');
    log('\n📋 Manual setup required:', 'bright');
    log('1. Set up Railway: https://railway.app', 'cyan');
    log('2. Set up Supabase: https://supabase.com', 'cyan');
    log('3. Install PostgreSQL locally', 'cyan');
    log('4. Update DATABASE_URL in backend/.env', 'cyan');
    log('\nSee DATABASE_SETUP.md for detailed instructions.', 'yellow');
    return;
  }
  
  // Run migration and seeding
  console.log('\n');
  const migrationSuccess = runMigration();
  
  if (migrationSuccess) {
    console.log('\n');
    seedDatabase();
  }
  
  console.log('\n');
  log('🎉 Database setup completed!', 'green');
  log('\n📋 Next steps:', 'bright');
  log('1. Start backend: cd backend && npm run dev', 'cyan');
  log('2. Start frontend: npm run dev', 'cyan');
  log('3. Open: http://localhost:5173', 'cyan');
}

// Run the setup
setupDatabase().catch(console.error);
