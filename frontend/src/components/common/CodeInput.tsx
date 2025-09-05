import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onEnter?: () => void;
  length?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Enter code",
  onEnter,
  length = 8
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleInputChange = (index: number, char: string) => {
    if (disabled) return;

    const newValue = value.split('');
    newValue[index] = char.toUpperCase();
    const newCode = newValue.join('');
    
    onChange(newCode);

    // Auto-focus next input
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      
      const newValue = value.split('');
      newValue[index] = '';
      const newCode = newValue.join('');
      onChange(newCode);

      // Focus previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter' && onEnter) {
      onEnter();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase();
    const filteredData = pastedData.replace(/[^A-Z0-9]/g, '').slice(0, length);
    
    onChange(filteredData.padEnd(length, ''));

    // Focus the last filled input or the first empty one
    const focusIndex = Math.min(filteredData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-mono border-2 focus:border-accent focus:ring-accent/20 transition-all duration-200"
          placeholder=""
        />
      ))}
    </div>
  );
};

export default CodeInput; 