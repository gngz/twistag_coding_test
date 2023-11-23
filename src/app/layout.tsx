import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/global.scss';

const font = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Twistag - Compare Commit\'s Activity',
  description: 'Compare commits activity effortlessly between repositories with our app',
  keywords: ['twistag', 'compare', 'commits', 'activity', 'github'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
