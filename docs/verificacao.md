# Verificação dos requisitos

Verificação inicial: 28/10/2026. Repositório: https://github.com/OtavioGelain/Blog-Makutzen.

| Requisito | Situação registrada | Evidência |
| --- | --- | --- |
| Organização e plano de GCS no repositório | README e plano publicados na branch `docs/plano-gcs`; integração à `main` depende de revisão | [README](../README.md), [plano](plano-gcs.md) e PR da branch |
| Acesso para verificações | Repositório público | [Configuração](evidencias/repositorio.json) |
| Recusa de push direto na `main` | Tentativa real recusada com GH006, mesmo pelo administrador; SHA remoto preservado | [Saída do push](evidencias/push-direto-main.txt), [proteção](evidencias/protecao-main.json) |
| Par com escrita | Convite enviado a @sadalls17 com `write`; aceite e acesso efetivo ainda pendentes no registro inicial | [Convites](evidencias/convites.json), [colaboradores](evidencias/colaboradores.json) |
| `staging` e `production`, este com revisor obrigatório | Ambos criados; `production` exige @OtavioGelain e não permite bypass administrativo | [staging](evidencias/staging.json), [production](evidencias/production.json) |

## Verificar o estado atual

Com GitHub CLI autenticada como administrador, executar:

```bash
gh api repos/OtavioGelain/Blog-Makutzen --jq '{visibility,default_branch,html_url}'
gh api repos/OtavioGelain/Blog-Makutzen/branches/main/protection
gh api repos/OtavioGelain/Blog-Makutzen/collaborators/sadalls17/permission
gh api repos/OtavioGelain/Blog-Makutzen/invitations
gh api repos/OtavioGelain/Blog-Makutzen/environments/staging
gh api repos/OtavioGelain/Blog-Makutzen/environments/production
gh pr list --repo OtavioGelain/Blog-Makutzen --head docs/plano-gcs
```

Esperado: visibilidade `public`; `enforce_admins.enabled: true`; uma aprovação obrigatória; force push e exclusão desabilitados; acesso efetivo do par `write` (ou `push` na nomenclatura da API); `production` com regra `required_reviewers` contendo @OtavioGelain e `can_admins_bypass: false`.

Na interface, consultar **Settings → Collaborators**, **Settings → Branches** e **Settings → Environments**. Algumas consultas exigem acesso administrativo mesmo em repositórios públicos; por isso os registros versionados permitem ao avaliador conferir o resultado capturado.

## Evidência do push bloqueado

O registro contém uma tentativa de `git push origin HEAD:main` com um commit vazio em cópia isolada. O servidor respondeu `GH006: Protected branch update failed` e `Changes must be made through a pull request`, com código de saída 1. Os SHAs remoto anterior e posterior são iguais. O commit vazio foi preservado na branch de documentação para rastreabilidade.

## Pendências para encerrar a entrega

1. @sadalls17 aceitar o [convite](https://github.com/OtavioGelain/Blog-Makutzen/invitations).
2. O responsável confirmar que o acesso efetivo passou a escrita e atualizar as evidências.
3. @sadalls17 revisar e aprovar o PR de documentação.
4. Integrar o PR à `main` e atualizar este registro para indicar a baseline aprovada.

Não contornar a proteção para integrar o próprio PR sem aprovação. A configuração dos Environments não constitui evidência de deploy da aplicação.
