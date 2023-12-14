const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const http = require('http').createServer(app);
var firebase = require('firebase-admin')
const fetch=require('node-fetch')
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

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

var acetonaemia = `Acetonaemia, also known as Ketosis, is a metabolic disorder that can affect cattle, particularly high-producing dairy cows. It results from an imbalance in energy intake and expenditure, leading to the excessive buildup of ketone bodies in the body.

Symptoms of Acetonaemia may include:
- Lethargy
- Anorexia
- Nervousness
- Acetone-like breath odor
- Decreased milk production
- Neurological signs in severe cases

Treatment and management strategies for Acetonaemia:
- Correcting the energy imbalance through dietary adjustments. Providing additional energy-rich feed and reducing stress can help.
- Administration of glucose or propylene glycol to increase glucose levels and correct the energy deficit.
- Supportive care, including intravenous fluids and nutritional support.

Prevention involves careful nutrition management and monitoring of high-producing dairy cows, particularly during the transition period from dry cows to lactating cows. Proper nutrition, including energy-dense feed, can help minimize the risk of Ketosis.`;


var fog_fever = `Fog Fever, also known as Atypical Interstitial Pneumonia, is a respiratory disease that primarily affects cattle. It typically occurs when cattle are abruptly moved from low-roughage, dry pastures to lush, high-quality pastures. This condition is caused by the sudden ingestion of rapidly fermentable carbohydrates.

Symptoms in affected cattle may include:
- Rapid and labored breathing
- Coughing
- Nasal discharge
- Decreased appetite
- Lethargy

Fog Fever is associated with the sudden intake of lush, high-sugar forage, which leads to a metabolic disorder. This forage is often referred to as "fog" due to the dew it collects in the early morning.

Treatment and management may involve:
- Moving affected cattle back to a dry, low-roughage diet.
- Anti-inflammatory medications to alleviate lung inflammation.
- Providing supplemental feed and forage gradually to adapt the digestive system.

It's essential for cattle owners to be aware of the risk factors and management practices related to Fog Fever, as prevention is the best approach. Gradual dietary transition, especially in early mornings when dew is prevalent, can help prevent this condition.`;


var foot_and_mouth = `Foot and Mouth Disease (FMD) is a highly contagious viral disease that affects cattle and other cloven-hoofed animals. It is caused by the FMD virus (FMDV) and can have significant economic and agricultural impacts.

Symptoms of FMD may include:
- Fever
- Blister-like sores on the mouth, tongue, and hooves
- Lameness
- Drooling
- Reduced milk production

Treatment: There is no specific treatment for FMD, and affected animals are often culled to prevent the spread of the virus. Infected animals can recover, but they may become carriers of the virus.

Prevention involves:
- Strict biosecurity measures to prevent the introduction of the virus.
- Vaccination in endemic regions to build immunity.
- Surveillance and rapid response in case of outbreaks.

FMD is a notifiable disease, and immediate reporting is crucial to prevent its spread. Control measures are essential to minimize the impact of FMD on livestock and the agricultural industry.`;


var peri_weaning_diarrhoea = `Peri-Weaning Diarrhea is a common condition in young calves, especially during the weaning period. It is characterized by loose or watery stools and can be caused by various factors, including dietary changes and stress.

Symptoms of Peri-Weaning Diarrhea may include:
- Loose or watery stools
- Dehydration
- Reduced appetite
- Weight loss
- Lethargy

Treatment and management strategies for Peri-Weaning Diarrhea:
- Maintaining good hygiene in calf housing and feeding areas.
- Adequate nutrition and access to clean water.
- In some cases, supportive care, including oral rehydration therapy, may be necessary.

Prevention measures include:
- Gradual weaning to reduce stress on calves.
- Providing a consistent and high-quality diet during the weaning transition.
- Ensuring proper sanitation and cleanliness in calf facilities.

Peri-Weaning Diarrhea can have significant health and growth consequences for calves, so it's essential to manage weaning practices carefully to minimize the risk of this condition.`;


