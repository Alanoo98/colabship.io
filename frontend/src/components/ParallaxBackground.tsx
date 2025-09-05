import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxBackground = ({ children, speed = 0.5, className = '' }: ParallaxBackgroundProps) => {
  const scrollY = useScrollAnimation();
  
  return (
    <div 
      className={`parallax-bg ${className}`}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxBackground;