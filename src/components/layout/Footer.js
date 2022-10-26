import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';
import style from './Footer.module.css';

function Footer(){
    return (
        <footer className={style.footer}>
            <ul className={style.sociallist}>
                <li > <FaFacebook/> </li>
                <li > <FaInstagram/> </li>
                <li > <FaLinkedin/> </li>
            </ul>
            <p className={style.copyright}>
                <span>Costs</span> &copy; 2022
            </p>
        </footer>
    )
}

export default Footer;