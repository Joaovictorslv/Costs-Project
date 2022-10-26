import style from './ProjectCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectCard({id, name, budget, category, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
    <div className={style.projectCard}>
        <h3> {name}</h3>
        <p>
            <span>Budget: </span> R${budget}
        </p>
        <p className={style.categoryText}>
            <span className={`${style[category.toLowerCase()]}`}></span> {category}
        </p>
        <div className={style.projectCardsAction}>
            <Link to={`/project/${id}`}>
                <BsPencil />Edit
            </Link>
            
            <button onClick={remove}>
                <BsFillTrashFill/>Remove 
            </button>
        </div>
    </div>
    )
}

export default ProjectCard;