import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { RouterTransition } from "fortune/components/RouterTransition";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";

export const metadata = {
  title: "Fortune",
  description: "Fortune ERP",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />

        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider
          theme={{
            primaryColor: "pale-blue",
            colors: {
              "pale-blue": [
                "#eef3ff",
                "#dce4f5",
                "#b9c7e2",
                "#94a8d0",
                "#748dc1",
                "#5f7cb8",
                "#5474b4",
                "#44639f",
                "#39588f",
                "#2d4b81",
              ],
            },
          }}
        >
          <RouterTransition />

          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
