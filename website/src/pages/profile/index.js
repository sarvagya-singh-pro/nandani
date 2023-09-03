import { useState,useEffect } from "react";
import {getDoc,doc, updateDoc, deleteDoc} from 'firebase/firestore'
import {useRouter} from 'next/router'
import {db,app} from '../../Firebaseconfig'
import { Button, Checkbox, Header, Loader,Modal,PasswordInput,Text, TextInput } from "@mantine/core";
import styles from '../../styles/Dashboard.module.css'
import{deleteUser, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {Inter}  from "next/font/google";
import { ref,getStorage, deleteObject,listAll } from "firebase/storage";
export const inter=Inter({
    subsets: ['latin'],
    display: 'swap',
})
export default () => {
    const storage = getStorage();
    const[loading,SetLoading]=useState(false)
    const auth=getAuth(app)
   const[modalVisible,SetModalVisible]=useState(false)
    const [name,setName]=useState("")
    const [email,SetEmail]=useState("")
    const[deleteModalVisible,setDeleteModalVisible]=useState(false)
    const[passwordModal,setPasswordModal]=useState("")
    const[inputName,setInputValue]=useState("")
    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem('uid')!=null)
        {
           
           fetch('/api/ip').then(res=>{res.json().then(async(data)=>{

          let snap=await getDoc(doc(db,"users",localStorage.getItem('uid'))).catch((err)=>{alert('no');router.push('/auth')});
          if(snap.data().ip.includes(data['detectedIp'])){
           getDoc(doc(db,"users",localStorage.getItem('uid'))).then(data=>{
                setName(data.data().name)
                SetEmail(data.data().email)
           }).catch((err)=>{alert(err.message);}); 
           SetLoading(false)
           
          
          }
          else{
            console.log(data['detectedIp'])
            router.push('/auth')
          }

        })}) 
            
         
        }
        else{
            router.push('/auth')
        }
    },[])

    return (
        <div>
        {name!=""?    
        <div style={{background:'#012B90',height:'100vh'}}><Header  bg={'#111'} height={65} p="xs" ></Header>
        <div className={styles.profileDiv}>
            <Text size={"xl"} className={`${styles.profileName} ${inter.profileName}`}>Profile</Text><br></br>
            <Text>Name: {name}</Text><br></br>
            <Text>Email:{email}</Text><br></br>
            <Modal opened={deleteModalVisible} onClose={()=>{setDeleteModalVisible(false)}}>
                <Text size={"lg"} align="center">Are you Sure?</Text>
                <PasswordInput placeholder="password" value={passwordModal} onChange={(e)=>{setPasswordModal(e.target.value)}} ></PasswordInput><br></br>
                <Checkbox label="I understant i will loose my account" >I understant i will loose my account</Checkbox>
                <br></br>
                <center><Button  variant="outline" color="red" onClick={()=>{signInWithEmailAndPassword(auth,email,passwordModal).then(()=>{
                 listAll(ref(storage)).then(res=>{
                    res.items.forEach(element => {
                       if(element.name.includes(auth.currentUser.uid)){
                        deleteObject(element)
                       }
                    });
                 })
                 deleteDoc(doc(db,"users",auth.currentUser.uid));
                 deleteUser(auth.currentUser)
               
                 localStorage.removeItem("uid")
                 router.push('/auth')
                }).catch((err)=>{alert(err.message)}) }}>Delete My account</Button></center>
            </Modal>
            <div style={{ display:'flex',justifyContent:'space-evenly'}}>
                <Button  onClick={()=>{SetModalVisible(true)}} >Change Name</Button>
            <Button onClick={()=>{setDeleteModalVisible(true)}} color="red">Delete account</Button>
           <Modal opened={modalVisible} onClose={()=>{SetModalVisible(false)}} >
            <TextInput value={inputName} onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Name"></TextInput>
            <br></br>
            <center><Button onClick={()=>{
                if(inputName.trim!=""){
                SetModalVisible(false)
                    updateDoc(doc(db,"users",auth.currentUser.uid),{
                name:inputName
            })}}}>Save</Button></center>
           </Modal>
            </div>              
           
        </div>
        </div>:<div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Loader/>
        </div>
        }
        </div>
               
        
    );
}