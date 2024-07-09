import Layout from "@/components/layout"; //import the Layout component
import "@/styles/globals.css"; //import global CSS styles
import "bootstrap/dist/css/bootstrap.min.css"; //import Bootstrap CSS

//main App component
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
