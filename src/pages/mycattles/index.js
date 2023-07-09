import { getAuth } from "firebase/auth";
import {app,db} from '../../Firebaseconfig'
import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDoc,doc,updateDoc } from "firebase/firestore";
import { Avatar,Header,FileInput,Input,TextInput,Modal, Skeleton,Center, Card, AppShell,Navbar, Text, Badge, Button, Group, ScrollArea, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import {motion} from 'framer-motion'
import { Roboto } from "next/font/google";
import LanguageDiv from '../../components/language'
import { FcImageFile } from "react-icons/fc";
import { uploadBytes } from "firebase/storage";
import styles from '../../styles/Dashboard.module.css'
const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
})
export default () => {

    const [cattles,setCattles]=useState([])
    const [cattleImg,SetCattleImg]=useState([])
    const [modalOpen,setModalOpen]=useState(false)
    const[isHovered,setHovered]=useState(false)
    const [cattlename,Setcattlename]=useState("")
    const [breed,SetBreed]=useState("")
    const [value,setValue]=useState("")
    const[isLoading,SetLoading]=useState(false)
    const [language,SetLanguage]=useState(0)
    const storage = getStorage();
    const auth =getAuth(app);
    const router=useRouter()
 
    useEffect(()=>{
      if(localStorage.getItem("language")==="Hindi"){
        SetLanguage(1)
      }
        if(localStorage.getItem('uid')!=null)
        {
            console.log(localStorage.getItem('uid'));
           fetch('/api/ip').then(res=>{res.json().then(async(data)=>{

          let snap=await getDoc(doc(db,"users",localStorage.getItem('uid'))).catch((err)=>{alert('no');router.push('/auth')});
          if(snap.data()?.ip.includes(data['detectedIp'])){
          
           if(snap.data().cattles.length===0){
              
           }
           else{
            snap.data().cattles.forEach((el)=>{
            getDownloadURL(ref(storage, `${localStorage.getItem("uid")+el.name}`)).then((url)=>{
             const refe=cattleImg
             refe.push({
              name:el.name,
              url:url,
              breed:el.breed,
             })
             const jsonObject = refe.map(JSON.stringify);
              
             console.log(jsonObject);
               
             const uniqueSet = new Set(jsonObject);
             const  uniqueArray = Array.from(uniqueSet).map(JSON.parse);
               
             console.log(uniqueArray);
              SetCattleImg(uniqueArray)
            }) .then(()=>{
              console.log(cattleImg)
              setCattles(snap.data().cattles)
            })
            }
            )
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
       <div>
        {isLoading?<div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Loader></Loader>

        </div>:
          <div>
        <Modal opened={modalOpen} onClose={()=>{setModalOpen(false)}} >
           {
            <div className={styles.modal}>
              <Text className={roboto.headerModal} >Add A Cattle </Text>
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
               
                if(breed.trim()!=""&& cattlename.trim()!="" ){
                  SetLoading(true)
                const storageRef = ref(storage,auth.currentUser.uid+cattlename)
                uploadBytes(storageRef, value).then((snapshot) => {
                  console.log('Uploaded a blob or file!');
               
                }).then(async()=>{
                
                  setModalOpen(false)
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
                    router.reload()
                  })
                  }
                
                });
           
             
                

             }}} }>
              {
                language?"गाय जोड़ें":"Add A Cow"
              }
             </Button>

             </div>
            
           }
         </Modal>
            <AppShell
      padding="md"
      navbar={<Navbar  width={{ base: 300 }} bg="#012B90" m={'0px'}  p="xs">{<div className={styles.navigation}>
        <div onClick={()=>{router.push('/dashboard')}} className={styles.navbutton}>{language?"होम पेज":"Home"}</div>
        <div className={styles.navbutton}>{language?"स्वास्थ्य जांच":"Health checkup"}</div>
        <div style={{background:'#3468E4'}} className={styles.navbutton}>{language?"मेरी गायें":"My cattle"}</div>
        <div onClick={()=>{router.push('/meet')}} className={styles.navbutton}>{language?"एक डॉक्टर से मिलें":"Meet a doctor"}</div>
        <div className={styles.navbutton}>{language?"सामान्य रोग और उनके लक्षण":"common disease"}</div>
       <motion.div onClick={()=>{router.push('/profile')}} onHoverStart={()=>{setHovered(true)}} onHoverEnd={()=>{setHovered(false)}}  className={styles.profile}>
          <Avatar radius={"xl"} color="indigo" m={"sm"}  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        <h1 className={roboto.profile} style={{color:'#fff',fontWeight:400}}>{language?"प्रोफ़ाइल":"Profile"}</h1><motion.h2 
        animate={{x:isHovered?0:-10}}
        className={styles.arrow}>&gt;</motion.h2>
       </motion.div>
        </div>}</Navbar>}
      header={<Header  bg={'#111'} height={65} p="xs">{
        <div  style={{width:'100%',display:'flex',flexDirection:'row'}}>
      <h1 className="logo">Cattleit</h1>
      <Button onClick={()=>{setModalOpen(true)}} pos={"absolute"} right={"10%"} > {
                language?"गाय जोड़ें":"Add A Cow"
              }</Button>  
</div>
      }</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <ScrollArea>
            {
                cattles.length===0?<div >
                  <Center>
                  <Card w={"800px"}  mt="md" shadow="sm" padding="lg" radius="md" withBorder>
                          <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </Card>
      </Center>

                </div>:
                cattleImg.map((el,index)=>{
                    return(
                        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                            <Card w={"800px"}  mt="md" shadow="sm" padding="lg" radius="md" withBorder>
      
       <Avatar display={"inline-block"} radius={"xl"} src={cattleImg[index]["url"]}  size={"10em"}>

       </Avatar>
     

      <Group position="apart" display={"flex"} style={{justifyContent:'center'}}>
        <Text  pos={"absolute"}  top={"20px"} size={"lg"} weight={700}>{cattleImg[index]["name"]}</Text>
       
      </Group>

    
 <Center><Text style={{display:'block' }} mt={"lg"} pos={"absolute"}  top={"20%"} >{language?"नस्ल":"Breed"}: {cattleImg[index]["breed"]} </Text>
 </Center>
      <br></br>
    
    </Card>
    
    
                            </div>
                    )
                })
            }     
            </ScrollArea>
            <LanguageDiv></LanguageDiv>
                            </AppShell>
                            </div>
}
        </div>
    );
}