### Tech Stack

- Node.js v18.18.0
- PostgreSQL 14

### Set up environment

- create `.env` file in the root dir based on `.env.example`

### Set up database

Create database `trello_clone`

Run migrations and seeds

```shell
npx knex migrate:latest --knexfile knex-init.ts

npx knex seed:run --knexfile knex-init.ts
```

### Postman Collection

- import file `trello-clone.postman_collection.json`

### Install dependencies

```shell
npm install
```

### Run application

- Development

```shell
npm run dev
```

- Production

```shell
npm run build
npm start
```

### To Do

- use nodemon for dev environment
- add authentication
- add unit tests
- add error messages when try to edit/delete non existing task

