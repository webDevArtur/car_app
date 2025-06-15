import './globals.css';

export const metadata = {
  title: 'Продажа автомобилей',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.png"/>
      </head>

      <body>{children}</body>
    </html>
  );
}