# ViaJunto

Plataforma de caronas intermunicipais de média distância. Motoristas com assentos
ociosos publicam viagens; passageiros encontram trajetos compatíveis e dividem as
despesas. Estudo de caso inicial: **Vitória da Conquista ↔ Brumado (BA)**.

> **Entrega atual:** frontend mobile com **Splash Screen**, **Tela de Acesso**,
> **Login** e **Escolha de Perfil**. A camada de API ainda **não** está integrada;
> o login é simulado e os dados são mockados.

| Splash | Acesso | Login | Escolha de perfil |
| --- | --- | --- | --- |
| ![Splash](docs/screenshots/splash.png) | ![Acesso](docs/screenshots/acesso.png) | ![Login](docs/screenshots/login.png) | ![Perfil](docs/screenshots/perfil.png) |

## Stack

| Camada | Tecnologia |
| --- | --- |
| Mobile | React Native + Expo SDK 58 |
| Linguagem | TypeScript (strict) |
| Navegação | Expo Router (file-based, `src/app`) |
| Estilo | Design tokens próprios + Poppins + `react-native-svg` |
| Ícones | `@expo/vector-icons` (Ionicons) |
| Backend (Sprint 1) | Express + Prisma + PostgreSQL/PostGIS |
| Monorepo | npm workspaces |

Versões principais: Expo `~58.0.25`, React Native `0.88.1`, React `19.3.0`,
TypeScript `~6.0.3`.

## Estrutura do repositório

```
viajunto-app/
├── apps/
│   ├── backend/              # API Express + Prisma (Sprint 1)
│   └── mobile/               # App Expo (esta entrega)
│       ├── src/app/          # Rotas/telas (Expo Router)
│       ├── src/components/   # Componentes reutilizáveis
│       ├── src/hooks/        # Hooks (animações)
│       ├── src/lib/          # Regras de validação e domínio
│       ├── src/theme/        # Design tokens
│       └── assets/           # Ícones, splash e marca
├── packages/shared-types/    # Tipos e schemas compartilhados
├── specs/                    # PRD, specs de features e ADRs
└── docs/screenshots/         # Capturas das telas desta entrega
```

## Pré-requisitos

- **Node.js 22 LTS ou superior** (testado com Node 24)
- **npm 10+** (o projeto usa npm workspaces)
- **Git**
- Para testar no celular: **Expo Go** (Android/iOS) na mesma rede Wi-Fi do computador
- Opcional: Android Studio (emulador) ou Xcode (simulador iOS, apenas macOS)

> Não é necessário configurar variáveis de ambiente para rodar o app mobile nesta
> entrega. Nenhuma chamada de rede é feita.

## Como rodar em outra máquina

```bash
# 1. Clone o repositório
git clone https://github.com/Gussffy/viajunto-app.git
cd viajunto-app

# 2. Entre na branch desta entrega
git checkout dev_mob_patrck

# 3. Instale as dependências na raiz do monorepo (não apenas em apps/mobile)
npm install

# 4. Inicie o app mobile
cd apps/mobile
npx expo start
```

No terminal do Expo:

- pressione `w` para abrir no navegador;
- pressione `a` para abrir no emulador Android;
- pressione `i` para abrir no simulador iOS (macOS);
- ou escaneie o QR Code com o **Expo Go** no celular.

### Atalhos a partir da raiz

```bash
npm run mobile          # expo start
npm run mobile:web      # expo start --web
npm run mobile:typecheck
npm run mobile:lint
npm run mobile:doctor
npm run mobile:export:web
```

### Rodar no navegador

```bash
cd apps/mobile
npx expo start --web
```

O app abre em `http://localhost:8081`. No desktop, a interface é centralizada em
uma coluna de 480 px para simular a largura de um celular.

## Fluxo e credenciais de demonstração

