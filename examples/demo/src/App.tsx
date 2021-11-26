import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainPage from "./MainPage";
import { ColorModeContext } from "./context/ColorModeContext";
import { PaletteMode } from "@mui/material";

export default function App(): JSX.Element {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
