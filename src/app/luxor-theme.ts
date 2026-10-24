import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/** PrimeNG theme built on the sampled logo blue (#202890 = primary.600). */
export const LuxorPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#edeef9', 100: '#d6d9f0', 200: '#adb3e0', 300: '#848dd0', 400: '#5a66be',
      500: '#3743a8', 600: '#202890', 700: '#1a2178', 800: '#151b60', 900: '#101549', 950: '#0a0e30',
    },
    borderRadius: { none: '0', xs: '2px', sm: '4px', md: '6px', lg: '8px', xl: '10px' },
    focusRing: { width: '2px', style: 'solid', color: '{primary.600}', offset: '2px' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff', 50: '#f7f8fa', 100: '#f1f3f7', 200: '#e4e7ec', 300: '#cfd4dc', 400: '#98a2b3',
          500: '#667085', 600: '#475467', 700: '#344054', 800: '#202633', 900: '#161b26', 950: '#0c111d',
        },
        primary: {
          color: '{primary.600}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}',
        },
        highlight: { background: '{primary.50}', focusBackground: '{primary.100}', color: '{primary.700}', focusColor: '{primary.800}' },
      },
    },
  },
});
