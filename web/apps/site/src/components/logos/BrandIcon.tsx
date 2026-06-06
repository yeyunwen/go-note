import type { SimpleIcon } from 'simple-icons';

interface BrandIconProps {
  icon: SimpleIcon;
  size?: number;
  className?: string;
  /** brand = 官方色；mono = currentColor，用于有色按钮 */
  variant?: 'brand' | 'mono';
}

/**
 * 渲染 simple-icons 官方品牌 SVG
 * @see https://simpleicons.org — Go / Node.js 等图标（CC0）
 * @see https://go.dev/blog/go-brand — Go 品牌指南
 * @see https://nodejs.org/en/about/branding — Node.js 品牌资源
 */
export function BrandIcon({
  icon,
  size = 24,
  className = '',
  variant = 'brand',
}: BrandIconProps) {
  const fill = variant === 'brand' ? `#${icon.hex}` : 'currentColor';

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill={fill} />
    </svg>
  );
}
