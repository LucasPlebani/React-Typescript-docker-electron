# Dockerfile (frontend)

FROM node:18

WORKDIR /app

# Étape 1 : copier uniquement les fichiers de dépendances
COPY package.json package-lock.json* ./

# Étape 2 : installer les dépendances
RUN npm install

# Étape 3 : copier tout le reste du projet
COPY . .

# Étape 4 : exposer le port Vite
EXPOSE 5173

# Étape 5 : lancer en mode dev (développement interactif)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
