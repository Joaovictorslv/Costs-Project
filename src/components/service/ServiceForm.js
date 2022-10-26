import style from '../project/ProjectForm.module.css'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import { useState } from 'react'

function ServiceForm({handleSubmit, btnText, projectData}){

    const [service, setService] = useState([])

    function Submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

        return(
            <form onSubmit={Submit} className={style.form}>
                <Input 
                type="text"
                text="service name"
                name="name"
                placeholder='put the service name here'
                handleOnChange={handleChange}
                />
                <Input 
                type="number"
                text="service cost"
                name="cost"
                placeholder='put a value here'
                handleOnChange={handleChange}
                />
                <Input 
                type="text"
                text="description of service"
                name="description"
                placeholder='describe the service'
                handleOnChange={handleChange}
                />
                <SubmitButton text={btnText}/>
            </form>
        )
}

export default ServiceForm