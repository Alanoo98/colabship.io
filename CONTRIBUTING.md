# Contributing to Colabship.io 🤝

First off, thank you for considering contributing to Colabship! It's people like you who make Colabship a great tool for the open source community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I don't want to read this whole thing, I just have a question!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)
- [What should I know before I get started?](#what-should-i-know-before-i-get-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Styleguides](#styleguides)
- [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## I don't want to read this whole thing, I just have a question!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using the resources below.

We have an official Discord server where the community chimes in with helpful advice if you have questions.

- [Discord Community](https://discord.gg/colabship)
- [GitHub Discussions](https://github.com/your-username/colabship.io/discussions)

## What should I know before I get started?

### Project Overview

Colabship is a platform that helps open source contributors find the right projects and collaborators. The platform itself is built by the community, for the community.

### Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Supabase
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see [README.md](README.md#environment-setup))
4. Start the development server: `npm run dev`

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue search to check if the issue has already been reported
- Check if the issue has been fixed (try looking at the latest commits)
- Use the bug report template to create a new issue

### Suggesting Enhancements

- Use the GitHub issue search to check if the enhancement has already been suggested
- Check if the enhancement has already been implemented
- Use the feature request template to create a new issue

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Your First Code Contribution

Unsure where to begin contributing to Colabship? You can start by looking through these `good first issue` and `help wanted` issues:

- [Good first issues](https://github.com/your-username/colabship.io/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- [Help wanted issues](https://github.com/your-username/colabship.io/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)

### Areas That Need Help

- **Frontend Development**: React components, UI/UX improvements
- **Backend Development**: API endpoints, database optimization
- **Testing**: Unit tests, integration tests, E2E tests
- **Documentation**: Code comments, README updates, API docs
- **Design**: UI/UX improvements, accessibility
- **DevOps**: CI/CD, deployment, monitoring

## Styleguides

### Git Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat: add user profile page

- Add new profile component
- Implement profile editing functionality
- Add profile image upload feature

Closes #123
```

### JavaScript/TypeScript Styleguide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Use ESLint and Prettier (configured in the project)

### CSS/Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design
- Maintain accessibility standards
- Use CSS custom properties for theming

### Documentation Styleguide

- Use clear, concise language
- Include code examples where helpful
- Keep documentation up to date with code changes
- Use proper markdown formatting

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Something isn't working
- `documentation` - Improvements or additions to documentation
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `invalid` - Something is wrong
- `question` - Further information is requested
- `wontfix` - This will not be worked on

### Release Process

1. Create a release branch from `main`
2. Update version numbers and changelog
3. Create a pull request for review
4. Merge and create a GitHub release
5. Deploy to production

### Getting Help

If you need help with anything:

- Check the [documentation](https://docs.colabship.io)
- Join our [Discord community](https://discord.gg/colabship)
- Open a [GitHub discussion](https://github.com/your-username/colabship.io/discussions)
- Email us at hello@colabship.io

---

**Thank you for contributing to Colabship! 🚀**
