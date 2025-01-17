import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { App } from './app';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kong System',
  description: 'Sistema da Kong Games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <App>{children}</App>
      </body>
    </html>
  );
}
