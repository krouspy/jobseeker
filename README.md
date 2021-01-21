## NoSQL - Apache Kafka

This is the assigment for the NoSQL course at ESILV.

### Overview

The project is a really simple job seeker using the [reed](https://www.reed.co.uk/developers/jobseeker) API. It notifies jobs depending on the minimum salary, the location (around london) and if the job is in blockchain or destinated for a graduated software engineer.

Note that the API doesn't seem enough active for a quick demo so instead of fetching regularly the API we simply retrieve a list of jobs then send them one by one with some delay between each in order to try to simulate an incoming data flow. I tried to use other APIs like [indeed](https://opensource.indeedeng.io/api-documentation/) and [glassdoor](https://www.glassdoor.com/developer/index.htm) but they are requiring to be partner.

A `.env` containing the `API_KEY` has been intentionnaly committed to make testing the project faster.

### Setup

Install packages with either yarn or npm

```bash
$ yarn
```

Launch Docker

```bash
$ docker-compose up
```

Launch consumer

```bash
$ yarn consumer
```

Launch producer

```bash
$ yarn producer
```
