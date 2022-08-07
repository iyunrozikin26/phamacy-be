# phamacy-be

## Backend ini di develop dengan techstack:

-   NodeJs
-   ExpressJs
-   Sequelize (ORM)
-   PostgresQL (db)
-   bcryptjs
-   jsonwebtoken

## Cara menjalankan atau menggunakan API ini, sebagai berikut:

-   `npm install` untuk mendownload package
-   `npm run createdb` atau `npx sequelize-cli db:create` membuat database
-   `npm run migrate` atau `npx sequelize-cli db:migrate` membuat tabel pada database
-   `npm run seed` atau `npx sequelize-cli db:seed:all` seed data ke dalam database
-   `npm run dev` menjalankan server

## REST API

#### REGISTER

-   POST: `http://localhost:3000/users/registerPatient`

#### LOGIN

-   POST: `http://localhost:3000/users/login`

#### CRUD DRUG

-   GET: `http://localhost:3000/drugs`
-   POST: `http://localhost:3000/drugs`
-   PUT: `http://localhost:3000/drugs/:drugId/edit`
-   DELETE: `http://localhost:3000/drugs/:drugId/delete`

#### ORDER & PAYMENT

-   GET: `http://localhost:3000/orders`
-   POST: `http://localhost:3000/orders/:drugId`
-   PUT: `http://localhost:3000/orders/:ordersId`

### API-doc

-   open atau import file `Insomnia_2022-08-07` menggunakan Insomnia app
-   `https://docs.insomnia.rest/insomnia/install` link insomnia app
