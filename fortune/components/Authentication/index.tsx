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
  Notification,
  Group,
  Button,
  rem,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Authentication.module.css";
import { useState } from "react";
import { _qfetch } from "fortune/_qlib/qfetch";
import { nprogress } from "@mantine/nprogress";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

let pageConfig = {
  header: "Company A",
};

export function Authentication() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { push } = useRouter();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: (typeof form)["values"]) => {
    setLoading(true);
    nprogress.start();
    const payload = {
      username: values.username,
      password: values.password,
    };
    const id = notifications.show({
      loading: true,
      withBorder: true,
      title: "Logging In",
      message: `Searching for ${payload.username} 🔍`,
      autoClose: false,
      withCloseButton: false,
    });
    try {
      const res = await _qfetch("/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      notifications.update({
        id,
        color: "teal",
        title: "Login Success!",
        withBorder: true,
        message: "Welcome to Fortune! 👋",
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 1000,
      });

      setTimeout(() => {
        push("/dashboard");
      }, 500);
    } catch (error: any) {
      setErrorMsg(error.message);
      notifications.update({
        id,
        color: "red",
        title: error.message,
        message: "Something's not right, please try again 🧐",
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 5500,
      });
    }
    setLoading(false);
    nprogress.complete();
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
