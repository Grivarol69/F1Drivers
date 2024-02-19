import styles from './Footer.module.css'
import { Linkedin, Github } from '../Svg/SvgIcons'

const Footer = () => {
  return (
    <div className={styles.footer__container}>
      <span>Develop by Guillermo Rivarola</span>
      <a 
        href="https://www.linkedin.com/in/grivarol69"
        title='Linkedin'
        target='blank'
        rel='noreferrer'
      >
        <Linkedin/>
      </a>
      <a 
        href="https://github.com/Grivarol69/drivers"
        title='Github'
        target='blank'
        rel='noreferrer'
      >
        <Github/>
      </a>
    </div>
  )
}

export default Footer
