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
    const redirects=['blackleg']
    useEffect(() => {
    SetDiseases([{name:"Black Quarter (BQ) or Black Leg",
redirect:'/blackleg'},
        {name:"Brucellosis",redirect:'Brucellosis'},
        {name:"Haemorrhagic Septicaemia",redirect:'hs'},
        {name:"Infectious Bovine Rhinotracheitis",redirect:'foot'},
        {name:"Foot and Mouth Disease"},
        {name:"Foot Rot"},
        {name:"Blue Tongue"}]
        )    


  
},[ ])

    return (
        <div style={{width:'100vw',margin:'0px'}}>
            <Header  bg={'#111'} height={65} p="xs">{
        <h1 className="logo">Nandani</h1>}</Header>
        { diseases && diseases.length>0?
         diseases.map((el,index)=>{
            return(
        <Center >
            <Card   onClick={ ()=>{  router.push( `/comman/${el["redirect"]}`) ; }}  style={{cursor:'pointer'}} className={styles.card} shadow="sm"  w="95%" mt="xl" padding="lg" radius="md" withBorder>
                    <Text>{el["name"]} </Text>
            </Card>
            </Center>
        )
         }):<div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Loader/></div>}
        </div>
    );
}

export default index;