import { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import UserService from '../service/UserService';

export default function UserList(props) {
    
    const [users,setNewUsers]=useState([]);

    const history = useHistory();

    const deleteUser=(id)=>{

        UserService.remove(id).then(response=>{
            history.push("/userList")
        }).catch(error=>{
            console.log(error);
        })

        //axios.delete(apiEnPoint+id)
        // .then((result)=>{
        //    history.push("/userList")
        //})
    }

    const editUser=(id)=>{
        history.push("/edit/"+id)
    }

    const viewUser=(id)=>{
        history.push("/view/"+id)
    }

    useEffect(()=>{
        UserService.getAll().then(response=>{
            setNewUsers(response.data.body)
        }).catch(error=>{
            console.log(error);
            setNewUsers([])
        })
    }, [])

    const tabRows=users.map((user,i)=>{
        return(
            <tr key={i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-warning" onClick={()=>{viewUser(user.id)}}>View</button>
                        <button className="btn btn-warning" onClick={()=>{editUser(user.id)}}>Edit</button>
                        <button className="btn btn-warning" onClick={()=>{deleteUser(user.id)}}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    })

    return(
        <div>
            <h1>User Data</h1>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {tabRows}
                </tbody>
            </table>
        </div>
    )
}