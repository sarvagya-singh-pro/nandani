import { useEffect,useLayoutEffect, useState,useRef } from 'react';
import {db} from '../../Firebaseconfig'
import { useRouter } from 'next/router'
import { io } from "socket.io-client";
import  {BsFillMicMuteFill,BsCameraVideoFill,BsFillChatFill, BsMicFill, BsMicMuteFill, BsCameraVideoOffFill} from 'react-icons/bs'
import {MdOutlineCallEnd} from 'react-icons/md'
import Webcam from 'react-webcam';
import { Button, Center, PasswordInput, Text, TextInput } from '@mantine/core';
import styles from '../../styles/call.module.css'
import Medicine from './undraw_medicine_b-1-ol.svg'
import {  getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import {motion} from 'framer-motion'
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
    
  const router = useRouter();

  let socket
 const[messages,SetMessages]=useState([])
  const[micOpen,SetMicOpen]=useState(true)
  const [webcamRef,SetWebCamRef] = useState(null)
  const [logedIn,SetLogedIn]=useState(false)
  const doctorDiv=useRef(null);
  const [sdpOfferCreated,SetSdpOfferCreated]=useState(null)
  const [name,SetNmae]=useState("")
  const [password,SetPssword]=useState("")
  const auth=getAuth()
  const[cameraOpen,SetCameraOpen]=useState(true)
  async function   hadleLogin(){
    const arr=[]
    const data=[]

    await signInWithEmailAndPassword(auth,name.replace(/\s+/, "")+"@gmail.com",password).then(()=>{
   SetLogedIn(true)   
     
    }).catch((err)=>{
      alert(err.message)
    })

  }
  useEffect(() => {
    
  async function a(){
    let temp=await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:false,
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
      await fetch('http://localhost:4000/').then(( )=>{
        if(logedIn){
        socket = io('http://localhost:4000/',{
          transports:["websocket"]
        })
        socket.emit("roomID",router.query.session)
        peerConnection = new RTCPeerConnection(servers)
          
        socket.on('getRequest',async()=>{
          
         
        
          
          remoteStream = new MediaStream()
          
          document.getElementById('user-2').srcObject = remoteStream
      
          webcamRef.getTracks().forEach((track) => {
              peerConnection.addStream(webcamRef)
          })
      
          peerConnection.ontrack = async (event) => {
              event.streams[0].getTracks().forEach((track) => {
                  remoteStream.addTrack(track)
              })
          }
          peerConnection.oniceconnectionstatechange = async function() {
            if(peerConnection.iceConnectionState == 'disconnected') {
        
              socket.emit('roomID',"ninja")
             await peerConnection.setRemoteDescription(null)
    
               peerConnection.close();
                socket.emit('disconnected')
                document.querySelector('#user-2').srcObject=null
                alert('Disconnected');
            }
        }
        peerConnection.onicecandidate = async (event) => {
              if(event.candidate){
                let OfferD=peerConnection.localDescription
               socket.emit('request',OfferD)
             
              }
          }
          let offer=await peerConnection.createOffer()
          let OfferD=peerConnection.localDescription
          peerConnection.setLocalDescription(offer)
        
        })
       
        socket.on('getAnswer',async(offer)=>{
         console.log("ok")
           remoteStream = new MediaStream()
           document.getElementById('user-2').srcObject = remoteStream
     
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
               }
           }
           
           let answer=await peerConnection.createAnswer()
           console.log(answer)
           peerConnection.setLocalDescription(answer)
     
     
         })
         
        socket.on("anwerData",(data)=>{
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
    
    socketInitializer()}, [logedIn,webcamRef])
   
 

  return (
  <>
  {logedIn?
  <div  >
    <motion.div
    dragConstraints={doctorDiv}
    drag
    dragElastic={false}
    dragMomentum={false}
    style={{
      position:"absolute",
      zIndex:2,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:'1rem',
      background:'#000',
      transform:'translateY(-20%)',
      width:'300px',
      height:'100px',
    
  
    }}

    >
       {cameraOpen?
        <video   style={{
          position:"absolute",
          zIndex:2,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:'1rem',
          background:'#000',
          transform:'translateY(-20%)',
          width:'300px',
          height:'300px',
        
      
        }} id="myVideo" allow="camera;microphone" className="myVideo" autoPlay playsInline controls={false} />:<motion.div
      
      style={{
        display:'flex',
        top:'30px',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'1rem',
        background:'#000',
        transform:'translateY(-20%)',
        width:'200px',
        height:'150px',
      
    
      }}>
        <BsCameraVideoOffFill color='#fff'/>

      </motion.div>

}

      </motion.div>
<div ref={doctorDiv} className={styles.doctor}>
<video id="user-2" allow="camera;microphone" className="silhouetteVideo" autoPlay playsInline controls={false} />
     {!remoteStream?
  <Text>Your Docotor Will Join You Soon</Text>:<div></div>}
</div>
     
    <div  className={styles.features}>
   
      <div onClick={()=>{SetMicOpen(!micOpen)}}>
      {
          micOpen?
        <BsMicFill  color='#fff' />
        :
        <BsMicMuteFill  color='#fff'/>
        }
      
      </div>
      <div onClick={()=>{SetCameraOpen(!cameraOpen);removeVideoStream()}}> 
      {
         cameraOpen?
        <BsCameraVideoFill   color='#fff' />
        :
        <BsCameraVideoOffFill  color='#fff'/>
        }
      </div>
      <div>
        <MdOutlineCallEnd  color='#fff'/>
      </div>
    </div>
    <div className={styles.chat}>
    <div >
      <div className={styles.chatLabel}>
        <div>
        <Text color='#fff' size={"xl"}>Chat</Text>
         
        </div>
        
        
        
      </div>
      <div>
    <input placeholder='Type Someting...' id="chatBox" className={  styles.chatBox} type="text"></input>
    <button onClick={()=>{let message=document.querySelector('#chatBox').value
      socket = io('http://localhost:4000/',{
        transports:["websocket"]
      })
    console.log(socket)
   socket.emit('messages',message)}}>Click</button>
    </div>
    <ul className={styles.chatList}>
            {
          messages.map((el)=>{
            return(
              <li>
                 <h3>{el["message"]}</h3>
                 <p>{el["from"]}</p>
              </li>
            )
          })
        }
          </ul>
    
    </div>
    </div>
    
  </div>:<div className={styles.login}>
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