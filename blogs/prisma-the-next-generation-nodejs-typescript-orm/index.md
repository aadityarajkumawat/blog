---
title: "Prisma: The Next-generation NodeJS-Typescript ORM"
slug: "prisma-the-next-generation-nodejs-typescript-orm"
date: "26/11/2022"
thumbnail: "prisma-orm-1"
index: 1
---

# Prisma: The Next-generation NodeJS-Typescript ORM

I have been using various NodeJS ORMs' for a while now, but it was not until I tried prisma, things felt natural, the workflow that it build through is just something amazing and so simple, I am total prisma fan, the best part that I like about prisma is the way you query data, its the most innovative thing I have seen so far and I think this way of querying data, should be adopted a lot more than being currently used.

> To follow along, you should have postgres/ mysql and typescript installed, I will be using postgres for this post.

## Getting started with prisma

Let's setup a new prisma project,

```bash
mkdir learn-prisma
cd learn-prisma
npm init -y
yarn add -D prisma typescript ts-node @types/node
```

Once, we are done with setting up the project and installing dependencies, we need to invoke the prisma CLI using the following command,

```bash
npx prisma
# Set prisma in your project using the prisma init command
npx prisma init
```

Doing a prisma init, will create a prisma directory and an .env file.
