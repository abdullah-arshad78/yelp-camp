const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Campground = require("../models/campground")
const cities = require("./cities")
const {places,descriptors}=require("./seedHelpers")
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;
db.on("error",console.error.bind("connection error:"));
db.once("open",()=>{
    console.log("database connected")
})

const sample = (array) => array[Math.floor(Math.random()*array.length)];
const seedDb = async()=>{
    await Campground.deleteMany({});
   for(let i=0;i<200;i++){
       const random1000= Math.floor(Math.random()*1000);
       const price = Math.floor(Math.random()*20)+10;
      const camp= new Campground({
          author: "610a88c7a6ebd90684570b71",
           location:`${cities[random1000].city}, ${cities[random1000].state}`,
           title:`${sample(descriptors)} ${sample(places)}`,
           description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend sem sit amet tortor commodo, vel varius nisi ultrices. Nam et ullamcorper eros. Maecenas vulputate mollis laoreet. Mauris ultricies nulla nec enim iaculis, nec fermentum neque mattis. Pellentesque feugiat semper orci sed ullamcorper.",
           price,
           geometry: { 
            type : "Point",
             coordinates: [ 
               cities[random1000].longitude,
               cities[random1000].latitude
               ]
                },
           images:[
            {
              url: 'https://res.cloudinary.com/dkr02iitf/image/upload/v1628546344/YelpCamp/bobrdi7gh5yjunnd4cev.jpg',
              filename: 'YelpCamp/bobrdi7gh5yjunnd4cev'
            },
            { 
              url: 'https://res.cloudinary.com/dkr02iitf/image/upload/v1628546344/YelpCamp/kqo37obvqgmtifibm2bl.jpg',
              filename: 'YelpCamp/kqo37obvqgmtifibm2bl'
            }
          ]
      })
await camp.save();
   }
}
seedDb().then(()=>{
    mongoose.connection.close();
})

