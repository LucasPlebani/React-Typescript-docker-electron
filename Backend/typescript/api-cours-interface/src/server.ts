// ------------------ API avec Interface (avec extension) ------------------

import express, { Request, Response } from 'express';

// Définition de l'interface de base
interface IUser {
  id: number;
  name: string;
  email: string;
}

// Extension de l'interface IUser
interface IAdminUser extends IUser {
  role: 'admin' | 'superadmin';
}

// Simulons une base de données
const users: IUser[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

const adminUsers: IAdminUser[] = [
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'admin' },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'superadmin' },
];

const app = express();
const port = 3002;

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

// Endpoint pour obtenir les administrateurs
app.get('/admin-users', (req: Request, res: Response) => {
  res.json(adminUsers);
});

app.listen(port, () => {
  console.log(`Serveur avec Interface en cours d'exécution sur le port ${port}`);
});
