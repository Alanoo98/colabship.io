# Colabship.io 🌟

**From open source contributions to valuable teams**

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

## 🚀 About Colabship

Colabship is a **FREE** community-driven platform that bridges the gap between open source collaboration and valuable team formation. We help contributors discover projects, build reputation through real work, and evolve into core team members with ownership and upside.

**The beautiful irony?** Colabship itself will be built by contributors who found each other through the platform. Every feature, every improvement, every success story comes from real people collaborating on real open source projects.

### 🎯 The Core Idea

Colabship starts as a community-driven open source hub where contributors can discover projects, match based on skills, and build reputation. But unlike existing OSS directories, Colabship is designed as a pipeline from hobby contributions → core teams → real value creation.

### ✨ What Makes Us Different

- **OSS-First, Startup-Next**: Unlike pure OSS directories, Colabship's DNA is about forming long-term, valuable teams
- **Proof-of-Work Reputation**: Contributions aren't "likes" — they're measurable impact on real projects
- **Graduation Path**: Projects can start open and fun → evolve into structured teams → eventually launch as products/companies
- **Meta Credibility**: Colabship itself is being built in this exact way
- **100% FREE**: No beta restrictions, no paywalls, no limitations
- **MVP Focused**: Clean, streamlined platform with only essential features

## 🌱 The Three Phases

### Phase 1: Open Collaboration ✅
- **Anyone can spin up a project** on Colabship (OSS-style)
- **Contributors join projects**, make pull requests, and earn reputation points
- **Skill-based matching** ensures the right people land in the right repos
- *This phase builds the network and lowers the barrier to entry*

### Phase 2: Team Formation 🚧
- **Projects can "graduate"** from being fully open to being partially open with a core team
- **Team Slots**: Project owners define roles like "5 devs and 1 designer"
- **Contributor Track Record**: Platform shows which contributors have been most valuable
- **Core Team Selection**: Most impactful contributors get invited into the core team
- *This phase solves the "cold start" of finding committed team members*

### Phase 3: Value & Incentives 📋
- **Equity/Revenue Sharing** – for startup-style projects
- **Bounties/Micro-payments** – tasks rewarded with cash/crypto
- **Tokenized Reputation** – provable, portable contributor history
- *The key: contributions aren't just recognition, they can evolve into ownership and upside*

## 🎯 Our Mission

To make open source collaboration as easy as finding a coffee shop, while creating a clear path from contributions to valuable team formation. We believe that great software is built by great teams, and great teams start with great collaboration.

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT-based
- **Deployment**: Vercel + Railway
- **Testing**: Jest + React Testing Library

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn
- Git

### One-Command Setup

```bash
# Clone and setup everything
git clone https://github.com/your-username/colabship.io.git
cd colabship.io
node setup.js
```

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/colabship.io.git
   cd colabship.io
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up database**
   - Create a PostgreSQL database
   - Update `DATABASE_URL` in `backend/.env`

5. **Initialize database**
   ```bash
   cd backend
   npm run db:dev
   npm run db:migrate-seed
   cd ..
   ```

6. **Start the platform**
   ```bash
   # Terminal 1: Start backend
   cd backend && npm run dev
   
   # Terminal 2: Start frontend
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Setup

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

### Backend (backend/.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/colabship"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:5173"
```

## 🎮 Features

### ✅ Currently Available (MVP)
- **User Registration & Authentication** - JWT-based auth system
- **Profile Management** - Complete user profiles with skills and preferences
- **Skill Matching** - Advanced algorithm to match users based on skills
- **Onboarding Flow** - 5-step guided onboarding process
- **Match Dashboard** - Browse and connect with potential collaborators
- **Responsive Design** - Works on desktop and mobile
- **Dark/Light Mode** - Theme switching support
- **Database Seeding** - Pre-populated with 70+ skills and demo users
- **Production Ready** - Clean, focused codebase optimized for deployment

### 🚧 Coming Soon
- **Project Creation** - Create and manage projects
- **Real-time Chat** - Communication between matched users
- **Reputation System** - Track and display user contributions
- **Legal Templates** - Built-in legal document generation

## 🤝 Contributing

We love your input! We want to make contributing to Colabship as easy and transparent as possible, whether it's:

- 🐛 Reporting a bug
- 💡 Discussing the current state of the code
- 🔧 Submitting a fix
- ✨ Proposing new features
- 📖 Becoming a maintainer

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- **Code Style**: We use Prettier and ESLint for consistent code formatting
- **Testing**: Write tests for new features and ensure all tests pass
- **Documentation**: Update documentation for any new features
- **Commits**: Use conventional commit messages

