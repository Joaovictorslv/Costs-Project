import loading from '../../img/Infinity-1s-200px.svg'

import style from './Loading.module.css'

function Loading(){
    return(
        <div className={style.loaderContainer}>
            <img className={style.loader} src={loading} alt="Loading"/>
        </div>
    )
}
export default Loading;