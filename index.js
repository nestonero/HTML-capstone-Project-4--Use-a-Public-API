

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";




const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY  =  ""   // generated api key from url;

//Step 2: Make sure that static files are linked to and the CSS shows up.
app.use(express.static("public"));






app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",  async(req, res) => {

  res.render("index.ejs", {  });
});

app.post("/get-weather-condition", async(req, res) => {

    const lat= req.body.latitude;
    console.log(lat);

     const long= req.body.longitude;
    console.log(long);
    try {
    const response = await axios.get(`${API_URL}`, {
      params: {
       
        lat: lat,
    lon: long,
    appid: API_KEY,
    cnt : 4

      }






    });


    const result = response.data;
    
    const jsonString = JSON.stringify(result);
   
 
var will_rain =false;
let output = [];


var message = "";
for (let count = 0; count <= 2; count++) { 
 var condition_code =  result.list[count].weather["0"].id;
  


 console.log(condition_code);


    if ( result.list[count].weather["0"].id < 700) { 
       message = "bring an umbrella"; }

}

    res.render("index.ejs", { feedback: message});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





