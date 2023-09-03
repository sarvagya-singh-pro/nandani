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
            <Text pl={"lg"} size={"lg"}>{ isEng?`An acute disease of cattle characterized by emphysematous swelling usually in heavy muscles.
Buffaloes usually suffer from a milder form.
Contaminated pasture appears to be major source of infection.
Healthy animals in the age group 6 months to 2 years are generally affected
`:`मवेशियों की एक गंभीर बीमारी जिसमें आमतौर पर भारी मांसपेशियों में वातस्फीति सूजन होती है।
भैंसें आमतौर पर हल्के रूप से पीड़ित होती हैं।
दूषित चरागाह संक्रमण का प्रमुख स्रोत प्रतीत होता है।
6 महीने से 2 साल की उम्र के स्वस्थ जानवर आम तौर पर प्रभावित होते हैं
`}</Text><br></br>
<br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Symptoms":"लक्षण"}</Text><br></br>
<List withPadding>
<List.Item>{isEng?`Sudden high  fever (107ºF-108ºF)  and  the animal stops eating and ruminating.
`:`अचानक तेज़ बुखार (107ºF-108ºF) और जानवर खाना और जुगाली करना बंद कर देता है।`}</List.Item>
      <List.Item>{isEng?`Characteristic  hot   and   painful   swelling develops on loin and buttocks causing lameness.  Swelling  sometimes affects shoulders, chest and neck also. When pressed, a crackling sound is heard because of the gas accumulation in the swellings.`:`कमर और नितंबों पर विशिष्ट गर्म और दर्दनाक सूजन विकसित हो जाती है जिससे लंगड़ापन हो जाता है। सूजन कभी-कभी कंधों, छाती और गर्दन को भी प्रभावित करती है। दबाने पर सूजन में गैस जमा होने के कारण चटकने की आवाज सुनाई देती है।`}</List.Item>
    </List>
     <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Prevension":"निवारण"}</Text><br></br>
        <List withPadding>
<List.Item>{isEng?`Vaccinate all animals which are 6 months and above of age annually before the on­set of monsoon in endemic areas.`:`स्थानिक क्षेत्रों में मानसून की शुरुआत से पहले सालाना 6 महीने और उससे अधिक उम्र के सभी जानवरों का टीकाकरण करें।`}</List.Item>
      <List.Item>{isEng?`Burning the upper layer of soil with straw to eliminate spores may be of help in endemic areas`:`
बीजाणुओं को खत्म करने के लिए मिट्टी की ऊपरी परत को भूसे के साथ जलाने से स्थानिक क्षेत्रों में मदद मिल सकती है।
`}</List.Item>
    </List>
    <br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Treatment":"इलाज"}</Text><br></br>
        <List withPadding>
<List.Item>{isEng?`Dressing of affected lesions with local injection of penicillin.`:`पेनिसिलिन के स्थानीय इंजेक्शन से प्रभावित घावों की ड्रेसिंग।
`}</List.Item>
      <List.Item>{isEng?`Inj. Penicillin in large dose and Oxytetracyclin are the antibiotic of choice. Third generation cephalosporin can also be injected.`:`
      इंज. बड़ी खुराक में पेनिसिलिन और ऑक्सीटेट्रासाइक्लिन पसंद के एंटीबायोटिक हैं। तीसरी पीढ़ी के सेफलोस्पोरिन को भी इंजेक्ट किया जा सकता है।
`}</List.Item>
<List.Item>{isEng?`Treatment is usually ineffective in an advanced septicaemic stage.
`:`उन्नत सेप्टिकैमिक चरण में उपचार आमतौर पर अप्रभावी होता है।`}</List.Item>

<List.Item>{isEng?`Antibiotic therapy was found to be effective when administered within 12 hours of the appearance of clinical symptoms.`:`नैदानिक लक्षण प्रकट होने के 12 घंटों के भीतर दिए जाने पर एंटीबायोटिक चिकित्सा प्रभावी पाई गई।`}</List.Item>
    
    <Text color="red">{isEng?'Injection to be prescribed by doctor' :'इंजेक्शन डॉक्टर द्वारा निर्धारित किया जाएगा'} </Text>
    <br></br>
    </List>
        <Carousel loop w={"20rem"} pl={"lg"}>
        <Carousel.Slide><Image src={'https://i.ibb.co/58tsZNq/image1.jpg'}></Image></Carousel.Slide>
      <Carousel.Slide><Image src={'https://i.ibb.co/f0jHfqp/image2.jpg'}></Image></Carousel.Slide>
   
        </Carousel>

           
            <Language/>
        </div>
    );
}

export default blackleg;