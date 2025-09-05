import React, { useState, useEffect } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  characters?: string;
  onComplete?: () => void;
}

const HackerText: React.FC<HackerTextProps> = ({
  text,
  className = "",
  delay = 0,
  speed = 100,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isAnimating || currentIndex >= text.length) {
      if (onComplete && currentIndex >= text.length) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setDisplayText(prev => {
        const targetChar = text[currentIndex];
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        
        // Show random character briefly, then settle on target character
        if (prev.length === currentIndex) {
          return prev + randomChar;
        } else {
          return prev.slice(0, currentIndex) + targetChar;
        }
      });

      // Move to next character after settling
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, speed / 2);
    }, speed);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, text, characters, speed, onComplete]);

  return (
    <span className={`${className} font-mono`}>
      {displayText}
      {isAnimating && currentIndex < text.length && (
        <span className="text-accent animate-pulse">|</span>
      )}
    </span>
  );
};

export default HackerText; 