var liver_fluke = `Liver Fluke, caused by various species of flatworms called flukes, can affect cattle. These parasites primarily infest the liver and bile ducts.

Symptoms of Liver Fluke infection may include:
- Reduced milk production
- Weight loss
- Anemia
- Jaundice (yellowing of mucous membranes)
- Abdominal pain

Treatment and management strategies for Liver Fluke:
- The use of anthelmintic medications to eliminate the parasites.
- Proper pasture and water management to prevent reinfection.
- Monitoring and treatment of affected cattle.

Prevention involves reducing exposure to infected pastures and implementing effective parasite control measures.`;


var infectious_bovine_rhinotracheitis = `Infectious Bovine Rhinotracheitis (IBR) is a contagious viral respiratory disease that affects cattle. It is caused by the bovine herpesvirus-1 (BoHV-1) and can result in a range of clinical signs and economic losses.

Symptoms of IBR may include:
- Coughing
- Nasal discharge
- Fever
- Decreased milk production
- Conjunctivitis (inflammation of the eye's mucous membrane)
- Abortions in pregnant cows

Treatment and management strategies for IBR:
- There is no specific antiviral treatment for IBR.
- Supportive care may include antibiotics for secondary bacterial infections.
- Affected animals should be isolated to prevent the spread of the virus.

Prevention involves:
- Vaccination with IBR vaccines, which can reduce the severity of clinical signs and prevent the spread of the virus.
- Good biosecurity practices to control the introduction of the virus.
- Isolation and testing of new animals introduced into a herd.

IBR is a significant concern for cattle producers, and vaccination and biosecurity measures are crucial for disease management and control.`;


var wooden_tongue = `Wooden Tongue, also known as Actinobacillosis, is a bacterial infection that affects the soft tissues of the tongue in cattle.

Symptoms of Wooden Tongue may include:
- Swelling and inflammation of the tongue
- Drooling
- Difficulty in eating and drinking
- Weight loss
- Pain and discomfort

Treatment involves antibiotics to control the infection and pain management.

Prevention includes maintaining good oral hygiene and avoiding injury to the tongue.`;


var fatty_liver_syndrome = `Fatty Liver Syndrome, also known as hepatic lipidosis, is a metabolic disorder that can affect cattle, especially high-producing dairy cows. This condition results from an excessive accumulation of fat in the liver, which can lead to various health issues.

Symptoms of Fatty Liver Syndrome may include:
- Reduced appetite
- Decreased milk production
- Weight loss
- Lethargy
- Jaundice (yellowing of mucous membranes)
- Disorientation or neurological signs in severe cases

Treatment and management strategies for Fatty Liver Syndrome:
- Providing energy-dense feed and nutritional support.
- Administration of glucose or propylene glycol to correct the energy imbalance.
- Supportive care to manage complications and maintain liver function.

Prevention involves careful nutrition management during the transition period from dry cows to lactating cows. Proper dietary adjustments can help prevent excessive fat accumulation in the liver.`;


var trypanosomosis = `Trypanosomosis, also known as African Sleeping Sickness in humans, is a parasitic disease that affects various animals, including cattle. It is caused by protozoan parasites of the Trypanosoma genus.

Symptoms in cattle may include:
- Fever
- Anemia
- Weight loss
- Lethargy
- Swelling of lymph nodes
- Neurological signs (in advanced cases)

Treatment typically involves:
- The use of trypanocidal drugs such as diminazene aceturate or isometamidium chloride.
- Supportive care, including fluid therapy and nutritional support.

Prevention and control methods include:
- Vector control to reduce the population of tsetse flies and other disease-carrying vectors.
- Selecting trypanosomosis-resistant cattle breeds.
- Regular veterinary monitoring and early intervention.

Trypanosomosis can have a significant economic impact on livestock and is a major concern in affected regions, particularly in sub-Saharan Africa.`;


var bloat = `Bloat is a digestive disorder that can affect cattle, particularly those on high-quality, legume-rich pastures. It occurs when gases produced during fermentation become trapped in the rumen, causing the abdomen to distend.

Symptoms of Bloat may include:
- Distended left abdomen
- Labored breathing
- Restlessness
- Decreased appetite
- Coughing
- Excessive salivation

Treatment and management strategies for Bloat:
- Passage of a stomach tube to release gas.
- Administration of bloat-preventing agents or anti-foaming agents.
- Dietary adjustments to reduce the risk of bloat.

Prevention involves:
- Gradual introduction to high-risk pastures.
- The use of bloat-reducing feed additives.
- Monitoring cattle for signs of bloat during high-risk periods.`;


