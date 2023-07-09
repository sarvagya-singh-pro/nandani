import {motion} from 'framer-motion'
import {  Text } from '@mantine/core';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useState,useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Banner.module.css'
import { getDoc, updateDoc,doc } from 'firebase/firestore';
import { db } from '@/Firebaseconfig';
import { ActionIcon,Modal,Button } from '@mantine/core';
import {AiFillClockCircle} from 'react-icons/ai'
import { TimeInput } from '@mantine/dates';
const months=['januar', 'februar', 'march', 'april', 'may', 'june','july', 'august', 'september', 'october', 'november','december'];
const request = (props) => {
    const ref = useRef(null);
    const ref2 = useRef();
    const ref3 = useRef();
    const[time1,SetTime1]=useState(null)
    const[time2,SetTime2]=useState(null)
    const[time3,SetTime3]=useState(null)
    const router=useRouter()
    const [opened,SetOpend]=useState(true)
    const [modelOpen,SetModalOpen]=useState(false)
    useState(()=>{
        console.log(props.el.uid)
    })
    const variant={
        closed:{
            opacity:0.5,
            y:600,
            display:'none'
            
        },
    }
    return (
        <div>
            <Modal opened={modelOpen} onClose={()=>{SetModalOpen(false)}} >
                <Text align='center'>Appointment Time</Text>
            <TimeInput
      label="Time 1"
      ref={ref}
      value={time1}
      onChange={(e)=>{
        SetTime1(e.target.value)
      }}
      rightSection={
        <ActionIcon onClick={() => ref.current.showPicker()}>
         <AiFillClockCircle/>
        </ActionIcon>
      }
      maw={400}
      mx="auto"
    />
        <TimeInput
      label="Time 2"
      value={time2}
      ref={ref2}
    
      onChange={(e)=>{
        SetTime2(e.target.value)
      }}
      rightSection={
        <ActionIcon onClick={() => ref2.current.showPicker()}>
         <AiFillClockCircle/>
        </ActionIcon>
      }
      maw={400}
      mx="auto"
    />
        <TimeInput
      label="Time 3"
      ref={ref3}
      value={time3}
      onChange={(e)=>{
        SetTime3(e.target.value)
      }}
      rightSection={
        <ActionIcon onClick={() => ref3.current.showPicker()}>
         <AiFillClockCircle/>
        </ActionIcon>
      }
      maw={400}
      mx="auto"
    />
    <Button  mt={"xl"} onClick={()=>{
        if(time1!=null&&time2!=null&&time3!=null){
                getDoc(doc(db,"users",localStorage.getItem("uid"))).then((data)=>{
                     let r=data.data().checkups
                     const appointment={
                      date:props.el.date,
                      time:[time1,time2,time3],
                      doctor:props.name,
                    }
                     r.push(appointment)
                     console.log(data.id)
                     updateDoc(doc(db,"users",localStorage.getItem("uid")),{
                      checkups:r
                     }).then(()=>{
                      getDoc(doc(db,"doctors",props.name)).then((data)=>{
                        const arr=data.data().requests
                        arr.splice(arr.indexOf(props.el),1) 
                       updateDoc(doc(db,"doctors",props.name),{
                             requests:arr
                       })
                     })
                 ``    })
                })
        }
    }} style={{marginLeft:'50%',transform:'translateX(-50%)'}}> Confirm</Button>
    
            </Modal>
        < motion.div  animate={ opened?"opend":"closed"}  transition={{duration:1}} variants={variant}  className={styles.request}>
        <Text size={"xl"}>{new Date(props.el.date["seconds"]*1000).getDate()} {months[new Date(props.el.date["seconds"]*1000).getMonth()]},    {new Date(props.el.date["seconds"]*1000).getFullYear()} </Text>
          <div onClick={()=>{SetOpend(false);
          getDoc(doc(db,"doctors",props.name)).then((data)=>{
           const arr=data.data().requests
           arr.splice(arr.indexOf(props.el),1) 
          updateDoc(doc(db,"doctors",props.name),{
                requests:arr
          }).then(()=>{
            router.reload()
          })
        })
          }} className={styles.cross}>
          <ImCross color="red" />
          </div>
          <div onClick={()=>{SetModalOpen(true)}} className={styles.check}>
          <FaCheck color="green"/>
          </div>
      </motion.div>
      </div>
    );
}

export default request;