### Getting Help

- 📖 [Documentation](https://docs.colabship.io)
- 💬 [Discord Community](https://discord.gg/colabship)
- 🐛 [Report Bugs](https://github.com/your-username/colabship.io/issues)
- 💡 [Request Features](https://github.com/your-username/colabship.io/issues)

## 📋 Roadmap

- [x] **v1.0** - Core platform with authentication and matching
- [x] **v1.1** - User profiles and skill management
- [x] **v1.2** - Matching algorithm and dashboard
- [x] **v1.3** - MVP platform ready for launch
- [ ] **v1.4** - Project creation and management
- [ ] **v1.5** - Real-time communication
- [ ] **v2.0** - Reputation system and advanced features
- [ ] **v2.1** - Legal templates and agreements
- [ ] **v3.0** - Advanced features and monetization

## 🏗️ Project Structure

```
colabship.io/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── onboarding/    # Onboarding flow
│   │   ├── matching/      # Matching dashboard
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   └── lib/               # Utility functions
├── backend/               # Backend Node.js API
│   ├── src/               # Source code
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   ├── prisma/            # Database schema
│   └── scripts/           # Database scripts
├── public/                # Static assets
├── setup.js               # Main setup script
├── setup-database.js      # Database setup script
└── railway.json           # Railway deployment config
```

## 🧪 Testing

```bash
# Test database setup
node setup-database.js

# Test backend functionality (requires database)
cd backend
npm run db:migrate-seed
```

## 📦 Building for Production

```bash
# Build the frontend
npm run build

# Build the backend
cd backend && npm run build

# Start production server
cd backend && npm start
```

## 🚀 Deployment

### Quick Deployment with Railway

1. **Connect your repository to Railway**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub
   - New Project → Deploy from GitHub repo
   - Select your `colabship.io` repository

2. **Add PostgreSQL database**
   - In Railway dashboard: New → Database → PostgreSQL
   - Copy the `DATABASE_URL`

3. **Configure environment variables**
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ```

4. **Deploy and seed database**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Connect to your project
   railway login
   railway link
   
   # Run database migration
   railway run --service backend npm run db:migrate-seed
   ```

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel --prod
```

For detailed deployment instructions, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

## 🧹 MVP Status

**Colabship is now a focused MVP ready for launch!** 

### What's Included:
- ✅ **Core collaboration features** - Authentication, matching, onboarding
- ✅ **Clean codebase** - Removed all redundant files and unused features
- ✅ **Production ready** - Optimized for deployment and performance
- ✅ **Database seeded** - 70+ skills and 3 demo users for testing

### What Was Removed (for MVP focus):
- ❌ **Badge system** - Gamification features removed for simplicity
- ❌ **Beta access system** - Platform is now 100% free
- ❌ **Unused features** - Removed chat, legal, founders, and other non-MVP features
- ❌ **Redundant documentation** - Cleaned up 50+ unnecessary files
- ❌ **Complex feature directories** - Streamlined to essential components only

### Result:
A **clean, focused platform** that delivers the core value proposition: connecting indie hackers with complementary skills to form successful collaborations.

## 🤝 Community

### Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/your-username"><img src="https://avatars.githubusercontent.com/u/your-id?v=4?s=100" width="100px;" alt="Your Name"/><br /><sub><b>Your Name</b></sub></a><br /><a href="https://github.com/your-username/colabship.io/commits?author=your-username" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

### Join Our Community

- 🌐 [Website](https://colabship.io)
- 💬 [Discord](https://discord.gg/colabship)
- 🐦 [Twitter](https://twitter.com/colabship)
- 📧 [Email](mailto:hello@colabship.io)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All our amazing contributors
- The open source community
- Everyone who believes in the power of collaboration

---

**Built with ❤️ by the open source community**

[contributors-shield]: https://img.shields.io/github/contributors/your-username/colabship.io.svg?style=for-the-badge
[contributors-url]: https://github.com/your-username/colabship.io/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/your-username/colabship.io.svg?style=for-the-badge
[forks-url]: https://github.com/your-username/colabship.io/network/members
[stars-shield]: https://img.shields.io/github/stars/your-username/colabship.io.svg?style=for-the-badge
[stars-url]: https://github.com/your-username/colabship.io/stargazers
[issues-shield]: https://img.shields.io/github/issues/your-username/colabship.io.svg?style=for-the-badge
[issues-url]: https://github.com/your-username/colabship.io/issues
[license-shield]: https://img.shields.io/github/license/your-username/colabship.io.svg?style=for-the-badge
[license-url]: https://github.com/your-username/colabship.io/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/your-profile
