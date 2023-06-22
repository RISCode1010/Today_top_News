const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
var cors = require('cors');
// const connectMongo = require('./config/database');

// const app = require("./app");
const app = express();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

dotenv.config({
    path: "./.env"
})

// connectMongo();

app.use(bodyParser.urlencoded({
    limit : '50mb',
    extended: true
}))

app.use(express.json({
    limit: "50mb"
}));

const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.json("server is ready")
})


app.post('/api/news', async (req, res) => {
    try {
        // console.log(req.body);
      // Make the API request to newsAPI.org
      const{country,category,page,pageSize} = req.body;
    //   `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${pageSize}`
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`);
  
      // Process the response if needed
      // For simplicity, we'll just send back the articles
      const articles = response.data;
      res.json(articles);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  });


app.listen(port,()=>{
    console.log(`app lisening at http://localhost:${port}`);
})












// const PORT = process.env.PORT || 5000;

// Define the route for fetching news from newsAPI.org


// Start the server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
