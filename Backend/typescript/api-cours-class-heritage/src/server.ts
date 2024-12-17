// ------------------ API avec Héritage de Classe ------------------

import express, { Request, Response } from 'express';

// Classe de base User
class BaseUser {
  constructor(public id: number, public name: string, public email: string) {}

  getFullName(): string {
    return `${this.name} (ID: ${this.id})`;
  }
}

// Classe Admin qui hérite de User
class AdminUser extends BaseUser {
  constructor(id: number, name: string, email: string, public role: 'admin' | 'superadmin') {
    super(id, name, email);
  }

  getRole(): string {
    return this.role;
  }
}

// Simulons une base de données
const adminUsers: AdminUser[] = [
  new AdminUser(3, 'Charlie', 'charlie@example.com', 'admin'),
  new AdminUser(4, 'Diana', 'diana@example.com', 'superadmin')
];

const appInheritance = express();
const portInheritance = 3004;

// Endpoint pour obtenir tous les administrateurs
appInheritance.get('/admin-users', (req: Request, res: Response) => {
  res.json(adminUsers);
});

// Endpoint pour obtenir un administrateur par son ID
appInheritance.get('/admin-users/:id', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json(adminUser);
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

// Endpoint pour obtenir le nom complet d'un administrateur par son ID
appInheritance.get('/admin-users/:id/fullname', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json({ fullName: adminUser.getFullName() });
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

// Endpoint pour obtenir le rôle d'un administrateur par son ID
appInheritance.get('/admin-users/:id/role', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json({ role: adminUser.getRole() });
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

appInheritance.listen(portInheritance, () => {
  console.log(`Serveur avec Héritage de Classe en cours d'exécution sur le port ${portInheritance}`);
});
