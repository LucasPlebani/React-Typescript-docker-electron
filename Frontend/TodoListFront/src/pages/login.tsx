import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.sass";
import { API_URL } from "../config";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur d'authentification.");
            }

            // Stocker le token JWT dans le localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            alert("Connexion réussie !");
            navigate("/home"); // Rediriger vers la page principale
        } catch (error) {
            setError(error instanceof Error ? error.message : "Une erreur est survenue.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Connexion</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button className="signin-button" type="submit">
                        Se connecter
                    </button>
                </form>

                <button className="signup-button" onClick={() => navigate("/signup")}>
                    S'inscrire
                </button>
            </div>
        </div>
    );
}

export default Login;
