import { useState } from "react";
import {Card ,Center,Text} from '@mantine/core'
import styles from '../../styles/card.module.css'
const index = () => {
    const [list,SetList]=useState(["National Animal Disease Control Programme"," Dairy processing & Infrastructure Development Fund (DIDF)    ","Supporting Dairy Cooperatives & Farmer Producer Organizations"," Animal Husbandry Infrastructure Development Fund (AHIDF)"," RASHTRIYA GOKUL MISSION"])
    return (
        <div>
            <Center><Text size={"xl"} mt="xl">Government Schemes</Text></Center>
                {list.map(el=>{
                    return(
                        <Center>
                        <Card padding="xl"
                        className={styles.card}
                        component="a"
                        w="95%"
                        
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"  shadow="sm" mt="lg" radius="md" withBorder>
                        <Text>{el}</Text>
                        </Card>
                        </Center>
                    )
                })}
        </div>
    );
}

export default index;