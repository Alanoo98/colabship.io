# Colabship Backend

Backend API for Colabship - Open source collaboration platform.

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   npm run setup
   ```
   This will create a `.env` file with default values.

3. **Configure database**
   - Set up a PostgreSQL database
   - Update `DATABASE_URL` in `.env` file with your database credentials

4. **Initialize database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:dev
   
   # Seed the database
   npm run db:init
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/skills/offers` - Get user's skill offers
- `POST /api/users/skills/offers` - Add skill offer
- `DELETE /api/users/skills/offers/:skillId` - Remove skill offer
- `GET /api/users/skills/needs` - Get user's skill needs
- `POST /api/users/skills/needs` - Add skill need
- `DELETE /api/users/skills/needs/:skillId` - Remove skill need
- `POST /api/users/onboard` - Mark user as onboarded

### Matches
- `GET /api/matches/potential` - Get potential matches
- `GET /api/matches` - Get user's matches
- `POST /api/matches/:userId/like` - Like a user
- `POST /api/matches/:userId/skip` - Skip a user
- `GET /api/matches/:matchId` - Get match details

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/:id` - Get skill by ID

## Database Schema

The database includes the following main entities:

- **Users** - User profiles and preferences
- **Skills** - Available skills and categories
- **UserOffers** - Skills users can offer
- **UserNeeds** - Skills users are looking for
- **Matches** - User matches and interactions
- **Badges** - Achievement system
- **CollaborationFeedback** - Feedback system

## Development

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Create and apply migration
npm run db:dev

# Reset database (WARNING: deletes all data)
npm run db:reset

# Open Prisma Studio
npm run db:studio

# Seed database with initial data
npm run db:init
```

### Environment Variables

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

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   - Update `DATABASE_URL` with production database
   - Set `JWT_SECRET` to a secure random string
   - Set `NODE_ENV=production`
   - Update `FRONTEND_URL` with production frontend URL

3. **Run migrations**
   ```bash
   npm run db:migrate
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## API Documentation

The API follows RESTful conventions and returns JSON responses.

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Error Responses

```json
{
  "error": "Error message"
}
```

### Success Responses

```json
{
  "data": { ... },
  "message": "Success message"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
