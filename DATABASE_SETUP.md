# 🗄️ Database Setup Guide

## Quick Database Setup Options

Since you don't have PostgreSQL running locally, here are the easiest ways to get a database up and running:

## Option 1: 🚀 **Railway (Recommended - Free)**

Railway provides a free PostgreSQL database that's perfect for development and production.

### Steps:
1. **Sign up at [Railway.app](https://railway.app)**
2. **Create a new project**
3. **Add PostgreSQL database**
4. **Copy the connection string**
5. **Update your `.env` file**

```bash
# In backend/.env
DATABASE_URL="postgresql://username:password@host:port/database"
```

## Option 2: 🐘 **Local PostgreSQL Installation**

### Windows (using Chocolatey):
```bash
# Install Chocolatey if you don't have it
# Then install PostgreSQL
choco install postgresql

# Start PostgreSQL service
net start postgresql-x64-14
```

### Windows (using Installer):
1. **Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)**
2. **Run the installer**
3. **Set password for 'postgres' user**
4. **Start the service**

### macOS (using Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Option 3: 🐳 **Docker (Easiest)**

If you have Docker installed:

```bash
# Run PostgreSQL in Docker
docker run --name colabship-db \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=colabship \
  -p 5432:5432 \
  -d postgres:15

# The database will be available at:
# Host: localhost
# Port: 5432
# Database: colabship
# Username: postgres
# Password: password123
```

## Option 4: ☁️ **Supabase (Free)**

Supabase provides a free PostgreSQL database with a nice dashboard.

### Steps:
1. **Sign up at [supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Go to Settings > Database**
4. **Copy the connection string**
5. **Update your `.env` file**

## 🔧 **After Setting Up Database**

Once you have a database running, update your `backend/.env` file:

```env
# For local PostgreSQL
DATABASE_URL="postgresql://postgres:password123@localhost:5432/colabship"

# For Railway
DATABASE_URL="postgresql://username:password@host:port/database"

# For Supabase
DATABASE_URL="postgresql://postgres:password@host:port/postgres"
```

## 🚀 **Run Database Migration**

After setting up the database:

```bash
cd backend
npm run db:dev          # Create and run migrations
npm run db:migrate-seed # Seed the database with initial data
```

## 🎯 **Quick Start (Recommended)**

**For the fastest setup, use Railway:**

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Create new project**
4. **Add PostgreSQL database**
5. **Copy the DATABASE_URL**
6. **Update `backend/.env`**
7. **Run: `npm run db:migrate-seed`**

This will give you a production-ready database in under 5 minutes!

## 🔍 **Verify Database Connection**

Test your database connection:

```bash
cd backend
npm run db:studio
```

This will open Prisma Studio where you can see your database tables and data.

## 🆘 **Need Help?**

If you're having trouble with any of these options, let me know and I can help you set up the database step by step!
