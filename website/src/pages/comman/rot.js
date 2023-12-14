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
        src="https://dl.sndup.net/fkwt/Foot%20Rot.mp3">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
            <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Info":"जानकारी"}</Text><br></br>
            <Text pl={"lg"} size={"lg"}>{ isEng?`Foot-rot in cattle is an infectious disease of farm animals, especially cattle and sheep. The disease is characterised by inflammation of the sensitive tissues of the feet and severe lameness. Foot-rot originates between the claws of the hoof, and it occurs in all ages of cattle. `:`
मवेशियों में पैर सड़न खेत के जानवरों, विशेषकर मवेशियों और भेड़ों की एक संक्रामक बीमारी है। इस रोग की विशेषता पैरों के संवेदनशील ऊतकों में सूजन और गंभीर लंगड़ापन है। पैरों की सड़न खुर के पंजों के बीच उत्पन्न होती है और यह सभी उम्र के मवेशियों में होती है।
`}</Text><br></br>
<br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Symptoms":"लक्षण"}</Text><br></br>
<List withPadding>
<List.Item>{isEng?`
Lameness of the affected foot and moderate fever (103-104° F) with anorexia. `:`
उच्च तापमान, दूध की उपज में अचानक कमी।
`}</List.Item>
      <List.Item>{isEng?`Pus with the foul-smelling discharge with characteristic odor and decrease milk production. `:`विशिष्ट गंध के साथ दुर्गंधयुक्त स्राव के साथ मवाद आना और दूध उत्पादन में कमी आना।`}</List.Item>
    <List.Item>{isEng?`The swelling of
the coronet spreading of the claw and hoof may slough off following secondary infection. The animal holds the leg in the air to relieve pressure. Diagnosis of Foot rot in cattle 
`:`
की सूजन
द्वितीयक संक्रमण के बाद पंजे और खुर का कोरोनेट फैलना धीमा हो सकता है। दबाव कम करने के लिए जानवर पैर को हवा में रखता है। मवेशियों में फुट रॉट का निदान`}</List.Item>
    </List>
     <Text pl={"lg"} size={"1.5rem"}>{ isEng?"Prevention":"निवारण"}</Text><br></br>
        <List withPadding>
<List.Item>{isEng?`Mud holes should be filled and stagnant pools drained or fenced off. Feedlots should be well drained and manure removed frequently. In areas where cattle walk frequently, such as in lanes or gateways, grading or filling in low areas to provide a well-drained pathway for walking may help to prevent foot rot cases. Pouring a concrete pad or establishing solid pads around feed bunks and water troughs will help keep feet dry.`:`
मिट्टी के गड्ढों को भरना चाहिए और रुके हुए तालाबों को सूखा देना चाहिए या बाड़ लगा देना चाहिए। फीडलॉट को अच्छी तरह से सूखाया जाना चाहिए और खाद को बार-बार हटाया जाना चाहिए। उन क्षेत्रों में जहां मवेशी अक्सर चलते हैं, जैसे कि गलियों या प्रवेश द्वारों पर, चलने के लिए एक अच्छी जल निकासी वाला मार्ग प्रदान करने के लिए निचले क्षेत्रों में ग्रेडिंग या भरने से पैर सड़न के मामलों को रोकने में मदद मिल सकती है। कंक्रीट पैड डालने या फ़ीड बंक और पानी के कुंडों के चारों ओर ठोस पैड स्थापित करने से पैरों को सूखा रखने में मदद मिलेगी।
`}</List.Item>
      <List.Item>{isEng?`removing sources of injury, and keeping feet dry and clean.`:`
चोट के स्रोतों को हटाना, और पैरों को सूखा और साफ रखना।`}</List.Item>
    </List>
    <br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Treatment":"इलाज"}</Text><br></br>
        <List withPadding>
      <List.Item>{isEng?`tetracycline antibiotics`:`
टेट्रासाइक्लिन एंटीबायोटिक्स
`}</List.Item>
 <List.Item>{isEng?`Clotrimazole `:`
Clotrimazole 
`}</List.Item>
 <List.Item>{isEng?` miconazole`:`
माइक्रोनाज़ोल
`}</List.Item>
   <List.Item>{isEng?`terbinafine`:`टेरबिनाफिन`}</List.Item>
   
    <Text color="red">{isEng?'Injection to be prescribed by doctor' :'इंजेक्शन डॉक्टर द्वारा निर्धारित किया जाएगा'} </Text>
    <br></br>
    </List>
        <Carousel loop w={"20rem"} pl={"lg"}>
        <Carousel.Slide><Image src={'https://images2.imgbox.com/4e/e2/q3Y9ketF_o.png'}></Image></Carousel.Slide>
      <Carousel.Slide><Image src={'https://images2.imgbox.com/7d/64/R7jzyDAi_o.jpeg'}></Image></Carousel.Slide>
      <Carousel.Slide><Image src={'https://images2.imgbox.com/7d/59/Me0KEZ5j_o.jpeg'}></Image></Carousel.Slide>
   
        </Carousel>

           
            <Language/>
        </div>
    );
}

export default blackleg;