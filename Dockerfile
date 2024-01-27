# Use the official Node.js image
FROM node:14

# Cria o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos restantes do projeto para o diretório de trabalho
COPY . .

# Expõe a porta definida no .env
EXPOSE 3007

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
