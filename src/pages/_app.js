import '@/styles/globals.css'
import { AnimatePresence,motion } from 'framer-motion'
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }) {
  // const router=useRouter()
  return( //<AnimatePresence mode='wait'  ><motion.div
  // initial="stateIntitial"
  // animate="stateAnimate"
  // key={router.route}
  // exit="stateExit"
  // variants={{
  //   stateIntitial:{
  //    x:"-0.5%"
  //   },
  //   stateAnimate:{
  //    x:"0%"
  //   },
   
  // }}


<Component {...pageProps} />

  )
  //</motion.div></AnimatePresence>)
}
