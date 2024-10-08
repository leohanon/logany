import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Form, Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";

import { LoggedOutNav } from "../components/LoggedOutNav";
import RequireAnon from "../components/RequireAnon";
import { supabase } from "../services/dbManagement";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Ensuring refs are current and values are accessed properly
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmRef.current
    ) {
      console.error("something is wrong with inputs");
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setErrorMessage("Passwords do not match!");
      return;
    } else {
      setErrorMessage("");
    }

    supabase.auth
      .signUp({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        options: {
          emailRedirectTo: window.location.href,
        },
      })
      .then((x) => {
        if (x.error) {
          setErrorMessage(x.error.message);
        } else {
          setConfirmEmail(true);
        }
      });
  };

  const content = confirmEmail ? (
    <Typography>
      Success! Please check your email and click the link to confirm your
      account!
    </Typography>
  ) : (
    <Form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h3">Sign up!</Typography>
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
          autoComplete="new-password"
          inputRef={passwordRef}
        />
        <TextField
          required
          id="password-confirm-input"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          inputRef={passwordConfirmRef}
        />
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button type="submit">Create Account</Button>
        <Typography textAlign={"center"}>
          Already have an account? <Link to={"/login"}>Login here!</Link>
        </Typography>
      </Stack>
    </Form>
  );

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
        {content}
      </Box>
    </RequireAnon>
  );
}
