import { useEffect,useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditUser(props){

    const [user,setNewUser ]=useState({ id:"",name:"",email:"",address:"" })

    const params=useParams();

    const apiEndPoint = "http://52.186.13.7:8080/api/user/"+params.id;

    const history=useHistory();

    const getData=async()=>{
        const result=await axios.get(apiEndPoint);
        console.log("result",result);
        if(result.status==200) {
            setNewUser(result.data);
            toast.success("Retrieved data from the serve successfully")
        }
        else {
            console.log("Something went wrong");
            toast.warning("data is not loaded from the server")
        }
    }

    useEffect(()=>{
        getData();
    },[])

    const inputChangeHandler=(e)=>{
        setNewUser((user)=>({
            ...user,
            [e.target.name]:e.target.value
        }))
    }

    const UpdateUser=(e)=>{
        e.preventDefault();
        axios.put(apiEndPoint,user)
        .then(resp=>history.push('/UserList'))
        .catch(err=>console.log("error",err))
    }

    return(
        <div className='container'>
            <button className='btn btn-secondary' onClick={history.goBack}>Back</button>
            <h1>Update User</h1>
            <div className='row'>
                <div className="col-md-6 offset-3">
                    <form onSubmit={UpdateUser} className='form'>
                        <label>Name</label>
                        <input type="text" name="name" className='form-control'
                        value={user.name} onChange={inputChangeHandler}/>
                        <input type="text" name="email" className='form-control'
                        value={user.email} onChange={inputChangeHandler}/>
                        <input type="text" name="address" className='form-control'
                        value={user.address} onChange={inputChangeHandler}/>
                        <input type="submit" value="Submit" onClick={UpdateUser}/>
                    </form>
                </div>
            </div>
        </div>
    )
}
