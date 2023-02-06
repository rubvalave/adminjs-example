## Description

Pretty easy and straightforward repository to experiment a bit with AdminJS.

It uses a base NestJS basic project with AdminJS slap on top of it.


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start
```

## Usage

The app will run on `localhost:3000`, and to access AdminJS `localhost:3000/admin`.
 
The email/password needed to actually enter the AdminJS section is defined in the `app.module.ts` file inside `/src` folder.
Just in case reading is not your best option, default email/pass is:

```
email: 'admin@example.com',
password: 'password',
```

