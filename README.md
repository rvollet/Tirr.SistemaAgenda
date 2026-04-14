# 🗓️ Sistema Agenda

Sistema de agendamento moderno desenvolvido com **React + Vite + TypeScript**, estruturado com arquitetura modular, separação de responsabilidades e foco em escalabilidade.

---

## ✨ Visão Geral

O projeto foi desenhado seguindo princípios de organização em camadas, separando regras de negócio, estado global, páginas e infraestrutura.

---

## 🚀 Tecnologias

* ⚛️ React
* ⚡ Vite
* 🟦 TypeScript
* 🎨 Bootstrap
* 🌐 Axios
* 🧠 Zustand
* 📝 React Hook Form
* 🔀 React Router
* 🧪 JSON Server
* 🧹 ESLint

---

## 📁 Estrutura do Projeto

Arquitetura baseada em separação por responsabilidade:

```bash
src/
├── assets/        # Imagens, ícones e recursos estáticos
├── config.ts      # Configurações globais da aplicação
├── core.tsx       # Inicialização do core da aplicação
├── hook/          # Hooks customizados (lógica reutilizável)
├── model/         # Tipagens e modelos de domínio
├── page/          # Páginas da aplicação (views)
├── routing.tsx    # Configuração de rotas
├── service/       # Camada de comunicação com APIs
├── shared/        # Componentes e recursos compartilhados
├── store.tsx      # Estado global (Zustand)
├── styles/        # Estilos globais
├── useCases/      # Regras de negócio da aplicação
└── utils/         # Funções utilitárias
```

---

## 🧠 Arquitetura

O projeto segue uma abordagem inspirada em **Clean Architecture leve para frontend**, separando responsabilidades em camadas:

### 🔹 Presentation Layer

* `page/`
* `shared/`

Responsável pela interface e experiência do usuário.

---

### 🔹 Application Layer

* `useCases/`

Responsável pelas regras de negócio e fluxos da aplicação.

---

### 🔹 Domain Layer

* `model/`

Define tipos, contratos e estruturas do domínio.

---

### 🔹 Infrastructure Layer

* `service/`
* `config.ts`

Comunicação com APIs e configurações externas.

---

### 🔹 State Layer

* `store.tsx`

Gerenciamento de estado global com Zustand.

---

### 🔹 Support Layer

* `utils/`
* `hook/`
* `assets/`

Recursos auxiliares e reutilizáveis.

---

## ⚙️ Configuração

### Instalação

```bash
yarn install
```

### Rodar aplicação

```bash
yarn dev
```

### Rodar API mock

```bash
yarn api:start
```

---

## 🧪 Scripts

| Script           | Descrição                          |
| ---------------- | ---------------------------------- |
| `yarn dev`       | Inicia ambiente de desenvolvimento |
| `yarn build`     | Build de produção                  |
| `yarn preview`   | Preview do build                   |
| `yarn lint`      | Lint do projeto                    |
| `yarn api:start` | Inicia JSON Server                 |

---

## 🎨 Design

Protótipo no Figma:

🔗 [https://www.figma.com/site/ncajld03ExxzdtF2OMpS0Y/Untitled?node-id=0-1&p=f&t=tKW2BKKjEf29cqb0-0](https://www.figma.com/site/ncajld03ExxzdtF2OMpS0Y/Untitled?node-id=0-1&p=f&t=tKW2BKKjEf29cqb0-0)

---

## 📌 Boas práticas aplicadas

* Separação clara de responsabilidades
* Camada de use cases isolando regras de negócio
* Tipagem forte com TypeScript
* Estado global centralizado e leve
* Estrutura escalável e modular
* Comunicação desacoplada com serviços