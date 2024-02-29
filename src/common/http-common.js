import axios from 'axios';

export default axios.create({
    baseURL: "http://52.186.13.7:8080/api",
    headers: {
        "Content-type":"application/json"
    }
});