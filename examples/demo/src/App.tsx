import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import Default from "./components/Default";
import Readonly from "./components/Readonly";

function a11yProps(index: any) {
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

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
        </Tabs>
      </AppBar>
      {value === 0 ? <Default></Default> : <Readonly></Readonly>}
    </div>
  );
}
