import { siNodedotjs } from 'simple-icons';
import { BrandIcon } from './BrandIcon.tsx';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'brand' | 'mono';
}

export function NodeLogo(props: LogoProps) {
  return <BrandIcon icon={siNodedotjs} {...props} />;
}
