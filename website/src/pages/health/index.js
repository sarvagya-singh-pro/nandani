import { useEffect, useState } from 'react';
import styles from '../../styles/checkup.module.css';
import { Center, Modal, Header, NumberInput,Button, Text, Checkbox,FileInput, Grid,Image, TextInput, List } from "@mantine/core";
import { AiOutlineWarning } from 'react-icons/ai';
import axios from 'axios'
import Map from '../../components/Map'
import index from '../comman';
import { useRouter } from 'next/router';
const Index = () => {
  const router=useRouter()
  const [temp,SetTemp] = useState(0)
  const [age,SetAge]=useState(0)
  const [oxy,SetOxy]=useState(0)
  const [mod,SetMod]=useState(false)
  const [link,SetLink]=useState("")
  const [open, setOpen] = useState(true);
  const[Names,SetNames]=useState([])
  const [tempErr,SetTempErr]=useState("")
  const [symptom, setSymptom] = useState([
    "painless lumps",
    "swelling in limb",
    "sweats",
    "loss of appetite",
    "swelling in extremities",
    "depression",
    "sores on hooves",
    "crackling sound",
    "swelling in muscle",
    "difficulty walking",
    "lameness",
    "fatigue",
    "blisters on hooves",
    "chills",
    "blisters on gums",
    "blisters on mouth",
    "swelling in abdomen",
    "chest discomfort",
    "swelling in neck",
    "shortness of breath",
    "sores on tongue",
    "blisters on tongue",
    "sores on gums",
    "sores on mouth",'anorexia', 'abdominal_pain', 'anaemia', 'abortions', 'acetone',
    'aggression', 'arthrogyposis', 'ankylosis', 'anxiety', 'bellowing',
    'blood_loss', 'blood_poisoning', 'blisters', 'colic',
    'Condemnation_of_livers', 'conjunctivae', 'coughing', 'depression',
    'discomfort', 'dyspnea', 'dysentery', 'diarrhoea', 'dehydration',
    'drooling', 'dull', 'decreased_fertility', 'diffculty_breath',
    'emaciation', 'encephalitis', 'fever', 'facial_paralysis',
    'frothing_of_mouth', 'frothing', 'gaseous_stomach', 'highly_diarrhoea',
    'high_pulse_rate', 'high_temp', 'high_proportion', 'hyperaemia',
    'hydrocephalus', 'isolation_from_herd', 'infertility',
    'intermittent_fever', 'jaundice', 'ketosis', 'loss_of_appetite',
    'lameness', 'lack_of-coordination', 'lethargy', 'lacrimation',
    'milk_flakes', 'milk_watery', 'milk_clots', 'mild_diarrhoea', 'moaning',
    'mucosal_lesions', 'milk_fever', 'nausea', 'nasel_discharges', 'oedema',
    'pain', 'painful_tongue', 'pneumonia', 'photo_sensitization',
    'quivering_lips', 'reduction_milk_vields', 'rapid_breathing',
    'rumenstasis', 'reduced_rumination', 'reduced_fertility', 'reduced_fat',
    'reduces_feed_intake', 'raised_breathing', 'stomach_pain', 'salivation',
    'stillbirths', 'shallow_breathing', 'swollen_pharyngeal', 'swelling',
    'saliva', 'swollen_tongue', 'tachycardia', 'torticollis',
    'udder_swelling', 'udder_heat', 'udder_hardeness', 'udder_redness',
    'udder_pain', 'unwillingness_to_move', 'ulcers', 'vomiting',
    'weight_loss', 'weakness'
  ]);
  const[InfoDisease,SetInfoDIsease]=useState([])
  const [selected, setSelected] = useState(Array(93).fill(false));
  useEffect(()=>{
    if(localStorage.getItem('language')==="Hindi"){
      setSymptom([
        "बिना दर्द के गांठें",
    "पैर में सूजन",
    "पसीना",
    "भूख की कमी",
    "अंगों में सूजन",
    "डिप्रेशन",
    "होंठों पर घाव",
    "बहकर आवाज़",
    "मांसपेशियों में सूजन",
    "चलने में कठिनाई",
    "लैमेनेस",
    "थकान",
    "होंठों पर छाले",
    "तंबाकू",
    "मसूड़ों पर छाले",
    "मुंह में छाले",
    "पेट में सूजन",
    "सीने में असहजता",
    "गर्दन में सूजन",
    "सांस की कमी",
    "जीभ पर छाले",
    "जीभ पर तंबाकू",
    "मसूड़ों पर छाले",
    "मुंह में छाले",'एनोरेक्सिया', 'पेट दर्द', 'एनीमिया', 'गर्भपात', 'एसीटोन',
    'आक्रमण', 'जोड़ों की अकड़न', 'जोड़ों का सक्रियता खोना', 'चिंता', 'बेलोविंग',
    'रक्त हानि', 'रक्त विषाण', 'छाले', 'डोलिया',
    'कॉन्डेम्नेशन ऑफ लिवर्स', 'आँखों की पलकें', 'खांसी', 'डिप्रेशन',
    'असुखान', 'सांस की कठिनाई', 'आंत्र शोथ', 'दस्त', 'अपान',
    'लार बहना', 'धीरा', 'कम बूँदांव', 'सांस की कठिनाई',
    'कमजोरी', 'सिरदर्द', 'गर्भाशय की खराबी', 'डिफिकल्टी ब्रेथ',
    'कुपोषण', 'एन्सेफलाइटिस', 'बुख़ार', 'चेहरे की पकड़', 
    'मुँह से बुबुले आना', 'मुंह से बुबुले आना', 'पेट में गैस', 'अत्यधिक दस्त',
    'अत्यधिक दिल की धड़कन', 'उच्च ताप', 'अत्यधिक प्रोपोर्शन', 'हाइपरेमिया',
    'हाइड्रोसेफालस', 'झुलसन', 'शेर बनाने से दूर रहना', 'बांझपन',
    'आवर्ती बुख़ार', 'पीलिया', 'केटोसिस', 'भूख की कमी',
    'लैमेनेस', 'सामंजस्य नहीं होना', 'सुस्ती', 'आंसूजलन',
    'दूध का पिण्ड', 'पानीदार दूध', 'दूध में थूक', 'हल्के दस्त', 'रोना',
    'मुख पर स्लाइस', 'दूध का ताप', 'उलटी', 'नाक से बहना', 'सूजन',
    'दर्द', 'दर्दभरी जीभ', 'फेफड़ों का संघात', 'फोटो संवेदनीकरण',
    'होंठों की कमी', 'दूध की यील्ड में कमी', 'तेजी से सांस लेना',
    'पाचन संबंधी समस्या', 'खाने की कमी', 'तेजी से सांस लेना', 'पेट दर्द', 'लार बहना',
    'नर्मी की समस्या', 'शांत बार देना', 'गर्भस्राव', 'सामान्य से अल्प सांस लेना', 'गले की सूजन',
    'फूला हुआ', 'लार', 'फूले हुए जीभ', 'तेज दिल की धड़कन', 'गरघराना',
    'भूख की कमी'
      ])
    }
  },[])
  return (
    <div>
      <Header bg="#111" height={65} p="xs" />
      <Modal opened={open} w="xl" onClose={() => { setOpen(false) }}>
        <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '0px', height: '10em' }}>
          <AiOutlineWarning size={100} color='#ffbc47' />
        </div>
        <Text style={{ marginLeft: '32%', position: 'absolute', marginTop: '50px', top: '0px' }}>THIS IS NOT ALWAYS ACCURATE AND CAN CAUSE A MISDIAGNOSIS</Text>
      </Modal>
      <div className={styles.checkup}>
        <Center>
          <Text size="xl">Enter the data</Text>
        </Center>
        <div style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'space-evenly' }}>
          <NumberInput
            style={{ width: '20rem', height: '3rem' }}
            label="Temperature (°C)"
            error={tempErr}
            value={temp}
            onChange={(e)=>{ if(e<100){ SetTempErr(" body temperature too low... this could be a sign of hypothermia") } else{SetTempErr("")} SetTemp(e)}}
            placeholder="Enter temperature"
            max={105}
            min={0}

          />

          <NumberInput
            style={{ width: '20rem', height: '3rem' }}
            label="Heart Rate"
            value={age}
            onChange={(e)=>{SetAge(e)}}
            placeholder="Enter Heart Rate"
            max={15}
            min={1}
          />
             <NumberInput
            style={{ width: '20rem', height: '3rem' }}
            label="Blood Oxygen"
            value={oxy}
            onChange={(e)=>{SetOxy(e)}}
            placeholder="Enter Blood Oxygen"
            max={15}
            min={1}
          />
            <TextInput label="Link" value={link} onChange={(e)=>{SetLink(e.target.value)}}></TextInput>
      
        </div>
        <Center><Button mt="xl" variant='light' onClick={()=>{
          if(link!=""){
            axios.post('http://localhost:4000/getdata',{
              data:link
            }).then(res=>{SetAge(res.data["Heart Beat"]),
          SetTemp(res.data["Temp"]);
          SetOxy(res.data["Oxy"])})
         
            
          }
          else{
            alert("Link not given")
          }
        }}> Get Sensor Data</Button></Center>

        <Modal opened={mod} onClose={()=>{SetMod(false)}}>
          <Text>THIS WILL CONTACT:</Text>
          <List>
            <List.Item mt="md">AMBULANCE</List.Item>
            <List.Item mt="md">DOCTORS IN YOUR AREA</List.Item>
          </List>
        <Center><Button mt="xl" onClick={()=>{if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>{console.log(pos.coords.latitude,pos.coords.longitude);
      axios.post('http://localhost:4000/em',{
        link:link,
        cords:[pos.coords.latitude,pos.coords.longitude]
      })}, ()=>{
        alert('Location unavailable')
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }}} color='red'>CONTACT </Button></Center>
        </Modal>
        <Center><Button color='red' mt="xl" variant="gradient"
        onClick={()=>{SetMod(true)}}
      gradient={{ from: 'rgba(255, 143, 143, 1)', to: 'rgba(255, 0, 0, 1)', deg: 158 }} >EMERGENCY </Button></Center>
        <Center><Text mt="xl">Symptoms</Text></Center>
        <div>
          <Grid justify="space-around" m={100} grow>
            {symptom.map((el, index) => (
              <Grid.Col span={4} key={index}>
                <Checkbox
                  checked={selected[index]}
                  onChange={() => {
                    const arr = [...selected];
                    arr[index] = !arr[index];
                    setSelected(arr);
                  }}
                  style={{ width: '200px' }}
                  label={symptom[index]}
                />
              </Grid.Col>
            ))}
          </Grid>
        </div>
     <Center><Button onClick={async()=>{
      if(tempErr===""){
        if(link!=""){

          let res=await axios.post('http://localhost:4000/health',{
            data:[selected,link]
          })
          SetInfoDIsease(res.data["result"])
          SetNames(res.data["info"])
        //   const res=await fetch(link,{
        //     method:['POST'],
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Access-Control-Allow-Origin':'*' // Set the appropriate content type
        //     },
        //     body:{
        //       'data':selected
        //     }
        //   }).catch(error=>{
        //     alert(error)
        //     console.log(error.message)
        //   })
        //   console.log(res)

         }
        else{
          alert("Model Link Not given")
        }
      }
      
     }}>Check For diseases</Button></Center>
     <Center>
     
     </Center>
     {
      InfoDisease.map((el,index)=>{
        return(
          <div>
         <Center> <Text mt="xl" fw="bold">{el}</Text></Center>
         <Center><Text>{Names[index]}</Text></Center>
         </div>
        )
      })
     }
       {/* <Center>
       <FileInput
       mt="xl"
      w={"50%"}
      label="Lumpy Detector"
      placeholder="Uplod Image"
    />
    </Center>
    <Center>
      <Button variant='light' mt="xl" color='grape'>
        Upload
      </Button>
    </Center> */}
  
      </div>
    </div>
  );
};

export default Index