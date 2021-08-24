# A fully serverless editable chat demo that can scale to arbitrary levels

One of the obvious architectural patterns when it comes to building chat apps with a [Pub/Sub](https://ably.com/topic/pub-sub) service like [Ably](https://ably.com/) is to publish messages on a channel and make sure all the participants are subscribed to that same channel so they can receive the updates.

This pattern however, suffers from the fact that there's no way to stream updates about previously published messages, for example in case of having to edit a previously sent chat message. This can be resolved by putting a database at the center of the architecture. Such database-driven applications can trigger updates to interested parties follow any changes to the database.

This project depends on the [Ably Postgres connector](https://github.com/ably-labs/ably-postgres-connector) which can watch for changes on a Postgres DB and publish messages to specific Ably channels on any change.

## Tech stack of the chat app

- [NuxtJS](https://nuxtjs.org/) for frontend web development.
- [Ably](https://ably.com/) to enable the Pub/Sub pattern.
- [AWS Lambda](https://aws.amazon.com/lambda/) functions to insert and update rows in the database.
- [PostgresDB](https://www.postgresql.org/) hosted on [AWS RDS](https://aws.amazon.com/rds/) to store the data.
- [Ably Postgres connector](https://github.com/ably-labs/ably-postgres-connector) to watch changes on the database tables and publish messages on every change.
- [AWS Fargate](https://aws.amazon.com/fargate/) with [AWS ECS](https://aws.amazon.com/ecs/) and [AWS ECR](https://aws.amazon.com/ecr/) to deploy the Ably Postgres connector's dockerized image.
- [Netlify functions](https://www.netlify.com/products/functions/) to enable a token auth endpoint to authenticate with Ably.
- [Netlify](https://netlify.com/) to host the static Jamstack site.

## App architecture

![Serverless chat app architecture](https://user-images.githubusercontent.com/5900152/130453795-22ec340b-45ce-4172-9956-4893b22ca699.jpeg)

