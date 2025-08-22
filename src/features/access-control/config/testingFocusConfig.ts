import { 
  Bug, 
  Palette, 
  Navigation, 
  Layers, 
  Zap, 
  Eye, 
  Smartphone, 
  MessageSquare 
} from "lucide-react";
import { TestingFocusOption } from "../types/accessControl";

export const testingFocusOptions: TestingFocusOption[] = [
  {
    id: 'bug_finding',
    title: 'Bug Finding',
    description: 'Help identify technical issues, errors, and unexpected behaviors',
    icon: Bug,
    color: 'text-red-500'
  },
  {
    id: 'design_ui',
    title: 'Design & UI',
    description: 'Focus on visual design, user interface, and aesthetic improvements',
    icon: Palette,
    color: 'text-purple-500'
  },
  {
    id: 'navigation_flow',
    title: 'Navigation & Flow',
    description: 'Test user journeys, navigation logic, and overall user flow',
    icon: Navigation,
    color: 'text-blue-500'
  },
  {
    id: 'information_architecture',
    title: 'Information Architecture',
    description: 'Evaluate content organization, information hierarchy, and clarity',
    icon: Layers,
    color: 'text-green-500'
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Monitor loading times, responsiveness, and technical performance',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description: 'Ensure the platform is usable by people with diverse abilities',
    icon: Eye,
    color: 'text-indigo-500'
  },
  {
    id: 'mobile_experience',
    title: 'Mobile Experience',
    description: 'Test mobile responsiveness and touch interactions',
    icon: Smartphone,
    color: 'text-pink-500'
  },
  {
    id: 'general_feedback',
    title: 'General Feedback',
    description: 'Provide overall impressions and general usability feedback',
    icon: MessageSquare,
    color: 'text-gray-500'
  }
]; 