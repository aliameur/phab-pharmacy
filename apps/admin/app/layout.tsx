import './global.css';

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
      <body>{children}</body>
    </html>
  );
}
