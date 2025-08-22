import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  experience_level: string;
  timezone: string;
  availability_hours: number;
  work_style: string;
  comms_pref: string;
  values: string[];
  avatar_url?: string;
  offers: Array<{
    skill_id: number;
    skill_name: string;
    proficiency: number;
  }>;
  needs: Array<{
    skill_id: number;
    skill_name: string;
    must_have: boolean;
    priority: number;
  }>;
  match_preferences: {
    skill_weight: number;
    availability_weight: number;
    timezone_weight: number;
    collab_style_weight: number;
    personality_weight: number;
  };
}

export interface MatchResult {
  user: UserProfile;
  score: number;
  breakdown: {
    skill_score: number;
    availability_score: number;
    timezone_score: number;
    collab_style_score: number;
    personality_score: number;
  };
  complementarity: {
    user_offers_fulfill_needs: string[];
    user_needs_fulfilled_by_offers: string[];
    must_have_matches: string[];
  };
}

export class MatchingAlgorithm {
  /**
   * Calculate match score between two users
   */
  static calculateMatch(userA: UserProfile, userB: UserProfile): MatchResult {
    const weights = userA.match_preferences;
    
    // Calculate individual scores
    const skillScore = this.calculateSkillScore(userA, userB);
    const availabilityScore = this.calculateAvailabilityScore(userA, userB);
    const timezoneScore = this.calculateTimezoneScore(userA, userB);
    const collabStyleScore = this.calculateCollaborationStyleScore(userA, userB);
    const personalityScore = this.calculatePersonalityScore(userA, userB);
    
    // Calculate weighted total score
    const totalScore = (
      skillScore * weights.skill_weight +
      availabilityScore * weights.availability_weight +
      timezoneScore * weights.timezone_weight +
      collabStyleScore * weights.collab_style_weight +
      personalityScore * weights.personality_weight
    ) / 100;
    
    // Calculate complementarity
    const complementarity = this.calculateComplementarity(userA, userB);
    
    return {
      user: userB,
      score: Math.round(totalScore * 100) / 100,
      breakdown: {
        skill_score: Math.round(skillScore * 100) / 100,
        availability_score: Math.round(availabilityScore * 100) / 100,
        timezone_score: Math.round(timezoneScore * 100) / 100,
        collab_style_score: Math.round(collabStyleScore * 100) / 100,
        personality_score: Math.round(personalityScore * 100) / 100,
      },
      complementarity
    };
  }
  
  /**
   * Calculate skill complementarity score
   */
  private static calculateSkillScore(userA: UserProfile, userB: UserProfile): number {
    let score = 0;
    
    // User A's needs fulfilled by User B's offers
    const aNeedsFulfilled = userA.needs.filter(need => 
      userB.offers.some(offer => offer.skill_id === need.skill_id)
    );
    
    // User B's needs fulfilled by User A's offers
    const bNeedsFulfilled = userB.needs.filter(need => 
      userA.offers.some(offer => offer.skill_id === need.skill_id)
    );
    
    // Calculate base score from skill matches
    const totalMatches = aNeedsFulfilled.length + bNeedsFulfilled.length;
    const maxPossibleMatches = userA.needs.length + userB.needs.length;
    
    if (maxPossibleMatches === 0) return 0;
    
    score += (totalMatches / maxPossibleMatches) * 50;
    
    // Bonus for must-have matches
    const mustHaveMatches = aNeedsFulfilled.filter(need => need.must_have).length +
                           bNeedsFulfilled.filter(need => need.must_have).length;
    
    score += mustHaveMatches * 10;
    
    // Bonus for high priority matches
    const highPriorityMatches = aNeedsFulfilled.filter(need => need.priority >= 4).length +
                               bNeedsFulfilled.filter(need => need.priority >= 4).length;
    
    score += highPriorityMatches * 5;
    
    return Math.min(score, 100);
  }
  
  /**
   * Calculate availability alignment score
   */
  private static calculateAvailabilityScore(userA: UserProfile, userB: UserProfile): number {
    const hoursDiff = Math.abs(userA.availability_hours - userB.availability_hours);
    
    // Perfect match if within 5 hours
    if (hoursDiff <= 5) return 100;
    
    // Good match if within 10 hours
    if (hoursDiff <= 10) return 80;
    
    // Acceptable if within 20 hours
    if (hoursDiff <= 20) return 60;
    
    // Poor match if more than 20 hours difference
    return Math.max(20, 100 - hoursDiff * 2);
  }
  
  /**
   * Calculate timezone compatibility score
   */
  private static calculateTimezoneScore(userA: UserProfile, userB: UserProfile): number {
    if (userA.timezone === userB.timezone) return 100;
    
    // Calculate timezone overlap
    const overlap = this.calculateTimezoneOverlap(userA.timezone, userB.timezone);
    
    if (overlap >= 6) return 100; // 6+ hours overlap
    if (overlap >= 4) return 80;  // 4-6 hours overlap
    if (overlap >= 2) return 60;  // 2-4 hours overlap
    if (overlap >= 1) return 40;  // 1-2 hours overlap
    
    return 20; // Less than 1 hour overlap
  }
  
