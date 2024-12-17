# Déclaration d'une classe basée sur l'héritage

## Installation
```bash
npm install
npm run dev  # Démarrage en mode développement
npm run build  # Compilation TypeScript
npm start  # Démarrage en production
```

## Variables d'Environnement
- `PORT`: Port sur lequel le serveur écoute (défaut: 3000)
- `NODE_ENV`: Environnement d'exécution


---

### **API avec Interface (Port 3000)**

1. **Obtenir tous les utilisateurs**
   ```bash
   curl -X GET http://localhost:3001/users
   ```

2. **Obtenir un utilisateur par ID (par exemple, ID = 1)**
   ```bash
   curl -X GET http://localhost:3001/users/1
   ```

3. **Obtenir un utilisateur par ID non existant (par exemple, ID = 99)**
   ```bash
   curl -X GET http://localhost:3001/users/99
   ```

4. **Obtenir la liste des administrateurs**
   ```bash
   curl -X GET http://localhost:3001/admin-users
   ```
