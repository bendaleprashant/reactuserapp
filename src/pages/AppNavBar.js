import { Link } from 'react-router-dom'

export default function AppNavBar() {
    return(
        <nav className='navbar navbar-inverse'>
            <div className='container-fluid'>
                <Link to="/">TopGuns Bank</Link>
                <span>|</span>
                <Link to="/Createuser">Create user</Link>
                <span>|</span>
                <Link to="/UserList">Get User List</Link>
                <span>|</span>
            </div>
        </nav>
    )
}
