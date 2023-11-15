import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { Table } from "react-bootstrap"; 
import TaskRow from "./TaskRow"; 

const TaskList = () => { 
const [tasks, setTasks] = useState([]); 

useEffect(() => { 
	axios 
	.get("http://localhost:4000/task") 
	.then(({ data }) => { 
		setTasks(data); 
	}) 
	.catch((error) => { 
		console.log(error); 
	}); 
}, []); 

const DataTable = () => { 
	return tasks.map((res, i) => { 
    	return <TaskRow obj={res} key={i} />; 
	}); 
}; 

return ( 
	<div className="table-wrapper"> 
	<Table striped bordered hover> 
		<thead> 
		<tr> 
			<th>Task</th> 
			<th>Status</th> 
			<th>TaskID</th> 
			<th>Action</th> 
		</tr> 
		</thead> 
		<tbody>{DataTable()}</tbody> 
	</Table> 
	</div> 
); 
}; 

export default TaskList;
