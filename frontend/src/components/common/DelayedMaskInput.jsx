import React, { useState, useEffect, useRef } from 'react';

export default function DelayedMaskInput({
  value,
  onChange,
  placeholder,
  disabled,
  maxLength,
  className,
  type = 'DEFAULT' // 'AADHAR', 'PAN', or 'DEFAULT'
}) {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const realValue = useRef('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (value !== realValue.current) {
      realValue.current = value || '';
      setDisplayValue(applyMask(realValue.current, !isFocused));
    }
  }, [value, isFocused]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const applyMask = (val, fullyMasked) => {
    if (!val) return '';
    let unformatted = val.replace(/[^A-Z0-9]/ig, '').toUpperCase();
    let masked = '';

    for (let i = 0; i < unformatted.length; i++) {
      if (i >= unformatted.length - 4) {
        masked += unformatted[i]; // Last 4 always visible
      } else if (!fullyMasked && i === unformatted.length - 1) {
        masked += unformatted[i]; // Last typed char visible briefly
      } else {
        masked += 'X';
      }
    }

    // Apply formatting
    if (type === 'AADHAR') {
      return masked.match(/.{1,4}/g)?.join('-') || masked;
    }
    return masked; // PAN or DEFAULT doesn't have hyphens
  };

  const handleChange = (e) => {
    let inputStr = e.target.value.toUpperCase();
    
    let unformattedInput = inputStr.replace(/[^A-Z0-9]/ig, '');
    let unformattedOld = displayValue.replace(/[^A-Z0-9]/ig, '');
    
    let newReal = realValue.current;
    
    // Simple logic: if length increased, append. If decreased, pop.
    if (unformattedInput.length > unformattedOld.length) {
      const addedChar = unformattedInput.slice(-1);
      newReal += addedChar;
    } else if (unformattedInput.length < unformattedOld.length) {
      // Calculate how many chars were deleted
      const diff = unformattedOld.length - unformattedInput.length;
      newReal = newReal.slice(0, -diff);
    }

    if (maxLength && newReal.length > maxLength) {
      newReal = newReal.slice(0, maxLength);
    }

    realValue.current = newReal;
    onChange(newReal); // Pass unmasked to parent
    setDisplayValue(applyMask(newReal, false));

    // Reset masking timer (2000 ms)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayValue(applyMask(realValue.current, true));
    }, 2000);
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
}
