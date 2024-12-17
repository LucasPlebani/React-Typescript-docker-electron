// ------------------ API avec Interface et Extension ------------------

import express, { Request, Response } from 'express';

// Définition de l'interface de base
interface IUser {
  id: number;
  name: string;
  email: string;
  getFullName(): string;
}

// Extension de l'interface de base
interface IAdminUser extends IUser {
  role: 'admin' | 'superadmin';
  getRole(): string;
}

// Classe implémentant l'interface utilisateur de base
class User implements IUser {
  constructor(public id: number, public name: string, public email: string) {}

  getFullName(): string {
    return `${this.name} (ID: ${this.id})`;
  }
}

// Classe Admin implémentant l'extension de l'interface utilisateur
class AdminUser implements IAdminUser {
  constructor(public id: number, public name: string, public email: string, public role: 'admin' | 'superadmin') {}

  getFullName(): string {
    return `${this.name} (ID: ${this.id})`;
  }

  getRole(): string {
    return this.role;
  }
}

// Simulons une base de données
const users: User[] = [
  new User(1, 'Alice', 'alice@example.com'),
  new User(2, 'Bob', 'bob@example.com')
];

const adminUsers: AdminUser[] = [
  new AdminUser(3, 'Charlie', 'charlie@example.com', 'admin'),
  new AdminUser(4, 'Diana', 'diana@example.com', 'superadmin')
];

const app = express();
const port = 3005;

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

// Endpoint pour obtenir tous les administrateurs
app.get('/admin-users', (req: Request, res: Response) => {
  res.json(adminUsers);
});

// Endpoint pour obtenir un administrateur par son ID
app.get('/admin-users/:id', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json(adminUser);
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

// Endpoint pour obtenir le nom complet d'un administrateur par son ID
app.get('/admin-users/:id/fullname', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json({ fullName: adminUser.getFullName() });
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

// Endpoint pour obtenir le rôle d'un administrateur par son ID
app.get('/admin-users/:id/role', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json({ role: adminUser.getRole() });
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

app.listen(port, () => {
  console.log(`Serveur avec Interface et Extension en cours d'exécution sur le port ${port}`);
});
