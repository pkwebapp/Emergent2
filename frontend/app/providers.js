'use client';

// Client-only context wrapper. QueryClient is created once at module load.
//
// NOTE: next-auth's <SessionProvider> was removed. This app uses a custom
// cookie-based session (see /api/auth/me & /api/auth/google-session), not
// next-auth, so mounting SessionProvider only caused a repeating
// CLIENT_FETCH_ERROR (it polled the non-existent /api/auth/session on every
// page). No mounted component uses useSession(), so removing it is safe.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
