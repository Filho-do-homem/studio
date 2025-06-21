import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/main-layout';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ArtFolio Frutal',
  description: 'Academia Frutalense de Artes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
