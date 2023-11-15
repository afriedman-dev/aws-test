import React from "react"; 
import * as Yup from "yup"; 
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { FormGroup, FormControl, Button } from "react-bootstrap"; 

const TaskForm = (props) => { 
const validationSchema = Yup.object().shape({ 
	task: Yup.string().required("Required"), 
	status: Yup.string().required("Required"), 
	taskid: Yup.number() 
	.positive("Invalid roll number") 
	.integer("Invalid roll number") 
	.required("Required"), 
}); 
console.log(props); 
return ( 
	<div className="form-wrapper"> 
	<Formik {...props} validationSchema={validationSchema}> 
		<Form> 
		<FormGroup> 
			<Field name="task" type="text"
				className="form-control" /> 
			<ErrorMessage 
			name="task"
			className="d-block invalid-feedback"
			component="span"
			/> 
		</FormGroup> 
		<FormGroup> 
			<Field name="status" type="text"
				className="form-control" /> 
			<ErrorMessage 
			name="status"
			className="d-block invalid-feedback"
			component="span"
			/> 
		</FormGroup> 
		<FormGroup> 
			<Field name="taskid" type="number"
				className="form-control" /> 
			<ErrorMessage 
			name="taskid"
			className="d-block invalid-feedback"
			component="span"
			/> 
		</FormGroup> 
		<Button variant="danger" size="lg"
			block="block" type="submit"> 
			{props.children} 
		</Button> 
		</Form> 
	</Formik> 
	</div> 
); 
}; 

export default TaskForm; 
