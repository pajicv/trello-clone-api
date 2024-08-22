### Set up environment

- create `.env` file in the root dir based on `.env.example`

### Set up database

Run migrations

```shell
npx knex migrate:latest --knexfile knex-init.ts
```

``` sql
-- statuses
INSERT INTO public.statuses(name) VALUES ('Todo');
INSERT INTO public.statuses(name) VALUES ('In Progress');
INSERT INTO public.statuses(name) VALUES ('Done');

-- users
INSERT INTO public.users(username, email)
	VALUES ('pajicv', 'pajicv@gmail.com');
	
INSERT INTO public.users(username, email)
	VALUES ('someone', 'someone@gmail.com');
```

### Postman Collection

- import file `trello-clone.postman_collection.json`

### Install dependencies

```shell
npm install
```

### Run application

```shell
npm start
```

### To Do

- add authentication
- add unit tests
- handle unassigned task
- add error messages when try to edit/delete non existing task