var mastitis = `Mastitis is an inflammatory condition of the udder in cattle, caused by bacterial infections. It is a significant concern in dairy cows and can lead to reduced milk production and poor milk quality.

Symptoms of Mastitis may include:
- Swelling and heat in the udder
- Pain and sensitivity
- Clots or pus in the milk
- Redness or discoloration of the udder
- Decreased milk production

Treatment involves antibiotics to control the bacterial infection, anti-inflammatory medications, and management practices to improve udder health and prevent recurrence.

Prevention and management include:
- Proper hygiene during milking.
- Prompt identification and treatment of affected cows.
- Maintaining a clean and comfortable environment for dairy cows.
- Culling chronically infected animals.`;


var calf_diphtheria = `Calf Diphtheria is a respiratory condition in young calves, often caused by bacterial infections, such as Fusobacterium necrophorum.

Symptoms of Calf Diphtheria may include:
- Difficulty breathing
- Painful coughing
- Swelling and ulceration in the throat and oral cavity
- Decreased appetite
- Weight loss

Treatment typically involves:
- Antibiotics to control the bacterial infection.
- Supportive care, including pain relief and nutritional support.
- Ensuring proper ventilation in calf housing.

Prevention includes maintaining good hygiene and minimizing stress in calf environments.`;


var ragwort_poisoning = `Ragwort Poisoning is a toxicosis that affects cattle when they consume plants of the Senecio genus, including tansy ragwort and common ragwort.

Symptoms of Ragwort Poisoning may include:
- Loss of appetite
- Weight loss
- Jaundice (yellowing of mucous membranes)
- Neurological signs, such as aimless wandering or head-pressing
- Liver damage

Treatment primarily involves removing the source of the poisoning and providing supportive care, but recovery can be limited if liver damage is severe.

Prevention involves proper pasture management and control of toxic plants.`;


var blackleg = `Blackleg is a highly fatal bacterial disease that affects cattle, primarily young cattle between the ages of 6 months to 2 years. It is caused by Clostridium chauvoei.

Symptoms of Blackleg may include:
- Sudden lameness
- Pain and swelling at the site of infection
- Fever
- Depression and reluctance to move
- Crepitating, gas-filled swellings under the skin

Treatment is rarely successful once clinical signs appear, and prevention through vaccination is essential to control the disease.

Vaccination with blackleg vaccines and good management practices, such as proper carcass disposal, are key preventive measures.`;


var calf_pneumonia = `Calf Pneumonia is a common respiratory disease in young calves, often resulting from viral and bacterial infections.

Symptoms of Calf Pneumonia may include:
- Coughing
- Nasal discharge
- Fever
- Rapid and labored breathing
- Reduced appetite
- Lethargy

Treatment may involve:
- Antibiotics to control bacterial infections.
- Anti-inflammatory medications to reduce lung inflammation.
- Supportive care, including rest and nutrition.

Prevention and management include good hygiene, proper ventilation in calf housing, and minimizing stress in calf environments.`;


var rumen_acidosis = `Rumen Acidosis is a metabolic disorder that can affect cattle, particularly those on high-concentrate diets. It results from an excessive accumulation of acid in the rumen.

Symptoms of Rumen Acidosis may include:
- Decreased appetite
- Diarrhea
- Lethargy
- Lameness
- Abdominal pain
- Drooling

Treatment and management strategies for Rumen Acidosis:
- Gradual adaptation to high-concentrate diets.
- Antacids to reduce rumen acidity.
- Supportive care, including nutritional adjustments.

Prevention involves proper diet formulation and management practices to minimize the risk of acidosis.`;


