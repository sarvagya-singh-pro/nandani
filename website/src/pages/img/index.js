import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import styles from '../../styles/img.module.css';
import axios from 'axios';
import { Button, Modal,Center } from "@mantine/core";


const Component = () => {
    const sendImageToServer = (base64Image) => {
        axios.post('image', { image: base64Image })
          .then(response => {
            // Handle the response from the server
            console.log(response.data);
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
      };
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(false);

  return (
    <div>
      <Camera facingMode={'environment'}  ref={camera} />
      <Modal onClose={()=>{setModel(false)}} opened={model}>
     <Center>   <img style={{width:'95%',height:'90%'}} src={image}>
        </img></Center>
        <Center>
        <Button variant="light" onClick={()=>{
             sendImageToServer(image)
        }} color="green" mt="xl">Check For disease</Button>
        </Center>
      </Modal>
      <button className={styles.button} onClick={() => {setImage(camera.current.takePhoto());setModel(true);alert("photo taken")}}>Take photo</button>
      
    </div>
  );
}

export default Component;