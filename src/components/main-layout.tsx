"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Palette, BookCopy, Calendar, Clapperboard } from 'lucide-react';
import { Button } from './ui/button';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Artistas', icon: Palette },
    { href: '/minutes', label: 'Atas de Reunião', icon: BookCopy },
    { href: '/events', label: 'Eventos', icon: Calendar },
  ];

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-primary-foreground hover:text-primary-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]:text-primary"
                asChild
              >
                <Link href="/">
                  <Clapperboard className="h-6 w-6" />
                </Link>
              </Button>
              <h1 className="font-headline text-2xl text-primary-foreground group-data-[collapsible=icon]:hidden">
                ArtFolio Frutal
              </h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: 'bg-primary text-primary-foreground',
                  }}
                >
                  <Link href={item.href}>
                    <item.icon className="text-primary" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6 md:hidden">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold text-primary">
            <Clapperboard className="h-6 w-6" />
            <span>ArtFolio Frutal</span>
          </Link>
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
