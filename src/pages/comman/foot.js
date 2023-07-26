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
            <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Info":"जानकारी"}</Text><br></br>
            <Text pl={"lg"} size={"lg"}>{ isEng?`Foot and mouth disease (FMD) is a severe, highly contagious viral disease of livestock that has a significant economic impact. The disease affects cattle, swine, sheep, goats and other cloven-hoofed ruminants`:`खुरपका और मुंहपका रोग (एफएमडी) पशुओं की एक गंभीर, अत्यधिक संक्रामक वायरल बीमारी है जिसका महत्वपूर्ण आर्थिक प्रभाव पड़ता है। यह रोग मवेशी, सूअर, भेड़, बकरी और अन्य दो खुर वाले जुगाली करने वाले जानवरों को प्रभावित करता है।`}</Text><br></br>
<br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Symptoms":"लक्षण"}</Text><br></br>
<List withPadding>
<List.Item>{isEng?`
blisters (or vesicles) on the nose, tongue or lips, inside the oral cavity, between the toes, above the hooves, on the teats and at pressure points on the skin. `:`
उच्च तापमान, दूध की उपज में अचानक कमी।
`}</List.Item>
    <List.Item>{isEng?`Ruptured blisters can result in extreme lameness and reluctance to move or eat. Usually, blisters heal within 7 days (sometimes longer), but complications, such as secondary bacterial infection of open blisters, can also occur. `:`
गले के क्षेत्र में गंभीर सूजन।
`}</List.Item>
    
    </List>
     <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Prevension":"निवारण"}</Text><br></br>
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