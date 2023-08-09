import Nav from '../components/Nav'; // Update the path accordingly
import Header from '../components/Header'; // Update the path accordingly
import Footer from '../components/Footer'; // Update the path accordingly
import '../styles/globals.css'; // Your global CSS file
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav />
      <Header title={'Faithful Reflections'} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;