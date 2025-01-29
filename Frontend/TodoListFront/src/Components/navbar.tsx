import { useNavigate } from "react-router-dom";
import ToDoApp from "../Components/assets/ToDoApp_transparent-.png";
import "./styles/navbar.sass";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Supprime le token et l'ID utilisateur du localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        // Redirige vers la page de connexion
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <img src={ToDoApp} alt="ToDoApp" className="navbar__logo" />
                <div className="navbar__links">
                    <a href="#" onClick={handleLogout}>Déconnexion</a>
                    <a href="/tasks">Todo</a>
                    {/* <a href="/kanban">Kanban</a> */}
                </div>
            </div>
        </nav>
    );
}
