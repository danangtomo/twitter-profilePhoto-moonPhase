# TWITTER-PROFILE-PHOTO-MOON-PHASE
Simple Node JS script to change twitter profile photo automatically, according to the actual moon phase.

## THINGS YOU SHOULD DO

- Register an account at [Twitter Developer Platform](https://developer.twitter.com/) to get API access and ensure the project has **Elevated Access**.
- Register an account at https://rapidapi.com/ to get API access for moon images.
- Clone this repository using `git clone https://github.com/danangtomo/twitter-profilePhoto-moonPhase.git`.
- After finished cloning, run command `npm i` to install all dependencies
- Create an account at https://heroku.com/ and connect to your project repository to deploy your server.
- Create `.env` file in your local project
- Access your `https://dashboard.heroku.com/apps/<PROJECT_NAME>/settings` page and in the Config Vars section, click on `Reveal Config Vars` then fill it with the values of the `.env` file contained in your local project. If the value is string, for example `"blabla"` just fill it with `blabla` without quotes
- In the `package.json` file, adjust the contents of the node and npm keys with the version you are using
```javascript
"engines": {
    "node": "<YOUR_VERSION>",
    "npm": "<YOUR_VERSION>"
  }
```
- If you want to run on local, type the command `npm start`

## .env Setup (Local)
```sh
TWITTER_API_KEY="<YOUR_KEY>"
TWITTER_API_SECRET_KEY="<YOUR_KEY>"
ACCESS_TOKEN_TWITTER="<YOUR_KEY>"
ACCESS_SECRET_TOKEN_TWITTER="<YOUR_KEY>"

API_KEY="<YOUR_KEY>"
API_HOST="<YOUR_KEY>"

PORT=3000
```

## DEPENDENCIES

| Name |
|---|
| `axios` |
| `dotenv` | 
| `express` | 
| `moment` | 
| `twitter-api-client` | 