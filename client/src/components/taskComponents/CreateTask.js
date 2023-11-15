 import React, { useState } from "react"; 
import axios from 'axios'; 
import TaskForm from "./TaskForm"; 

// CreateTask Component 
const CreateTask = () => { 
const [formValues, setFormValues] = 
	useState({ task: '', status: '', taskid: '' });
// onSubmit handler 
const onSubmit = taskObject => { 
	axios.post( 
    'http://localhost:4000/task', 
	taskObject) 
	.then(res => { 
		if (res.status === 200) 
		alert('Student successfully created') 
		else
		Promise.reject() 
	}) 
	.catch(err => alert('Something went wrong')) 
} 
	
// Return task form 
return( 
	<TaskForm
        initialValues={formValues} 
	    onSubmit={onSubmit} 
	    enableReinitialize> 
	    Create Task 
	</TaskForm> 
) 
} 

export default CreateTask
