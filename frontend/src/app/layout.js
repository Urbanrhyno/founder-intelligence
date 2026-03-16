import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Founder Intelligence',
  description: 'High-quality articles and insights for startup founders.',
  icons: {
    icon: '/gorkha-favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakarta.variable} font-sans bg-obsidian text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
