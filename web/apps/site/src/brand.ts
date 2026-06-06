import { siGo, siNodedotjs } from 'simple-icons';

/** 品牌色取自 simple-icons 收录的官方 hex */
export const brand = {
  go: {
    primary: `#${siGo.hex}`,
    dark: '#007D9C',
    glow: 'rgba(0, 173, 216, 0.18)',
    source: 'https://go.dev/blog/go-brand',
  },
  node: {
    primary: `#${siNodedotjs.hex}`,
    dark: '#3d7c3d',
    glow: 'rgba(95, 160, 78, 0.18)',
    source: 'https://nodejs.org/en/about/branding',
  },
} as const;
