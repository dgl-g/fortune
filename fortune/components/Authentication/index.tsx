"use client";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Authentication.module.css";
import { useState } from "react";

let pageConfig = {
  header: "Company A",
};

export function Authentication() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: (typeof form)["values"]) => {
    setLoading(true);

    const payload = {
      username: values.username,
      password: values.password,
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    console.log(res);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {pageConfig.header}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Powered by Fortune
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="you@fortune.dev"
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          {loading ? (
            <Button loading type="submit" fullWidth mt="xl"></Button>
          ) : (
            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          )}
        </Paper>
      </form>
    </Container>
  );
}
