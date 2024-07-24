import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Form, Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";

import { LoggedOutNav } from "../components/LoggedOutNav";
import RequireAnon from "../components/RequireAnon";
import { supabase } from "../services/dbManagement";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }
    supabase.auth
      .signInWithPassword({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((x) => {
        if (x.error) {
          setErrorMessage(x.error.message);
        }
      });
  };

  return (
    <RequireAnon>
      <LoggedOutNav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant={"h3"}>Log in!</Typography>
            <TextField
              required
              id="email"
              label="E-mail"
              autoComplete="email"
              inputRef={emailRef}
            />
            <TextField
              required
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
            <Button type="submit">Log in</Button>
            <Typography textAlign={"center"}>
              No account? <Link to={"/signup"}>Create an account here!</Link>
            </Typography>
          </Stack>
        </Form>
      </Box>
    </RequireAnon>
  );
}
