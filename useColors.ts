import { useColorScheme } from 'react-native';
import colors from './colors';

interface PaletteShape {
  text: string;
  tint: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
}

/**
 * Returns the design tokens for the current color scheme.
 *
 * The returned object contains all color tokens for the active palette
 * plus scheme-independent values like `radius`.
 */
export function useColors() {
  const scheme = useColorScheme();
  const palette =
    scheme === 'dark' && 'dark' in colors
      ? (colors as { dark: PaletteShape }).dark
      : (colors as { light: PaletteShape }).light;

  return { ...palette, radius: (colors as { radius: number }).radius };
}
