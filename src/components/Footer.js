import { List, Text } from "@mantine/core";
import styles from '../styles/footer.module.css'
export default () => {
    return (
        <div>
            <footer style={{background:'#0a0a0a' ,borderTop:'1px solid white'}}>
      <div style={{display:'flex',flexDirection:'row',width:'50vw',justifyContent:'space-around'}}>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{marginTop:'5rem',marginLeft:'1rem',display:'inline-block'}}  >
        <h2 style={{color:'#fff',fontFamily:'sans-serif',fontWeight:200}}>Cattleit</h2>
        <br></br>
        <div style={{width:"20%",height:'1px',background:'#fff'}}></div>
        <div></div>
         </div>
       <List color="#fff">
        <Text color="#aaa" pt={"2rem"} pl={"1rem"} >Terms Of Service   </Text> 
        <Text color="#aaa" pt={"1rem"} pl={"1rem"} >Contact us</Text>
         

       </List>
       </div>
       <div style={{display:'flex',flexDirection:'column'}}>
       <div style={{marginTop:'5rem',marginLeft:'1rem',display:'inline-block'}}  >
        <h2 style={{color:'#fff',fontFamily:'sans-serif',fontWeight:200}}>Contact</h2>
        
        <div></div>
         </div>
       <List color="#fff">
        <Text color="#aaa" pt={"2rem"} pl={"1rem"} > cattleit@gmail.com </Text> 
        <Text color="#aaa" pt={"1rem"} pl={"1rem"} > info.cattlelit@gmail.com</Text>
         

       </List>
       </div>
       </div>
       
           <br></br>
           <div >
           <Text align="center" style={{paddingTop:'1rem',paddingLeft:'1rem',color:'#fff',fontWeight:200}}>  &copy; 2023 All Right Reserved</Text>
           </div>
            </footer>
        </div>
    );
}