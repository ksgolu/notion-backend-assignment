# About

This Poject is a milimistic task management. You can create a task and assign it to a user along with category.

You can use following properties:

- title
- descripiton
- dueDate
- addigndTo
- category

# Features

- create a new Task
- update a task
- get a Task
- list all Task
- sort task by assignto
- sort task by category

# Routes

- POST /task - create new task
- GET /task - list all task
- GET /task/:taskId - get a specific task by id
- PUT /taks/:taskId - update a specific task
- DELETE /task/:taskId - delete a task by id
- GET /task/?page=1 - for pagination
- GET /task/?limit=30 - limit the number of task
- GET /task/?assignTo=kumar - get all assigned task to 'kumar'
- GET /task/?categoryName=todo - get all task of category 'todo'

there two more api to demostarte authentication system (JWT)

- POST /auth/login - to login in system
- GET /auth/me - get your info.

# Run this project

To run this Project, You need following packages

- Node.js v18 (install)
- npm
- Typescript (globaly installed)

Follow these instructions to run this project

## STEP 1:

clone this project in your local machine

## STEP 2:

Go to backend directory

```shell
 cd backend
```

## STEP 3:

Install dependecies

```shell
npm i
```

## STEP 3:

Run following command in your terminal

```shell
npm start
```

if above command didn't work,

```shell
tsc index.js
```

Note: Make sure TypeScript is intalled globally

now again issue the `npm start` command.

Now you prject will be up and running on `localhost:3000`

# Run Test Suit

If you want to modify this project and make sure that previous api are working as expect.

Follow the instruction to run the suit case

## STEP1:

```shell
npm test
```

This command will test all your api, if something went wrong it show error in your terminal.

In case `npm start` didn't work use `npx jest`.
