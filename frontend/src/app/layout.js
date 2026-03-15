import './globals.css';

export const metadata = {
  title: 'Founder Intelligence',
  description: 'High-quality articles and insights for startup founders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
