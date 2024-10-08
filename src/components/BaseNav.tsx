import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { supabase } from "../services/dbManagement";
import { useCurrentUser } from "../hooks/useCurrentUser";

type BaseNavProps = {
  children: ReactNode;
};
export function BaseNav({ children }: BaseNavProps) {
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            {children}
            <IconButton onClick={toggleDrawer(true)}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250 }}>
                <List>
                  {user && (
                    <>
                      <ListItem key="email">
                        <Typography>{user.email}</Typography>
                      </ListItem>
                      <ListItem key="signout">
                        <Button
                          startIcon={<LogoutIcon />}
                          onClick={() => supabase.auth.signOut()}
                        >
                          Sign Out
                        </Button>
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: 56 }} />
    </>
  );
}
