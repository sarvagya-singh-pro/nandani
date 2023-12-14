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
        src="https://dl.sndup.net/cb5s/Brucellosis.mp3">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
            <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Info":"जानकारी"}</Text><br></br>
            <Text pl={"lg"} size={"lg"}>{ isEng?`Brucellosis is a bacterial infection that spreads from animals to people. Most commonly, people are infected by eating raw or unpasteurized dairy products. Sometimes, the bacteria that cause brucellosis can spread through the air or through direct contact with infected animals.
`:`ब्रुसेलोसिस एक जीवाणु संक्रमण है जो जानवरों से लोगों में फैलता है। आमतौर पर, लोग कच्चे या बिना पाश्चुरीकृत डेयरी उत्पाद खाने से संक्रमित होते हैं। कभी-कभी, ब्रुसेलोसिस का कारण बनने वाले बैक्टीरिया हवा के माध्यम से या संक्रमित जानवरों के सीधे संपर्क के माध्यम से फैल सकते हैं।
`}</Text><br></br>
<br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Symptoms":"लक्षण"}</Text><br></br>
<List withPadding>
<List.Item>{isEng?`Fever`:`बुखार`}</List.Item>
<List.Item>{isEng?`Chills`:`ठंड लगना`}</List.Item>
<List.Item>{isEng?`Loss of appetite`:`भूख में कमी`}</List.Item>
<List.Item>{isEng?`Sweats`:`पसीना`}</List.Item>
<List.Item>{isEng?`Weakness`:`कमज़ोरी`}</List.Item>
<List.Item>{isEng?`Fatigue`:`थकान`}</List.Item>
<List.Item>{isEng?`Joint, muscle and back pain`:`जोड़ों, मांसपेशियों और पीठ में दर्द`}</List.Item>
<List.Item>{isEng?`Headache`:`सिर दर्द`}</List.Item>
 </List>
     <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Prevention":"निवारण"}</Text><br></br>
        <List withPadding>
<List.Item>{isEng?` Vaccination of cattle, goats and sheep is recommended in enzootic areas with high prevalence rates
`:`इस बीमारी के लिए टीकाकरण लें`}</List.Item>
      <List.Item>{isEng?`
Serological or other testing and culling can also be effective in areas with low prevalence
`:`उच्च प्रसार दर वाले एन्ज़ूटिक क्षेत्रों में मवेशियों, बकरियों और भेड़ों के टीकाकरण की सिफारिश की जाती है, कम प्रसार वाले क्षेत्रों में सीरोलॉजिकल या अन्य परीक्षण और हत्या भी प्रभावी हो सकती है।
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