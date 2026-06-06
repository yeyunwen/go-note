import { siGo } from 'simple-icons';
import { BrandIcon } from './BrandIcon.tsx';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'brand' | 'mono';
}

export function GoLogo(props: LogoProps) {
  return <BrandIcon icon={siGo} {...props} />;
}
