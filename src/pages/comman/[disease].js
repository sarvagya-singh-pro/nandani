import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { getDoc,doc } from 'firebase/firestore';
import { db } from '@/Firebaseconfig';
import { Loader, Text,Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
function disease() {
  const router = useRouter();
  let { disease } = router.query;
  const[loaded,SetLoaded]=useState(false)
  const [data,SetData]=useState({}) 
 const [images,SetImg]=useState([])
  useEffect(()=>{
      if(router.isReady){

        getDoc(doc(db,"diseases",disease)).then((obj)=>{
        if(obj.data()){
            const diseaseObj={
              name:obj.id,
              symptoms:obj.data()["symptoms"],
              info:obj.data()["info"]
            }
            SetData(diseaseObj)
         SetImg(obj.data().images)   
            SetLoaded(true)
        
          }
        else{
          console.log(disease)
        }
       }).catch((err)=>{
        console.log(err)
       })
      }
    },[router.isReady])
   
  return (<div>{
    loaded?<div>
      <Text size="2rem" align='center' mt="lg">{data["name"]}</Text>
      {images.length>0?
      <div>
      {images.length>1?<Carousel
      loop
      style={{float:'left'}}
      left={20}
      w={'30vw'}
     h={'20rem'}
    >
{images.map(el=>{return(
      <Carousel.Slide h={'20rem'}  w={"30vw"} >
       
        <Image h={'20rem'}   width={"30vw"} src={el }></Image>
      </Carousel.Slide>
      
      )})}
    </Carousel>
   
  
      : <Image pos={"absolute"}  style={{marginLeft:'20px'}}   width={"30vw"} src={ "https://i.ibb.co/H4n1xMP/stock-photo-nguni-cow-being-checked-and-treated-for-ticks-by-farmer-1625407348.jpg"}></Image>
    }
      </div>
    
:<div></div>}
      <div style={{width:'30vw',flexDirection:'column',height:'100%',minHeight:'20rem',marginRight:'30px',borderRadius:'0.5rem',background:'#5d6bfc',float:'right'}}>
        <Text mt="xl" color='#fff' align='center' size={"1.5rem"}>Symptoms</Text>
       
       <div style={{height:'100%',position:'relative' ,display:'block',background:'#f00',justifyContent:'space-evenly'}}>
        {
          data["symptoms"].map((el)=>{
            return(
              <>
              <div   >
              <Text size={"xl"}  color='#3C3C3C' align='center' >{el}</Text>
              </div>
              <br></br>
              </>
            )
          })
        }
        </div>
      </div>
      <Text mt="20rem" style={{fontSize:'2rem'}} ml="lg">Info</Text><br></br>
      
        <Text ml="lg" size={"xl"} style={{width:'80%'}} >{data["info"]}</Text>
      
    </div>:<div style={{height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Loader/>
    </div>
    }</div>);
}

export default disease;