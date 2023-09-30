"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export function RouterTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nprogress.complete();
    return () => {
      nprogress.start();
    };
  }, [pathname, searchParams]);

  return <NavigationProgress size={5} />;
}
