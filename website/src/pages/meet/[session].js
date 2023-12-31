import { useEffect,useLayoutEffect, useState,useRef } from 'react';
import {db} from '../../Firebaseconfig'
import { useRouter } from 'next/router'
import { io } from "socket.io-client";
import  {BsFillMicMuteFill,BsCameraVideoFill,BsFillChatFill, BsMicFill, BsMicMuteFill, BsCameraVideoOffFill, BsCamera} from 'react-icons/bs'
import {FiCameraOff} from 'react-icons/fi'
import Webcam from 'react-webcam';
import { Button, Center,Modal, Drawer, Grid,ScrollArea, PasswordInput, Text, TextInput, Tooltip, Textarea, FileInput } from '@mantine/core';
import styles from '../../styles/call.module.css'
import {MdOutlineMoreVert} from 'react-icons/md'
import Medicine from './undraw_medicine_b-1-ol.svg'
import useTimer from '../../hooks/useTimer'
import{GrClose} from 'react-icons/gr'
import {  getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import {motion} from 'framer-motion'
import { getStorage,getDownloadURL, ref,uploadBytes } from "firebase/storage";
import { jsPDF } from "jspdf";
import { AiOutlineUser } from 'react-icons/ai';
import { setDoc,doc, getDoc, updateDoc } from 'firebase/firestore';


function session() {

  let remoteStream
  const servers = {
   iceServers:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
    ]
}

  let peerConnection ;
  let dataStream;
    
  const router = useRouter();
 const [joined,SetJoined]=useState(false)
  let socket
  const[timerStarted,SetTimerStarted]=useState(false)
 const time= useTimer(50,timerStarted)
 const[messages,SetMessages]=useState([])
 const [otherVideo,SetOtherVideo]=useState(false)
  const[micOpen,SetMicOpen]=useState(true)
  const [webcamRef,SetWebCamRef] = useState(null)
  const [logedIn,SetLogedIn]=useState(false)
  const doctorDiv=useRef(null);
  const [sdpOfferCreated,SetSdpOfferCreated]=useState(null)
  const [name,SetNmae]=useState("")
  const[designation,SetDesignation]=useState('')
  const[medicines,SetMedicines]=useState('')
  const [password,SetPssword]=useState("")
  const[registrationNO,SetRegistrationNO]=useState('')
  const [modelDiagnosis,SetDiagnosis]=useState(false)
  const [uploadModel,SetUpoadModel]=useState(false)
  const [chatOpen,SetChatOpen]=useState(false)
  const [FInalPrescription, setPrescription] = useState(null)
  const [fileInput,SetFIleInput]=useState(null)
  const storage = getStorage();
 
  
  const auth=getAuth()
  const[cameraOpen,SetCameraOpen]=useState(true)
  async function   hadleLogin(){
    const arr=[]
    const data=[]

    await signInWithEmailAndPassword(auth,name.replace(/\s+/, "")+"@gmail.com",password).then(()=>{
   SetLogedIn(true)   
     
    }).catch((err)=>{
      console.log(err.message)
    })

  }
  useEffect(()=>{
    
    console.log(time)
  },[time])
  useEffect(() => {
    
  async function a(){
    let temp=await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true,
    }
    )
 

    SetWebCamRef(temp)
  
  }
    if(localStorage.getItem("uid")!=null){
      SetLogedIn(true)
    
        a()
    
      }
      else{
        a()
      }
    

    
  },[] );
  async function removeVideoStream() {
   
    if(cameraOpen)

    {
      
    webcamRef.getTracks().forEach((track) => {track.enabled=false;});
    
    }
    else{
        
       
    webcamRef.getTracks().forEach((track) => {track.enabled=true;});
    
    }
    
  }
  useEffect(()=>{
    if(cameraOpen){
      if(document.querySelector('#myVideo')){
        document.querySelector('#myVideo').srcObject=webcamRef
      }
      

    }
  },[cameraOpen])
  function sendMessage(){
    
  }
  
 
  useEffect(() =>{
  
    const socketInitializer = async () => {
        if(router.isReady && webcamRef){
           const {id} = router.query
      await fetch('http://localhost:4000').then(( )=>{
        if(logedIn){
        socket = io('http://localhost:4000',{
          transports:["websocket"]
        })
        socket.on('pres_av',()=>{
          
          alert("recived")
          const storageRef = ref(storage,"dr suresh"+'01');
          getDownloadURL(storageRef)
  .then((url) => {
    console.log(url)
    window.open(url, '_blank')
  })
         })
      
        socket.emit("roomID",router.query.session)
        socket.on("prscription_recived",()=>{
          alert("prescription recived")
         })
        peerConnection = new RTCPeerConnection(servers)
        dataStream=peerConnection.createDataChannel('dataChannel');
        socket.emit("allChat")
        socket.on("time",()=>{
          SetTimerStarted(true)
         })
        socket.on("allChats",(data)=>{
          SetMessages(data)
        })  
        socket.on('getRequest',async()=>{
          
         
        
          
          remoteStream = new MediaStream()
          
          document.getElementById('user-2').srcObject = remoteStream
         
          webcamRef.getTracks().forEach((track) => {
              peerConnection.addStream(webcamRef)
          })
      
          peerConnection.ontrack = async (event) => {
              event.streams[0].getTracks().forEach((track) => {
                  remoteStream.addTrack(track)
                  SetOtherVideo(true)
      
              })
          }
          peerConnection.oniceconnectionstatechange = async function() {
            if(peerConnection.iceConnectionState == 'disconnected') {
        
            
                socket.emit('disconnected')
                document.querySelector('#user-2').srcObject=null
                alert('Disconnected');
            }
        }
       
        peerConnection.onicecandidate = async (event) => {
              if(event.candidate){
                
         SetJoined(true)
                let OfferD=peerConnection.localDescription
               socket.emit('request',OfferD)
                const offerSend={
                  offer: {
                type: offer.type,
                sdp: JSON.stringify(offer),
            }
          }
        
               await updateDoc(doc(db,"meetings",router.query.session),{
                users:[offerSend]
              })
             
              }
          }
          let offer=await peerConnection.createOffer()
          let OfferD=peerConnection.localDescription
          peerConnection.setLocalDescription(offer)
        
        })
       
     
        socket.on('getAnswer',async()=>{
          
         
         console.log("ok")
         alert(router.query.session)
         const offer=JSON.parse((await getDoc(doc(db,"meetings",router.query.session))).data().users[0]["offer"]["sdp"])
         console.log(offer)  
         remoteStream = new MediaStream()
           document.getElementById('user-2').srcObject = remoteStream
     
           SetOtherVideo(true)
           peerConnection.setRemoteDescription(offer).catch(err=>{
             console.log(err)
           })
           
           webcamRef.getTracks().forEach((track) => {
               peerConnection.addTrack(track,webcamRef)
           })
       
           peerConnection.ontrack = async (event) => {
            
               event.streams[0].getTracks().forEach((track) => {
                   remoteStream.addTrack(track)
               })
           }
       
         peerConnection.onicecandidate = async (event) => {
               if(event.candidate){
                 let answerD=peerConnection.localDescription
                 console.log(answerD)
                 socket.emit('answer_m',answerD)

                 await updateDoc(doc(db,"meetings",router.query.session),{
                  users:[offer.toString(),answerD.toString()]
                })
                }
           }
           
           let answer=await peerConnection.createAnswer()
           console.log(answer)

           peerConnection.setLocalDescription(answer)
     
     
         })
        
         socket.on("closeit",()=>{
          peerConnection.close()

          router.reload()
         })
         
        socket.on("anwerData",(data)=>{
          socket.emit("count")
          
          if(!peerConnection.currentRemoteDescription){
            
           peerConnection.setRemoteDescription(data).catch((err)=>{
              console.log(err)
           })
          }
        })
        socket.on("hehe",async()=>{
        if( document.querySelector('#myVideo')){
          
          document.querySelector('#myVideo').srcObject=webcamRef
         }
      
        socket.on("chat",(msg)=>{
          const messaseInfo={
            message:msg["chat"],
            from:msg["from"]
          }
          let temp=messages
          temp.push(messaseInfo)
  
          SetMessages([...new Set(temp)])
      
        })    }
      )
        }
  
      }
    
      )
    
    }
  }
    
    socketInitializer()}, [logedIn,webcamRef,uploadModel])
  
 

  return (
  <>


   <Modal zIndex={5} onClose={()=>{SetDiagnosis(false)}} opened={modelDiagnosis}>
        <Center><Text>Provide Diagnosis</Text></Center>
        
        <TextInput placeholder='Registration Number' value={registrationNO} onChange={(e)=>{SetRegistrationNO(e.target.value)}} mt={'xl'}></TextInput>
    <TextInput placeholder='Designation' value={designation} mt="xl" onChange={(e)=>{SetDesignation(e.target.value)}}></TextInput>
        <Textarea mt={"xl"} value={medicines} onChange={(e)=>{SetMedicines(e.target.value)}} placeholder='provide prescription'>
        </Textarea>
      <FileInput mt="xl" accept="image/png,image/jpeg" value={fileInput} onChange={(e)=>{SetFIleInput(e)}} placeholder='signature'></FileInput>
      <Center><Button mt="xl" onClick={async ()=>{
        function addWaterMark(doc) {
  var totalPages = doc.internal.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
    doc.setTextColor(150);
    doc.setFontSize(200);
     console.log(fileInput)

    doc.text(10, doc.internal.pageSize.height - 100, 'FAKE');
  }

  return doc;
}

        const doc = new jsPDF();
    
        addWaterMark(doc)
 doc.setFont("times");
  
  doc.setTextColor(75, 214, 135);
   doc.setFontSize(20)
 doc.text(30, 30, 'Nandai Online Prescription ');
 doc.setFontSize(20)
 doc.setTextColor(102, 102, 102)
 doc.setFont('Arial')
 doc.text(30,50,`Doctor: ${name.toUpperCase()}`)
 doc.text(30,65,`Registration: ${registrationNO}`)
 
 doc.text(30,75,`Designation: ${designation}`)
 doc.text(30,95,"Medicines:")
 doc.setTextColor(12)
 doc.text(30,105,`${medicines}`)
     if(fileInput){
      //  const reader = new FileReader()
      //  reader.onload = (evt) => {
      //   console.log(evt.target.result);
      // };
       const url=URL.createObjectURL(fileInput)
       doc.addImage(url,"JPG",30,200,80,50)
     }
     console.log(doc.output)
    
doc.save("prescription.pdf")

      }} variant="light" color="indigo">Make Prescription</Button></Center>
 <Center> <Text mt="md">Please Confim  The Prescrption  and Uplaod </Text>
   </Center>
   <Center>
    <FileInput placeholder='Final Prescription' mt="md" value={FInalPrescription} onChange={(e)=>{setPrescription(e)}}  ></FileInput>
   </Center>
   <Center>
    <Button mt="md" variant='light' onClick={()=>{
      if(dataStream){
        alert('data Stream defined')
        console.log(dataStream)
      }
       const storageRef = ref(storage,name+'01');
      uploadBytes(storageRef,FInalPrescription).then(()=>{
        socket = io('http://localhost:4000',{
          transports:["websocket"]
        })
        socket.emit("pres")
      
    })}} color='green'>Upload</Button>
   </Center>
  
       
      
      </Modal>
  {logedIn?
 
 <>
 <Modal opend={modelDiagnosis} display={"flex"}  zIndex={5090} onClose={()=>{alert(false)}}>
   <Center> <Text>Please Confim  The Prescrption  and Uplaod </Text>
   </Center>
   <Center>
    <FileInput value={FInalPrescription} onChange={(e)=>{setPrescription(e)}}  ></FileInput>
   </Center>
   <Center>
    <Button variant='light' onClick={()=>{alert("hi")}} color='indigo'>Upload</Button>
   </Center>
   
  </Modal>
 {chatOpen?
 <div   className={styles.chatArea}  shadow={false}>
  <div className={styles.ChatLabel}>
    <Text pl={"xl"} pt="md">Chat </Text>
    <GrClose onClick={()=>{SetChatOpen(false)}} style={{display:'block',position:'absolute',right:'10px',top:'16px',cursor:'pointer'}} />
  </div>
          <ScrollArea h={'18rem'}>
        {
         messages.map((el)=>{
            return(
              <div className={styles.messageBubble}>
                <Text>{el["message"]}</Text>
              </div>
            )
          })
        }
            </ScrollArea>       
 <div style={{width:'90%',position:'absolute',bottom:'1rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
  <Grid columns={4}   w={"100%"} >
 <Grid.Col span={3}><TextInput
 data-autofocus
          
      placeholder="Message.."
     id="chatBox"
    /></Grid.Col>
    <Grid.Col span={1}>
    <Button onClick={()=>{let message=document.querySelector('#chatBox').value
    socket = io('http://localhost:4000',{
        transports:["websocket"]
      })
    console.log(socket)
   socket.emit('messages',message)}}>Send</Button>
    
    </Grid.Col>
    </Grid></div>
 </div>:<div ></div>
}
 <div className={styles.call}>
   
   <div className={styles.videos}>
   <div>
  
  {cameraOpen?
   <video className='myVideo' id="myVideo" autoPlay controls={false}></video>
  :<div className={styles.noVideo}>
    <div className={styles.noVidLogo}>
      <div>
      <AiOutlineUser color='#fff' size={50}></AiOutlineUser>
      </div>
    </div>
  </div>
  }
   </div>
    <div>
    {otherVideo?<></>: <div className={styles.noVideo}>
      <div className={styles.noVidLogo}>
        <div>
        <AiOutlineUser color='#fff' size={50}></AiOutlineUser>
        </div>
      </div>
    </div>}
   
    <video className='user-2' id="user-2" autoPlay controls={false}></video>
    </div>
   
    </div>
   
   
   
    <div className={styles.control}>
      <div>
        {
          
        }
      </div>
    <div className={styles.main}>
      {
        localStorage.getItem("uid")==null?<Button ml={"xl"} onClick={()=>{SetDiagnosis(true)}} variant="light">Make Diagnosis</Button>:
        <div></div>

      }
     
      <Tooltip label={"Mic"}>
        {micOpen?
      <div  onClick={()=>{SetMicOpen(!micOpen)}} className={styles.mic}>
      <BsMicFill/>
      </div>: <div  onClick={()=>{SetMicOpen(!micOpen)}} className={styles.micActive}>
      <BsFillMicMuteFill />
      </div>
}
      </Tooltip>
      <Tooltip label={"Camera"}>
        {cameraOpen?
      <div onClick={()=>{SetCameraOpen(!cameraOpen);removeVideoStream()}} className={styles.camera}>
        <BsCamera></BsCamera>
      </div>: <div onClick={()=>{SetCameraOpen(!cameraOpen);removeVideoStream()}} className={styles.micActive}>
      <FiCameraOff></FiCameraOff>
      </div>}
      </Tooltip>
    </div>
    <div className={styles.accesories}>
  <Tooltip label={"chat"}>
    <div onClick={()=>{SetChatOpen(!chatOpen)}} className={styles.chat}>
    <BsFillChatFill/>
    </div>
    </Tooltip>
    <Tooltip  label={"More"}>
    <div className={styles.more}>
      <MdOutlineMoreVert/>
    </div>
    </Tooltip>
   
    </div>
    
  </div>
  </div>
  </>
//   <div  >
//     <motion.div
//     dragConstraints={doctorDiv}
//     drag
//     dragElastic={false}
//     dragMomentum={false}
//     style={{
//       position:"absolute",
//       zIndex:2,
//       display:'flex',
//       alignItems:'center',
//       justifyContent:'center',
//       borderRadius:'1rem',
//       background:'#000',
//       transform:'translateY(-20%)',
//       width:'300px',
//       height:'100px',
    
  
//     }}

//     >
//        {cameraOpen?
//         <video   style={{
//           position:"absolute",
//           zIndex:2,
//           display:'flex',
//           alignItems:'center',
//           justifyContent:'center',
//           borderRadius:'1rem',
//           background:'#000',
//           transform:'translateY(-20%)',
//           width:'300px',
//           height:'300px',
        
      
//         }} id="myVideo" allow="camera;microphone" className="myVideo" autoPlay playsInline controls={false} />:<motion.div
      
//       style={{
//         display:'flex',
//         top:'30px',
//         alignItems:'center',
//         justifyContent:'center',
//         borderRadius:'1rem',
//         background:'#000',
//         transform:'translateY(-20%)',
//         width:'200px',
//         height:'150px',
      
    
//       }}>
//         <BsCameraVideoOffFill color='#fff'/>

//       </motion.div>

// }

//       </motion.div>
// <div ref={doctorDiv} className={styles.doctor}>
// <video id="user-2" allow="camera;microphone" className="silhouetteVideo" autoPlay playsInline controls={false} />
//      {!joined?
//   <Text>Your Docotor Will Join You Soon</Text>:<div></div>}
// </div>
     
//     <div  className={styles.features}>
   
//       <div onClick={()=>{SetMicOpen(!micOpen)}}>
//       {
//           micOpen?
//         <BsMicFill  color='#fff' />
//         :
//         <BsMicMuteFill  color='#fff'/>
//         }
      
//       </div>
//       <div onClick={()=>{SetCameraOpen(!cameraOpen);removeVideoStream()}}> 
//       {
//          cameraOpen?
//         <BsCameraVideoFill   color='#fff' />
//         :
//         <BsCameraVideoOffFill  color='#fff'/>
//         }
//       </div>
//       <div>
//         <MdOutlineCallEnd  color='#fff'/>
//       </div>
//     </div>
//     <div className={styles.chat}>
//     <div >
//       <div className={styles.chatLabel}>
//         <div>
//         <Text color='#fff' size={"xl"}>Chat</Text>
         
//         </div>
        
        
        
//       </div>
//       <div>
//     <input placeholder='Type Someting...' id="chatBox" className={  styles.chatBox} type="text"></input>
//     <button onClick={()=>{let message=document.querySelector('#chatBox').value
//       socket = io('http://localhost:4000/',{
//         transports:["websocket"]
//       })
//     console.log(socket)
//    socket.emit('messages',message)}}>Click</button>
//     </div>
//     <ul className={styles.chatList}>
//             {
//           messages.map((el)=>{
//             return(
//               <li>
//                  <h3>{el["message"]}</h3>
//                  <p>{el["from"]}</p>
//               </li>
//             )
//           })
//         }
//           </ul>
    
//     </div>
//     </div>
    
:<div className={styles.login}>
    <div className={styles.box}>
      <div>
      <Text align='center'>Login</Text>
      <TextInput value={name} onChange={(e)=>{SetNmae(e.target.value)}} placeholder="Name"></TextInput>
      <PasswordInput value={password} onChange={(e)=>{SetPssword(e.target.value)}} mt="md" placeholder='Password' ></PasswordInput>
      <Center><Button onClick={hadleLogin} mt={"md"}>Submit</Button></Center>
      </div>

    </div>
    </div>}
  </>);
}

export default session;