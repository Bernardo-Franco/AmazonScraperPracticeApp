const express = require('express');
const request = require('request-promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const scraperApiKey = process.env.API_KEY
const baseURL = `http://api.scraperapi.com?api_key=${scraperApiKey}&autoparse=true`;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Amazon scraper API")
})

// Get product details

app.get('/products/:productId', async (req, res)=>{
    const { productId } = req.params;
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});
// reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});
//offers

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});

// get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});

app.listen(PORT, () => { console.log(`server running on port: ${PORT}`)});