# Etimus 🏛️

**Etimus** é um aplicativo mobile focado no aprendizado intuitivo e divertido da etimologia das palavras. Explore a origem dos termos, desafie seus conhecimentos com quizzes e aprofunde-se em nosso dicionário etimológico.

## 📱 Funcionalidades

- **Modo Clássico**: Adivinhe o significado ou sinônimo correto das palavras apresentadas.
- **Quiz Diário**: Um desafio diário de 5 perguntas sobre origens de palavras. Teste seus conhecimentos e mantenha a ofensiva!
- **Dicionário**: Um acervo detalhado com definições, origens e curiosidades sobre diversas palavras.
- **Perfil do Usuário**: Acompanhe seu progresso, nível e estatísticas de jogo.

## 🛠️ Tecnologias Utilizadas

- **React Native** (via Expo)
- **TypeScript**
- **Expo Router** (Navegação baseada em arquivos)
- **Design System Customizado** (ThemedView, ThemedText)

## 🚀 Como Rodar o Projeto

1.  **Instale as dependências**:
    ```bash
    npm install
    ```

2.  **Inicie o projeto**:
    ```bash
    npx expo start
    ```

3.  **Teste no dispositivo**:
    - Use o app **Expo Go** no seu celular para escanear o QR Code.
    - Ou pressione `a` para rodar no emulador Android / `i` para iOS.

## 📂 Estrutura do Projeto

- **`app/`**: Rotas e telas do aplicativo.
    - **`(tabs)/`**: Navegação principal (Jogo, Quiz, Dicionário, Perfil).
- **`components/`**: Componentes reutilizáveis de UI.
- **`constants/`**: Dados estáticos (`etimus-data.ts`) e configurações de tema.
- **`assets/`**: Imagens e ícones.

## 🗺️ Próximos Passos (Roadmap)

- [ ] **Expansão de Conteúdo**: Adicionar mais palavras e categorias ao banco de dados (`etimus-data.ts`).
- [ ] **Persistência de Dados**: Salvar o progresso do usuário, ofensiva e histórico de partidas localmente (AsyncStorage) ou em nuvem.
- [ ] **Sistema de Conquistas**: Implementar badges e recompensas visuais.
- [ ] **Polimento Visual**: Adicionar animações de transição e feedback visual (confetes, vibração) nos acertos.
- [ ] **Sons e Áudio**: Efeitos sonoros para interações e respostas.
- [ ] **Modo Escuro**: Aprimorar o suporte a temas.
