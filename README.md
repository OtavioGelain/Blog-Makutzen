# Blog Makutzen

API de blog em TypeScript, Express e TypeORM, com PostgreSQL, Redis e processamento de e-mails com BullMQ.

## Organização do repositório

```text
.github/                 Templates de pull request
docs/
  plano-gcs.md           Plano de Gerência de Configuração de Software
  verificacao.md         Requisitos, situação e roteiro de verificação
  evidencias/            Registros reais das configurações do GitHub
src/
  controllers/           Tratamento das requisições HTTP
  database/              DataSource e migrações do banco
  entities/              Entidades persistidas
  middlewares/           Autenticação
  queue/                 Configuração das filas
  routes/                Rotas da API
  services/              Regras de negócio
  test/                  Testes e fábricas de dados
  utils/                 Utilitários
  workers/               Processamento de e-mails
Dockerfile               Imagem da aplicação
docker-compose.yml       Serviços para desenvolvimento local
```

## Desenvolvimento

Instale as dependências com `npm ci`. Configure um `.env` local com `PORT`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `REDIS_HOST`, `REDIS_PORT`, `JWT_KEY`, `EMAIL_USER` e `EMAIL_PASS`, conforme os serviços utilizados. Não versione credenciais.

Com PostgreSQL e Redis disponíveis, execute `npm run migration:run` e `npm run dev`. Para processar e-mails, execute também `npm run worker`. Os testes existentes são executados com `npm test -- --runInBand`.

O Compose disponibiliza PostgreSQL e Redis para desenvolvimento. Atenção: a aplicação lê as variáveis `DB_*`; o `DATABASE_URL` presente no Compose não é consumido pelo DataSource atual. Ajuste seu ambiente local antes de iniciar a API.

## Gerência de configuração

- [Plano de GCS](docs/plano-gcs.md)
- [Verificação dos requisitos e evidências](docs/verificacao.md)
- [Repositório público](https://github.com/OtavioGelain/Blog-Makutzen)

As alterações devem entrar por pull request para `main`, com aprovação de outro colaborador com acesso de escrita. O plano de GCS também é um item de configuração e segue esse fluxo.
