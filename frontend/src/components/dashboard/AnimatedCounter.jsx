import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ end, duration = 2, separator = ',' }) {
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0
  });

  const displayValue = useTransform(springValue, (current) => {
    return Math.round(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  });

  useEffect(() => {
    springValue.set(end);
  }, [end, springValue]);

  return <motion.span>{displayValue}</motion.span>;
}
