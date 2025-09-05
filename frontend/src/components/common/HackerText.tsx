import React, { useState, useEffect } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  characters?: string;
}

const HackerText: React.FC<HackerTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 2000,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      let currentIndex = 0;
      const finalText = text;
      
      const interval = setInterval(() => {
        if (currentIndex < finalText.length) {
          // Generate random characters for the current position
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          const currentText = finalText.substring(0, currentIndex) + randomChar;
          setDisplayText(currentText);
          
          // After a few iterations, set the correct character
          setTimeout(() => {
            const correctText = finalText.substring(0, currentIndex + 1);
            setDisplayText(correctText);
            currentIndex++;
          }, 100);
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 50);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, characters]);

  return (
    <span className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}>
      {displayText}
      {isAnimating && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default HackerText; 