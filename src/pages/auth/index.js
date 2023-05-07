import style from '../../styles/Auth.module.css'
import{Header,LoadingOverlay, ColorSchemeProvider,MantineProvider, Input,Text,Card ,Box,PasswordInput,Button} from '@mantine/core'
import { useEffect, useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import {useColorScheme} from '@mantine/hooks'
import{motion} from 'framer-motion'
import{doc,getDoc,setDoc} from 'firebase/firestore'
import{db} from '../../Firebaseconfig'
import { notifications,Notifications  } from '@mantine/notifications';
import{getAuth, createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider, signInWithEmailAndPassword} from 'firebase/auth'
import { useRouter } from 'next/router'
export default function auth() {
  const provider = new GoogleAuthProvider();
  const router = useRouter()
  function handleSignUp(){
    var phoneno = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(phoneno.test(emailSignup.trim())===false){
      notifications.show({
        color:'red',
        title: 'Oops!',
       message:'Invalid Email',
      })}

    
    else if(emailSignup.trim()===""||passwordSignup.trim()===""||confirmPassword.trim()===""||nameSignup.trim()===""){
        notifications.show({
          color:'red',
          title:'Oops!',
          message:'fill all the details'
        })
    }
    else if(passwordSignup.trim()!=confirmPassword.trim()){
      notifications.show({
        color:'red',
        title:'oops!',
        message:'passwords donot match',
      })
    }
    
    else{
      SetVisible(true)
      if(EmailError==="" && LoginpasswordError===""){
     
           createUserWithEmailAndPassword(auth ,emailSignup,passwordSignup).then((user)=>{
              fetch('/api/ip').then(res=>{res.json().then(async(data) =>{
              let snap= await getDoc(doc(db,"users",auth.currentUser.uid))  
              if(snap.exists()){
               
                if(snap.data().ip.includes(data)!=false){
                  let arr=snap.data().ip
                  let cattles=snap.data()
                  arr.push(data['detectedIp'])
                  setDoc(doc(db,"users",auth.currentUser.uid),{
                    ip:arr,
                    name:nameSignup,
                    cattles:cattles,
                  })
                  router.push('/dashboard')
                }
                
  
              }
              else{
              setDoc(doc(db,"users",auth.currentUser.uid),{
                ip:[data["detectedIp"]],
                name:nameSignup,
                cattles:[],
                checkups:[],
              })
              localStorage.setItem("uid",auth.currentUser.uid)

              router.push('/dashboard')
           
            
            }
            })
          })})}
        }
        
         

  
}
  const handleLogiIn=async()=>{
    
    alert("no")
       
  
   
  }
  function googleLogin(){
    signInWithPopup(auth, provider)
  .then((result) => { const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    console.log(auth.currentUser.uid)
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${credential.accessToken}`).then(res=>{
      res.json().then(data=>{console.log(data);alert(auth.currentUser.uid)})
    })
    const user = result.user;}).catch((error)=>{alert(error.message)})
  }
  function validateEmail(){
    var phoneno = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(phoneno.test(loginEmail.trim()))
    {
      SetEmailError("")
    }
    else{
      SetEmailError('Improper Email format')
    }
  }
function validatePassword(){
    if(passwordLogin.trim()===""){
      SetLoginPasswordError("Enter The Password")
    }
}  
const auth =getAuth()

useEffect(()=>{

})
const  colorScheme = useColorScheme();
let [currentTheme,SetCurrentTheme]=useState(colorScheme)
let [loginEmail,SetLoginEmail]=useState("")
let [EmailError,SetEmailError]=useState("")
let [passwordLogin,SetPasswordLogin]=useState("")
let [LoginpasswordError,SetLoginPasswordError]=useState("")
let [emailSignup,SetEmailSignup]=useState("")
let [passwordSignup,SetPasswordSignup]=useState("")
let [nameSignup,SetNameSignup]=useState("")
let[visible,SetVisible]=useState(false)
let [confirmPassword,SetConfirmPassword]=useState("")
const draw = {
    hidden: { pathLength: 0, opacity: 0,fill:'#fff' },
    visible: (i) => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", duration: 1.5, bounce: 0 },
          opacity: { duration: 0.01 },
        }
      };
    }
  };
  
  const [logingIn,SetLogignIn]=useState(true)
const [lightTheme,SetLightTheme]=useState(true)

  return (
    <div className={style.mainBody} style={{overflow:'hidden '}}>
    <ColorSchemeProvider>  <MantineProvider withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: currentTheme,
    }}>
   <div   >
    <Notifications/>
    <LoadingOverlay visible={visible} overlayBlur={2} />
    <Header p="md" hiddenBreakpoint="sm" hidden={false} width={{ sm: 200, lg: 300 }}>
      <Box style={{display:'flex',flexDirection:'row'}}>
        {lightTheme?
      <motion.svg  onClick={()=>{SetCurrentTheme("dark");SetLightTheme(!lightTheme)}}
     style={{position:'absolute',right:40,cursor:'pointer'}}
      width="30"
      height="30"
      fill="transparent"
      viewBox="0 0 30 30"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="10"
        cy="10"
        r="5"
        strokeWidth="10"
        stroke="#ffe880"
        variants={draw}
        custom={1}
      />
 </motion.svg>:<div> <motion.svg 
  onClick={()=>{SetCurrentTheme('light');SetLightTheme(!lightTheme)}}
  style={{position:'absolute',right:40,cursor:'pointer'}}
  width="30"
  height="30"
  fill="transparent"
  viewBox="0 0 30 30"
  initial="hidden"
  animate="visible"
     
    >
      <motion.circle
       cx="10"
        cy="10"
        r="5"
        strokeWidth="10"
        stroke="#aaa"
        variants={draw}
        custom={1}
      />
 </motion.svg></div>}
          <Text>Application navbar</Text>
          <motion.button title='click me'  initial={false}
       onClick={()=>{SetLogignIn(!logingIn);console.log(logingIn)}} >click</motion.button>
   
        </Box>
        </Header>
  <div className={style.main} >
    <motion.div animate={logingIn ? "initialState" : "animateState"} initial="initialState"  variants={{
      initialState:{
        transform:"translateX(0vw)"
      },
      animateState:{
        transform:'translateX(50vw)'
      }
    }} className={style.hider}>
      
    </motion.div>
    
    <div className={style.login}    sx={(theme) => ({
      backgroundColor:
          theme.color==="dark"?'#555':'#eee'})}  >
    <Card
      shadow="lg"
      padding="xl"
      style={{minWidth:200,maxWidth:700,width:'50%',borderRadius:5}}
      
    >
      

      <Text weight={500} size="lg" align='center' mt="md">
       Login!
      </Text>
      <br></br>
      <Input.Wrapper error={EmailError}>
    <Input  error={EmailError}  inputMode='numeric' value={loginEmail} mask="+91 (000) 000-00-00" onFocus={()=>{SetEmailError('')}} onBlur={()=>{validateEmail()}} onChange={(e)=>{SetLoginEmail(e.target.value);}}   label="Email" placeholder='Email'></Input>
    </Input.Wrapper>
    <br></br>
    
    <PasswordInput
    onFocus={()=>{SetLoginPasswordError("")}}
    onBlur={()=>{validatePassword()}}
      placeholder="Password"
      value={passwordLogin}
      onChange={(e)=>{SetPasswordLogin(e.target.value);}}
      error={LoginpasswordError}
       />
       <br></br>
       <div style={{display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
       <Button color='indigo' onClick={()=>{handleLogiIn()}} >Login</Button>
       </div>
       <br></br>
       <div className={style.icons} >
        <Card shadow='xl ' className={style.icon} onClick={()=>{googleLogin()}}  ><Card.Section ><FcGoogle/></Card.Section></Card>
        <Card shadow='xl'  className={style.icon} ><Card.Section><FaFacebook color='#4267B2'/></Card.Section></Card>
       </div>
    </Card>
    </div>
    <div className={style.signUp}>   <Card
      shadow="lg"
      padding="xl"
      style={{minWidth:200,maxWidth:700,width:'50%',borderRadius:5}}
      
    >
      

      <Text weight={500} size="lg" align='center' mt="md">
       Sign Up !
      </Text>
      <br></br>

    <Input value={emailSignup} onChange={(e)=>SetEmailSignup(e.target.value)}   label="Email" placeholder='Email'></Input>
    <br></br>
    
    <Input  value={nameSignup} onChange={(e)=>{SetNameSignup(e.target.value)}} label="Name" placeholder='Name'></Input>
    <br></br>
    <PasswordInput
      placeholder="Password"
      value={passwordSignup}
      onChange={(e)=>{SetPasswordSignup(e.target.value)}}
       />
    
       <br></br>
       <PasswordInput
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e)=>{SetConfirmPassword(e.target.value)}}
       />
<br></br>
       <div style={{display:'flex',alignItems:'center',width:'100%',justifyContent:'center'}}>
       <Button color='indigo' onClick={()=>{handleSignUp()}} >Sign Up</Button>
       </div>
       <br></br>
       <div className={style.icons} >
        <Card shadow='xl 'onClick={()=>{googleLogin()}} className={style.icon} ><Card.Section><FcGoogle/></Card.Section></Card>
        <Card shadow='xl'  className={style.icon} ><Card.Section><FaFacebook color='#4267B2'/></Card.Section></Card>
       </div>
    </Card></div>
    </div>
   </div>
   </MantineProvider>
   </ColorSchemeProvider>
   </div>

  )
}

