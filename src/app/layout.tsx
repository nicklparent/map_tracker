import { Macondo } from 'next/font/google';

export const metadata = {
  title: 'DND app',
  description: 'use tracker and map at same time',
}
const macondo = Macondo({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({ children,}: {
  children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={macondo.className}>
        {children}
      </body>
    </html>
  )
}
