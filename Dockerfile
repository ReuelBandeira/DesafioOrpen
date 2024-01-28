# Use a imagem do Node como base
FROM node:20-alpine

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json primeiro
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o restante dos arquivos
COPY . .

# Exponha a porta necessária
EXPOSE 3007

# Comando padrão para iniciar o aplicativo
CMD ["node", "dist/main"]
