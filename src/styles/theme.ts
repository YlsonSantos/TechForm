import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  primary: {
    500: "hsl(221, 83%, 53%)", // Cor primária
  },
  secondary: {
    500: "hsl(262, 52%, 47%)", // Cor secundária
  },
  accent: {
    500: "hsl(25, 95%, 53%)", // Cor de destaque (laranja)
  },
  background: {
    light: "hsl(220, 20%, 98%)",
    dark: "hsl(222, 47%, 11%)",
  },
  foreground: {
    light: "hsl(222, 47%, 11%)",
    dark: "hsl(210, 40%, 98%)",
  },
  muted: {
    light: "hsl(220, 14%, 96%)",
    dark: "hsl(217, 33%, 17%)",
  },
  "muted-foreground": {
    light: "hsl(220, 9%, 46%)",
    dark: "hsl(215, 20%, 65%)",
  },
  border: {
    light: "hsl(220, 13%, 91%)",
    dark: "hsl(217, 33%, 17%)",
  },
};

const customTheme = extendTheme({
  config,
  colors,
  styles: {
    global: (props) => ({
      "html, body": {
        bg: mode(colors.background.light, colors.background.dark)(props),
        color: mode(colors.foreground.light, colors.foreground.dark)(props),
      },
    }),
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    "dark-sm": "0 1px 2px 0 rgb(0 0 0 / 0.3)",
    "dark-md": "0 4px 6px -1px rgb(0 0 0 / 0.4)",
    "dark-lg": "0 10px 15px -3px rgb(0 0 0 / 0.5)",
  },
});

export default customTheme;