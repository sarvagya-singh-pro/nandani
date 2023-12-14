import { useEffect, useState } from "react";
import Language from '../../components/language'
import { Text,List,Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
const blackleg = () => {
    const [isEng,SetEng]=useState(1)
    useEffect(()=>{
        if(localStorage.getItem('language')==="Hindi"){
            SetEng(0)
        }
    },[])
    return (
        <div>
               <audio
        controls
        src="https://dl.sndup.net/z8mf/Haemorrhagic%20Septicaemia.mp3">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
            <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Info":"जानकारी"}</Text><br></br>
            <Text pl={"lg"} size={"lg"}>{ isEng?`Haemorrhagic septicaemia (HS) is a major disease of cattle and buffaloes characterised by an acute, highly fatal septicaemia with high morbidity and mortality. It is caused by certain serotypes of Pasteurella multocida that are geographically restricted to some areas of Asia, Africa, the Middle East and southern Europe. The disease has been recorded in wild mammals in several Asian and European countries. 
`:`रक्तस्रावी सेप्टीसीमिया (एचएस) मवेशियों और भैंसों की एक प्रमुख बीमारी है, जिसमें उच्च रुग्णता और मृत्यु दर के साथ तीव्र, अत्यधिक घातक सेप्टीसीमिया होता है। यह पाश्चुरेला मल्टीसिडा के कुछ सीरोटाइप के कारण होता है जो भौगोलिक रूप से एशिया, अफ्रीका, मध्य पूर्व और दक्षिणी यूरोप के कुछ क्षेत्रों तक ही सीमित हैं। यह बीमारी कई एशियाई और यूरोपीय देशों में जंगली स्तनधारियों में दर्ज की गई है।
`}</Text><br></br>
<br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Symptoms":"लक्षण"}</Text><br></br>
<List withPadding>
<List.Item>{isEng?`
High temperature, sudden decrease in milk yield.
`:`
उच्च तापमान, दूध की उपज में अचानक कमी।
`}</List.Item>
      <List.Item>{isEng?`Salivation and serous nasal discharge.`:`लार और नाक से तरल स्राव।`}</List.Item>
    <List.Item>{isEng?`Severe oedema of the throat region.`:`
गले के क्षेत्र में गंभीर सूजन।
`}</List.Item>
    <List.Item>{isEng?`Difficultly in breathing , animal produces a grunting sound.`:`
सांस लेने में कठिनाई होने पर पशु घुरघुराने की आवाज निकालता है।
`}</List.Item>
    </List>
     <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Prevention":"निवारण"}</Text><br></br>
        <List withPadding>
<List.Item>{isEng?`Segregate the sick animal from healthy ones and avoid contamination of feed, fod­der and water.`:`बीमार जानवरों को स्वस्थ जानवरों से अलग रखें और चारा, चारे और पानी को प्रदूषित होने से बचाएं।
`}</List.Item>
      <List.Item>{isEng?`Vaccinate all animals which are 6 months and above of age annually before the on­set of monsoon in endemic areas.`:`
विशेषकर गीले मौसम में भीड़भाड़ से बचें।
स्थानिक क्षेत्रों में मानसून की शुरुआत से पहले सालाना 6 महीने और उससे अधिक उम्र के सभी जानवरों का टीकाकरण करें।
`}</List.Item>
    </List>
    <br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Treatment":"इलाज"}</Text><br></br>
        <List withPadding>
      <List.Item>{isEng?`Antimicrobials are effective against hemorrhagic septicemia if administered very early in the disease
`:`
यदि बीमारी की शुरुआत में ही एंटीमाइक्रोबियल दवाएं दी जाएं तो रक्तस्रावी सेप्टीसीमिया के खिलाफ प्रभावी होती हैं
 
`}</List.Item>

<List.Item>{isEng?`Antibiotic therapy was found to be effective when administered within 12 hours of the appearance of clinical symptoms.`:`नैदानिक लक्षण प्रकट होने के 12 घंटों के भीतर दिए जाने पर एंटीबायोटिक चिकित्सा प्रभावी पाई गई।`}</List.Item>
    
    <Text color="red">{isEng?'Injection to be prescribed by doctor' :'इंजेक्शन डॉक्टर द्वारा निर्धारित किया जाएगा'} </Text>
    <br></br>
    </List>
        <Carousel loop w={"20rem"} pl={"lg"}>
        <Carousel.Slide><Image src={'https://i.ibb.co/nPqhhjW/image3.jpg'}></Image></Carousel.Slide>
      <Carousel.Slide><Image src={'https://i.ibb.co/K95BZDL/image5.jpg'}></Image></Carousel.Slide>
   
        </Carousel>

           
            <Language/>
        </div>
    );
}

export default blackleg;