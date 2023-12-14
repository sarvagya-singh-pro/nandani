import { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'
const getInitialProps = createGetInitialProps()
export default function Document() {

  return (
    <Html lang="en">
      <Head >
        <title>Nandani</title>
         <link rel="shortcut icon" href="https://i.ibb.co/kGZ1HTJ/ori-3870888-zadsb8uygldgt17y8xk6qln0j50ta9nvyacorrm8-cow-svg-cute-cow-svg-cow-clip-art-cow-svg-desig.png">
     </link>   </Head>    
        <body>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
