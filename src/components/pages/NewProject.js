import style from './NewProject.module.css';
import ProjectForm from '../project/ProjectForm';
import { useNavigate } from 'react-router-dom';

function NewProject(){

    const navigate = useNavigate()

    function createPost(project){
        //initalize cost and services
        project.cost = 0; 
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }) 
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            navigate('/projects',{state:{message: 'Projeto criado com sucesso'}})
        })
        .catch((err) => console.log(err))
    }

    return( 
        <div className={style.newProjectContainer}>
            <h1>Create Project</h1>
            <p>Create yoour projects and then add them to your portfolio</p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project"/>
        </div>
    )
}

export default NewProject;