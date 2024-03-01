import { useState } from "react";
import { Button, TextField } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { toast } from 'react-toastify';
import Joi from 'joi-browser'
import { useHistory } from "react-router-dom";

import UserService from "../service/UserService";

export default function UserForm(props) {

    const history=useHistory();
    const [formData, setNewFormData] = useState({
        name: "",
        email: "",
        address: ""
    })

    const [errors, setNewErrors] = useState("")

    const schema = {
        id: "",
        name: Joi.string().required().label("First Name"),
        email: Joi.string().required(),
        address: Joi.string().required().min(2).max(10)
    }

    const validateProperty=(event)=>{
        const {name,value}=event.target;
        const obj={[name]:value};
        const subschema={[name]:schema[name]};
        const result=Joi.validate(obj,subschema);
        console.log(result);
        const {error}=result;
        return error ? error.details[0].message : null
    }

    const validate=()=>{
        const result = Joi.validate(formData,schema,{abortEarly:false});
        console.log(result);
        if(!result.error){
            return null
        }
        else {
            const errorData={};
            for(let item of result.error.details){
                errorData[item.path[0]]=item.message;
            }
            setNewErrors(errorData);
            return errorData;
        }
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
         let newUser={...formData};
         const errors=validate();
         if(!errors) {
            UserService.create(newUser).then(response=>{
                history.push('/userList')
            }).catch(error=>{console.log(error);})
            toast.success("User is added successfully")
         }
         else {
            console.log("Error",errors);
            toast.error("Error in adding user")

         }
    }

    const inputChangeHandler=(evt)=>{

        //accessing name and value of target element -- elemnt which has triggered this event
        console.log("input change handler", evt)
        const {name,value}=evt.target;

        let errorData={...errors}  //taing cone of errors state using ...[spread operator]

        //check validateProperty() to compare value against schema
        const errorMessage=validateProperty(evt);

        if(errorMessage){ // if errorMessage is not null
            errorData[name]=errorMessage  //errorData[firstName]=First Name is required
        }
        else {
            delete errorData[name] //on correcting the value delete the existing errorData
        }

        let userData={...formData}  //copying current state of formData
        userData[name]=value;  //updating the value of formData
        setNewFormData(userData)  //updating state of formData
        setNewErrors(errorData)   // updating state of errors
    }

    return (
        <div className="container">
            <h3>Add Customer</h3>
            <div className="row">
                <div className="col-md-6 offset-3">
                    <form className="ui form" onSubmit={(event) => handleSubmit(event)}>
                        <div className="form-group">
                            <TextField variant='outlined'
                                color="secondary"
                                name="name"
                                label="FirstName"
                                value={formData.name}
                                autoFocus
                                margin='normal'
                                fullWidth
                                onChange={(evt) => inputChangeHandler(evt)} />
                            {errors.name && <div className="'alert alert-danger">
                                {errors.name}
                            </div>}
                        </div>
                        <div className="form-group">
                            <TextField variant='outlined'
                                color="secondary"
                                name="email"
                                label="Email"
                                value={formData.email}
                                margin='normal'
                                fullWidth
                                onChange={(evt) => inputChangeHandler(evt)} />
                            {errors.email && <div className="'alert alert-danger">
                                {errors.email}
                            </div>}
                        </div>
                        <div className="form-group">
                            <TextField variant='outlined'
                                color="secondary"
                                name="address"
                                label="Address"
                                value={formData.address}
                                margin='normal'
                                fullWidth
                                onChange={(evt) => inputChangeHandler(evt)} />
                            {errors.address && <div className="'alert alert-danger">
                                {errors.address}
                            </div>}
                        </div>
                        <Button type="submit"
                        startIcon={<Save/>}
                        variant="contained"
                        color="secondary"
                        style={{
                            fontSize:20
                        }}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}