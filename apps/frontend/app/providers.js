"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useFavoritesStore } from "@komatik/favorites-store";

export default function Providers({ children }) {
  const [client] = useState(() => new QueryClient());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    useFavoritesStore.getState().hydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
