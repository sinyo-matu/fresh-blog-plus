import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Footer } from "../components/Footer.tsx";

const CSS = `::selection {
  background-color: #000;
  color: #fff;
}
`;

export default function App({ Component }: AppProps) {
  return (
    <html>
      <Head>
        {/* Global Styles that couldn't be loaded through Twind */}
        <style>{CSS}</style>
      </Head>
      <div
        class="min-h-screen grid grid-cols-1"
        style="grid-template-rows: auto 1fr auto;"
      >
        <Component />
        <Footer />
      </div>
    </html>
  );
}
