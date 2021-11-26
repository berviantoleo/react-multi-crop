import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Default from "./components/Default";
import Readonly from "./components/Readonly";
import ActionButton from "./components/ActionButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  })
);

export default function App(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  let componentReact: JSX.Element;
  if (value === 0) {
    componentReact = <Default />;
  } else if (value === 1) {
    componentReact = <Readonly />;
  } else {
    componentReact = <ActionButton />;
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
            component="button"
            color="inherit"
          >
            Github
          </Link>
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Default" {...a11yProps(0)} />
          <Tab label="Readonly" {...a11yProps(1)} />
          <Tab label="With Action Button" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {componentReact}
    </div>
  );
}
