import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  IconButton,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Default from "./components/Default";
import Readonly from "./components/Readonly";
import { ColorModeContext } from "./context/ColorModeContext";

function a11yProps(index: any): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function MainPage(): React.JSX.Element {
  const theme = useTheme();
  const classes = useStyles();
  const colorMode = React.useContext(ColorModeContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let componentReact: React.JSX.Element;
  if (value === 0) {
    componentReact = <Default />;
  } else {
    componentReact = <Readonly />;
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Multi Crop
          </Typography>
          <Link
            href="https://github.com/berviantoleo/react-multi-crop"
            color="inherit"
          >
            Github
          </Link>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
        <Tabs
          aria-label="simple tabs example"
          onChange={handleChange}
          value={value}
        >
          <Tab label="Default" {...a11yProps(0)} />
          <Tab label="Readonly" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {componentReact}
    </div>
  );
}
