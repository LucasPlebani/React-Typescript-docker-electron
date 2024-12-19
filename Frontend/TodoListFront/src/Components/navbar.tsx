import ToDoApp from '../Components/assets/ToDoApp_transparent-.png'
import './styles/navbar.sass'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <img src={ToDoApp} alt="ToDoApp" className="navbar__logo" />
                <div className="navbar__links">
                    <a href="/login">Login</a>
                    <a href="/tasks">Todo</a>
                    <a href="/kanban">Kanban</a>
                </div>
            </div>
        </nav>
    )
}