import { BookMarkProvider } from "@/BookMarkContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    // <Link> till olika sidor? inuti provider eller utanför?
  <BookMarkProvider>
    <Component {...pageProps} />
  </BookMarkProvider>
  );
}
