import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Nav />
        <Header title={"Faithful Reflections"} />
        <Component {...pageProps} />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
