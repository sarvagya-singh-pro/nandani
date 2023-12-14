import { Card, Center,Text } from '@mantine/core';
import {FcOk} from 'react-icons/fc'
const index = () => {
    return (
        <div>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Center><Text color='#0eb546' size={"2rem"}>Payment Confimremed</Text></Center>
           <br></br>
          
           <Center> <FcOk size={"5rem"} /></Center>
           <br></br>
           <Center><Text size={"2rem"} fs={"bold"}>DO NOT CLOSE</Text></Center>
           </Card>
        </div>
    );
}

export default index;