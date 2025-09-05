import { useInView, useCountUp } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = '', className = '' }: AnimatedCounterProps) => {
  const [ref, isInView] = useInView(0.3);
  const [count, animate] = useCountUp(end, duration);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <div ref={ref} className={`animate-count-up ${className}`}>
      {count}{suffix}
    </div>
  );
};

export default AnimatedCounter;