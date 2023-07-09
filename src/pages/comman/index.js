import { db } from "@/Firebaseconfig";
import { Card,Loader, Center, Header, Text } from "@mantine/core";
import { collection } from "firebase/firestore";
import {useEffect, useState} from 'react'
import { getDocs } from "firebase/firestore";
import styles from '../../styles/card.module.css'
import { useRouter} from "next/router";
const index = () => {
    const router=useRouter()
    const [diseases,SetDiseases]=useState()
    useEffect(() => {
        
   getDocs(collection(db,"diseases")).then(results=>{
 let ref=[] 
 results.forEach((el)=>{
    if(diseases){
     ref=diseases
    }
    ref.push(el.id)
    SetDiseases(ref)
    
 })


})


  
},[diseases])

    return (
        <div>
            <Header  bg={'#111'} height={65} p="xs">{
        <h1 className="logo">Cattleit</h1>}</Header>
        { diseases && diseases.length>0?
         diseases.map((el)=>{
            return(
        <Center >
            <Card  onClick={()=>{router.push(`comman/${el}`)}}  style={{cursor:'pointer'}} className={styles.card} shadow="sm"  w="95%" mt="xl" padding="lg" radius="md" withBorder>
                    <Text>{el} </Text>
            </Card>
            </Center>
        )
         }):<div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Loader/></div>}
        </div>
    );
}

export default index;