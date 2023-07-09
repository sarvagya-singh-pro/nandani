import styles from '../../styles/checkup.module.css'
import { Header } from "@mantine/core";
const index = () => {
    return (
        <div>
           <Header  bg={'#111'} height={65} p="xs"></Header>
           <div className={styles.checkup}>
            <input type='number'></input>
           </div>
        </div>
    );
}

export default index;