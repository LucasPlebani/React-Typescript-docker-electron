// ------------------ API avec Type (intersection, union) ------------------

import express, { Request, Response } from 'express';

// Type utilisateur de base
type User = {
  id: number;
  name: string;
  email: string;
};

// Type utilisateur admin (intersection de User et un nouveau type)
type AdminUser = User & {
  role: 'admin' | 'superadmin';
};

// Type pour les réponses de l'API (union de plusieurs types)
type ApiResponse = User | AdminUser | { message: string };

// Simulons une base de données
const usersType: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

const adminUsersType: AdminUser[] = [
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'admin' },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'superadmin' },
];

const appType = express();
const portType = 3001;

// Endpoint pour obtenir tous les utilisateurs
appType.get('/users', (req: Request, res: Response) => {
  const response: ApiResponse[] = usersType;
  res.json(response);
});

// Endpoint pour obtenir un utilisateur par son ID
appType.get('/users/:id', (req: Request, res: Response) => {
  const user = usersType.find(u => u.id === parseInt(req.params.id));
  const response: ApiResponse = user ? user : { message: 'Utilisateur non trouvé' };
  res.json(response);
});

// Endpoint pour obtenir les administrateurs
appType.get('/admin-users', (req: Request, res: Response) => {
  const response: ApiResponse[] = adminUsersType;
  res.json(response);
});

appType.listen(portType, () => {
  console.log(`Serveur avec Type en cours d'exécution sur le port ${portType}`);
});