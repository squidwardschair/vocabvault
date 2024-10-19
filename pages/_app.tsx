import Image from 'next/image'
import "../styles/global.css";
import { Inter } from "next/font/google";
import type { AppProps } from 'next/app'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default App
