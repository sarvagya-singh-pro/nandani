import {TbLanguageHiragana} from 'react-icons/tb'
import { motion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { Modal,Input,Button, Text} from '@mantine/core';
import styles from '../styles/Language.module.css'
import {AiOutlineDown} from 'react-icons/ai'
import  Image  from 'next/image';
import usaIcon from './icons8-usa-48.png'
import indiaIcon from './icons8-india-48.png'
import {useRouter} from 'next/router';
import { useEffect } from 'react';
import { useClickOutside } from '@mantine/hooks';
const language = () => {
    const [visible,SetVisible]=useState(false)
    const[language,SetLanguage]=useState(0)
    const router=useRouter()
    const [listVisible,SetListVisible]=useState(false)
    const [selected,SetSelected]=useState()
    const ref = useClickOutside(() => SetListVisible(false));
    useEffect(()=>{
        if(localStorage.getItem("language")==="Hindi"){
        SetSelected("हिंदी")
        }
        else{
            SetSelected("English")
        }
    },[])
    return (
        <div>
            <Modal onClose={()=>{SetVisible(false)}} opened={visible}>
             <div onClick={()=>{SetListVisible(!listVisible)}}  className={styles.box }>
                <Text><span><AiOutlineDown /> </span>{selected}</Text>
                </div>      
                {listVisible? 
                <ul ref={ref}  className={styles.languageUl}>
                    <li onClick={()=>{SetSelected("English");SetListVisible(false)}}><Image w src={usaIcon}   width={48}
      height={48}
      alt="American Flag"></Image><span style={{paddingLeft:'20px'}}><Text>English</Text></span></li>
        <li onClick={()=>{SetSelected("Hindi");SetListVisible(false)}}><Image  src={indiaIcon}   width={48}
      height={48}
      alt="Indian Flag"></Image> <span style={{paddingLeft:'20px'}}><Text>Hindi</Text></span></li>
                    </ul>:<div></div>
}
             <div style={{width:'100%',display:'flex',justifyContent:'center'}}>  
             {!listVisible?
             <Button onClick={()=>{localStorage.setItem("language",selected);router.reload()}}  mt="3rem"> Select</Button>
              :<Button onClick={()=>{localStorage.setItem("language",selected);router.reload()}} mt="10rem"> Select</Button>
            } </div> 
            </Modal>
        <motion.div onClick={()=>{SetVisible(true)}}  whileHover={{scale:1.2}}  className="languageSelectDiv">
           <TbLanguageHiragana  color='#fff' size={"3rem"}/>
        </motion.div>
        </div>
    );
}

export default language;