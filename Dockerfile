# Usa un'immagine base leggera di Node
FROM node:23.9-alpine

# Imposta la cartella di lavoro nel container
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutti i file del progetto nel container
COPY . .

# Espone la porta su cui gira l'app (4000)
EXPOSE 4000

# Comando per avviare l'app
CMD ["node", "src/app.js"]
