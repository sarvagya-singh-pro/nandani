import { useEffect,useState } from "react";
import{AiFillCheckCircle} from 'react-icons/ai'
import { useRouter } from "next/router";
import { getDoc,doc, setDoc, updateDoc } from "firebase/firestore";
import{db,app} from '../../Firebaseconfig'
import {motion } from 'framer-motion'
import styles from '../../styles/Dashboard.module.css'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Roboto } from 'next/font/google'
import { notifications,Notifications  } from '@mantine/notifications';
import{FcImageFile} from 'react-icons/fc'
import { Text } from "@mantine/core";
const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
})
const storage = getStorage();;


import { AppShell, Navbar,Flex, Header,Loader, Avatar,Modal, Button, Group, Input, FileInput } from '@mantine/core';
import{getAuth} from 'firebase/auth'
const index = () => {
  const auth=getAuth(app);
 
 
  const [value, setValue] = useState(null);
    const router = useRouter()
    const [loading,SetLoading]=useState(true)
    const [isHovered, setHovered] = useState(false)
    const [userDefined, setUserDefined] = useState(false)
    const [breed,SetBreed]=useState("")
    const[cattlename,Setcattlename]=useState("")
    useEffect(()=>{
        if(localStorage.getItem('uid')!=null)
        {
            console.log(localStorage.getItem('uid'));
           fetch('/api/ip').then(res=>{res.json().then(async(data)=>{

          let snap=await getDoc(doc(db,"users",localStorage.getItem('uid'))).catch((err)=>{alert('no');router.push('/auth')});
          if(snap.data().ip.includes(data['detectedIp'])){
           SetLoading(false)
           if(snap.data().cattles.length===0){
              
           }
           else{
            setUserDefined(true)
           }
          
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
        <div style={{ position:'absolute',top:'0px',margin:'0px'}}>
           {loading?<div className={styles.loading} ><Loader size={"lg"}/></div>:<div className="main">
           <AppShell
      padding="md"
      navbar={<Navbar  width={{ base: 300 }} bg="#012B90" m={'0px'}  p="xs">{<div className={styles.navigation}>
        <div className={styles.navbutton}>Home</div>
        <div className={styles.navbutton}>Health checkup</div>
        <div className={styles.navbutton}>Common diseases</div>
        <div className={styles.navbutton}>News</div>
       <motion.div onClick={()=>{router.push('/profile')}} onHoverStart={()=>{setHovered(true)}} onHoverEnd={()=>{setHovered(false)}}  className={styles.profile}>
          <Avatar radius={"xl"} color="indigo" m={"sm"}  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        <h1 className={roboto.profile} style={{color:'#fff',fontWeight:400}}> Profile</h1><motion.h2 
        animate={{x:isHovered?0:-10}}
        className={styles.arrow}>&gt;</motion.h2>
       </motion.div>
        </div>}</Navbar>}
      header={<Header  bg={'#111'} height={65} p="xs">{
        <h1 className={roboto.logo}>Cattleit</h1>}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {userDefined?<div>
          <div className={styles.healthReport}>
        <h2>Health Report</h2>
        <p>26 may 2008</p>
        <div style={{display:'flex',marginLeft:'50%',justifyContent:'center',position:'absolute',flexDirection:'row',width:'100%',top:'50%',transform:'translate(-50%,-50%)'}}>
        <AiFillCheckCircle style={{width:'60px',height:'80px'}}  color="#2cbf49"></AiFillCheckCircle>
          <h1  style={{display:'inline-block',paddingTop:'20px'}} >Your cattle seems healthy </h1><br></br>
        
          </div>
          <div style={{position:'absolute',bottom:'10px',textAlign:'center',width:'100%'}} >
          <Text>But if you still feel your cow is unwell call:</Text>
          <Text>+91 82529 13367</Text>
          </div>
          </div>

      </div>:
      <div style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
    {
           <Modal opened={!userDefined} onClose={()=>{alert('no')}} >
           {
            <div className={styles.modal}>
              <h1 className={roboto.headerModal} >Add A Cattle </h1>
              <Input value={cattlename} onChange={(e)=>{Setcattlename(e.target.value)}} placeholder="Name"></Input><br></br>
              <FileInput icon={<FcImageFile/>} placeholder="Image"  type="image/" value={value} onChange={setValue} ></FileInput>
              <br></br> <p style={{textAlign:'left',color:'#555'}}>Select breed </p>
             <Input value={breed} onChange={(e)=>{SetBreed(e.target.value)}} component="select" label="Breed">
              <option value="">select breed</option>
              <option value="breed1">Heeeello</option>
              <option value="breed2">Hello</option>
              <option value="breed3">Hello</option>
             </Input>
             <br></br>
             <Button onClick={async()=>{if( value&&value["type"].includes("image/")){
                SetLoading(true);
                if(breed.trim()!=""&& cattlename.trim()!="" ){
                const storageRef = ref(storage,auth.currentUser.uid+cattlename)
                uploadBytes(storageRef, value).then((snapshot) => {
                  console.log('Uploaded a blob or file!');
                  SetLoading(false);
                });
                const cattle={
                  name:cattlename,
                  breed:breed,

                }
                const snap= await getDoc(doc(db,"users",auth.currentUser.uid))
                if(snap.exists())
                {
                  let arr=snap.data().cattles
                  arr.push(cattle)
                updateDoc(doc(db,"users",auth.currentUser.uid),{
                  cattles:arr
                }).then(()=>{
                  SetLoading(false)
                  setUserDefined(true)
                })
                }
              }
              else{
                alert("no ")
                SetLoading(false)
              }
                

             }}} >
              Add cattle
             </Button>

             </div>
            
           }
         </Modal>
    }
    </div>
    }

    </AppShell>
            </div>}   
            </div>
    );
}



export default index;