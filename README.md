# 🚀 Colabship.io

**COLAB. SHIP. REPEAT.**

A platform for indie hackers to find co-founders and ship projects together. Built by indie hackers, for indie hackers.

## 🌟 What is Colabship.io?

Colabship.io is a community-driven platform that connects indie hackers with potential collaborators. We believe that the best products are built by teams, not individuals. Our mission is to make it easier for indie hackers to find the right people to build with.

### 🎯 Core Features

- **Smart Matching Algorithm** - Find collaborators based on skills, experience, availability, and vision
- **Legal Document Generator** - Customizable templates for NDAs, IP agreements, founder agreements, and more
- **Project Showcase** - Display your projects and find team members
- **Community Hub** - Share ideas, get feedback, and build your reputation
- **Async-First Collaboration** - Built for remote, distributed teams
- **Beta Access System** - Controlled rollout with community feedback

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: React Context + TanStack Query
- **Routing**: React Router v6
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with custom design system

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── layout/         # Layout components (header, footer, etc.)
│   └── common/         # Common utilities and components
├── pages/              # Page components
│   ├── home/           # Home page
│   ├── projects/       # Projects showcase
│   ├── founders/       # Founder onboarding
│   ├── matching/       # Smart matching system
│   ├── legal/          # Legal document generator
│   └── access/         # Beta access control
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── features/           # Feature-specific code
    ├── access-control/ # Beta access system
    ├── founders/       # Founder management
    ├── matching/       # Smart matching algorithm
    └── applications/   # Application system
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/colabship.io.git
   cd colabship.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Beta Access
Currently, the platform is in private beta. You'll need a beta access code to explore the full platform. Contact us for access.

## 🎨 Design System

### Color Palette
- **Primary Green**: `hsl(150 100% 50%)` - Used for CTAs and primary actions
- **Warm Taupe**: `hsl(25 15% 45%)` - Used for secondary elements and text
- **Charcoal**: `hsl(210 6% 5%)` - Background color
- **Soft Gray**: `hsl(210 10% 60%)` - Muted text and borders

### Typography
- **Headings**: Inter (Bold)
- **Body**: Inter (Regular)
- **Code**: JetBrains Mono

### Components
All UI components are built with Radix UI primitives and styled with Tailwind CSS. The design system emphasizes:
- Accessibility first
- Consistent spacing and typography
- Smooth animations and transitions
- Dark mode support

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Conventional commits for commit messages

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🌍 Community

### Contributing
We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Community Guidelines
- Be respectful and inclusive
- Help others learn and grow
- Share your knowledge and experience
- Provide constructive feedback
- Follow the code of conduct

### Discord Community
Join our Discord server to connect with other indie hackers:
[Discord Server](https://discord.gg/colabship)

## 📋 Roadmap

### Phase 1: Beta Launch ✅
- [x] Core platform architecture
- [x] Beta access system
- [x] Basic project showcase
- [x] Community hub
- [x] Legal document templates

### Phase 2: Smart Matching 🚧
- [ ] Advanced matching algorithm
- [ ] Skill-based recommendations
- [ ] Timezone compatibility
- [ ] Collaboration style matching

### Phase 3: Enhanced Features 📋
- [ ] Real-time chat system
- [ ] Project management tools
- [ ] Integration with popular tools
- [ ] Advanced analytics

### Phase 4: Scale & Monetization 📋
- [ ] Freemium model implementation
- [ ] Premium features
- [ ] API access
- [ ] Enterprise features

## 🤝 Support

### Getting Help
- **Documentation**: Check our [docs](https://docs.colabship.io)
- **Discord**: Join our community server
- **Email**: hello@colabship.io
- **GitHub Issues**: Report bugs and request features

### Reporting Bugs
When reporting bugs, please include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Indie Hackers Community** - For inspiration and feedback
- **Supabase** - For the amazing backend platform
- **Radix UI** - For accessible UI primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **All Beta Testers** - For helping us build something amazing

---

**Built with ❤️ by indie hackers, for indie hackers**

*COLAB. SHIP. REPEAT.*
