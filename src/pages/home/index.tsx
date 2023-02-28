import { NoSsr } from "@mui/core";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AutoComplete from "@mui/material/Autocomplete";
import axios from "axios";
import * as React from "react";
import DisplayNormalForms from "./displayNormalForms";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
type FunctiotnalDependency = { left: string[]; right: string[] };
type KindsOfNormalForm = {
  "2NF": [boolean, number[]];
  "3NF": [boolean, number[]];
  "BCNF": [boolean, number[]];
};
type CompleteDataAboutNormalizedForm = {
  attributes: string[];
  candidateKeys: string[][];
  fds: FunctiotnalDependency[];
  nonPrimeAttributes: string[];
  primeAttributes: string[];
};
type responseObject = {
  minimal_cover?: FunctiotnalDependency[];
  candidate_keys?: string[][];
  normal_form?: KindsOfNormalForm;
  NFForm_2?: CompleteDataAboutNormalizedForm[];
  NFForm_3?: CompleteDataAboutNormalizedForm[];
  BCNF_Form?: CompleteDataAboutNormalizedForm[];
  LossLessJoinMatrix: Array<Array<number>>;
};
export default function ResponsiveDrawer(props: Props) {
  const [responseFromServer, setResponseFromServer] =
    React.useState<responseObject>();
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          "Find Minimal Cover",
          "Find Candidate Keys",
          "Check Normal Form",
          "Normalize to 2NF",
          "Normalize to 3NF",
          "Normalize to BCNF",
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                GetDataForGivenForm(text);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} key={index} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [dependency, setDependency] = React.useState<string[]>([]);
  const [dependencyValue, setDependencyValue] = React.useState<string>("");
  const [functionalDependencyArray, setFunctionalDependencyArray] =
    React.useState<FunctiotnalDependency[]>([]);
  const [trigger, setTrigger] = React.useState<boolean>(false);
  function removeNonAlphabeticCharacters(str: string): string {
    return str.replace(/[^a-zA-Z]/g, "");
  }
  function handleAddFunctionalDependency() {
    let prevFunctionalDependency = functionalDependencyArray;
    prevFunctionalDependency.push({
      left: ["1"],
      right: ["2"],
    });
    setFunctionalDependencyArray(prevFunctionalDependency);
    setTrigger(!trigger);
  }
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDependencyValue(event.target.value);
  };
  const onButtonPress = (dependencyState: string) => {
    let prevState = dependency;
    dependencyState = removeNonAlphabeticCharacters(dependencyState);
    if (dependencyState.length === 0) return;
    prevState.push(dependencyState);
    prevState = Array.from(new Set(prevState));
    setDependency(prevState);
    setDependencyValue("");
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let prevState = dependency;
      let dependencyValue1 = removeNonAlphabeticCharacters(dependencyValue);
      if (dependencyValue1.length === 0) return;
      prevState.push(dependencyValue1);
      prevState = Array.from(new Set(prevState));
      setDependency(prevState);
      setDependencyValue("");
    }
  };
  React.useEffect(() => {
  }, [functionalDependencyArray]);
  function finalHandleSubmit(): void {
    let functoinalDependencyArray2 = functionalDependencyArray;
    for (let i = 0; i < functoinalDependencyArray2.length; i++) {
      for (
        let index = 0;
        index < functoinalDependencyArray2[i].right.length;
        index++
      ) {
        if (
          functoinalDependencyArray2[i].left.indexOf(
            functoinalDependencyArray2[i].right[index]
          ) !== -1
        ) {
          functoinalDependencyArray2[i].right.splice(index, 1);
        }
      }
    }
    setFunctionalDependencyArray(functoinalDependencyArray2);
  }
  const [kindOfQuery, setKindOfQuery] = React.useState<string>("");
  function GetDataForGivenForm(query: string) {
    setKindOfQuery(query);
    axios
      .post("http://52.149.136.51:8000/api/v1/", {
        data: {
          query: query,
          attributes: dependency,
          left: functionalDependencyArray.map((item) => item.left),
          right: functionalDependencyArray.map((item) => item.right),
        },
      })
      .then((res) => {
        setResponseFromServer(res.data.data.queryResult);
      })
      .catch((err) => {
      });
  }
  React.useEffect(() => {
    console.log("Yaha kuch nhi milega bc")
  }, [responseFromServer]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Normalization Tools
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          <NoSsr>
            <>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-basic"
                    label="Enter the attribute"
                    variant="outlined"
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    fullWidth={true}
                    value={dependencyValue}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      onButtonPress(dependencyValue);
                    }}
                  >
                    Click to submit attribute
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    paragraph
                    style={{ fontSize: "20px", marginTop: "10px" }}
                  >
                    Press Enter After Typing Your Depenedency one at a time Any
                    special characters will be ignored
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: "20px" }}
              >
                <Grid item xs={12} sm={12}>
                  <Typography variant="h3">Attribute Set Entered :</Typography>
                </Grid>
                {dependency.map((item, index) => (
                  <Grid item key={item}>
                    <Typography
                      variant="h5"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {/* {item} */}
                      <Chip
                        label={item}
                        variant="outlined"
                        onDelete={() => {
                          const prevArray = [...dependency];
                          prevArray.splice(index, 1);
                          setDependency(prevArray);
                        }}
                      />
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: "20px" }}
              >
                <Grid item xs={12} sm={12}>
                  <Typography variant="h3">
                    Enter Functional Dependency:
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    style={{ marginTop: "20px" }}
                  >
                    <Grid item xs={12}>
                      <Fab
                        color="primary"
                        aria-label="add"
                        onClick={handleAddFunctionalDependency}
                      >
                        <>
                          <AddIcon />
                        </>
                      </Fab>
                    </Grid>
                    {functionalDependencyArray.map((item, index) => (
                      <>
                        <Grid item xs={12} sm={4} key={index}>
                          <AutoComplete
                            multiple
                            id="tags-standard"
                            options={dependency}
                            defaultValue={[]}
                            onChange={(event, newValue) => {
                              let prevDependencyState =
                                functionalDependencyArray;
                              prevDependencyState[index]["left"] = newValue;
                              setFunctionalDependencyArray(prevDependencyState);
                            }}
                            // // value={item["left"]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                label="Multiple values"
                                placeholder="Enter Functional Dependency"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Divider orientation="vertical" flexItem>
                            <Tooltip title="Value on right is dependent on left">
                              <ArrowForwardIcon />
                            </Tooltip>
                          </Divider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <AutoComplete
                            multiple
                            id="tags-standard"
                            options={dependency}
                            defaultValue={[]}
                            onChange={(event, newValue) => {
                              let prevDependencyState =
                                functionalDependencyArray;
                              prevDependencyState[index]["right"] = newValue;
                              setFunctionalDependencyArray(prevDependencyState);
                            }}
                            // // value={item["left"]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                label="Multiple values"
                                placeholder="Enter Functional Dependency"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setTrigger(!trigger);
                                                          }}
                          >
                            Click to submit Current Functional Dependency
                          </Button>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: "20px" }}
              >
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      finalHandleSubmit();
                    }}
                  >
                    Submit data
                  </Button>
                </Grid>
              </Grid>
              <DisplayNormalForms
                normalFormData={responseFromServer}
                query={kindOfQuery}
              />
            </>
          </NoSsr>
        </Typography>
      </Box>
    </Box>
  );
}
