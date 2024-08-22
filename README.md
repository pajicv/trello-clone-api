
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

### To Do

- add authentication
- add unit tests
- ...

