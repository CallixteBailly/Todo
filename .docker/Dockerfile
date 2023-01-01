FROM node:alpine as builder

# Créer un répertoire dans lequel votre application sera placée
RUN mkdir -p /app

# Définissez /app comme répertoire de travail
WORKDIR /app

# Installez Yarn
RUN npm install -g yarn

# Copiez les fichiers de votre application
COPY . /app/

# Installez les dépendances
RUN yarn install

# Générez les fichiers de production de votre application React
RUN yarn build

# Utilisez un conteneur nginx pour servir les fichiers statiques de votre application
FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html