import styles from '../styles/Landing.module.css'
import{Header,Group,Center,Text, Button} from '@mantine/core'
import { Carousel } from '@mantine/carousel';
import {Comfortaa } from 'next/font/google'
import useDisplayed from '@/hooks/useDisplayed';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Footer from '../components/Footer'
import cow from './000ed60b2a4ae78133aacb24a9e5f75d9f67656a5aca7713e93b5c5e4b23cc35-removebg-preview 1.svg'
import Sarvagya from './sarvagya.jpg'
import Videocall from './undraw_video_call_re_4p26.svg'
import { useViewportSize } from '@mantine/hooks';
import news from './undraw_newsletter_re_wrob.svg'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { AiOutlineRobot } from 'react-icons/ai';
import medicRecomendation from './Ai.svg'
import { useRouter } from 'next/router';
import {MdOutlineMedicalInformation} from 'react-icons/md'
const comfortaa= Comfortaa({weight:'300',subsets:['latin'], })
export default function Home()  {
  const ref =useRef(null)
  const listref=useRef(null)
  const router=useRouter()
  const { height, width }=useViewportSize()
  const isVisible=useDisplayed(ref)
  const listVisibles =useDisplayed(listref)
  const [homeActive,SetHomeActive]=useState(false)
  return (
    <div>
      
        <div>
        {
        width<900?<div >
          <div className={styles.mobLand}>
          <h1>Nandani</h1>
          <Image className={styles.cow} src={cow}>

          </Image>
          <div className={styles.circle}></div>
          <p className={styles.introMobil}>
          We are excited to introduce Nandani, an innovative medication recommendation system combined with a video call feature to connect you with healthcare professionals. With Nandani, you can conveniently seek medical advice and receive personalized medication suggestions from our specilized Ai , all from the comfort of your own home.
          </p>
          <Center><Button mb="2rem" onClick={()=>{router.push('/dashboard')}} variant="white" size="xl" mt="2rem">Dashboard</Button></Center>
          </div>
          <div className={styles.moreKnow}>
          <h2>What we offer</h2>
         <Center> <div className={styles.videoCallOfferMob}>
          <h3 className={styles.videoCallTextMob}>Video Call</h3>
          <BsFillCameraVideoFill color='#fff' className={styles.iconcallMob}/>
          <p>
            Video Call A doctor from the comfort of your home with no cost
          </p>
          </div></Center>
          <Center> <div className={styles.Medicine}>
          <h3 className={styles.videoCallTextMob}>AI disease recognition</h3>
          <AiOutlineRobot color='#fff' className={styles.iconcallMob}/>
          <p>
            Our advanced model detect various disease faced by cattles
          </p>
          </div></Center>
          <Center> <div className={styles.MoreInfroMobile}>
          <h3 className={styles.videoCallTextMob}>News And Info</h3>
          <MdOutlineMedicalInformation color='#fff' className={styles.iconcallMob}/>
          <p>
           We give information about various diseases in the area
          </p>
          </div></Center>
          </div>
         
      
          
        </div>:
         <div>
<Header  zIndex={2}   withBorder={false}  pos={"fixed"} bg={"#000"} h={80}>
    <Group display={"flex"}  w={"90vw"} h="100%" position='right' align='center' >
      <Text color={!isVisible?"#fff":'grey'} size={"lg"}>Home</Text>
      <Text color={isVisible?"#fff":'grey'}  size={"lg"}>About</Text>
      <Text color='grey' size={"lg"}>Reviews</Text>
      </Group>
      </Header>

      <div className={styles.landing }>
      
        <h1 className={`${comfortaa.yo}`}>Nandani</h1>
        <div className={styles.mainText}>
        <p>We are excited to introduce Nandani, an innovative medication recommendation system combined with a video call feature to connect you with healthcare professionals. With Nandani, you can conveniently seek medical advice and receive personalized medication suggestions from our specilized Ai , all from the comfort of your own home.</p>
        
        <Button color='dark' variant='outline' onClick={()=>{router.push('/dashboard')}}>Dashboard</Button>
        </div>
        <div className={styles.balckRep} ></div>  
        </div>
        

        <div ref={ref}  className={styles.about}>

         
        <div className={styles.gradientRep}></div> 
        <br></br>
        {
          isVisible?
        <Text className={styles.aboutus}>Features</Text>:<div></div>

}
<div ref={listref} >

  <div  className={styles.list }>
  <div
    className={styles.next}
    >
      <div style={{display:'flex',background:'transparent'}}> 
      <Image  src={Videocall}/><br></br>
      <p style={{color:'#fff', background:'transparent'}}>Meet A Doctor</p>
      </div>
    </div>
     <div
    className={styles.next}
    >
<div style={{background:'transparent'}}>
<Image  src={medicRecomendation}/><br></br>
<p style={{color:'#fff', background:'transparent'}}> Medice recomndation</p>
      </div>
    </div>
    
    
     <div
    className={styles.next}
    >
      <div style={{background:'transparent'}}>
      <Image  src={news}/><br></br>
      <p style={{color:'#fff', background:'transparent'}}>Comman Diseases & News </p>
   </div>
    </div>


  </div>

<div className={styles.me}>
<div className={styles.line}></div>

      <Text mt="xl" className={styles.meetText}  size={"2rem"} color='#fff'>Meet The Developer</Text>
      <Image className={styles.meImg}   height={"10rem"} src={Sarvagya}></Image>

      <Text className={styles.svInfo} color='#fff'>
        
I am Sarvagya Singh, a passionate student specializing in web development, machine learning, and robotics. These fields have always fascinated me, and I have devoted myself to honing my skills and knowledge in each of them.In web development, I have had the opportunity to build entire websites from scratch. With a keen eye for detail and a strong understanding of programming languages and design principles, I strive to create websites that are both visually appealing and highly functional. It gives me immense satisfaction to see my projects come to life and provide a seamless user experience. Throughout my journey, I have been fortunate to receive guidance and mentorship from Md Obidullah Ansari and Pratik Kumar. Their expertise and support have been invaluable in shaping my skills and nurturing my growth. With their guidance, I have been able to tackle complex projects and push my boundaries further. As I continue on this journey, I look forward to embracing new challenges, expanding my skill set, and making a positive contribution to the world through my work in web development, machine learning, and robotics.
skills and encouraging my development. I've been able to take on challenging assignments and go beyond my comfort zone because to their coaching. I'm excited to continue on this path, take on new challenges, broaden my skill set, and use my work in web development, machine learning, and robots to make the world a better place.
  </Text>
     

  </div>
  
</div>

<br></br>

<br></br>
<br></br>
  </div>
  
<Footer/>
</div>}
</div>
    </div>
  );
};