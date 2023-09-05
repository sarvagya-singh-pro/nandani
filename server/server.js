const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const http = require('http').createServer(app);
var firebase = require('firebase-admin')
const fetch=require('node-fetch')
require('dotenv').config();
var bodyParser = require('body-parser')
const chat=[]
const cors=require('cors')
const { v4: uuidv4 } = require('uuid');
let user=null
let meetId
var {getDocs,collection, doc}=require('firebase/firestore')
const { initializeApp } = require('firebase-admin/app')
const {initializeFirestore,CollectionGroup, CollectionReference} =require('firebase-admin/firestore')
const adminconfig=require('./just-chat-5a316-firebase-adminsdk-lxix8-cd284ddfb7.json')
let docID;
const firebase_app = initializeApp({
  credential: firebase.credential.cert(adminconfig),

});
const firestoreDb=initializeFirestore(firebase_app)
const request = require('request');





// getDocs(collection(firestoreDb,"meetings")).then(()=>{
//   alert('yo')
// }).catch((error)=>{
//   console.error(error)
// })
console.log()
const io = require('socket.io')(http,{

  cors:{
        origin:'*',
        methods:["GET","POST"]
    }
});
app.use(cors({
  origin:'*',
  methods:["GET","POST"]
}))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
  });
  
app.get('/uid',(req, res) =>{
  const uuid = uuidv4()
    res.json({"meeting":`${uuid}`})
})
app.get('/', (req, res) => {
    res.json({ "what is love":"baby dont hurt me"})
  
});
app.post('/health',async (req,res)=>{
  let data=eval(req.body.data)
  console.log(req.body.data2)
  data[0]=(data[0]-100) / 5 
  data[1]=(data[1])/15
  const response = await fetch('http://127.0.0.1:5000',{
    
    headers: {'Content-Type': 'application/json'},
    method:"POST",
    body:JSON.stringify({
      data:[data],
      data2:[req.body.data2]
    }),

  });
const body = await response.text();

console.log( );
  res.json({ "what is love": JSON.parse(JSON.parse(body)["message"],JSON.parse(body)["other"])})
})

http.listen(4000, "127.0.0.1");

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('', message);
  });
  socket.on('roomID',(val)=>{
   
    console.log(val)
    firestoreDb.collection('meetings').listDocuments().then(data=>{
      data.forEach(doc=>{
        if(doc.id===val){
            docID=doc.id
            doc.get().then(da=>{
           //
           firestoreDb.collection('doctors').doc(da.data().doctor).onSnapshot((snap)=>{
            mail(snap.data().email)
           
            socket.emit("hehe")

          console.log()
          if(da.data().users.length===0){
              console.log("requested offer")
              
            console.log("meeting requested")
              socket.emit('getRequest')
   
             }
            else{
              
              socket.emit("getAnswer")
            
              
            }
            
        
            
           })
          })
           
        }
    

      }
      
      )
    })
 
  })
 
  socket.on('answer_m',(data)=>{

   console.log("both req and answer revived")
   socket.broadcast.emit('anwerData',data)
  })
  socket.on('request',(data)=>{
  })
  socket.on('disconnected',async()=>{
    firestoreDb.doc(`meetings/${docID}`).update({
      users:[]
    })
    socket.emit('closeit')
    socket.disconnect()
  })
  socket.on("messages",(messsage)=>{
    let hr=new Date().getHours().toString()
    let minutes=new Date().getMinutes().toString()
    let time=hr+":"+minutes+"  "

    socket.broadcast.emit("chat",{
      chat:messsage,
      from:time
    })
    socket.emit("chat",{
      chat:messsage,
      from:time 
    })
  })
  socket.on('sdp',(sdp)=>{
    console.log(sdp)
  })
  socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
    firestoreDb.doc(`meetings/${docID}`).update({
      users:[]
    })
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
  })
  socket.on("allChat",()=>{
    console.log("ok sending")
    socket.emit("allChats",chat)
  })
});


const port = process.env.PORT || 4000;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
async function mail(email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'nandani.health.web@gmail.com', // generated ethereal user
      pass: process.env.EMAIL_VERIFICATION, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'nandani.health.web@gmail.com', 
    to: email,
    subject: "Join  ", 
    html: `
    <div>

    <br>
</div>
    <h1>Your Client Has Already Joined</h1>
    <p> Doctor, <br> Your Client Is waiting For You join him</p>
      'http://localhost:3000/meet/${docID}
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
