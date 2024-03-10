import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useContext, useState } from "react";
import { ImUsers } from "react-icons/im";
import { HiShoppingCart } from "react-icons/hi";
import Users from "./Users";
import Products from "./Products";
import "./css/adminmain.css";
import Avatar from "@mui/material/Avatar";
import { newContext } from "../../App";
import { GiDogBowl } from "react-icons/gi";
import AdminDashBord from "./AdminDashBord";
import { LuLayoutDashboard } from "react-icons/lu";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminMain() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [renderComponent, setRenderComponent] = useState(3);
  const { usermail, setShow } = useContext(newContext);
const [Ctg, setCtg] = useState("Dog");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Typography variant="h6" noWrap component="div">
              <Avatar
                style={{ backgroundColor: "lightgray" }}
                alt="Remy Sharp"
                src={usermail?.profile_Photo}
                onClick={() => setShow(true)}
              />
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setRenderComponent(3)}>
              <ListItemIcon>
                <LuLayoutDashboard size={25} style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"DashBord"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setRenderComponent(1)}>
              <ListItemIcon>
                <ImUsers size={25} style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() =>{ setRenderComponent(2);setCtg("Dog")}}>
              <ListItemIcon>
                <HiShoppingCart size={25} style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {setRenderComponent(2);setCtg("Accessories")}}>
              <ListItemIcon>
                <GiDogBowl size={25} style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Accessories"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open} style={{ padding: 0, marginBottom: 0 }}>
        <Typography paragraph style={{ marginTop: 0, marginBottom: 0 }}>
          {renderComponent == 1 && <Users />}
          {renderComponent == 2 && <Products Ctg={Ctg} setCtg={setCtg}/>}
          {renderComponent == 3 && <AdminDashBord />}
        </Typography>
      </Main>
    </Box>
  );
}
