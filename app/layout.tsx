import 'modern-normalize/modern-normalize.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import TanStackProvider from './Components/TanStackProvider/TanStackProvider';
import Container from './Components/Container/Container';

import MuiThemeProvider from './Components/MuiThemeProvider/ThemeProvider';
import AuthProvider from './Components/AuthProvider/AuthProvider';

const interSans = Inter({
  variable: '--font-inter-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// export const metadata: Metadata = {
//   title: 'Read Journey',
//   description:
//     'Application to create personal books collection and track reading progress',
//   openGraph: {
//     title: 'Read Journey',
//     description:
//       'Create your personal book collection and track reading progress with ease',
//     url: 'https://read-journey-app-gilt.vercel.app/',
//     siteName: 'Read Journey',
//     images: [
//       {
//         url: '/images/ReadJourneyOG.webp',
//         width: 1200,
//         height: 630,
//         alt: 'Read Journey app dashboard showing reading progress',
//       },
//     ],
//     type: 'article',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interSans.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>
          <MuiThemeProvider>
            <Container>
              {children}
              {/* <ToasterProvider /> */}
            </Container>
          </MuiThemeProvider>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