  /**
   * Calculate collaboration style compatibility score
   */
  private static calculateCollaborationStyleScore(userA: UserProfile, userB: UserProfile): number {
    let score = 0;
    
    // Work style compatibility
    if (userA.work_style === userB.work_style) {
      score += 50;
    } else if (userA.work_style === 'hybrid' || userB.work_style === 'hybrid') {
      score += 40;
    } else if (
      (userA.work_style === 'async' && userB.work_style === 'sync') ||
      (userA.work_style === 'sync' && userB.work_style === 'async')
    ) {
      score += 20; // Async and sync can work together but need more coordination
    }
    
    // Communication preference compatibility
    if (userA.comms_pref === userB.comms_pref) {
      score += 50;
    } else if (userA.comms_pref === 'mixed' || userB.comms_pref === 'mixed') {
      score += 40;
    } else {
      score += 30; // Different preferences can still work
    }
    
    return score;
  }
  
  /**
   * Calculate personality and values compatibility score
   */
  private static calculatePersonalityScore(userA: UserProfile, userB: UserProfile): number {
    if (userA.values.length === 0 || userB.values.length === 0) return 50;
    
    const sharedValues = userA.values.filter(value => userB.values.includes(value));
    const valueOverlap = sharedValues.length / Math.max(userA.values.length, userB.values.length);
    
    return Math.round(valueOverlap * 100);
  }
  
  /**
   * Calculate complementarity details
   */
  private static calculateComplementarity(userA: UserProfile, userB: UserProfile) {
    const userAOffersFulfillNeeds = userA.offers
      .filter(offer => userB.needs.some(need => need.skill_id === offer.skill_id))
      .map(offer => offer.skill_name);
    
    const userBNeedsFulfilledByOffers = userB.needs
      .filter(need => userA.offers.some(offer => offer.skill_id === need.skill_id))
      .map(need => need.skill_name);
    
    const mustHaveMatches = userA.needs
      .filter(need => need.must_have && userB.offers.some(offer => offer.skill_id === need.skill_id))
      .map(need => need.skill_name);
    
    return {
      user_offers_fulfill_needs: userAOffersFulfillNeeds,
      user_needs_fulfilled_by_offers: userBNeedsFulfilledByOffers,
      must_have_matches: mustHaveMatches
    };
  }
  
  /**
   * Calculate timezone overlap in hours
   */
  private static calculateTimezoneOverlap(tz1: string, tz2: string): number {
    try {
      const now = new Date();
      const time1 = new Date(now.toLocaleString('en-US', { timeZone: tz1 }));
      const time2 = new Date(now.toLocaleString('en-US', { timeZone: tz2 }));
      
      const diffHours = Math.abs(time1.getHours() - time2.getHours());
      return 24 - diffHours; // Overlap is inverse of difference
    } catch (error) {
      // Fallback to conservative estimate
      return 4;
    }
  }
  
  /**
   * Get matches for a user
   */
  static async getMatches(userId: string, limit: number = 20): Promise<MatchResult[]> {
    try {
      // Get user profile with all related data
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) throw new Error('User profile not found');
      
      // Get all other active users
      const { data: otherUsers, error } = await supabase
        .from('users')
        .select(`
          *,
          user_offers(skill_id, skill_name, proficiency),
          user_needs(skill_id, skill_name, must_have, priority),
          match_preferences(*)
        `)
        .eq('is_active', true)
        .neq('id', userId)
        .eq('is_onboarded', true);
      
      if (error) throw error;
      
      // Calculate matches
      const matches = otherUsers
        .map(user => this.calculateMatch(userProfile, this.transformUserData(user)))
        .filter(match => match.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      
      return matches;
    } catch (error) {
      console.error('Error getting matches:', error);
      throw error;
    }
  }
  
  /**
   * Get user profile with all related data
   */
  private static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select(`
          *,
          user_offers(skill_id, skill_name, proficiency),
          user_needs(skill_id, skill_name, must_have, priority),
          match_preferences(*)
        `)
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      if (!user) return null;
      
      return this.transformUserData(user);
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }
  
  /**
   * Transform database user data to UserProfile format
   */
  private static transformUserData(user: {
    id: string;
    name: string;
    bio: string;
    experience_level: string;
    timezone: string;
    availability_hours: number;
    work_style: string;
    comms_pref: string;
    values: string[];
    avatar_url?: string;
    user_offers: Array<{
      skill_id: number;
      skill_name: string;
      proficiency: number;
    }>;
    user_needs: Array<{
      skill_id: number;
      skill_name: string;
      must_have: boolean;
      priority: number;
    }>;
    match_preferences: {
      skill_weight: number;
      availability_weight: number;
      timezone_weight: number;
      collab_style_weight: number;
      personality_weight: number;
    };
  }): UserProfile {
    return {
      id: user.id,
      name: user.name,
      bio: user.bio,
      experience_level: user.experience_level,
      timezone: user.timezone,
      availability_hours: user.availability_hours,
      work_style: user.work_style,
      comms_pref: user.comms_pref,
      values: user.values || [],
      avatar_url: user.avatar_url,
      offers: user.user_offers || [],
      needs: user.user_needs || [],
      match_preferences: user.match_preferences || {
        skill_weight: 25,
        availability_weight: 20,
        timezone_weight: 20,
        collab_style_weight: 15,
        personality_weight: 20
      }
    };
  }
} 