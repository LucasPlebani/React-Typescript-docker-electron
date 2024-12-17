# Utiliser l'image officielle Node.js comme image de base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "index.js"]