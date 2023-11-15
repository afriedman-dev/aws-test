import React from "react"; 
import { Button } from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import axios from "axios"; 

const TaskRow = (props) => { 
    const { _id, task, status, taskid } = props.obj; 

    const deleteTask = () => { 
        axios 
        .delete( 
    "http://localhost:4000/task/" + _id) 
        .then((res) => { 
            if (res.status === 200) { 
            alert("Task successfully deleted"); 
            window.location.reload(); 
            } else Promise.reject(); 
        }) 
        .catch((err) => alert("Something went wrong")); 
    }; 

    return ( 
        <tr> 
        <td>{task}</td> 
        <td>{status}</td> 
        <td>{taskid}</td> 
        <td> 
            <Link className="edit-link"
            to={"/edit-task/" + _id}> 
            Edit 
            </Link> 
            <Button onClick={deleteTask} 
            size="sm" variant="danger"> 
            Delete 
            </Button> 
        </td> 
        </tr> 
    ); 
}; 

export default TaskRow;
