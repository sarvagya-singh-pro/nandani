import io from "socket.io-client";
 import { useEffect, useMemo, useReducer, useState } from "react";
import { Button, Header,Input,Select,Text,Card, TextInput, Loader } from "@mantine/core";
import { DateInput } from '@mantine/dates';
require('dayjs')
const months=['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const hindiMonths=['जनवरी',"फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"]
import styles from '../../styles/Meet.module.css'
import dayjs from "dayjs";
import {db} from '../../Firebaseconfig'
import { collection, getDocs,getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import LanguageDiv from '../../components/language'
export default function home(){
  const auth=getAuth()
  const [language,SetLanguage]=useState(0)
  const [loading,SetLoading]=useState(true)
  const [mon,SetMon]=useState([ ])
  const[ tue,SetTue]=useState([])
  const [wed,SetWed]=useState([])
  const [doctorList,SetDoctorList]=useState([]) 
  const[thu,SetThu]=useState([])
  const [selectedDoctor,SetSelectedDoctor]=useState("")
  const [fri,SetFri]=useState([])
  const[sat,Setsat]=useState([])
  const [selectedDate,SetSelectedDate]=useState(0)
  const [selected,SetSelected]=useState(-1)
  const [sun,SetSun]=useState([])
  useEffect(()=>{
    if(localStorage.getItem("language")==="Hindi"){
      SetLanguage(1)
    }
    //calendar logic
    var d= new Date()
    console.log(d)
    const date=d.toString().split(" ")
    const isLeap =  new Date(date[3], 1, 29).getDate() === 29;
    let days={
      0:31,
      1:isLeap?29:28,
      2:31,
      3:30,
      4:31,
      5:30,
      6:31,
      7:31,
      8:30,
      9:31,
      10:30,
      11:31,
    }
    SetSelected(d.getDate())

    const monthDayCount= days[d.getMonth()]
    for(let i=1; i<=monthDayCount; i++){
   
      let day= new Date(`${date[1]} ${i}, ${date[3]} `)
      if(day.getDay()===1 )
      {

        let mondays= mon
        let days=day.getDate()
        if(days>1&& mondays.length==0)
        {
          mondays.push('\u2800')
        }
        mondays.push(day.getDate())
        mondays=[...new Set(mondays)]
        console.log(day.getDate())
        
        SetMon(mondays)
      }
      if(day.getDay()===2){
        
        let tuesday=tue
        let days=day.getDate()
        if(days>2 && tuesday.length===0){
          tuesday.push('\u2800')
        }
        tuesday.push(day.getDate())
       tuesday=[...new Set(tuesday)]
        console.log(day.getDate())
        SetTue(tuesday)
      }
      if(day.getDay()===3){
        let wednersday=wed
        let days=day.getDate()
        if(days>3 && wednersday.length==0){
          wednersday.push('\u2800')
        }
       wednersday.push(day.getDate())
       wednersday=[...new Set(wednersday)]
        console.log(day.getDate())
        SetWed(wednersday)
      }
      if(day.getDay()===4){
        let days=day.getDate()
     
        let thursday=thu
        if(days>4 && thursday.length===0){
          thursday.push('\u2800')
        }
        thursday.push(day.getDate())
        thursday=[...new Set(thursday)]
         console.log(day.getDate())
         SetThu(thursday)

      }
      if(day.getDay()===5){

        let days=day.getDate()
        let friday=fri 
        if(days>5 && friday.length===0){
          friday.push('\u2800')
        }
      
        friday.push(day.getDate())
        friday=[...new Set(friday)]
         console.log(day.getDate())
         SetFri(friday)


      }
      if(day.getDay()===6){
    
        let saturday=sat
        let days=day.getDate()
        if(days>6 && saturday.length===0){
          saturday.push('\u2800')
        }
        saturday.push(day.getDate())
       saturday=[...new Set(saturday)]
       Setsat(saturday)


      }
      if(day.getDay()===0){
        let days=day.getDate()
        let sunday=sun
        
        sunday.push(day.getDate())
        sunday=[...new Set(sunday)]
        SetSun(sunday)
      }
    
   
  }
  

  
   
     
  },[])
  useMemo(()=>{

    getDocs(collection(db,"doctors")).then(results=>{
      results.forEach((doctor)=>{
        const ref = doctorList
        
        SetDoctorList([... new Set(ref)])
        if(doctor.data().available )
        {
           doctor.data().unavailable_dates.forEach((el)=>{
               
              const dateRef=new Date(el["seconds"]*1000)
              const date=dateRef.getDate()
              const month=dateRef.getMonth()+1
            if(selectedDate && selectedDate.getDate()===date && (selectedDate.getMonth()+1)===month){
              const refe =doctorList
              refe.splice(refe.indexOf(doctor.id),1)
            console.log(refe)
              SetDoctorList([... new Set(refe)])
            
            }
            else {
              ref.push(doctor.id)
            }
            SetLoading(false)


          
          });
        }


      },[doctorList])
  })
  })
  return(
    <div>
  {loading?<div style={{alignItems:'center',height:'100vh',justifyContent:'center',display:'flex'}}>
    <Loader size={"lg"}/>
  </div>:
  <>
     <Header  bg={'#111'} height={65} p="xs">{
        <h1 className="roboto.logo">Nandani</h1>}</Header>   
    
        <div className={styles.form} >
          <br></br>
          <Card shadow="xl" style={{minWidth:'80%',minHeight:'80%'}}>
            <Text align="center" >{language?"एक अपॉइंटमेंट बुक करें":"Book An Appointment"}</Text>
            <DateInput valueFormat="DD/MM/YYYY"      minDate={new Date()}
      maxDate={dayjs(new Date()).add(1, 'month').toDate()} value={selectedDate} onChange={(e)=>{SetSelectedDate(e)}} label={language?"अपॉइंटमेंट की तारीख":"Date Of the Appointment"} mt={"xl"} ></DateInput>
          <Select value={selectedDoctor} onChange={(e)=>{SetSelectedDoctor(e)}} mt={"xl"} label={language?"चिकित्सक":"Doctor"}  data={doctorList}>
          </Select>
          <Button onClick={()=>{
              SetLoading(true);
              let req=[]
              if(selectedDoctor!="" && selectedDate!=0){
                if(doctorList.includes(selectedDoctor)){
                  
                getDoc(doc(db,"users",localStorage.getItem("uid"))).then(data=>{
                  const name=data.data().name
               
                  const date=selectedDate
                  const reqe={
                    name:name,
                    date:date,
                    uid:auth.currentUser.uid
                  }
                  req.push(reqe)
                 const current= Math.round(new Date().getTime())
               if(data.data().checkups.length<1 ){
                  updateDoc(doc(db,"doctors",selectedDoctor),{
                    requests:req
                  }).then(()=>{alert("done");
                  SetLoading(false)})
               }
               else if(data.data().checkups[0].date.seconds*1000<current){
             
                updateDoc(doc(db,"doctors",selectedDoctor),{
                  requests:[]
                }).then(()=>{
                  updateDoc(doc(db,"doctors",selectedDoctor),{
                    requests:req
                  }).then(()=>{
                    alert('done');
                    
              SetLoading(false)
                  })
                })

               }
               else{
                console.log(data.data().checkups[0].date.seconds<current)
                alert("you already have an appointment")
                
              SetLoading(false)
               }
                })
               
                }
                else{
                  alert("this doctor is unavailable")
                  
              SetLoading(false)
                }

              }
              else{
                alert("fill all the details")
                
              SetLoading(false)
              }
          }}  className={styles.requestButton}>Request Appointment</Button>
        </Card>
          </div>
          
        <div className={styles.DatePickers }>
          <div className={styles.datePicker}>
            <div className={styles.month}>
              <Text> { language? hindiMonths[new Date().getMonth()]:months[new Date().getMonth()]} </Text>
             

            </div>
            <div className={styles.days}>
              <div>
              <Text>
                {language?"सोम":"Mon"}
              </Text>
              {
                mon.map((el,index)=>{
                  if(el==="\u2800"){
                    return (
                      <div  style={{width:'40px',height:'40px',marginTop:'20px',paddingTop:'10px'}}>
                    <Text   >{el}</Text>
                    </div>
                    )
                  }
                  else{
                    if(selected===el){
                      return(
                         <div  style={{background:'#6d8af2'}}  className={styles.number}>
                      <Text  >{el}</Text>
                      </div>
                      )
                    }
                    else{
                    return(
                      <div    className={styles.number}>
                      <Text >{el}</Text>
                      </div>
                    )
                    }
                  }
                  
                  
                })
              }
              </div>
              <div>
              <Text>
                {language?"मंगल":"Tues"}
              </Text>
              {
                tue.map((el)=>{
                  if(el==="\u2800"){
                    return (
                      <div style={{width:'40px',height:'40px',marginTop:'20px',paddingTop:'10px'}}>
                    <Text >{el}</Text>
                    </div>
                    )
                  }
                  else{
                    if(selected===el){
                      return(
                         <div style={{background:'#6d8af2'}}  className={styles.number}>
                      <Text  >{el}</Text>
                      </div>
                      )
                    }
                    else{
                    return(
                      <div   className={styles.number}>
                      <Text >{el}</Text>
                      </div>
                    )
                    }
                  }

                })
              }
              </div>
              <div>
              <Text>
                {language?"बुध":'Wed'}
              </Text>
              {
                wed.map((el)=>{
                  if(el==="\u2800"){
                    return (
                      <div style={{width:'40px',height:'40px',marginTop:'20px',paddingTop:'10px'}}>
                    <Text >{el}</Text>
                    </div>
                    )
                  }
                  else{
                    if(selected===el){
                      return(
                         <div style={{background:'#6d8af2'}}  className={styles.number}>
                      <Text  >{el}</Text>
                      </div>
                      )
                    }
                    else{
                    return(
                      <div   className={styles.number}>
                      <Text >{el}</Text>
                      </div>
                    )
                    }
                  }

                })
              }
              </div>
              <div>
              <Text>
                {language?"गुरु":'Thu'}
              </Text>
              {
                thu.map((el)=>{
                  if(el==="\u2800"){
                    return (
                      <div style={{width:'40px',height:'40px',marginTop:'20px',paddingTop:'10px'}}>
                    <Text >{el}</Text>
                    </div>
                    )
                  }
                  else{
                    if(selected===el){
                      return(
                         <div style={{background:'#6d8af2'}}  className={styles.number}>
                      <Text  >{el}</Text>
                      </div>
                      )
                    }
                    else{
                    return(
                      <div    className={styles.number}>
                      <Text >{el}</Text>
                      </div>
                    )
                    }
                  }
                  
                })
              }
              </div>
              <div>
              <Text>
                {language?"शुक्र":"Fri"}
              </Text>
              {
                fri.map((el)=>{
                  if(el==="\u2800"){
                    return (
                      <div style={{width:'40px',height:'40px',marginTop:'20px',paddingTop:'10px'}}>
                    <Text >{el}</Text>
                    </div>
                    )
                  }
                  else{
                    if(selected===el){
                      return(
                         <div style={{background:'#6d8af2'}}  className={styles.number}>
                      <Text  >{el}</Text>
                      </div>
                      )
                    }
                    else{
                    return(
                      <div className={styles.number}>
                      <Text >{el}</Text>
                      </div>
                    )
                    }
                  }
                })
              }
              </div>
              <div>
              <Text>
              {language?"शनि":"Sat"}
              </Text>
              {
                sat.map((el)=>{
                  if(selected===el){
                    return(
                       <div style={{background:'#6d8af2'}}  className={styles.number}>
                    <Text  >{el}</Text>
                    </div>
                    )
                  }
                  else{
                  return(
                    <div    className={styles.number}>
                    <Text >{el}</Text>
                    </div>
                  )
                  }
                })
              }
              </div>
              <div>
              <Text>
                {language?"रवि":"Sun"}
              </Text>
              {
                sun.map((el)=>{
                  if(selected===el){
                    return(
                       <div style={{background:'#6d8af2'}}  className={styles.number}>
                    <Text  >{el}</Text>
                    </div>
                    )
                  }
                  else{
                  return(
                    <div    className={styles.number}>
                    <Text >{el}</Text>
                    </div>
                  )
                  }
                })
              }
              </div>

            </div>

          </div>
        </div>


        <LanguageDiv></LanguageDiv>
        </>  }
    </div>
  )
}
