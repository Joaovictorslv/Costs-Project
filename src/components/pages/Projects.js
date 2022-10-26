import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react';

import styles from './Projects.module.css'

import Message from "../layout/Message";
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';
import Loading from '../layout/Loading';

function Projects(){

    const [projects, setProjects] = useState([])

    const[removeloading, setRemoveLoading] = useState(false)

    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = " "

    console.log(location.state)

    if(location.state){
        message = location.state.message
    }

    useEffect(() =>{
        setTimeout(() =>{
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'Content-Type': 'application-json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
        }, 2000)
    }, [])


    function removeproject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Project removed!')
            
        })
        .catch(err => console.log(err))
    }


    return( 
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1> My Projects </h1>
                <LinkButton to="/newproject" text="Create Project"/>
            </div>

            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}

            <Container customClass="start">
                 {projects.length > 0 &&
                    projects.map((project) =>(
                    <ProjectCard 
                    key={project.id} 
                    name={project.name}
                    budget={project.budget}
                    id={project.id}
                    category={project.category.name}
                    handleRemove={removeproject}
                    />   
                 ))}
                 {!removeloading && <Loading></Loading>}

                 {removeloading && projects.length === 0 && (
                    <p>No Projects Here</p>
                 )
                 }
            </Container>
            
        </div>
    )
}

export default Projects;