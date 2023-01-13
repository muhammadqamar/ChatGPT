import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/globals.css";
import "../assets/styles/globals.scss";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