1. **Splash** — animação de entrada, some automaticamente após ~2,6 s (ou ao tocar).
2. **Acesso** — apresentação do produto e CTA **Começar**.
3. **Login** — validação real de formulário; autenticação **simulada**.
4. **Escolha de perfil** — **Pedir Carona** ou **Oferecer Carona**; o botão só é
   habilitado após a seleção.
5. **Próximo passo** — confirmação do perfil escolhido (placeholder da Sprint 2).

**Credenciais:** use qualquer e-mail válido e uma senha com **8+ caracteres,
contendo letras e números**. Exemplo:

```text
E-mail: demo@viajunto.app
Senha:  carona123
```

O botão exibe os erros de validação quando os campos estão vazios ou inválidos.
Não há chamada à API: após ~1 s, o app navega para a escolha de perfil.

## Design system

Os tokens ficam em `apps/mobile/src/theme/tokens.ts` e foram extraídos da
referência do Figma:

| Token | Valor |
| --- | --- |
| Azul de marca | `#1874F2` |
| Azul escuro (pressed) | `#0F5FCC` |
| Navy (títulos) | `#173B5E` |
| Texto secundário | `#687C91` |
| Fundo suave | `#F6F9FD` |
| Borda | `#E2EAF3` |
| Fonte | Poppins (400/500/600/700) |
| Raios | 10–32 px + pill |
| Espaçamento base | 4 px |

As telas usam Safe Area, `KeyboardAvoidingView`, fontes carregadas via
`@expo-google-fonts/poppins` e animações com a API `Animated` (sem dependências
extras de animação).

## Scripts de qualidade

```bash
cd apps/mobile

npx tsc --noEmit        # TypeScript strict
npx expo lint           # ESLint (eslint-config-expo)
npx expo-doctor         # 20 checks de configuração/dependências
npx expo export --platform web   # build de produção para web
```

Todos os comandos acima passam nesta entrega.

## Backend (fora do escopo desta entrega)

A API da Sprint 1 continua no repositório e não foi alterada:

```bash
docker compose up -d
cd apps/backend
npx prisma migrate dev
npx prisma generate
npm run dev
```

O app mobile **não consome** esses endpoints nesta fase.

## Observações de ambiente

- **Instale na raiz**: o projeto usa npm workspaces; `npm install` dentro de
  `apps/mobile` isoladamente pode não resolver as dependências do monorepo.
- **Cache do Metro**: se algo não atualizar, rode `npx expo start --clear`.
- **Porta 8081**: se estiver ocupada, o Expo sugere outra porta; use a URL exibida.
- **Mesma rede**: para o Expo Go, computador e celular precisam estar na mesma
  rede. Se a rede bloquear, use `npx expo start --tunnel`.
- **Fontes**: são empacotadas no bundle; não é necessário baixar nada em runtime.
- **iOS**: o build local do simulador exige macOS. No Windows, use Expo Go ou
  um development build na nuvem (EAS).
- **Android**: com Expo Go não é necessário Android Studio.

## Documentação complementar

- [`apps/mobile/README.md`](apps/mobile/README.md) — detalhes do app, estrutura e
  solução de problemas.
- [`AGENTS.md`](AGENTS.md) — convenções do monorepo e regras de arquitetura.
- [`specs/features/auth.md`](specs/features/auth.md) — contrato de autenticação
  do backend.
- [`docs/screenshots/`](docs/screenshots) — capturas das telas.

## Design de referência

[ViaJunto — Modelo no Figma](https://www.figma.com/design/Ck90AkuRQXsI5kgnlR3JHk/ViaJunto-Modelo?node-id=72-1405&p=f)

## Próximos passos

- Integrar o login ao backend (`POST /auth/login` + refresh token).
- Implementar cadastro e recuperação de senha.
- Construir a home do passageiro (busca de rotas) e a home do motorista
  (publicação de trajetos).
- Persistir o perfil escolhido e os tokens com `expo-secure-store`.
