# Resumo da entrega — Mobile ViaJunto

> Branch: `dev_mob_patrck` · Stack: React Native + Expo SDK 58 · TypeScript strict · Expo Router

## Objetivo desta fase

Construir o **frontend mobile** com quatro telas navegáveis e fiéis à identidade
visual do ViaJunto, **sem integração com API** (dados mockados):

1. Splash Screen
2. Tela de Acesso (onboarding)
3. Login
4. Escolha de perfil — **Pedir Carona** / **Oferecer Carona**

## O que foi entregue

### Telas

| Rota | Tela | Destaques |
| --- | --- | --- |
| `/` | Splash | Logo SVG animada, tagline, dots pulsantes, auto-avanço em ~2,6 s (ou toque) |
| `/welcome` | Acesso | Header com marca compacta, hero de rota, headline, chips de benefícios, banner "só mulheres", CTA **Começar** |
| `/login` | Login | Validação real, mostrar/ocultar senha, "Lembrar de mim", erros inline, autenticação simulada |
| `/profile` | Escolha de perfil | Cards selecionáveis (radio), gating do botão, confirmação do perfil |
| `/coming-soon` | Próximos passos | Placeholder que comprova a navegação e lista o que vem por aí por perfil |

### Base técnica

- **Expo Router** com rotas em `src/app` e Stack sem header.
- **Design tokens** em `src/theme/tokens.ts`: azul `#1874F2`, navy `#173B5E`,
  texto secundário `#687C91`, fundo `#F6F9FD`, borda `#E2EAF3`.
- **Poppins** (400/500/600/700) via `@expo-google-fonts/poppins`.
- Componentes reutilizáveis: `Screen`, `BrandLogo`/`BrandMark`, `PrimaryButton`,
  `TextField`, `BackButton`, `RoutePreview`, `RoleCard`.
- Animação de entrada própria (`useReveal`) sem dependências extras.
- Marca em SVG (versão detalhada + compacta para headers) e ícones/splash gerados.
- **Sem chamadas de rede**: login mockado com `setTimeout`.
- Layout web centralizado em coluna de 480 px (simula celular no desktop).

### Qualidade

| Verificação | Resultado |
| --- | --- |
| `npx tsc --noEmit` | ✅ sem erros |
| `npx expo lint` | ✅ sem erros |
| `npx expo-doctor` | ✅ 20/20 checks |
| `npx expo export --platform web` | ✅ build ok |
| Fluxo completo em 390×844 (Puppeteer) | ✅ sem erros de console |

Capturas em `docs/screenshots/` (`splash.png`, `acesso.png`, `login.png`,
`perfil.png`, `proximo-passo.png`).

### Documentação

- `README.md` (raiz): visão do monorepo, stack, como rodar, credenciais, tokens.
- `apps/mobile/README.md`: estrutura, scripts, comportamento mockado, troubleshooting.

## Credenciais de demonstração

```text
E-mail: demo@viajunto.app
Senha:  carona123
```

Qualquer e-mail válido + senha com 8+ caracteres contendo letras e números funciona.

## Decisões tomadas

- **Expo Router** (file-based) em vez de React Navigation puro, seguindo o
  `AGENTS.md` do app mobile.
- **Tokens próprios** em vez de biblioteca de UI, para fidelidade ao Figma e
  controle fino de tipografia/espaçamento.
- **Login mockado** com validação real de formulário, simulando latência.
- **Tela extra** `/coming-soon` apenas para comprovar a navegação após a escolha
  de perfil (placeholder declarado como fora do escopo desta entrega).
- **Marca vetorial** desenhada em SVG como aproximação da referência, já que a
  inspeção detalhada dos frames do Figma ficou limitada pelo navegador.

## Pendências / limitações

- **Figma**: não foi possível inspecionar frames em detalhe (deep-link e zoom
  bloqueados); a paleta e o layout foram extraídos do thumbnail e de capturas.
  Recomenda-se revisar medidas exatas contra o arquivo original.
- **Sem persistência**: o perfil escolhido e a sessão não são salvos.
- **Sem cadastro/recuperação de senha**: botões exibem apenas um `Alert`.
- **Sem API**: nenhuma integração com o backend da Sprint 1.
- **Sem testes automatizados** de UI (apenas verificação manual/headless).

## Próximos passos sugeridos

1. Validar as telas contra o Figma e ajustar espaçamentos/tipografia.
2. Integrar login a `POST /auth/login` + refresh token (`expo-secure-store`).
3. Implementar cadastro e recuperação de senha.
4. Construir home do passageiro (busca de rotas) e do motorista (publicar trajeto).
5. Persistir o perfil e adicionar testes (Jest + Testing Library).
6. Configurar EAS Build para gerar builds de desenvolvimento.

## Como rodar

```bash
git checkout dev_mob_patrck
npm install            # na raiz do monorepo
npm run mobile         # ou: cd apps/mobile && npx expo start
```

Pressione `w` (web), `a` (Android), `i` (iOS/macOS) ou escaneie o QR Code no
Expo Go.
