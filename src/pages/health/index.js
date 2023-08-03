import { useState } from 'react';
import styles from '../../styles/checkup.module.css';
import { Center, Modal, Header, NumberInput,Button, Text, Checkbox, Grid,Image } from "@mantine/core";
import { AiOutlineWarning } from 'react-icons/ai';
import Map from '../../components/Map'
const Index = () => {
  const [temp,SetTemp] = useState(100)
  const [age,SetAge]=useState(0)
  const [open, setOpen] = useState(true);
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
    "sores on mouth"
  ]);

  const [selected, setSelected] = useState(Array(symptom.length).fill(false));

  return (
    <div>
      <Header bg="#111" height={65} p="xs" />
      <Modal opened={open} w="xl" onClose={() => { setOpen(false) }}>
        <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '0px', height: '10em' }}>
          <AiOutlineWarning size={100} color='#ffbc47' />
        </div>
        <Text style={{ marginLeft: '32%', position: 'absolute', marginTop: '50px', top: '0px' }}>THIS IS NOT ALWAYS ACCURATE AND CAN CAUSE A MISDIAGNOSIS, THIS MODEL ALSO CAN ONLY PREDICT 5 DISEASES</Text>
      </Modal>
      <div className={styles.checkup}>
        <Center>
          <Text size="xl">Enter the data</Text>
        </Center>
        <div style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'space-evenly' }}>
          <NumberInput
            style={{ width: '20rem', height: '3rem' }}
            label="Temperature (°F)"
            error={tempErr}
            value={temp}
            onChange={(e)=>{ if(e<100){ SetTempErr(" body temperature too low... this could be a sign of hypothermia") } else{SetTempErr("")} SetTemp(e)}}
            placeholder="Enter temperature"
            max={105}
            min={0}
          />
          <NumberInput
            style={{ width: '20rem', height: '3rem' }}
            label="Age"
            value={age}
            onChange={(e)=>{SetAge(e)}}
            placeholder="Enter Age"
            max={15}
            min={1}
          />
        </div>
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
        let arr=selected
        if( typeof arr[0]==="boolean"){
          arr.unshift(temp,age)

          const response =fetch('http://127.0.0.1:4000/health',{
         mode:'cors',
          headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
              "Access-Control-Allow-Methods":"GET, POST, OPTIONS",
              "Access-Control-Allow-Headers":"Content-Type, Authorization"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: {"data":JSON.stringify([arr])},
             
          }).then(data=>{
            if(data.ok){
              alert('success')
              data.json().then((json=>{
                console.log(json)
              }))
            }
            else{
              console.log(data)
            }
          }).catch(err=>{
            alert(err)
          })

          console.log({ "data":JSON.stringify([arr])})
          console.log(response)
          
        }
        console.log(arr)

      }
     }}>Check For diseases</Button></Center>
  
      </div>
    </div>
  );
};

export default Index