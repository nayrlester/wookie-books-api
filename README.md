AdonisJS is a fully-featured backend framework for Node.js. The framework is created from ground-up with strong emphasis on developer ergonomics and ease of use.

It is one of the rarest framework in the Node.js community that ships with a suite of first party packages that helps you create and ship products without wasting hundreds of hours in assembling different npm packages.

adonisjs documentation : https://docs.adonisjs.com/guides/introduction

How to run
- Create a database and add the database creadentials in your .env file
type in your terminal : 
- run -> npm init
- run -> npm install
- run -> node ace migration:run
- run -> node ace db:seed
- run -> node ace serve --watch   or
- run -> npm run dev


I use SWAGGER DOCS for documentation. You can check the documentation in your browser url localhost:3333

In swagger docs authorization , you need to add "bearer <space> <token>"

All API's is listed in swagger docs

swagger documentation : https://swagger.io/docs/

Note: Darth Vader(fullname) user will not be able to publish his books when using the api  "api/publish-books/:id"

Credentials : 
username: darthvader
password: password123
