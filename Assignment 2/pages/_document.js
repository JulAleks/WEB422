import { Html, Head, Main, NextScript } from "next/document"; //import components from next/document

//custom Document component for setting up the HTML structure
export default function Document() {
  return (
    <Html lang="en">
      {" "}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
