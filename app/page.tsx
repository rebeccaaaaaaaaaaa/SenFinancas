import { GlobalProvider } from "@/src/contexts/Global";
import { Header } from "@/src/components/Header";
import { Summary } from "@/src/components/Summary";
import { TableContent } from "@/src/components/Table";
import "../src/styles/global.scss";

export default function Home() {
  return (
    <GlobalProvider>
      <Header />
      <main>
        <Summary />
        <TableContent />
      </main>
    </GlobalProvider>
  );
}
