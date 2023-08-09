export const metadata = {
  title: "SenFinanças - Teste de Front-end",
  description: "Teste de Front-end para a vaga de desenvolvedor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="https://sensedata.com.br/wp-content/uploads/2022/07/fav.svg" sizes="32x32" />
      <body>{children}</body>
    </html>
  );
}
