 📚 Livraria - Sistema de Gerenciamento de Livros

Projeto acadêmico para gerenciamento de livros de uma livraria, desenvolvido em grupo com divisão de responsabilidades entre frontend/backend e banco de dados/arquivos.

 👥 Equipe

| Integrante | Responsabilidade |
--------------------------------------
| Murilo | Frontend e Backend |
| Bruno | Banco de Dados e Arquivos |

 🎯 Sobre o projeto

Sistema para cadastro, consulta, edição e exclusão de livros de uma livraria (CRUD), com interface web, API própria, banco de dados relacional e gerenciamento de arquivos (ex: capas de livros, comprovantes, relatórios).

 🛠️ Tecnologias

| Camada | Tecnologia sugerida |
----------------------------------------------------
| Frontend | HTML, CSS, JavaScript (ou React) |
| Backend | Node.js + Express |
| Banco de Dados | MySQL / PostgreSQL |
| Arquivos | Sistema de arquivos local / Multer (upload) |

 📁 Estrutura do repositório

```
livraria-livros/
├── frontend/          # Murilo
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # Murilo
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── models/
│   ├── package.json
│   └── server.js
├── database/           # Bruno
│   ├── scripts/
│   │   ├── create_tables.sql
│       └── seed_data.sql
│   
├── files/               # Bruno
│   ├── uploads/
│   └── docs/
├── .gitignore
└── README.md
```
 🌿 Organização das branches

| Branch | Finalidade |
|---|---|
| `main` | Código final e testado |
| `dev` | Integração entre frontend, backend, banco e arquivos |
| `murilo-frontend-backend` | Desenvolvimento de Murilo (frontend/backend) |
| `bruno-database-files` | Desenvolvimento de Bruno (banco de dados/arquivos) 

Fluxo de trabalho:
1. Cada integrante desenvolve na sua branch pessoal.
2. Ao concluir uma funcionalidade, abre um **Pull Request** para a branch `dev`.
3. Após testes de integração em `dev`, é feito o merge para `main`.

⚙️ Como rodar o projeto

 Backend
```bash
cd backend
npm install
npm start
```

 Frontend
```bash
cd frontend
npm install
npm start
```

 Banco de Dados
```bash
# Executar os scripts na pasta database/scripts
mysql -u root -p < database/scripts/create_tables.sql
mysql -u root -p < database/scripts/seed_data.sql
```
📋 Funcionalidades planejadas

- [ ] Cadastro de livros
- [ ] Listagem de livros
- [ ] Edição de livros
- [ ] Exclusão de livros
- [ ] Upload de capa/arquivo do livro
- [ ] Busca por título, autor ou categoria

 📄 Licença

Projeto acadêmico - uso livre para fins educacionais.
