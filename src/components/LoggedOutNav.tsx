import { BaseNav } from "./BaseNav";
import { ReactNode } from "react";
import { Typography } from "@mui/material";

type LoggedOutNavProps = {
  children?: ReactNode;
};
export function LoggedOutNav({ children }: LoggedOutNavProps) {
  return (
    <BaseNav>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Logg
      </Typography>
      {children}
    </BaseNav>
  );
}
