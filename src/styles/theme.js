import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Montserrat",
    body: "Lato",
    // heading: "CaviarDreams",
    // body: "CaviarDreams",
  },
  colors: {
    roxo: "#5B3CD8",
    roxog1: "#7055DD",
    roxog2: "#3D22AA",
    gradient: ["#7055DD", "#3D22AA"],
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          // textDecoration: "underline",
        },
      },
    },
  },
  styles: {
    global: {
      // svg: {
      //   display: "inline",
      //   lineHeight: "1",
      // },
      a: {
        _hover: {
          //textDecoration: "underline",
        },
      },
      body: {
        /* bg: "var(--white)",
        color: "var(--white)",
        lineHeight: "inherit", */
      },
      button: {
        _focus: { outlineColor: "#00000011" },
      },
    },
  },
});
