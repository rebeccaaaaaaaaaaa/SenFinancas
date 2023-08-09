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
      <body>{children}</body>
    </html>
  );
}
