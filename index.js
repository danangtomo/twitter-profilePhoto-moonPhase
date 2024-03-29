import dotenv from "dotenv";
dotenv.config();
import { TwitterClient } from "twitter-api-client";
import express from "express";
import axios from "axios";
import moment from "moment-timezone";

import { ApiUrl } from './const/index.js';

const app = express();

const atTime = "06:49:00";
let getLocalDateData = moment.utc().tz("Asia/Jakarta");
let today = getLocalDateData.format('YYYY-MM-DD');

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
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
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
  let exactTime = moment.utc().tz("Asia/Jakarta");
  let now = exactTime.format('HH:mm:ss');
    if(now === atTime) {
        getImageUrl();
    }
}, 1000);

 
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('server is running');
});
app.listen(port);