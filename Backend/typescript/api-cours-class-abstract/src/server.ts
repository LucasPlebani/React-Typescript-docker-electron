
// ------------------ API avec Classe Abstraite ------------------

import express, { Request, Response } from 'express';

// Classe abstraite
abstract class AbstractUser {
  constructor(public id: number, public name: string, public email: string) {}
  
  abstract getRole(): string;
}

// Classe concrète étendant la classe abstraite
class AdminUser extends AbstractUser {
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

const appAbstract = express();
const portAbstract = 3002;

// Endpoint pour obtenir les administrateurs
appAbstract.get('/admin-users', (req: Request, res: Response) => {
  res.json(adminUsers);
});

// Endpoint pour obtenir un administrateur par son ID
appAbstract.get('/admin-users/:id', (req: Request, res: Response) => {
  const adminUser = adminUsers.find(u => u.id === parseInt(req.params.id));
  if (adminUser) {
    res.json(adminUser);
  } else {
    res.status(404).json({ message: 'Administrateur non trouvé' });
  }
});

appAbstract.listen(portAbstract, () => {
  console.log(`Serveur avec Classe Abstraite en cours d'exécution sur le port ${portAbstract}`);
});
