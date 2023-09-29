import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

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
            primaryColor: "bright-pink",
            colors: {
              "bright-pink": [
                "#fff4e2",
                "#ffe9cc",
                "#ffd09c",
                "#fdb766",
                "#fca13a",
                "#fb931d",
                "#fc8c0c",
                "#e17900",
                "#c86a00",
                "#ae5a00",
              ],
            },
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
