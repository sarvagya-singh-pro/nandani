import { useState } from 'react';
import styles from '../../styles/Doctorlogin.module.css'
import {CiStethoscope} from 'react-icons/ci'
import { TextInput,Text, Button, PasswordInput, Loader } from '@mantine/core';
import {RiLockPasswordLine} from 'react-icons/ri'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/Firebaseconfig';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'next/router'
function login() {
    const router=useRouter()
    const [name,SetNmae]=useState("")
    const [password,SetPssword]=useState("")
    const [loading,setLoading] = useState(false)
    const auth =getAuth()
    async function   hadleLogin(){
        const arr=[]
        const data=[]
        setLoading(true)
        await signInWithEmailAndPassword(auth,name.replace(/\s+/, "")+"@gmail.com",password).then(()=>{
          router.push('./home')
          
         
        }).catch((err)=>{
          alert(err.message)
          setLoading(false)
        })

      }
    
    
    return (
        <div>
            {loading?<div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Loader size={"xl"}/>
            </div>:
        <div className={`${styles.landing} ${styles.box}` } >
            <Text align='center' style={{fontSize:'2rem',paddingTop:'2rem' }} color='#fff' size={"xl"}>Welcome Back Doctor</Text>
          <div  style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <TextInput label="Please strat your name with Dr" icon={<CiStethoscope/>} value={name} onChange={(e)=>{SetNmae(e.target.value)}} mw={"200px"}  w="50%"placeholder='Name'></TextInput>
            <PasswordInput value={password} icon={<RiLockPasswordLine/>} mt="xl" onChange={(e)=>{SetPssword(e.target.value)}} mw={"200px"}  w="50%"placeholder='Password '></PasswordInput>
            <Button onClick={hadleLogin} mt={"xl"}>Login</Button>
            </div>

        </div>
}
        </div>
    );
}

export default login;