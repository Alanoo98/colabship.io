import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onEnter?: () => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Enter 8-digit code",
  onEnter
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 8);
  }, []);

  const handleInputChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const newValue = value.split('');
    newValue[index] = inputValue.toUpperCase();
    const newCode = newValue.join('').slice(0, 8);
    onChange(newCode);

    // Auto-advance to next input
    if (inputValue && index < 7) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      if (value[index]) {
        // Clear current character
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        // Move to previous input and clear it
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < 7) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    } else if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase();
    const code = pastedData.replace(/[^A-Z0-9]/g, '').slice(0, 8);
    onChange(code);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(code.length, 7);
    inputRefs.current[nextIndex]?.focus();
    setFocusedIndex(nextIndex);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="relative">
            <Input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={value[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              onPaste={handlePaste}
              disabled={disabled}
              className={`
                w-12 h-12 text-center text-lg font-mono font-bold
                border-2 rounded-lg transition-all duration-200
                ${disabled 
                  ? 'bg-muted/50 border-muted text-muted-foreground cursor-not-allowed' 
                  : focusedIndex === index
                    ? 'border-accent bg-accent/10 text-accent shadow-lg shadow-accent/20'
                    : value[index]
                      ? 'border-green-500/50 bg-green-500/10 text-green-500'
                      : 'border-border bg-background text-foreground hover:border-accent/50'
                }
                focus:outline-none focus:ring-2 focus:ring-accent/20
              `}
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            />
            {focusedIndex === index && !disabled && (
              <div className="absolute inset-0 border-2 border-accent rounded-lg animate-pulse pointer-events-none" />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">{placeholder}</p>
    </div>
  );
};

export default CodeInput; 