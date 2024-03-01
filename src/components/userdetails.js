import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';

export default function UserDetails() {

    const [user, setNewUser] = useState({ id: "", name: "", email: "", address: "" })

    const baseURL = "http://52.186.13.7:8080/api/user/";

    const params = useParams();
    const history = useHistory();


    const getData = async () => {
        const result = await axios.get(baseURL + params.id);
        console.log("result", result);
        if (result.status = 200) {
            setNewUser(result.data);
            console.log("user", user);
            //toast.success("Success Message")
        }
        else {
            console.log("Something went wrong")
            //toast.warning("Data is not loaded from the server")
        }
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <button className="btn btn-secondary" onClick={history.goBack}>Back</button>
            <h1>User</h1>
            <ul className='list-group'>
                <li className="list-group-item">Id:{user.id}</li>
                <li className="list-group-item">Id:{user.name}</li>
                <li className="list-group-item">Id:{user.email}</li>
                <li className="list-group-item">Id:{user.address}</li>
            </ul>
        </div>
    )
}