var listeriosis = `Listeriosis is a bacterial disease caused by Listeria monocytogenes, a pathogenic bacterium capable of infecting various animals, including cattle. It is also zoonotic, meaning it can be transmitted to humans.

In cattle, Listeriosis can manifest in two primary forms: the encephalitic form and the septicemic form.

The encephalitic form affects the brain and often leads to neurological symptoms, including depression, circling, head pressing, muscle tremors, and altered behavior and coordination. Cattle with this form may display disorientation and difficulty swallowing.

The septicemic form, on the other hand, results in a systemic infection. It can lead to reduced milk production, anorexia, and abortion in pregnant cows.

Diagnosing Listeriosis typically involves laboratory testing of brain tissue or cerebrospinal fluid (in the case of the encephalitic form) to detect the presence of Listeria monocytogenes. In cases of the septicemic form, blood cultures may be used to identify the bacteria.

The treatment of Listeriosis involves the administration of antibiotics, such as penicillin or ampicillin. Additionally, supportive care is often necessary, including intravenous fluids and nutritional support. Early intervention is crucial for the success of treatment.

Prevention measures for Listeriosis include maintaining clean and hygienic feeding and water sources, proper storage and handling of silage and feed, and isolating affected animals to prevent the spread of the disease. Reducing stress and overcrowding in cattle housing facilities can also contribute to preventing Listeriosis.

Listeriosis is a serious disease in both cattle and humans. Due to its zoonotic nature, strict hygiene and biosecurity practices are essential to
`

var rift_valley_fever = `Rift Valley Fever (RVF) is a viral disease that primarily affects cattle and can be transmitted to humans. It is caused by the Rift Valley Fever virus.

Symptoms of RVF may include:
- Fever
- Abortion in pregnant cattle
- Hepatitis (liver inflammation)
- Swelling of the brain in severe cases
- High mortality in young animals

There is no specific antiviral treatment for RVF in cattle. Prevention strategies include vaccination in endemic regions, vector control, and good hygiene practices to minimize the risk of infection.`;


