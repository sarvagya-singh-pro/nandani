import { db } from "@/Firebaseconfig";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import styles from '../../styles/Banner.module.css'
import { Loader,Header, Text, Card, ScrollArea, Button, Center, } from "@mantine/core";
import Image from 'next/image'
import {FaCheck} from 'react-icons/fa'
import RequestDiv from '../../components/request'
import {ImCross} from 'react-icons/im'
import BannerImg from '../../../public/undraw_doctor_kw-5-l.svg'
import dayjs from 'dayjs'
import { DatePicker } from '@mantine/dates';
import request from "../../components/request";
const months=['januar', 'februar', 'march', 'april', 'may', 'june','july', 'august', 'september', 'october', 'november','december'];
const home = (props) => {
    const router = useRouter();
    const auth=getAuth()
    const[loading,SetLoading]=useState(true)
    const [meetingsList,SetMeetings]=useState([])
    const [name,SetName]=useState("")
    const [dates,SetDates]= useState([]);
    const [reqests,SetRequest]=useState([])
    const [meeting,SetMeeting]=useState([])
    useEffect(()=>{

        if(auth.currentUser?.email){
            SetLoading(false)
            
            SetName( auth.currentUser.email.replace("@gmail.com","").slice(0, 2) + " " + auth.currentUser.email.replace("@gmail.com","").slice(2,auth.currentUser.email.replace("@gmail.com","").length))
            

            let snap =getDoc(doc(db,"doctors",auth.currentUser.email.replace("@gmail.com","").slice(0, 2) + " " + auth.currentUser.email.replace("@gmail.com","").slice(2,auth.currentUser.email.replace("@gmail.com","").length))).then((data)=>{
                console.log(data.data())
                
                SetRequest(data.data().requests)
                let ref=[]
                if(data.data().meeting.length>0){
                    for(var i=0; i<data.data().meeting;i++){
                    getDoc(doc(db,"meetings",data.data().meeting[i])).then((data)=>{
                        ref.push(data.data())
                        SetMeeting(ref)
                        
                           SetLoading(false)   

                    })
                    }             
                }
                data.data().unavailable_dates.forEach(element => {
                  var ref = dates
                  ref.push(new Date(element["seconds"]*1000).toString())
                  let reference=[...new Set(ref)]
                  let arr=[]
                  reference.forEach((el)=>{
                    
                      var pointer=new Date(Date.parse(el))
                    if(new Date().getTime()<=pointer.getTime()){
                      arr.push(pointer)
                    }
                       
                      SetDates(arr)
                      
            
                      
                  })
                  console.log(reference)
                });
            }).catch((err)=>{
                console.log(err)
                router.push('/doctors/login')
            })
      
        }
        else{

            
           router.push('./login')
        }
    
    },[])
    return (
        <div>
            {
                loading?<div style={{height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>

                    <Loader size={"lg"}></Loader>
                </div>:<div>
                <Header   bg={'#111'} height={65} p="xs">
                <h1 className="logo" >Nandani</h1>
            </Header>
            

            
            {meetingsList.length?meetingsList.map((el)=>{
                return(
                    <Center>
                    <Card mt="xl" w="95%" shadow="sm" padding="lg" radius="md" withBorder>
                        <Text>{el}</Text>
                        
                    </Card>
                    </Center>
                )
            }):<div></div>}
            <div className={styles.banner }>
                <Image prirority style={{width:'15rem',height:'15rem'}} src={BannerImg} alt="banner img"></Image>
                <Text  align="center" style={{position:'absolute',left:'50%' ,top:'50%',transform:'translate(-50%,-50%)'}} color="#fff">Welcome Back Doctor
                <br></br><br></br>{name}
                </Text>
                
                </div>
                <DatePicker
                className={styles.datePicker}
                mt={"xl"}
                value={dates}
                onChange={(e)=>{
                    SetDates(e)
                }}
      valueFormat="YYYY MMM DD"
      type="multiple"
     minDate={new Date()}
      label="Pick date"
      placeholder="Pick date"
      mx="auto"
      maw={400}
    />
    <Text align="center" size={"xl"} mt={"xl"}>Choose Unavailable Dates</Text>
{dates.length===0?
 <div  style={{width:'50vw',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',left:'70%',transform:'translateX(-50%)',height:'250px'}} >
    <Text size={"xl"}>No Dates Selected</Text>
 </div>: <ScrollArea style={{width:'50vw',marginLeft:'70vw',transform:'translateX(-50%)'}} h={250} >
 {
    dates.map((el)=>{
        return(
            <Card shadow="xl" mt={"xl"} ><Text>{el.getDate()} {months[el.getMonth()]} ,{el.getFullYear()}</Text></Card>
        )
    })
 }
 
</ScrollArea>
 }
<Button mt={"xl"} onClick={()=>{SetLoading(true); updateDoc(doc(db,"doctors",name),{
    unavailable_dates:dates
}).then(()=>{SetLoading(false)}) }} style={{marginLeft:'50%',position:'relative',display:'block',transform:'translateX(-50%)'}}>
    Set Dates
</Button>
<Text mt={"2em"} align="center" size={"2rem"}>Appointments requests</Text>
{
     reqests.length>0?

    reqests.map((el)=>{
         
        return(
                <RequestDiv name={name} el={el}/>
        )
    }):<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'20rem',width:'100%'}}>
        <Text>No Meetings Availabe</Text>
    </div>

}

                </div>
            }
        </div>
    )
    ;
}

export default home;