"use client";
import { useMediaQuery } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const matches = useMediaQuery("(min-width: 56.25em)");

  return (
    <section>
      <Notifications
        position={matches ? "top-right" : "bottom-right"}
        limit={5}
      />
      {children}
    </section>
  );
}
