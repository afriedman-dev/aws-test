import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import TaskForm from "./TaskForm"; 

const EditTask = (props) => { 
const [formValues, setFormValues] = useState({ 
	task: "", 
	status: "", 
	taskid: "", 
}); 
 
const onSubmit = (taskObject) => { 
	axios 
	.put( 
		"http://localhost:4000/task/" + 
		props.match.params.id, 
		taskObject 
	) 
	.then((res) => { 
		if (res.status === 200) { 
		alert("Task successfully updated"); 
		props.history.push("/task-list"); 
		} else Promise.reject(); 
	}) 
	.catch((err) => alert("Something went wrong")); 
}; 
 
useEffect(() => { 
	axios 
	.get( 
		"http://localhost:4000/task/"
		+ props.match.params.id 
	) 
	.then((res) => { 
		const { task, status, taskid } = res.data; 
		setFormValues({ task, status, taskid }); 
	}) 
	.catch((err) => console.log(err)); 
}, []); 
 
return ( 
	<TaskForm 
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
	>
	    Update Task 
	</TaskForm> 
); 
}; 

export default EditTask;
