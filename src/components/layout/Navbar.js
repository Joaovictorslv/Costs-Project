import style from './Navbar.module.css';

import Container from './Container';

import logo from '../../img/costs_logo.png'
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav className={style.navbar}>
          <Container>
            <> <img src={logo} alt="Costs"/> </>
            <ul className={style.list}>
              <li  className={style.item}> <Link to="/">Home</Link> </li>
              <li  className={style.item}> <Link to="/projects">Projects</Link> </li>
              <li  className={style.item}> <Link to="/company">Company</Link> </li>
              <li  className={style.item}> <Link to="/contato">Contact</Link> </li>
            </ul>
          </Container>
        </nav>
    )
}

export default Navbar;