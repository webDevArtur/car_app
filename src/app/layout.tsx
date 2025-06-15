import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.png"/>
        <title>Продажа автомобилей</title>
      </head>

      <body>{children}</body>
    </html>
  );
}