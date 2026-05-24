FROM node:18-alpine

# cria diretório da app
WORKDIR /app

# copia só dependências primeiro (melhora cache)
COPY package*.json ./

# instala dependências
RUN npm ci

# copia o resto do projeto
COPY . .

# expõe a porta da sua API
EXPOSE 3000

# comando padrão (ajusta se necessário)
CMD ["npm", "run", "dev"]