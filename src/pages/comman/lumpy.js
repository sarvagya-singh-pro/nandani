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
            <Text pl={"lg"} size={"lg"}>{ isEng?`LSD is a disease of cattle characterised by fever, nodules on the skin,
mucous membranes and internal organs, emaciation, enlarged lymph
nodes, oedema of the skin, and sometimes death. The disease is of
economic importance as it can cause a temporary reduction in milk
production, temporary or permanent sterility in bulls, damage to hides
and, occasionally, death.
 `:`
 एलएसडी मवेशियों की एक बीमारी है जिसमें बुखार, त्वचा पर गांठें,
 श्लेष्मा झिल्ली और आंतरिक अंग, क्षीणता, बढ़ी हुई लसीका
 नोड्स, त्वचा की सूजन, और कभी-कभी मृत्यु। की बीमारी है
 आर्थिक महत्व क्योंकि इससे दूध में अस्थायी कमी हो सकती है
 उत्पादन, बैलों में अस्थायी या स्थायी बांझपन, खाल को नुकसान
 और, कभी-कभी, मृत्यु।`}</Text><br></br>
<br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Symptoms":"लक्षण"}</Text><br></br>
<List withPadding>
<List.Item>{isEng?`
Nasal discharge`:`
नाक बहना`}</List.Item>
      <List.Item>{isEng?`Subscapular and prefemoral lymph nodes become enlarged and
are easily palpable. `:`सबस्कैपुलर और प्रीफेमोरल लिम्फ नोड्स बढ़ जाते हैं और
आसानी से स्पर्श करने योग्य हैं.`}</List.Item>
    <List.Item>{isEng?`Pneumonia caused by the virus itself or secondary bacterial
infections, and mastitis are common complications.
`:`निमोनिया स्वयं वायरस या द्वितीयक जीवाणु के कारण होता है
संक्रमण और स्तनदाह सामान्य जटिलताएँ हैं।`}</List.Item>   </List>
    
    <br></br><Text pl={"lg"} size={"1.5rem"}>{ isEng?"Treatment":"इलाज"}</Text><br></br>
        <List withPadding>
      <List.Item>{isEng?` 100gm Bhumi Amla should we mixed with 1 l water and boil it until
the solution is 500 ml.`:`100 ग्राम भूमि आंवला को 1 लीटर पानी में मिलाकर उबाल लें
समाधान 500 मिलीलीटर है.
`}</List.Item>
 <List.Item>{!isEng?`यही प्रक्रिया निम्नलिखित के साथ भी की जानी चाहिए:-

 
सी। 100 ग्राम पारिजात घास (बछड़े के लिए) `:`
The same process should be done with the following:-
`}</List.Item>
 <List withPadding>
<List.Item>{isEng?`100 GM Sahdevi and 50 GM Black Peper`:` 100 जीएम सहदेवी और 50 जीएम काली मिर्च`}</List.Item>
<List.Item>{isEng?`200GM Parijat Grass`:`200GM पारिजात घास`}</List.Item>
<List.Item>{isEng?`100 GM Parijat Grass (For Calf)`:`100 ग्राम पारिजात घास (बछड़े के लिए)`}</List.Item>
 </List>
 <List.Item>{isEng?` 500 GM Wild Amarnath with 100 GM Cow Ghee should be cooked
and given to eat.
`:`
500 ग्राम जंगली अमरनाथ को 100 ग्राम गाय के घी के साथ पकाना चाहिए
और खाने को दिया.`}</List.Item>
   <List.Item>{!isEng?`100 ग्राम फुटकर पाउडर और 20 लीटर पानी मिलाकर छान लें
मवेशियों के शरीर पर घोल से धोना चाहिए।`:`100 GM Futkar Powder and 20 liter water shoule be mixed and the
solution should be washed on the body of cattle.`}</List.Item>
   
    <br></br>
    </List>
   

           
            <Language/>
        </div>
    );
}

export default blackleg;