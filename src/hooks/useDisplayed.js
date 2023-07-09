import { useState,useMemo,useEffect } from "react"
export default function useDisplayed(ref) {

    const [isIntersecting, setIntersecting] = useState(false)
  

  
  
    useEffect(() => {
        const observer=    new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
          )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }, [])
  

    return isIntersecting
  }