import "../styles/global.css";
import { Inter } from "next/font/google";
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar';


// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${inter.className}`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}

export default App
