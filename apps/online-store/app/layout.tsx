import { Inter, Merriweather } from 'next/font/google';
import { ReactNode } from 'react';

import { Provider } from '../lib/provider';
import './global.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

export const metadata = {
  title: {
    template: '%s | Phab Pharmacy',
    default: 'Phab Pharmacy',
  },
  description: 'Find all your healthcare needs with ease.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} bg-pampas-100 font-inter`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
