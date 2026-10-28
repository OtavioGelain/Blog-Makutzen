# Plano de Gerência de Configuração de Software

Versão: 1.0 — 28/10/2026. Responsável: [@OtavioGelain](https://github.com/OtavioGelain).

## 1. Objetivo e escopo

Identificar, versionar, revisar e auditar os itens de configuração do Blog Makutzen, preservando a rastreabilidade entre alterações propostas, revisões e versões aprovadas.

Este plano é um item de configuração publicado no próprio repositório. Mudanças no plano exigem pull request e revisão, assim como mudanças no código.

## 2. Itens de configuração

| Item | Localização | Controle |
| --- | --- | --- |
| Código, entidades, filas e workers | `src/` | Git e revisão por PR |
| Testes e fábricas | `src/test/` | Git e execução dos testes aplicáveis |
| Migrações | `src/database/migrations/` | Git; revisar impacto e reversão |
| Dependências | `package.json`, `package-lock.json` | Alterações revisadas em conjunto |
| Configuração de compilação e testes | `tsconfig.json`, `jest.config.js` | Git e revisão por PR |
| Configuração de containers | `Dockerfile`, `docker-compose.yml`, `.dockerignore` | Git e revisão por PR |
| Plano, organização e evidências | `README.md`, `docs/`, `.github/` | Git e revisão por PR |
| Proteção de branch, acesso e ambientes | Configurações do GitHub | Administração pelo responsável; registrar evidências em `docs/evidencias/` |

Segredos de banco, JWT e e-mail permanecem fora do Git. O arquivo `.env` e `node_modules` são ignorados. Configurações de acesso e proteção no GitHub precisam ser verificadas pela API ou pela interface: os arquivos deste projeto registram evidências, mas não aplicam essas configurações automaticamente.

## 3. Responsabilidades e acesso

- **Responsável pelo projeto:** @OtavioGelain, administrador do repositório, responsável pelas configurações, baselines e aprovação do ambiente `production`.
- **Par de revisão:** [@sadalls17](https://github.com/sadalls17), convidado com permissão de escrita (`write`). O acesso só fica efetivo após aceitar o convite. Revisar PRs, registrar comentários e aprovar quando os critérios forem atendidos.
- **Avaliadores:** podem consultar o repositório público, o plano, os PRs e as evidências sem convite.

O autor não aprova o próprio PR. Enquanto o convite do par não for aceito e a aprovação não ocorrer, o PR permanece pendente, sem desabilitar a proteção.

## 4. Branches e controle de mudanças

`main` representa a baseline aprovada. Criar branches curtas a partir dela, como `feat/descricao`, `fix/descricao` ou `docs/descricao`.

1. Registrar o objetivo e os critérios da mudança no PR; usar issue quando a mudança precisar de discussão própria.
2. Alterar os itens necessários em uma branch, com commits descritivos.
3. Executar as verificações aplicáveis. Código e dependências exigem os testes pertinentes; documentação exige conferir conteúdo, links e evidências.
4. Abrir PR para `main`, informando alterações, validação e impactos.
5. Solicitar revisão de @sadalls17. Resolver conversas e obter pelo menos uma aprovação de pessoa com escrita. Novos commits invalidam aprovações anteriores.
6. Integrar pela interface/API de merge do PR somente após os requisitos serem atendidos.

A proteção da `main` exige PR, uma aprovação e resolução de conversas, aplica-se também ao administrador e impede force push e exclusão da branch. Não há verificação de CI obrigatória configurada nesta baseline; não tratar testes como executados sem registrar seu resultado.

## 5. Baselines, versões e recuperação

O SHA integrado à `main` identifica cada baseline aprovada. Para entregas, o responsável deve criar tags `vMAJOR.MINOR.PATCH` apontando para commits aprovados e registrar as mudanças da versão. Nenhuma tag de entrega foi criada apenas pela publicação deste plano.

Para recuperar uma versão, consultar o SHA/tag e o lockfile correspondente. Corrigir regressões por novo PR, usando `git revert` quando apropriado; não reescrever o histórico da `main`. Mudanças no banco exigem avaliação separada de dados e migrações antes de qualquer reversão.

## 6. Ambientes

| Ambiente | Origem permitida | Aprovação |
| --- | --- | --- |
| `staging` | Branches protegidas; atualmente `main` | Sem revisor obrigatório |
| `production` | Branches protegidas; atualmente `main` | @OtavioGelain obrigatório; bypass de administrador desabilitado |

Em `production`, a opção de impedir autoaprovação de deployment está desativada para permitir que @OtavioGelain aprove uma execução que iniciou. Isso não altera a exigência de outra pessoa revisar seus PRs.

Os Environments estão configurados no GitHub. Este trabalho não configura hospedagem nem implementa deploy da aplicação. Um futuro workflow de deploy deverá declarar `environment: staging` ou `environment: production` no job correspondente para que as regras de ambiente sejam aplicadas. Validar em staging antes da promoção de uma versão aprovada para production.

## 7. Auditoria e manutenção

A cada entrega, conferir visibilidade pública, proteção da `main`, acesso efetivo do par, aprovação do PR e regras dos dois ambientes. Guardar comandos, saídas e datas em `docs/evidencias/`, sem tokens ou segredos.

O [roteiro de verificação](verificacao.md) relaciona os requisitos às evidências. Os registros são fotografias do estado na data indicada; a configuração atual deve ser consultada no GitHub. Revisar este plano quando o fluxo, os responsáveis ou a organização mudarem.
