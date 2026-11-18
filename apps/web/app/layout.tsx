import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import './globals.css';

export const metadata: Metadata = {
  title: 'Andrea Ciardi · Senior Frontend Developer',
  description:
    'Senior Frontend Developer since 2008. Scroll through 18 years of frontend development, from table layouts to the modern web platform.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
