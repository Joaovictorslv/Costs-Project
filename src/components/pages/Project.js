import { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';
import {parse, v4 as uuidv4} from 'uuid'

import Loading from '../layout/Loading';
import style from './Project.module.css'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm';
import Message from '../layout/Message';
import Container from '../layout/Container';
import ServiceCard from '../service/ServiceCard'

function Project(){
    const {id} = useParams()

    const [services, setServices] = useState([])

    const [project, setProject] = useState([])

    const [showproject, setShowProject] = useState(false)

    const [showServiceForm, setShowServiceForm] = useState(false)

    const [message, setMessage] = useState()

    const [type, setType] = useState()
    
    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))

    }, [id])


    function editPost(project){

        setMessage('')

        if(project.budget < project.cost){
            //message
            setMessage('The budget should not be less then the cost of the project.')
            setType('error')
        }

        console.table(project);

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProject(false)
            setMessage('Update Project')
            setType('success')
        })
        .catch(err => console.log(err))

    }

    function createService(project){

        setMessage('')

        const lastService =  project.services[project.services.length -1]

        lastService.id =  uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Budget passed, check the value of the service')
            setType('error')
            project.service.pop()
            return false
        }

        project.cost = newCost


        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then(() => {
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProject(!showproject)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost){
        
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setProject(projectUpdated)
            setServices(servicesUpdate)
            setMessage('Service removed by success')
        })
        .catch((err) => console.log(err))

    }


    return(
    <>
    {project.name ? (

        <div className={style.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={style.details_container}>
               
                    <h1>Project: {project.name}</h1>
                    <button className={style.btn} onClick={toggleProjectForm}>
                        {!showproject ? 'Edit Project' : 'Close'}
                    </button>
                
                    {!showproject ?(
                        <div className={style.project_info} >
                            <p>
                                <span>Category: </span> {project.category.name}
                            </p>
                            <p>
                                <span>Total budget: </span> R${project.budget}
                            </p>
                            <p>
                                <span>Total used: </span> R${project.cost}
                            </p>
                        </div>
                    ):(
                        <div className={style.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/>
                        </div>
                    )}

                </div>

                    <div className={style.service_form_Container}>
                        <h2>Add the service:</h2>
                        <button className={style.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Add Service' : 'Close'}
                    </button>
                    <div className={style.project_info}>
                        {
                            showServiceForm && <ServiceForm 
                            handleSubmit={createService}
                            btnText="Add service"
                            projectData={project}
                            />
                        }
                    </div>
                    </div>
                    
                        <h2>Service</h2>
                        <Container customClass="start">
                            {
                                services.length > 0 && 
                                services.map((service) =>(
                                    <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                services.length === 0 && <p>No services</p>
                            }
                        </Container>
                    
            </Container>
        </div>
    ):(
        <Loading />
    )}
    </>);
}

export default Project;