var necrotic_enteritis = `Necrotic Enteritis is a bacterial disease that can affect cattle, resulting from the infection of the intestinal lining with Clostridium perfringens, specifically type A.

Symptoms of Necrotic Enteritis may include:
- Severe abdominal pain
- Watery or bloody diarrhea
- Rapid weight loss
- Lethargy
- Dehydration

Treatment often involves antibiotics to control the bacterial infection, along with supportive care to address dehydration and nutritional deficiencies.

Prevention includes maintaining good hygiene in feeding and housing areas, ensuring proper nutrition, and reducing stress on cattle.

Necrotic Enteritis can have significant economic implications for cattle producers and should be managed promptly`
var traumatic_reticulitis = `Traumatic Reticulitis, also known as Hardware Disease, is a condition in cattle resulting from the ingestion of sharp or metallic objects that damage the reticulum, one of the stomach compartments.

Symptoms of Traumatic Reticulitis may include:
- Pain and discomfort
- Decreased appetite
- Fever
- Decreased milk production
- Reluctance to move
- Grunting or arching of the back

Treatment typically involves surgical removal of the ingested foreign object and antibiotics to control secondary bacterial infections.

Prevention includes the use of magnets in cattle to prevent the migration of ingested metallic objects to the reticulum. Proper feeding and environmental management are also essential to minimize the risk of hardware disease.
`
var displaced_abomasum = `Displaced Abomasum is a condition in cattle where the abomasum, the fourth stomach compartment, becomes displaced from its normal position.

Symptoms of Displaced Abomasum may include:
- Decreased appetite
- Reduced milk production
- Distended left abdomen
- Decreased manure production
- Weight loss
- Lethargy

Treatment often involves corrective surgery to reposition the abomasum and address any underlying causes.

Prevention includes proper nutrition, avoiding abrupt dietary changes, and minimizing stress during the transition period from dry cows to lactating cows.
`
var schmallen_berg_virus = `Schmallenberg Virus (SBV) is a viral disease that primarily affects ruminant animals, including cattle. It is transmitted by biting midges and can lead to congenital malformations in newborn calves when pregnant cows are infected during a specific period of gestation.

Symptoms in cattle may be subtle, but in newborn calves, malformations may include bent limbs and neurological defects.

There is no specific treatment for SBV. Prevention involves vector control and vaccination in endemic regions.

Schmallenberg Virus poses a particular risk to cattle breeding, and preventative measures are crucial.

`
var cryptosporidiosis = `Cryptosporidiosis is a parasitic disease that can affect cattle, particularly young calves. It is caused by the protozoan parasite Cryptosporidium parvum.

Symptoms of Cryptosporidiosis may include:
- Diarrhea
- Dehydration
- Weight loss
- Lethargy
- Reduced growth rates

Treatment is often supportive, with a focus on rehydration and proper nutrition.

Prevention includes maintaining clean and dry calf environments, providing clean water, and reducing stress on young calves.

Cryptosporidiosis is a significant concern in calf-rearing facilities and can impact calf health and growth.
`
var foot_rot = `Foot Rot is a contagious bacterial infection that can affect cattle, primarily in the hooves and interdigital skin.

Symptoms of Foot Rot may include:
- Lameness
- Swelling and foul-smelling discharge between the claws
- Reluctance to bear weight on affected limbs
- Decreased milk production
- Pain and discomfort

Treatment involves cleaning and disinfecting affected areas, as well as the use of antibiotics to control the infection.

Prevention and management include proper hygiene in cattle housing and regular hoof trimming to reduce the risk of foot rot.
`
var gut_worms = `Gut Worms, or gastrointestinal nematode parasites, are a common issue in cattle. These parasitic worms can infect the digestive system, causing a range of symptoms.

Symptoms of Gut Worm infestation may include:
- Diarrhea
- Weight loss
- Reduced appetite
- Anemia
- Decreased milk production

Treatment often involves deworming with anthelmintic medications and management practices to reduce exposure to infective larvae.

Prevention includes regular deworming, pasture rotation, and proper manure management.

Gut Worms can lead to significant economic losses in cattle farming if not managed effectively.
`
var coccidiosis = `Coccidiosis is a parasitic disease caused by various species of the protozoan parasite Eimeria. It primarily affects the intestinal tract of cattle.

Symptoms of Coccidiosis may include:
- Diarrhea
- Dehydration
- Weight loss
- Decreased appetite
- Straining during defecation

Treatment involves the use of coccidiostats or anticoccidial medications to control the infection.

Prevention and management practices include maintaining clean and dry environments, reducing overcrowding, and proper nutrition.

Coccidiosis can affect young calves and can have significant implications for growth and overall herd health.

Please note that specific treatments and preventive measures may vary depending on local conditions, herd management, and the advice of a veterinarian.
`

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
app.post('/getdata',(req,res)=>{
  let jsn=0
  fetch(req.body.data+'get_hr').then(async (e)=>{
    
  jsn=eval(await e.json())
   console.log(jsn)
   res.json({"Heart Beat":jsn[0],"Temp":jsn[1],"Oxy":jsn[2]})
  })
})  
app.post('/em',(req,res)=>{
  fetch(req.body.link+'emergency',{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(req.body.cords)
  }).then(()=>{
    console.log("ok")
  }).catch(()=>{
    console.log("error")
  })

})
app.get('/uid',(req, res) =>{
  const uuid = uuidv4()
    res.json({"meeting":`${uuid}`})
})
app.get('/', (req, res) => {
    res.json({ "what is love":"baby dont hurt me"})
  
});
app.post('/pay',async (req,res)=>{

  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url:'http://localhost:3000/success',
      line_items:  
       [ {
        
          price_data: {
            currency: "inr",
            product_data: {
              name: req.body["doctor"].toUpperCase(),
            },
            unit_amount: req.body["fees"] *100,
          },
          quantity: 1,
         

        
        }]
    })
    console.log(req.body["doctor"])
    res.json({ url: session.url })
  }
  catch(e){
    res.status(404).json({ error: e.message })
  }

})
app.post('/upi',()=>{
  
})
app.post('/image',(req,res)=>{
  console.log(req.body)
  res.json({"ok":200})


})
app.post('/health',async (req,res)=>{
  let data=eval(req.body.data)
 let selected=data[0]
  let link=data[1]
 const response = await fetch(link,{
    
    headers: {'Content-Type': 'application/json'},
    method:"POST",
    cors:'no-cors',
    body:JSON.stringify({
      data:selected,
    }),
  
  });


  let dis= await response.json()
  let dis_info=[]
  if(eval(dis["result"])){
  eval(dis["result"]).forEach((el)=>{
    dis_info.push(eval(el))
  })
}
 
  res.json({"result":[... new Set(eval(dis["result"]))],"info":[... new Set(dis_info)]})
})

http.listen(process.env.PORT, "127.0.0.1");

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    io.emit('', message);
  });
  socket.on('pres',()=>{
    socket.broadcast.emit("pres_av")
    socket.emit('pres_av')
    console.log('pres')
  })
 
  socket.on("count",()=>{
  
    socket.broadcast.emit("time")
    console.log("hello")
  })
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
