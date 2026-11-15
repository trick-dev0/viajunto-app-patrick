# ViaJunto Mobile

Aplicativo do ViaJunto construído com **React Native + Expo SDK 58**, **TypeScript
strict** e **Expo Router**. Esta entrega cobre o início da jornada do usuário:

| Rota | Arquivo | Descrição |
| --- | --- | --- |
| `/` | `src/app/index.tsx` | Splash animada (some após ~2,6 s ou ao tocar) |
| `/welcome` | `src/app/welcome.tsx` | Tela de acesso/onboarding com hero de rota |
| `/login` | `src/app/login.tsx` | Login com validação real e autenticação simulada |
| `/profile` | `src/app/profile.tsx` | Escolha entre **Pedir Carona** e **Oferecer Carona** |
| `/coming-soon` | `src/app/coming-soon.tsx` | Confirmação do perfil + próximos passos (placeholder) |

> **Sem API nesta fase.** Nenhuma requisição de rede é feita. O login é simulado e
> todos os dados exibidos são mockados.

## Requisitos

- Node.js 22 LTS ou superior (testado com Node 24)
- npm 10+ (o repositório usa npm workspaces)
- Expo Go no celular, emulador Android ou simulador iOS (macOS)

## Como rodar

Sempre instale as dependências **na raiz** do monorepo:

```bash
# na raiz do repositório
npm install

# iniciar o app
npm run mobile          # equivale a: npm run start --workspace @viajunto/mobile
```

Ou diretamente nesta pasta:

```bash
cd apps/mobile
npx expo start
```

Depois, no terminal do Expo:

- `w` → abrir no navegador (web)
- `a` → abrir no emulador Android
- `i` → abrir no simulador iOS (somente macOS)
- escanear o QR Code com o **Expo Go** (celular na mesma rede Wi-Fi)

## Scripts

| Comando (nesta pasta) | O que faz |
| --- | --- |
| `npm run start` | Inicia o dev server do Expo |
| `npm run android` | Abre no emulador Android |
| `npm run ios` | Abre no simulador iOS |
| `npm run web` | Inicia em modo web |
| `npm run lint` | ESLint com `eslint-config-expo` |
| `npm run typecheck` | `tsc --noEmit` (TypeScript strict) |
| `npm run doctor` | `expo-doctor` (checagem de config/dependências) |
| `npm run export:web` | Build de produção para web |

Atalhos equivalentes na raiz: `npm run mobile`, `mobile:web`, `mobile:lint`,
`mobile:typecheck`, `mobile:doctor`, `mobile:export:web`.

## Credenciais de demonstração

O login aceita **qualquer e-mail válido** e uma senha com **8+ caracteres,
contendo letras e números**. Exemplo:

```text
E-mail: demo@viajunto.app
Senha:  carona123
```

Após ~1 segundo, o app navega para `/profile`. Campos inválidos exibem mensagens
de erro inline.

## Estrutura

```text
apps/mobile/
├── src/
│   ├── app/                  # Rotas (Expo Router) — cada arquivo é uma tela
│   │   ├── _layout.tsx       # Fontes, splash nativa e Stack navigator
│   │   ├── index.tsx         # Splash
│   │   ├── welcome.tsx       # Acesso
│   │   ├── login.tsx         # Login
│   │   ├── profile.tsx       # Escolha de perfil
│   │   └── coming-soon.tsx   # Próximos passos (placeholder)
│   ├── components/           # UI reutilizável
│   │   ├── screen.tsx        # Moldura: safe area, teclado, coluna web
│   │   ├── brand-logo.tsx    # Marca SVG (detalhada e compacta) + wordmark
│   │   ├── primary-button.tsx# Botão primário/outline/ghost com loading
│   │   ├── text-field.tsx    # Input com label, ícone, erro e foco
│   │   ├── back-button.tsx   # Botão de voltar
│   │   ├── route-preview.tsx # Card ilustrativo da rota (hero)
│   │   └── role-card.tsx     # Card selecionável de perfil
│   ├── hooks/
│   │   └── use-reveal.ts     # Animação de entrada (opacidade + translateY)
│   ├── lib/
│   │   ├── validation.ts     # Regras de e-mail e senha
│   │   └── roles.ts          # Tipos e rótulos de perfil
│   └── theme/
│       └── tokens.ts         # Cores, espaçamento, raios, fontes, sombras
├── assets/                   # Ícones, splash e SVGs da marca
├── app.json                  # Configuração Expo
├── metro.config.js           # Ajuste de monorepo (watchFolders/nodeModulesPaths)
└── eslint.config.js          # ESLint flat config
```

### Convivência com o monorepo

O `metro.config.js` observa a raiz do workspace e resolve dependências tanto em
`apps/mobile/node_modules` quanto em `node_modules` da raiz. Por isso, instalar
na raiz é importante: `npm install` dentro de `apps/mobile` isoladamente pode não
resolver todo o grafo.

## Design tokens

Definidos em `src/theme/tokens.ts`:

| Token | Valor |
| --- | --- |
| `primary` | `#1874F2` |
| `primaryDark` | `#0F5FCC` |
| `primarySoft` | `#E8F1FE` |
| `primaryTint` | `#F4F8FF` |
| `navy` | `#173B5E` |
| `textMuted` | `#687C91` |
| `border` | `#E2EAF3` |
| `backgroundAlt` | `#F6F9FD` |
| Fonte | Poppins (400/500/600/700) via `@expo-google-fonts/poppins` |

`spacing`, `radii`, `fonts`, `shadows`, `typography` e `layout` completam o
sistema. As sombras usam `Platform.select` (iOS/Android/web).

## Comportamento mockado

- **Login**: validação local em `src/lib/validation.ts`; `setTimeout` de ~950 ms
  antes de navegar (`router.replace('/profile')`).
- **Perfil**: o botão **Continuar** só habilita após a seleção; envia
  `?role=passenger|driver` para `/coming-soon`.
- **Recuperar senha / Criar conta**: exibem um `Alert` explicando que o fluxo será
  integrado à API na próxima entrega.
- **Rota em destaque**: dados fixos (Vitória da Conquista → Brumado, R$ 35,
  hoje 17:30, 2 vagas).

## Qualidade

```bash
npm run typecheck
npm run lint
npm run doctor
npm run export:web
```

Todos passam nesta entrega (`expo-doctor`: 20/20 checks).

## Solução de problemas

| Sintoma | Solução |
| --- | --- |
| Tela em branco / bundle antigo | `npx expo start --clear` |
| Erro de resolução de módulos | Rode `npm install` na **raiz** do monorepo |
| Porta 8081 ocupada | Use a porta alternativa sugerida pelo Expo |
| Expo Go não conecta | Garanta a mesma rede Wi-Fi ou use `npx expo start --tunnel` |
| Fontes não aparecem | Reinicie com `--clear`; as fontes são empacotadas no bundle |
| Build iOS local | Requer macOS; no Windows use Expo Go ou EAS Build |
| Ícones/cores nativos desatualizados | `npx expo prebuild --clean` (gera `ios/`/`android/`) |

## Relacionado

- [README raiz](../../README.md) — visão do monorepo e do backend.
- [AGENTS.md](./AGENTS.md) — convenções do app mobile.
- [Design de referência (Figma)](https://www.figma.com/design/Ck90AkuRQXsI5kgnlR3JHk/ViaJunto-Modelo?node-id=72-1405&p=f)
