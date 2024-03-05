const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname + '/views'));

const base_url = "http://localhost:3000";

app.get('/products', async (req, res) => {
    const products = await axios.get(base_url + '/products');
    res.render('product', { products: products.data });
});

app.listen(5500, () => console.log("http://localhost:5500"));