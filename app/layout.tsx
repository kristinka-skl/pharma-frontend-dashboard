import 'modern-normalize/modern-normalize.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import TanStackProvider from './Components/TanStackProvider/TanStackProvider';
import Container from './Components/Container/Container';

import MuiThemeProvider from './Components/MuiThemeProvider/ThemeProvider';


const interSans = Inter({
  variable: '--font-inter-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'E-Pharmacy Dashboard',
  description:
    'Comprehensive dashboard application for managing pharmacy operations, suppliers, customers, and orders.',
  openGraph: {
    title: 'E-Pharmacy Dashboard',
    description:
      'Streamline your pharmacy management. Track income, expenses, recent customers, and manage orders efficiently.',
    url: 'https://pharma-frontend-dashboard.vercel.app', 
    siteName: 'E-Pharmacy',
    images: [
      {
        url: '/images/E_PharmacyOG.webp', 
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy dashboard overview showing financial metrics and recent orders',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interSans.variable}`}>
      <body>
        <TanStackProvider>
          
          <MuiThemeProvider>
            <Container>
              {children}
            </Container>
          </MuiThemeProvider>
          
        </TanStackProvider>
      </body>
    </html>
  );
}
