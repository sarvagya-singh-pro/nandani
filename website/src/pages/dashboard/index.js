import { useEffect,useState } from "react";
import{AiFillCheckCircle,AiOutlineClockCircle} from 'react-icons/ai'
import { useRouter } from "next/router";
import { getDoc,doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import{db,app} from '../../Firebaseconfig'
import {motion } from 'framer-motion'
import logo from './logo.png'
import styles from '../../styles/Dashboard.module.css'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Roboto } from 'next/font/google'
import {RxHamburgerMenu} from 'react-icons/rx'
import { getDatabase, ref as ref_real, set } from "firebase/database";

import { notifications,Notifications  } from '@mantine/notifications';
import{FcImageFile} from 'react-icons/fc'
import LanguageDiv from '../../components/language'
import { useViewportSize } from '@mantine/hooks';

import { Text,MantineProvider,Select,Center,Image, Card, Drawer } from "@mantine/core";
const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
})
const storage = getStorage();;
const realtime_database=getDatabase()
import Map from '../../components/Map'
import { AppShell, Navbar,Flex, Header,Loader, Avatar,Modal, Button, Group, Input, FileInput } from '@mantine/core';
import{getAuth} from 'firebase/auth'
const index = () => {
  
  const { height, width } = useViewportSize();
  let months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December']
   
  const auth=getAuth(app);
  const [cattles,setCattles]=useState([])
  const [value, setValue] = useState(null);
  const [drawerOpen,SetDrawerOpen] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const router = useRouter()
    const [loading,SetLoading]=useState(true)
    const [isHovered, setHovered] = useState(false)
    const [checkup,SetCheckup]=useState([])
    const [userDefined, setUserDefined] = useState(null)
    const [breed,SetBreed]=useState("")
    const [timeSelect,SetTimeSelect]=useState("")
    const [idMeeting,SetIdMeeting]=useState("")
    const[cattlename,Setcattlename]=useState("")
    const [language,SetLanguage]=useState(0)//0 for english 1 for hindi
  const [meetings,SetMeetings]=useState(0)
    useEffect(()=>{
      if(localStorage.getItem("language")==="Hindi"){
       SetLanguage(1)
      }
    
        if(localStorage.getItem('uid')!=null)
        {
            console.log(localStorage.getItem('uid'));
           fetch('/api/ip').then(res=>{res.json().then(async(data)=>{

          let snap=await getDoc(doc(db,"users",localStorage.getItem('uid'))).catch((err)=>{alert('no');router.push('/auth')});
          if(snap.data().ip.includes(data['detectedIp'])){
           SetLoading(false)
           if(snap.data().meeting?.length>0){
            getDoc(doc(db,"meetings",snap.data().meeting[0])).then((data)=>{
               if( (new Date().getTime()-60*60*1000)> (data.data().time["seconds"]*1000))
               {

               }
               else{
                SetMeetings(data.data())
                SetIdMeeting(data.id)
               }
              
            }).then(()=>{
              SetLoading(false)
            })
           }
           if(snap.data().cattles.length===0){
            
           }
           else{
            setCattles(snap.data().cattles)
           }
           if(snap.data().checkups.length!=0){
            SetCheckup(snap.data().checkups)
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
      <MantineProvider withNormalizeCSS withGlobalStyles>
           <Notifications />
        <div style={{ position:'absolute',top:'0px',margin:'0px'}}>
       
           {loading?<div className={styles.loading} ><Loader size={"lg"}/></div>:<div className="main">
           <AppShell
      padding="md"
      navbar={width>955? <Navbar  width={{ base: 300 }} bg="#012B90" m={'0px'}  p="xs">{<div className={styles.navigation}>
        <div style={{background:'#3468E4'}} className={styles.navbutton}>{language?"होम पेज":"Home"}</div>
        <div onClick={()=>{router.push('/health')}} className={styles.navbutton}>{language?"स्वास्थ्य जांच":"Health checkup"}</div>
        <div onClick={()=>{router.push('/doctor')}} className={styles.navbutton}>{language?"डॉक्टरों":"Doctors"}</div>
        <div onClick={()=>{router.push('/meet')}} className={styles.navbutton}>{language?"एक डॉक्टर से मिलें":"Meet a doctor"}</div>
        <div onClick={()=>{router.push('/comman')}} className={styles.navbutton}>{language?"सामान्य रोग और उनके लक्षण":"common disease"}</div>
       <motion.div onClick={()=>{router.push('/profile')}} onHoverStart={()=>{setHovered(true)}} onHoverEnd={()=>{setHovered(false)}}  className={styles.profile}>
          <Avatar radius={"xl"} color="indigo" m={"sm"}  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        <h1 className={roboto.profile} style={{color:'#fff',fontWeight:400}}> {language?"प्रोफ़ाइल":"Profile"}</h1><motion.h2 
        animate={{x:isHovered?0:-10}}
        className={styles.arrow}>&gt;</motion.h2>
       </motion.div>
        </div>}</Navbar>:<div></div>}
      header={
      width>955?
      <Header  bg={'#111'} height={65} p="xs">{
        <Image pos={"fixed"} top={"0.5rem"} maw={"6em"}  src={"https://i.ibb.co/2K1FCG1/Whats-App-Image-2023-09-25-at-08-28-01-removebg-preview.png"} ></Image> }</Header>:
        <Header  bg={'#111'} height={65} p="xs">{
          <div  style={{width:'100%',alignItems:'center',display:'flex',flexDirection:'row'}}>
          <RxHamburgerMenu onClick={()=>{SetDrawerOpen(!drawerOpen)}} size={"2rem"} style={{marginRight:'20px'}} color="#fff"></RxHamburgerMenu>
          <h1 className="logo">Nandani</h1></div> }</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Drawer opened={drawerOpen}  onClose={()=>{SetDrawerOpen(false)}}>
      <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
      <div  className={styles.bnavbutton}>{language?"होम पेज":"Home"}</div>
        <div className={styles.bnavbutton}>{language?"स्वास्थ्य जांच":"Health checkup"}</div>
        <div onClick={()=>{router.push('/mycattles')}} className={styles.bnavbutton}>{language?"मेरी गायें":"My cattle"}</div>
        <div onClick={()=>{router.push('/meet')}} className={styles.bnavbutton}>{language?"एक डॉक्टर से मिलें":"Meet a doctor"}</div>
        <div onClick={()=>{router.push('/comman')}} className={styles.bnavbutton}>{language?"सामान्य रोग और उनके लक्षण":"common disease"}</div>
  </div>       

      </Drawer>
      {meetings?<Card mb={"xl"} h="12rem" shadow="sm" padding="lg" radius="md" withBorder>
     
      <Text  pt="md"  weight={500}>{language?"बैठक निर्धारित":"Meeting Scheduled"}</Text>
      <Group mt="md">
        <AiOutlineClockCircle/>
      <Text   >{`${new Date (meetings.time['seconds']*1000).getDate()   } ${months[new Date (meetings.time['seconds']*1000).getMonth()]} ${ new Date (meetings.time['seconds']*1000).getFullYear()}`}</Text>
  
      </Group>
  <Text>{ parseInt(new Date (meetings.time['seconds']*1000).getHours())>9?new Date (meetings.time['seconds']*1000).getHours():new Date (meetings.time['seconds']*1000).getHours().toString().padStart(2,"0") }:{ parseInt(new Date (meetings.time['seconds']*1000).getMinutes())>9?new Date (meetings.time['seconds']*1000).getMinutes():new Date (meetings.time['seconds']*1000).getMinutes().toString().padStart(2,"0")} - {parseInt(new Date (meetings.time['seconds']*1000).getHours())+1>9?new Date (meetings.time['seconds']*1000).getHours()+1:parseInt(new Date (meetings.time['seconds']*1000).getHours()+1).toString().padStart(2,"0") }:{parseInt(new Date (meetings.time['seconds']*1000).getMinutes())>9?new Date (meetings.time['seconds']*1000).getMinutes():new Date (meetings.time['seconds']*1000).getMinutes().toString().padStart(2,"0")}</Text>
        <Button size="md" onClick={()=>{
          router.push(`/meet/${idMeeting}`)
          console.log(new Date (meetings.time['seconds']*1000).getTime()-(new Date (meetings.time['seconds']*1000).getTime()-10*1000))
        }} disabled={((new Date (meetings.time['seconds']*1000).getTime()-3000)> new Date().getTime() )||((new Date (meetings.time['seconds']*1000).getTime()+60*60*1000)< new Date().getTime()) } style={{left:'50%',transform:'translateX(-50%)'}} >{language?" शामिल हों":"Join"} </Button>
        </Card> :<div></div>}
      {
           <Modal opened={cattles.length===0} onClose={()=>{notifications.show({
            color:'red',
            title:'Sorry',
            message:'You Have To Add Atleast One Cattle'
           })}} >
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
                const snap= await getDoc(doc(db,"users",localStorage.getItem('uid')))
                if(snap.exists())
                {
                  let arr=snap.data().cattles
                  arr.push(cattle)
                updateDoc(doc(db,"users",localStorage.getItem('uid')),{
                  cattles:arr
                }).then(()=>{
                  SetLoading(false)
                  setUserDefined(true)
                  setCattles(arr)
                })
                }
                else{
                  alert("there has been som error")
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
      {checkup.length>0?<div>
        <Modal onClose={()=>{
          notifications.show({
            message:language?"अगर आप कैंसल करना चाहते हैं तो कैंसल बटन दबाएं":'If you want to cancle then press the cancle button',
          color:'red'
          })
        }}  opened={checkup.length>0}>
          <h3 style={{textAlign:'center'}}>Appointment Confirmed</h3>
     <Text mt="xl" align="center"> {language?"डाक्टर":"Doctor"}:  <span>{checkup[0].doctor}</span></Text>
     <Text mt="xl" align="center"> {language?"तारीख":"Date"}:  <span>{new Date(checkup[0].date["seconds"]*1000).getDate()}/{new Date(checkup[0].date["seconds"]*1000).getMonth()+1}/{new Date(checkup[0].date["seconds"]*1000).getFullYear()}</span></Text>
     <Select
      label={language?"उपयुक्त तिथि":"Appropriate Time"}
      placeholder="Pick one"
      value={timeSelect}
      onChange={(e)=>{SetTimeSelect(e)}}
      data={[
        { value: checkup[0].time[0], label: checkup[0].time[0] },
        { value: checkup[0].time[1], label: checkup[0].time[1] },
        { value: checkup[0].time[2], label: checkup[0].time[2] },
      ]}
    />
    <div style={{display:'flex',flexDirection:'column'}}>
    <Button mt="xl" onClick={()=>{
      SetLoading(true);
       months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December']
   
      let date=new Date(checkup[0].date["seconds"]*1000).getDate();
      let month=months[new Date(checkup[0].date['seconds']*1000).getMonth()]
     
    let year=new Date(checkup[0].date["seconds"]*1000).getFullYear()
      let dateOfAppointment=new Date(`${month} ${date},${year} ${timeSelect}`)
      console.log(dateOfAppointment)
       

     
      fetch(`https://videocall-0xvg.onrender.com/uid`).then((data)=>{
        data.json().then(async(json)=>{
          
          await getDoc(doc(db,"users",localStorage.getItem("uid"))).then(async (data)=>{
            let refs
          if(data.data()){
          data.data().meeting
          }
            refs=[]
            let date=new Date(checkup[0].date["seconds"]*1000)
            if(refs){
            refs.push(json["meeting"])
            }
            else{
              refs=[]
              refs.push(json["meeting"])
            }

            await updateDoc(doc(db,"users",localStorage.getItem("uid")),{
            meeting:refs
          })
       
          await updateDoc(doc(db,"doctors",checkup[0].doctor),{
            meeting:refs
          })
          await setDoc(doc(db,"meetings",json["meeting"]),{
            time:dateOfAppointment,
            doctor:checkup[0].doctor,
            users:[]
          })
          await updateDoc(doc(db,"users",localStorage.getItem("uid")),{checkups:[]}).then(()=>{
            SetLoading(false)
            router.reload()
          })
        })
        })
      })
    }}  style={{left:'50%',transform:'translateX(-50%)'}}> {language?"पुष्टि करे":"Confim It"}</Button>
    <Button mt="xl" onClick={()=>{SetCheckup([]);updateDoc(doc(db,"users",auth.currentUser.uid),{checkups:[]});language?notifications.show({color:'red',message:"कृपया इसे न दोहराएं डॉक्टरों के पास पहले से ही तंग कार्यक्रम हैं और यहां आपकी मुफ्त में मदद करने के लिए हैं"}):notifications.show({color:'red',message:"Please donot repeat this Doctors Already Have tight schedules and are here to Help you for free "})}} color="red"  style={{left:'50%',transform:'translateX(-50%)'}}>  {language?"रद्द":"Cancel"}</Button>
    </div>
    </Modal>
    </div>
    :
    <div>
          {/* <div className={styles.healthReport}>
        <h2>{language?"स्वास्थ्य रपट":"Health Report"}</h2>
        <p>{!language?"26 May 2023":"26 मई 2023"}</p>
        <div style={{display:'flex',marginLeft:'50%',justifyContent:'center',position:'absolute',flexDirection:'row',width:'100%',top:'50%',transform:'translate(-50%,-50%)'}}>
        <AiFillCheckCircle style={{width:'60px',height:'80px'}}  color="#2cbf49"></AiFillCheckCircle>
          <h1  style={{display:'inline-block',paddingTop:'20px'}} >Your cattle seems healthy </h1><br></br>
        
          </div>
          <div style={{position:'absolute',bottom:'10px',textAlign:'center',width:'100%'}} >
          <Text>But if you still feel your cow is unwell call:</Text>
          <Text>+91 82529 13367</Text>
          </div>
          </div>


      <div style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
  
    
    </div> */}
    </div>

    }
    <Text pl={30} mt="xl">Medical stores in your area</Text>
    <Center> <Map cords={[ 86.1511,23.6693]}></Map></Center>
    <LanguageDiv></LanguageDiv>

    </AppShell>
            </div>}   
            </div>
            </MantineProvider>
    );
}



export default index;