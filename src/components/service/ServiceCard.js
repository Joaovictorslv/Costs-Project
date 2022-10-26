import style from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({name, id, cost, description, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return(
        <div className={style.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Total cost: </span> R${cost}
            </p>
            <p>
                {description}
            </p>
            <div className={style.projectCardsAction}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default ServiceCard