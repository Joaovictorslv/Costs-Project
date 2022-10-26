import style from './Home.module.css'
import saving from '../../img/saving.png'
import LinkButton from '../layout/LinkButton';


function Home(){
    return( 
    <section className={style.homecontainer}>
        <h1>Welcome to <span>Costs</span> </h1>
        <p>Manage your projects efficiently and develop more and more</p>
        <LinkButton to="/newproject" text="Create Project"/>
        <img src={saving} alt="Costs"/>
        
    </section>
    )
}

export default Home;