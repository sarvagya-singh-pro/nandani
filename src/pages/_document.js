import { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'
const getInitialProps = createGetInitialProps()
export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
