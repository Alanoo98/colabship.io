-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  email TEXT UNIQUE NOT NULL,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  timezone TEXT,
  availability_hours INT CHECK (availability_hours >= 0 AND availability_hours <= 168),
  work_style TEXT CHECK (work_style IN ('async', 'sync', 'hybrid')),
  comms_pref TEXT CHECK (comms_pref IN ('text', 'video', 'mixed')),
  values TEXT[],
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  is_onboarded BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT CHECK (category IN ('frontend', 'backend', 'devops', 'design', 'product', 'marketing', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User offers (what they can provide)
CREATE TABLE user_offers (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  proficiency INT CHECK (proficiency >= 1 AND proficiency <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id)
);

-- User needs (what they're looking for)
CREATE TABLE user_needs (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  must_have BOOLEAN DEFAULT FALSE,
  priority INT CHECK (priority >= 1 AND priority <= 5) DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id)
);

-- Match preferences (weighting sliders)
CREATE TABLE match_preferences (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
  skill_weight INT CHECK (skill_weight >= 0 AND skill_weight <= 100) DEFAULT 25,
  availability_weight INT CHECK (availability_weight >= 0 AND availability_weight <= 100) DEFAULT 20,
  timezone_weight INT CHECK (timezone_weight >= 0 AND timezone_weight <= 100) DEFAULT 20,
  collab_style_weight INT CHECK (collab_style_weight >= 0 AND collab_style_weight <= 100) DEFAULT 15,
  personality_weight INT CHECK (personality_weight >= 0 AND personality_weight <= 100) DEFAULT 20,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project interests
CREATE TABLE project_interests (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, interest)
);

-- Collaboration preferences
CREATE TABLE collaboration_preferences (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
  preferred_tools TEXT[],
  project_stage_interest TEXT[] CHECK (project_stage_interest <@ ARRAY['idea', 'mvp', 'growth', 'scale']),
  team_size_preference TEXT CHECK (team_size_preference IN ('solo', 'duo', 'small_team', 'any')),
  commitment_level TEXT CHECK (commitment_level IN ('casual', 'part_time', 'full_time')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table (for tracking connections)
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  match_score DECIMAL(5,2),
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')) DEFAULT 'pending',
  user_a_liked BOOLEAN DEFAULT FALSE,
  user_b_liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_a_id, user_b_id)
);

-- Match interactions (for algorithm improvement)
CREATE TABLE match_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action TEXT CHECK (action IN ('view', 'like', 'skip', 'connect', 'message')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges/achievements
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  criteria TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id INT REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Reputation/feedback system
CREATE TABLE collaboration_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reviewed_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  collaboration_quality INT CHECK (collaboration_quality >= 1 AND collaboration_quality <= 5),
  communication_quality INT CHECK (communication_quality >= 1 AND communication_quality <= 5),
  skill_match_quality INT CHECK (skill_match_quality >= 1 AND skill_match_quality <= 5),
  would_collaborate_again BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(match_id, reviewer_id)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_experience_level ON users(experience_level);
CREATE INDEX idx_users_timezone ON users(timezone);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_user_offers_user_id ON user_offers(user_id);
CREATE INDEX idx_user_needs_user_id ON user_needs(user_id);
CREATE INDEX idx_matches_user_a_id ON matches(user_a_id);
CREATE INDEX idx_matches_user_b_id ON matches(user_b_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_score ON matches(match_score DESC);
CREATE INDEX idx_skills_category ON skills(category);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_match_preferences_updated_at BEFORE UPDATE ON match_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collaboration_preferences_updated_at BEFORE UPDATE ON collaboration_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default skills
INSERT INTO skills (name, category) VALUES
-- Frontend
('React', 'frontend'),
('Vue.js', 'frontend'),
('Angular', 'frontend'),
('TypeScript', 'frontend'),
('JavaScript', 'frontend'),
('HTML/CSS', 'frontend'),
('Tailwind CSS', 'frontend'),
('Next.js', 'frontend'),
('Nuxt.js', 'frontend'),
('Svelte', 'frontend'),

-- Backend
('Node.js', 'backend'),
('Python', 'backend'),
('Django', 'backend'),
('Flask', 'backend'),
('FastAPI', 'backend'),
('Ruby on Rails', 'backend'),
('PHP', 'backend'),
('Laravel', 'backend'),
('Java', 'backend'),
('Spring Boot', 'backend'),
('Go', 'backend'),
('Rust', 'backend'),
('C#', 'backend'),
('.NET', 'backend'),

-- Database
('PostgreSQL', 'backend'),
('MySQL', 'backend'),
('MongoDB', 'backend'),
('Redis', 'backend'),
('Supabase', 'backend'),
('Firebase', 'backend'),

-- DevOps
('Docker', 'devops'),
('Kubernetes', 'devops'),
('AWS', 'devops'),
('Google Cloud', 'devops'),
('Azure', 'devops'),
('CI/CD', 'devops'),
('Terraform', 'devops'),

-- Design
('UI/UX Design', 'design'),
('Figma', 'design'),
('Adobe XD', 'design'),
('Sketch', 'design'),
('Graphic Design', 'design'),
('Product Design', 'design'),

-- Product
('Product Management', 'product'),
('User Research', 'product'),
('Analytics', 'product'),
('A/B Testing', 'product'),
('Growth Hacking', 'product'),

-- Marketing
('Digital Marketing', 'marketing'),
('SEO', 'marketing'),
('Content Marketing', 'marketing'),
('Social Media', 'marketing'),
('Email Marketing', 'marketing'),
('Paid Advertising', 'marketing'),

-- Other
('Mobile Development', 'other'),
('Flutter', 'other'),
('React Native', 'other'),
('Swift', 'other'),
('Kotlin', 'other'),
('Blockchain', 'other'),
('AI/ML', 'other'),
('Data Science', 'other'),
('DevOps', 'other'),
('QA Testing', 'other');

-- Insert default badges
INSERT INTO badges (name, description, icon, criteria) VALUES
('First Match', 'Connected with your first collaborator', '🎯', 'Complete first successful match'),
('Profile Complete', 'Fully completed your profile', '✅', 'Complete all onboarding steps'),
('Active Member', 'Been active for 30 days', '🔥', 'Active for 30 consecutive days'),
('Collaboration Champion', 'Completed 3 successful collaborations', '🏆', 'Complete 3 collaborations with positive feedback'),
('Skill Sharer', 'Helped others with your expertise', '🤝', 'Receive 5 positive skill-related feedback'),
('Community Builder', 'Contributed to the community', '🌱', 'Participate in community events or discussions'),
('Perfect Match', 'Received 5-star feedback', '⭐', 'Receive 5-star feedback from a collaborator'),
('Early Adopter', 'Joined during beta phase', '🚀', 'Joined before public launch'); 