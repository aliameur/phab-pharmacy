import Providers from './Providers';
import './global.css';
import Layout from './layout/Layout';

export const metadata = {
  title: 'PhabPharmacy Admin',
  description:
    'Admin Dashboard for PhabPharmacy. Manage stock, orders, and view sales data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
