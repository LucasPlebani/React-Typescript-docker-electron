# Backend/Dockerfile

FROM node:18

WORKDIR /app

# Copie uniquement les fichiers utiles
COPY package*.json ./

# Installe les dépendances dans Docker
RUN npm install

# Copie le reste du code
COPY . .

# Compile TypeScript
RUN npm run build

# Lance l'app compilée
CMD ["npm", "start", "server.ts"]
