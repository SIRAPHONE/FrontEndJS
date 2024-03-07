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

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //////////////// Product
app.get('/products', async (req, res) => {
    const products = await axios.get(base_url + '/products');
    res.render('product', { products: products.data });
});

app.get('/orders', async (req, res) => {
    const orders = await axios.get(base_url + '/orders');
    res.render('order', { orders: orders.data });
});

app.get('/orderDetails', async (req, res) => {
    const orderDetails = await axios.get(base_url + '/orderDetails');
    res.render('orderDetail', { orderDetails: orderDetails.data });
});

app.get('/customers', async (req, res) => {
    const customers = await axios.get(base_url + '/customers');
    res.render('customer', { customer: customers.data });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//-------------------------------------------------------------------------------------------

app.get("/create_P", (req, res) => {
    res.render("create_P");
  });
  
  app.post("/create_P", async (req, res) => {
    try {
      const data = { ProductName: req.body.ProductName,Description: req.body.Description,Price: req.body.Price,StockQuantity: req.body.StockQuantity};
      await axios.post(base_url + '/products', data);
      res.redirect("/products");
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get("/create_O", (req, res) => {
    res.render("create_O");
  });
  
  app.post("/create_O", async (req, res) => {
    try {
      const data = { CustomerID: req.body.CustomerID,OrderdateID: req.body.OrderdateID,TotalAmoount: req.body.TotalAmoount};
      await axios.post(base_url + '/orders', data);
      res.redirect("/orders");
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get("/create_OD", (req, res) => {
    res.render("create_OD");
  });
  
  app.post("/create_OD", async (req, res) => {
    try {
      const data = { OrderID: req.body.OrderID,ProductID: req.body.ProductID,Quantity: req.body.Quantity,Subtotal: req.body.Subtotal};
      await axios.post(base_url + '/orderDetails', data);
      res.redirect("/orderDetails");
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  app.get("/create_C", (req, res) => {
    res.render("create_C");
  });
  
  app.post("/create_C", async (req, res) => {
    try {
      const data = { Firstname: req.body.Firstname,Lastname: req.body.Lastname,Email: req.body.Email,Phone: req.body.Phone};
      await axios.post(base_url + '/customers', data);
      res.redirect("/customers");
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });
  
  //------------------------------------------------------------------------------------------------------------------------------------

app.get("/update_P/:id", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/products/' + req.params.id);
        res.render("update_P", { product: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

  app.post("/update_P/:id", async (req, res) => {
    try {
      const data = {ProductName: req.body.ProductName,Description: req.body.Description,Price: req.body.Price,StockQuantity: req.body.StockQuantity };
      await axios.put(base_url + '/products/' + req.params.id, data);
      res.redirect("/products");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }
  });

  app.get("/update_O/:id", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/orders/' + req.params.id);
        res.render("update_O", { order: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

  app.post("/update_O/:id", async (req, res) => {
    try {
      const data = {CustomerID: req.body.CustomerID,OrderdateID: req.body.OrderdateID,TotalAmoount: req.body.TotalAmoount};
      await axios.put(base_url + '/orders/' + req.params.id, data);
      res.redirect("/orders");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }
  });

  app.get("/update_OD/:id", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/orderDetails/' + req.params.id);
        res.render("update_OD", { orderDetail: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

  app.post("/update_OD/:id", async (req, res) => {
    try {
      const data = {OrderID: req.body.OrderID,ProductID: req.body.ProductID,Quantity: req.body.Quantity,Subtotal: req.body.Subtotal};
      await axios.put(base_url + '/orderDetails/' + req.params.id, data);
      res.redirect("/orderDetails");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error");
    }
  });

app.get("/update_C/:id", async (req, res) => {
  try {
      const response = await axios.get(
          base_url + '/customers/' + req.params.id);
      res.render("update_C", { customer: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.post("/update_C/:id", async (req, res) => {
  try {
    const data = {Firstname: req.body.Firstname,Lastname: req.body.Lastname,Email: req.body.Email,Phone: req.body.Phone};
    await axios.put(base_url + '/customers/' + req.params.id, data);
    res.redirect("/customers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//---------------------------------------------------------------------------------------------------------------------

app.get('/deleteP/:id', async (req, res) => {
  try {
      await axios.delete(base_url + "/products/" + req.params.id);
      res.redirect('/products');
  } catch (err) {
      res.status(200).send(err.message);
      console.log(err.message);
  }
});

app.get('/deleteO/:id', async (req, res) => {
  try {
      await axios.delete(base_url + "/orders/" + req.params.id);
      res.redirect('/orders');
  } catch (err) {
      res.status(200).send(err.message);
      console.log(err.message);
  }
});

app.get('/deleteOD/:id', async (req, res) => {
  try {
      await axios.delete(base_url + "/orderDetails/" + req.params.id);
      res.redirect('/orderDetails');
  } catch (err) {
      res.status(200).send(err.message);
      console.log(err.message);
  }
});

app.get('/deleteC/:id', async (req, res) => {
  try {
      await axios.delete(base_url + "/customers/" + req.params.id);
      res.redirect('/customers');
  } catch (err) {
      res.status(200).send(err.message);
      console.log(err.message);
  }
});


app.listen(5500, () => console.log("http://localhost:5500"));