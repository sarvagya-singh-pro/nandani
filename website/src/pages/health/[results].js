import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import { Loader, Text } from "@mantine/core";
import styles from '../../styles/Results.module.css'
const results = (props) => {
    const router = useRouter();
    const listdis = [
        "mastitis",
        "blackleg",
        "bloat",
        "coccidiosis",
        "cryptosporidiosis",
        "displaced_abomasum",
        "gut_worms",
        "listeriosis",
        "liver_fluke",
        "necrotic_enteritis",
        "peri_weaning_diarrhoea",
        "rift_valley_fever",
        "rumen_acidosis",
        "traumatic_reticulitis",
        "calf_diphtheria",
        "foot_rot",
        "foot_and_mouth",
        "ragwort_poisoning",
        "wooden_tongue",
        "infectious_bovine_rhinotracheitis",
        "acetonaemia",
        "fatty_liver_syndrome",
        "calf_pneumonia",
        "schmallen_berg_virus",
        "trypanosomosis",
        "fog_fever"
    ]
    const [data,SetData]=useState(null)
    useEffect(() => {
        console.log(router.query.data);
        if(router.query.data)
        {
            console.log(JSON.parse(router.query.data)["what is love"])
        SetData(JSON.parse(router.query.data)["what is love"])
        }
    }, [router.query]);
    return (
        <div className={styles.bg}>
       
            {
                data?<div>
                         <Text size={"2rem"} className={styles.header}>Results</Text>
            <div className={styles.card}>
                <div className={styles.ant}>
                <Text className={styles.anthHead}>Anthrax</Text>
                 
            <div className={styles.outer}></div>
            <div className={styles.inner} style={{width:data["Anthhrax"][0][0]*250}}></div>
          </div>
          <div className={styles.ant}>
                <Text className={styles.anthHead}>Blackleg</Text>
                 
            <div className={styles.outer}></div>
            <div className={styles.inner} style={{width:data["BlackLeg"][0][0]*250}}></div>
          </div>
          <div className={styles.ant}>
                <Text className={styles.anthHead}>Foot & Mouth </Text>
                 
            <div className={styles.outer}></div>
            <div className={styles.inner} style={{width:data["Foot"][0][0]*250}}></div>
          </div>
          <div className={styles.ant}>
                <Text className={styles.anthHead}>Pneunominia </Text>
                 
            <div className={styles.outer}></div>
            <div className={styles.inner} style={{width:data["Pneunomonia"][0][0]*250}}></div>
          </div>
          <div className={styles.ant}>
                <Text className={styles.anthHead}>Lumpy </Text>
                 
            <div className={styles.outer}></div>
            <div className={styles.inner} style={{width:data["Lumpy"][0][0]*250}}></div>
          </div>
          
          </div>
          <Text align="center" pt="5rem" size="xl" pb="2rem">Other Probable Diseases :</Text>
                  
                                <div className={styles.listIt}>
                                    <Text size={"xl"}>{listdis[data["Other"]]}</Text>
                                    </div>
                   
                </div>:<div style={{display:'flex',width:'100%',height:'100vh',alignItems:'center',justifyContent:'center'}}>
                    <Loader/>
                </div>
            }
          
        </div>
    );
}

export default results;