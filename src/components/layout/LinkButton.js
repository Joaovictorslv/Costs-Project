import style from './LinkButton.module.css'

function LinkButton({to, text}){
    return(
        <a className={style.btn} href={to}>
            {text}
        </a>
    )
}

export default LinkButton;