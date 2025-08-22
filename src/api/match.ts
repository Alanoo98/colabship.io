import { NextApiRequest, NextApiResponse } from 'next';
import { MatchingAlgorithm, MatchResult } from '@/lib/matching-algorithm';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id, limit = 20, filters } = req.query;
    
    if (!user_id || typeof user_id !== 'string') {
      return res.status(400).json({ error: 'user_id is required' });
    }

    // Verify user exists and is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user || user.id !== user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get matches
    const matches = await MatchingAlgorithm.getMatches(user_id, Number(limit));
    
    // Apply filters if provided
    let filteredMatches = matches;
    if (filters) {
      const filterParams = JSON.parse(filters as string);
      filteredMatches = applyFilters(matches, filterParams);
    }

    return res.status(200).json({
      matches: filteredMatches,
      total: filteredMatches.length,
      user_id
    });

  } catch (error) {
    console.error('Match API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Apply filters to matches
 */
function applyFilters(matches: MatchResult[], filters: {
  minScore?: number;
  mustHaveOnly?: boolean;
  skillCategory?: string;
  timezone?: string;
  minAvailability?: number;
}): MatchResult[] {
  let filtered = matches;

  // Filter by minimum score
  if (filters.minScore) {
    filtered = filtered.filter(match => match.score >= filters.minScore);
  }

  // Filter by must-have matches only
  if (filters.mustHaveOnly) {
    filtered = filtered.filter(match => match.complementarity.must_have_matches.length > 0);
  }

  // Filter by skill category
  if (filters.skillCategory) {
    filtered = filtered.filter(match => {
      const userSkills = match.user.offers.map(offer => offer.skill_name.toLowerCase());
      return userSkills.some(skill => skill.includes(filters.skillCategory.toLowerCase()));
    });
  }

  // Filter by timezone
  if (filters.timezone) {
    filtered = filtered.filter(match => {
      const timezoneOverlap = MatchingAlgorithm['calculateTimezoneOverlap'](
        filters.timezone,
        match.user.timezone
      );
      return timezoneOverlap >= 4; // At least 4 hours overlap
    });
  }

  // Filter by availability
  if (filters.minAvailability) {
    filtered = filtered.filter(match => 
      match.user.availability_hours >= filters.minAvailability
    );
  }

  return filtered;
}

/**
 * Get match statistics for a user
 */
export async function getMatchStats(userId: string) {
  try {
    const matches = await MatchingAlgorithm.getMatches(userId, 100);
    
    const stats = {
      totalMatches: matches.length,
      averageScore: matches.length > 0 
        ? Math.round(matches.reduce((sum, m) => sum + m.score, 0) / matches.length * 100) / 100 
        : 0,
      scoreDistribution: {
        excellent: matches.filter(m => m.score >= 80).length,
        good: matches.filter(m => m.score >= 60 && m.score < 80).length,
        fair: matches.filter(m => m.score >= 40 && m.score < 60).length,
        poor: matches.filter(m => m.score < 40).length
      },
      topSkills: getTopSkills(matches),
      timezoneDistribution: getTimezoneDistribution(matches)
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting match stats:', error);
    throw error;
  }
}

/**
 * Get top skills from matches
 */
function getTopSkills(matches: MatchResult[]) {
  const skillCounts: { [key: string]: number } = {};
  
  matches.forEach(match => {
    match.user.offers.forEach(offer => {
      skillCounts[offer.skill_name] = (skillCounts[offer.skill_name] || 0) + 1;
    });
  });
  
  return Object.entries(skillCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));
}

/**
 * Get timezone distribution from matches
 */
function getTimezoneDistribution(matches: MatchResult[]) {
  const timezoneCounts: { [key: string]: number } = {};
  
  matches.forEach(match => {
    timezoneCounts[match.user.timezone] = (timezoneCounts[match.user.timezone] || 0) + 1;
  });
  
  return Object.entries(timezoneCounts)
    .sort(([,a], [,b]) => b - a)
    .map(([timezone, count]) => ({ timezone, count }));
} 