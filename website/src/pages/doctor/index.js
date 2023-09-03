import { useEffect, useState } from "react";
import { Avatar, Card,Text ,Header} from "@mantine/core";
import {BiArrowBack} from 'react-icons/bi'
import Map from '../../components/Map'
import { useRouter } from "next/router";
import {IoMdCall} from 'react-icons/io'
export default () => {
    const[list,SetList]=useState([])
    const router=useRouter()
    useEffect(()=>{
        async function a(){
        const res=await fetch('/api/doctors')
        console.log(res)
        const json=await res.json()
        SetList(json)
    }
    a()

    },[])
    return (
        <div>
            <Header  zIndex={10}  mb={40}  withBorder={false}  pos={"fixed"} bg={"#000"} h={80}>
            <BiArrowBack color="#fff" onClick={()=>{router.back()}}  style={{marginTop:'20px',cursor:'pointer'}} size={"2.5rem"}/>
            </Header>
            {
                list.map(el=>{
                    return(
                        <Card shadow="sm" mt={80} padding="lg" radius="md" withBorder>
                        <Text>{el["name"]}</Text>
                        <div style={{display:'flex',marginTop:'0.5rem',flexDirection:'row'}}>
                            <IoMdCall style={{marginTop:'5px',marginRight:'10px'}}/>
                        <a href={`tel:${el["contact"]}`} ><Text>{el["contact"]}</Text></a>
                        </div>
                        <Card.Section>
                            <Avatar size="xl" style={{display:'block',marginLeft:'95%',transform:'translate(-100%,-50%)'}} src={el["pfp"]}></Avatar>
                        </Card.Section>
                        <Card.Section>

                        </Card.Section>
                          <a href={`https://www.google.com/maps?q=${el["location"][1]},${el["location"][0]}`}>  <Map cords={el["location"]}></Map></a>
                        </Card>
                    )
                })
            }
        </div>
    );
}