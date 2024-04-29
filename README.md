# Back-end de Gerenciamento de Bruxos e Varinhas
![harry-potter-all-characters](https://github.com/ArthBG/harrydb/assets/123407087/1a177983-4259-48d1-b606-fedd2f4a5032)

Este projeto permite o gerenciamento de bruxos e varinhas do universo de Harry Potter. Ela oferece operações para criar, ler, atualizar e deletar informações sobre bruxos e suas varinhas.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento JavaScript do lado do servidor.
- **Express.js**: Framework web para Node.js que simplifica o desenvolvimento de aplicativos web.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **pg**: Cliente PostgreSQL para Node.js que permite interagir com o banco de dados.

## Rotas

### Bruxos
![hat](https://github.com/ArthBG/harrydb/assets/123407087/83656e4a-d749-4044-9179-0de9fabf828a)

- **GET /bruxos**: Retorna todos os bruxos cadastrados.
- **GET /bruxos/:id**: Retorna as informações de um bruxo específico pelo seu ID.
- **GET /bruxos/nome/:nome**: Retorna os bruxos cujo nome contenha a string especificada.
- **POST /bruxos**: Adiciona um novo bruxo ao banco de dados.
- **PUT /bruxos/:id**: Atualiza as informações de um bruxo específico pelo seu ID.
- **DELETE /bruxos/:id**: Deleta um bruxo específico pelo seu ID.

### Varinhas
![wand](https://github.com/ArthBG/harrydb/assets/123407087/5354d980-d783-4507-b9f4-d4590a6410cd)

- **GET /varinhas**: Retorna todas as varinhas cadastradas.
- **GET /varinhas/:id**: Retorna as informações de uma varinha específica pelo seu ID.
- **POST /varinhas**: Adiciona uma nova varinha ao banco de dados.
- **PUT /varinhas/:id**: Atualiza as informações de uma varinha específica pelo seu ID.
- **DELETE /varinhas/:id**: Deleta uma varinha específica pelo seu ID.

## Utilização

Certifique-se de ter o Node.js e o PostgreSQL instalados em seu sistema.

1. Clone este repositório:

```
git clone <URL_DO_REPOSITORIO>
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`, fornecendo as credenciais do banco de dados.

4. Inicie o servidor:

```
npm start
```

5. Acesse a API em `http://localhost:3000`.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request para melhorar esta API.

---

Com esta Back-end, você pode gerenciar facilmente informações sobre bruxos e varinhas do universo de Harry Potter em seu próprio banco de dados. Divirta-se explorando! 🧙‍♂️🔮
