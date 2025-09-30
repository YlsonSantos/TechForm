// styles/theme.ts
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  // Cores do projeto original adaptadas para o Chakra UI
  primary: {
    500: "#3B82F6", // azul profissional
  },
  secondary: {
    500: "#8B5CF6", // roxo inovador
  },
  accent: {
    500: "#FB923C", // laranja vibrante
  },
  background: {
    light: "#F8F9FA",
    dark: "#1A202C",
  },
  foreground: {
    light: "#212529",
    dark: "#EDF2F7",
  },
  card: {
    light: "#FFFFFF",
    dark: "#2D3748",
  },
  muted: {
    light: "#E9ECEF",
    dark: "#4A5568",
  },
  border: {
    light: "#DEE2E6",
    dark: "#4A5568",
  },
};

const customTheme = extendTheme({
  config,
  colors,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(colors.background.light, colors.background.dark)(props),
        color: mode(colors.foreground.light, colors.foreground.dark)(props),
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "primary",
      },
      variants: {
        outline: {
          border: "1px solid",
          borderColor: "border.light",
          _dark: {
            borderColor: "border.dark",
          },
        },
      },
    },
    Badge: {
      variants: {
        outline: {
          border: "1px solid",
          borderColor: "border.light",
          _dark: {
            borderColor: "border.dark",
          },
        },
      },
    },
  },
});

export { customTheme as theme };