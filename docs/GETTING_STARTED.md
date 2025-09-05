# Getting Started with Colabship

Welcome to Colabship! This guide will help you get up and running with the project.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**

## Quick Start

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
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
colabship.io/
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Base UI components
│   │   ├── layout/    # Layout components
│   │   └── common/    # Common utilities
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript types
│   └── styles/        # Global styles
├── public/            # Static assets
├── docs/              # Documentation
└── tests/             # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Use ESLint and Prettier (configured in the project)

### Git Workflow

1. Create a new branch for your feature
2. Make your changes
3. Write tests for new functionality
4. Ensure all tests pass
5. Update documentation if needed
6. Submit a pull request

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

## Database Setup

1. Create a Supabase project
2. Set up your database schema
3. Configure authentication
4. Update your environment variables

## Deployment

### Development

The development server runs on `http://localhost:5173` by default.

### Production

1. Build the project: `npm run build`
2. Deploy to your hosting platform (Vercel, Netlify, etc.)
3. Set up environment variables in your hosting platform

## Getting Help

- Check the [documentation](https://docs.colabship.io)
- Join our [Discord community](https://discord.gg/colabship)
- Open a [GitHub discussion](https://github.com/your-username/colabship.io/discussions)
- Email us at hello@colabship.io

## Contributing

See our [Contributing Guide](../CONTRIBUTING.md) for detailed information on how to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
