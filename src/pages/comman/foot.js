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
      <List.Item>{isEng?`Lime`:`चूना 
`}</List.Item>

<List.Item>{isEng?` Potassium Permagate`:`पोटेशियम परमैगेट`}</List.Item>
<List.Item>{isEng?`Cheakpea Roti with onion ( 2 time one in morning one evening)
`:`चने की रोटी प्याज के साथ (दो बार, एक सुबह एक शाम)`}</List.Item>
<List.Item>{isEng?`Acetaminophen`:`एसिटामिनोफ़ेन`}</List.Item>
    
    <Text color="red">{isEng?'Injection to be prescribed by doctor' :'इंजेक्शन डॉक्टर द्वारा निर्धारित किया जाएगा'} </Text>
    <br></br>
    </List>
        <Carousel loop w={"20rem"} pl={"lg"}>
        <Carousel.Slide><Image src={'https://images2.imgbox.com/b1/0f/iMKd2CNC_o.png'}></Image></Carousel.Slide>
      <Carousel.Slide><Image src={'https://images2.imgbox.com/4e/e2/q3Y9ketF_o.png'}></Image></Carousel.Slide>
   
        </Carousel>

           
            <Language/>
        </div>
    );
}

export default blackleg;