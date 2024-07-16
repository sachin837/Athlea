import 'styled-components-react-native';

interface GradientColors {
  colors: string[];
  start: {x: number; y: number};
  end: {x: number; y: number};
}

export type TextFontScale = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
};

declare module 'styled-components/native' {
  export interface DefaultTheme {
    primary: string;
    primaryscale: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
    };
    secondary: string;
    third: string;
    background: string;
    panelbackground: string;
    black: string;
    gradients: {
      strength: GradientColors;
      endurance: GradientColors;
      wellbeing: GradientColors;
      recovery: GradientColors;
      nutrition: GradientColors;
    };
    font: {
      size: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
      };
      weight: {
        thin: number;
        regular: number;
        medium: number;
        bold: number;
        extraBold: number;
      };
      family: string[];
    };
    borderRadius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
