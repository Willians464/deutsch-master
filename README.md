# Deutsch Master

MVP mobile premium para aprender alemão, construído com Expo, React Native, TypeScript, React Navigation, Supabase Auth e AsyncStorage.

> O projeto principal é o app Expo na raiz do repositório. A pasta `simple-app` é apenas uma alternativa leve para prototipagem no navegador e não representa a versão final publicada.

## O que já está funcionando

- Splash screen e onboarding com mascote original em SVG.
- Cadastro e login por e-mail e senha.
- Modo demo automático quando as chaves do Supabase não estão presentes.
- Home com faixa, XP, sequência, cidade virtual e missões diárias.
- Tela completa de missões diárias com progresso, recompensas e persistência local.
- Jornada completa de faixas A0 a C2.
- Lição inicial interativa com feedback imediato e recompensa de XP.
- Modo Sprechen simulado, progresso semanal e perfil editável.
- Alternativa visual editorial acessível pelo perfil, preservando a experiência original.
- Persistência local para perfil e lições concluídas.

## Instalação

1. Instale Node.js LTS e o Expo CLI.
2. Na pasta do projeto, execute `npm install`.
3. Inicie com `npm run start` e abra no Expo Go, Android, iOS ou web.

## Configurar o Supabase

1. Crie um projeto no Supabase.
2. No SQL Editor, execute [`supabase/schema.sql`](./supabase/schema.sql).
3. Copie `.env.example` para `.env.local`.
4. Preencha `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY` com os valores do painel do projeto.
5. Reinicie o Expo após alterar as variáveis.

Sem essas variáveis, o app entra no modo demo e permite explorar todo o MVP sem quebrar a navegação. O progresso demo fica salvo apenas no aparelho.

## Build iOS da versão completa

Com o projeto Supabase configurado, use o Expo Application Services com os perfis de [`eas.json`](./eas.json): `preview` para instalar em dispositivos de teste via distribuição interna e `production` para preparar o envio à App Store. A publicação requer uma conta Apple Developer; este repositório não publica nada automaticamente.

## Estrutura

```text
src/
  components/   componentes reutilizáveis e identidade visual
  constants/    tema, cores e faixas
  contexts/     estado de autenticação e progresso
  data/         lições e missões do MVP
  navigation/   stack e tabs
  screens/      telas do produto
  services/     Supabase e persistência local
  types/        tipos compartilhados
```

## Personalização

- Nome do app: edite `name` em `app.json` e `package.json`.
- Identificadores iOS/Android: edite `bundleIdentifier` e `android.package` em `app.json`.
- Tema: edite `src/constants/theme.ts`.
- Faixas: edite `src/constants/belts.ts`.
- Conteúdo: edite `src/data/lessons.ts`.
- Logo: substitua ou evolua `src/components/BrandMark.tsx`. O símbolo atual é original e não usa a marca da DFB ou da seleção alemã.
- Direção editorial: abra `Perfil > Explorar direção editorial` para comparar a alternativa mais limpa, conversacional e focada em conteúdo.

## Próximos passos

Adicionar áudio e reconhecimento de voz, mais conteúdo no banco, sincronização das missões diárias, notificações, pagamentos premium e uma camada de IA para conversas.

## Versão simples sem instalação

Se você não quiser instalar Node, Expo ou dependências, abra diretamente [`simple-app/index.html`](./simple-app/index.html) no navegador. Essa versão é autocontida e inclui onboarding, login local/demo, Home, Jornada, Lições, Sprechen, Progresso, Perfil, missões e persistência via `localStorage`.

Para usar essa versão no iPhone como app: hospede a pasta `simple-app` em um endereço HTTPS, abra o endereço no Safari e escolha `Compartilhar > Adicionar à Tela de Início > Abrir como App da Web`. O manifesto, ícone e cache offline já estão incluídos.
