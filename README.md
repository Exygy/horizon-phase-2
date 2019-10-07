# Horizon

## Maintenance

### Overview

This application is a choose-your-adventure esque game where a user navigates through a sequences of screens. Whenever a screen is loaded, a call to the backend is made to load a step. This step is identified by its ID and consists of data (mostly copy) needed to present the view. 

### Backend notes

* Each step is identified by its ID. When one loads a path like so (/onboarding/welcome/10000?lang=en), the step with the ID 10000 is loaded from the backend. 
* The data for each step can be modified through the backend CMS interface (/admin/). 
* Each step contains up to 20 fields. Each field has an english version (`_en`), a spanish version (`_es`), and a chinese version (`_cn`). Additionally, there is a field that describes the purpose of the field (`_meta_description`). 
* Users can save their choices around strategy. There is a lot of hardcoded work that runs light analytics on top of this data. Should a new step be added or removed, please remember to chance this piece of the codebase.
* Database backups are turned on. Should the client accidentially delete step data and want to revert, Exygy staff will need to use heroku to revert to a past snapshot (more on that [here](https://devcenter.heroku.com/articles/heroku-postgres-backups). 

## Frontend notes

* A URL parameter `lang` is supplied in each query string. This controls the language. Options are 'en', 'es', and 'cn'. If none is supplied, it will default to english. 
* All content is sourced from the backend; there is some that is hardcoded. These entries are stored in [`Translate.tsx`](/client/src/Translate.tsx). 
* TypeScript is used and has about a ~80% coverage rate.
* Each time the root page is loaded, a session is created (or overwritten). This session has an ID associated with it and any sort of strategy choice is saved in a cookie with this ID. Additionally, when it is saved in the backend, this session ID is associated with it.
* If some page deep into the game is loaded and there is no history of a session existing (e.g. a user shares a link to the page they are on with someone else), the game will auto redirect to the root page to properly start the game and session.
* The Semantic UI toolkit is used. The CSS of it is heavily customized.

## Development

### Backend

```
./d build
./d start
```

Peek inside `./d` for more.

### Frontend
```
cd client
cp .env.example .env
yarn
yarn run start
```

## Deployment

Assuming you've created a Heroku app and have your git configuration done.

```
heroku addons:create heroku-postgresql:hobby-dev
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python
heroku config:set SECRET_KEY='123'
git push heroku master
```
