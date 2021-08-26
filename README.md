# Live Integration

This uses Nest.

The concept here is to build E2E/Integration tests with a postgres database. This is a stateful operation so embrace that and run the tests in a known and controllable order (similar to how migrations are named with Flyway).

## How to

This is a regular Nest app.

```bash
yarn # install

yarn start:dev # to run in development mode
```

It's recommended you use the _docker compose_ approach to running though, so you can use the built in database and default configuration.

```bash
docker compose up

docker compose up --build # if you change the package.json/yarn.lock
```

Once you're ready to run your tests, you can `exec` into the `app` container so that you can run commands via its shell. 

```bash
docker compose exec app sh
```

This puts you into a position to run tests that can hit the database. Once inside the container, run your tests.

```bash
yarn test:e2e # run once

yarn test:e2e --watchAll # run on change
```

### Why?

Sometimes you can mokc out enough stuff to test in relative isolation whatever logic and application infrasturcture you might have.

Othertimes though, through all those mocks or additional test apparatuses, you end confused or deviating from the path of least resistance. Sometimes it is easier to test things with an end-to-end approach. Test your controllers-services-repositories and everything in-between like a story. Like a customer would use your app.

You could call this a smoke test. It might not tell you that this number here should be a 4 instead of a 2, but it should tell you that this endpoint is returning `NaN` when you expected it return `I am a teapot`, or when you expected a side effect to save rows into the database, but there's nothing in there.

**Isn't it an integration test?**

The terms get fuzzy.

What's a unit test when you have to instantiate all this junk anyway? It's not like you can mock _everything_, so your unit is bigger than `Cat` but smaller than `App`. Is it an integration test? Maybe it is, but in general it feels like any test that involves Nest components is an integration test. There may be no common ruling that an integration test must or must not involve the database layer, but that pathway is required in this repo example. Is it a functional test? Ok, now you're just reading books and asking questions you know there's no answer for. (Yes, sort of, it is. Not the point.) So we'll call them e2e and move on.

The `jest` config looks for files named with `.e2e-spec.ts` so you could change the name of these tests.

## TODO

* define a `docker-compose.test.yml` file specifically designed for testing
  * when that variant starts, it runs the app with `yarn test:e2e --watchAll` by default
    * can two docker compose runs exist at the same time from the same directory? 