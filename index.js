import dotenv from "dotenv";
dotenv.config();
import { TwitterClient } from "twitter-api-client";
import express from "express";
import axios from "axios";
import moment from "moment";

import { ApiUrl } from './const/index.js';

const app = express();

const midnight = "00:50:05";
let getLocalDateData = moment().utcOffset(420);
let today = getLocalDateData.format('YYYY-MM-DD')


const lat = -6.1544563215837575;
const long = 106.56163066770489;

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.ACCESS_TOKEN_TWITTER,
    accessTokenSecret: process.env.ACCESS_SECRET_TOKEN_TWITTER,
})

let options = {
    method: 'POST',
    url: ApiUrl,
    headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': process.env.API_HOST,
        'x-rapidapi-key': process.env.API_KEY
    },
    data: {
      format: 'png',
      observer: {
        date: today, 
        latitude: lat, 
        longitude: long
      },
      style: {
        moonStyle: 'default',
        backgroundStyle: 'stars'
      },
      view: {
          type: 'portrait-simple'
      }
    }
};

const getImageUrl = async() => {
    try {
        await axios(options)
        .then((response) => {
            return response.data.data.imageUrl;
        })
        .then((data) => {
            downloadImage(data)
        })
    } catch (error) {
        console.error(error);
    }
}

const downloadImage = async(url) => {
    try {
      let image = await axios.get(url, {responseType: 'arraybuffer'});
      uploadProfileImage(Buffer.from(image.data).toString('base64'));
    } catch (error) {
      console.log(error);
    }
}

const uploadProfileImage = async(imgData) => {
    try {
      await twitterClient.accountsAndUsers
        .accountUpdateProfileImage({
          image: imgData,
        })
        .then(() => {
          console.log("Upload to Twitter done");
        });
    } catch (error) {
      console.log(error);
    }
}

setInterval(() => {
    let now = moment().utcOffset(420).format('HH:mm:ss');
    console.log(now)
    console.log(today)
    if (now === midnight) {
        getImageUrl();
    }
}, 1000);

 
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('server is running');
});
app.listen(port);