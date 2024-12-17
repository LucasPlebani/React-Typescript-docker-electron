// ------------------ API avec Classe et Interface ------------------

import express, { Request, Response } from 'express';

// Définition de l'interface
interface IUser {
  id: number;
  name: string;
  email: string;
  getFullName(): string;
}

// Classe implémentant l'interface
class User implements IUser {
  constructor(public id: number, public name: string, public email: string) {}

  getFullName(): string {
    return `${this.name} (ID: ${this.id})`;
  }
}

// Simulons une base de données
const users: User[] = [
  new User(1, 'Alice', 'alice@example.com'),
  new User(2, 'Bob', 'bob@example.com')
];

const app = express();
const port = 3003;

// Endpoint pour obtenir tous les utilisateurs
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// Endpoint pour obtenir un utilisateur par son ID
app.get('/users/:id', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Endpoint pour obtenir le nom complet d'un utilisateur par son ID
app.get('/users/:id/fullname', (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json({ fullName: user.getFullName() });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

app.listen(port, () => {
  console.log(`Serveur avec Classe et Interface en cours d'exécution sur le port ${port}`);
});
