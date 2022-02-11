import dotenv from "dotenv";
dotenv.config();
import { TwitterClient } from "twitter-api-client";
import express from "express";
import axios from "axios";

import { ApiUrl } from './const/index.js';

const app = express();

let today = new Date().toISOString().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }).slice(0, 10);

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
        backgroundStyle: 'stars',
        moonStyle: 'default'
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
      uploadBanner(Buffer.from(image.data).toString('base64'));
    } catch (error) {
      console.log(error);
    }
}

const uploadBanner = async(imgData) => {
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
  getImageUrl();
  console.log("good");
}, 1000*60*2);
 
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('server is running');
});
app.listen(port);