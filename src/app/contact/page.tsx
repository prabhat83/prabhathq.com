import styles from "../page.module.css";
import variables from '../scss/variables.module.scss'

export default function Contact() {
  return <main className={styles.main}>
    <h1 style={{color: variables.primaryColor}}>Contact</h1>
  </main>;
}