// API configuration and utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signUp(email: string, password: string, name?: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async signIn(email: string, password: string) {
    const response = await this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async verifyToken() {
    return this.request('/auth/verify');
  }

  async signOut() {
    this.clearToken();
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(updates: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getUserSkills() {
    return this.request('/users/skills/offers');
  }

  async addSkillOffer(skillId: number, proficiency: number) {
    return this.request('/users/skills/offers', {
      method: 'POST',
      body: JSON.stringify({ skillId, proficiency }),
    });
  }

  async removeSkillOffer(skillId: number) {
    return this.request(`/users/skills/offers/${skillId}`, {
      method: 'DELETE',
    });
  }

  async getUserNeeds() {
    return this.request('/users/skills/needs');
  }

  async addSkillNeed(skillId: number, mustHave?: boolean, priority?: number) {
    return this.request('/users/skills/needs', {
      method: 'POST',
      body: JSON.stringify({ skillId, mustHave, priority }),
    });
  }

  async removeSkillNeed(skillId: number) {
    return this.request(`/users/skills/needs/${skillId}`, {
      method: 'DELETE',
    });
  }

  async markOnboarded() {
    return this.request('/users/onboard', {
      method: 'POST',
    });
  }

  // Match endpoints
  async getPotentialMatches(page = 1, limit = 10) {
    return this.request(`/matches/potential?page=${page}&limit=${limit}`);
  }

  async getMatches() {
    return this.request('/matches');
  }

  async likeUser(userId: string) {
    return this.request(`/matches/${userId}/like`, {
      method: 'POST',
    });
  }

  async skipUser(userId: string) {
    return this.request(`/matches/${userId}/skip`, {
      method: 'POST',
    });
  }

  async getMatchDetails(matchId: string) {
    return this.request(`/matches/${matchId}`);
  }

  // Skills endpoints
  async getSkills(category?: string, search?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    return this.request(`/skills${queryString ? `?${queryString}` : ''}`);
  }

  async getSkillCategories() {
    return this.request('/skills/categories');
  }

  async getSkill(skillId: number) {
    return this.request(`/skills/${skillId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
