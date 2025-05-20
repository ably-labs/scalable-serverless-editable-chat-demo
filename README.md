> [!IMPORTANT]
> This repository uses the Ably Pub/Sub approach for building chat apps. We now offer Ably Chat—a new family of SDKs and APIs that streamline development and manage realtime chat complexity for you. For a modern, easier way to create chat experiences, visit our [Ably Chat documentation](https://ably.com/docs/chat).

# A fully serverless editable chat demo that can scale to arbitrary levels

One of the obvious architectural patterns when it comes to building chat apps with a [Pub/Sub](https://ably.com/topic/pub-sub) service like [Ably](https://ably.com/) is to publish messages on a channel and make sure all the participants are subscribed to that same channel so they can receive the updates.

This pattern, however, suffers from the fact that there's no way to stream updates about previously published messages, for example in the case of having to edit a previously sent chat message. 

This can be resolved by adopting a database-driven architectural pattern and allowing realtime messages to be triggered following any changes to the database, and thus to previously published data. To make this possible, the editable chat app makes use of the [Ably Postgres connector](https://github.com/ably-labs/ably-postgres-connector) which can watch for changes on a Postgres DB and publish messages to specific Ably channels on any change.

## Supporting articles

I've written extensively about the architecture, implementation and deployment of various components of this app.

You can find them here:

- [Database-driven realtime architectures: building a serverless and editable chat app - Part 1](https://ably.com/blog/database-driven-realtime-architectures-serverless-editable-chat-app-part-1)
- [Database-driven realtime architectures: building a serverless and editable chat app - Part 2](https://ably.com/blog/database-driven-realtime-architectures-serverless-editable-chat-app-part-2)

## App architecture

![Serverless chat app architecture](https://user-images.githubusercontent.com/5900152/132007004-f9f359ba-67c8-43c9-b627-0fff901b10d0.jpg)

## Tech stack of the chat app

- [NuxtJS](https://nuxtjs.org/) for frontend web development.
- [Ably](https://ably.com/) to enable the Pub/Sub pattern.
- [AWS Lambda](https://aws.amazon.com/lambda/) functions to insert and update rows in the database.
- [PostgresDB](https://www.postgresql.org/) hosted on [AWS RDS](https://aws.amazon.com/rds/) to store the data.
- [Ably Postgres connector](https://github.com/ably-labs/ably-postgres-connector) to watch changes on the database tables and publish messages on every change.
- [AWS Fargate](https://aws.amazon.com/fargate/) with [AWS ECS](https://aws.amazon.com/ecs/) and [AWS ECR](https://aws.amazon.com/ecr/) to deploy the Ably Postgres connector's dockerized image.
- [Netlify functions](https://www.netlify.com/products/functions/) to enable a token auth endpoint to authenticate with Ably.
- [Netlify](https://netlify.com/) to host the static Jamstack site.

## How to check out the demo

Go to [https://serverless-scalable-chat.netlify.app/](https://serverless-scalable-chat.netlify.app/) and try it out. You can open multiple instances of it in different tabs or browsers to pretend there are multiple users.

## How to run it locally

#### Step 1 - Set up your Postgres Database

This project requires a PostgresDB to store messages. 

- Download and install [Postgres](https://www.postgresql.org/)
- Download and install [pgAdmin](https://www.pgadmin.org/) to perform various operations on your PostgresDB
- Create a new table called `chat_data` with the following SQL command

```
CREATE TABLE IF NOT EXISTS public.chat_data
(
    username text COLLATE pg_catalog."default",
    msg_id text COLLATE pg_catalog."default" NOT NULL,
    msg_data text COLLATE pg_catalog."default",
    client_id text COLLATE pg_catalog."default",
    incremental_record_id bigint NOT NULL DEFAULT nextval('chat_data_incremental_record_id_seq'::regclass),
    created_at_timestamp bigint,
    is_edited boolean,
    CONSTRAINT chat_data_pkey PRIMARY KEY (msg_id)
)
```

#### Step 2 - Set up the Ably Postgres connector for your app

This project depends on the Ably Postgres connector, so we'll need to set that up with our credentials.

- Clone the connector repo with `git clone https://github.com/ably-labs/ably-postgres-connector.git`
- Update `config/default.json` with the details of your database, tables, Ably channels and API Key. Note that if you want to name your channels differently, you'll need to update this in the Nuxt app as well.
- Run the connector locally using `node test.js`

#### Step 3 - Set up the Lambda function and Ably integration

This project uses a Lambda function to make `INSERT` and `UPDATE` operations on the database. You can find the code in the `lambda-function` folder. 

Upload this code to your Lambda function and set it up to be triggered whenever a new message is published on the `outgoing-chat` channel of your Ably app by [following the steps provided in Ably docs](https://ably.com/documentation/general/events/aws-lambda).

#### Step 4 - Set up Ably auth endpoint

Ably accepts two ways of authentication - [Basic Auth](https://ably.com/documentation/core-features/authentication#basic-authentication) and [Token Auth](https://ably.com/documentation/core-features/authentication#token-authentication). 

Basic auth is mostly useful for quick demos but you'll need to use Token Auth for secure authentication on production level apps to make sure the API Key doesn't get exposed.

##### For local usage

If you'd just like to try it out using Basic auth, you'll need to update the `instantiateAbly()` method in the `actions.js` file of the Nuxt store. Just replace the `authUrl: ''` parameter with `key: '<YOUR-ABLY-API-KEY>'`.

##### For usage in production

To enable Token auth, we can set up an auth endpoint and have this endpoint issue [Ably Token Requests](https://ably.com/documentation/realtime/authentication#token-request) so that our frontend clients can authenticate with Ably securely. 

In this repo, I have the auth endpoint hosted as a Netlify serverless function. You can find this in `chat-web-app/netlify/functions/ably-auth.js`. When you deploy the Nuxt project to Netlify, the function will be automatically activated by Netlify. 

However, you'll need to update the `authUrl` parameter used to authenticate Ably in the Nuxt app and add your function's URL instead. 

You can find this in the `instantiateAbly()` method in the `actions.js` file of the Nuxt store. Just replace the `https://serverless-scalable-chat.netlify.app` part of the endpoint with your Netlify function's URL.

For this to work, you'll need to supply your Ably API Key to the Netlify function via env variables. You can add it like so `ABLY_API_KEY=<YOUR-API-KEY>`

With this, you should be all set with the Ably auth step.

#### Step 5 - Run the chat app

- Change directory to the web app with `cd chat-web-app`

- Install all the dependencies with `npm install`

- Run the app with `npm run dev`

- Go to the browser and open multiple instances of `http://localhost:3000/` to try out the app.

Note: If you've used Token auth via Netlify functions, make sure that you've deployed the serverless auth endpoint before running the app.

## Other notes

- All the Ably methods are in the `chat-web-app/store/actions.js` file.
- More details on various steps are coming soon but in the meantime, feel free to reach out to me [directly via Twitter](https://twitter.com/Srushtika) or [via Ably Support](https://ably.com/contact), in case of any questions.
