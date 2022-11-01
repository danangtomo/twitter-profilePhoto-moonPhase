# TWITTER-PROFILE-PHOTO-MOON-PHASE
Simple Node JS script to change twitter profile photo automatically, according to the actual moon phase.

### Things You should do

- Register an account at [Twitter Developer Platform](https://developer.twitter.com/) to get API access and ensure the project has **Elevated Access**.
- Register an account at [Rapid Api](https://rapidapi.com/) to get API access for moon images.
- Clone this repository using `git clone https://github.com/danangtomo/twitter-profilePhoto-moonPhase.git`.
- After finished cloning, run command `npm i` to install all dependencies.
- Create `.env` file in your local project.
- In the `package.json` file, adjust the contents of the node and npm keys with the version you are using.
```javascript
"engines": {
    "node": "<YOUR_VERSION>",
    "npm": "<YOUR_VERSION>"
  }
```
- Change to your local time.
```javascript
moment.utc().tz("Asia/Jakarta");
```
- If you want to run on local, type the command `npm start`.

### .env setup (local)
```sh
TWITTER_API_KEY="<YOUR_KEY>"
TWITTER_API_SECRET_KEY="<YOUR_KEY>"
ACCESS_TOKEN_TWITTER="<YOUR_KEY>"
ACCESS_SECRET_TOKEN_TWITTER="<YOUR_KEY>"

API_KEY="<YOUR_KEY>"
API_HOST="astronomy.p.rapidapi.com"

```


### Dependencies

| Name |
|---|
| `axios` |
| `dotenv` | 
| `express` | 
| `moment-timezone` | 
| `twitter-api-client` | 