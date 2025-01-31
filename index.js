const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const { log } = require("console");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname + "/views"));

// const base_url = "http://10.104.17.251:3000";
const base_url = "http://localhost:3000";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// get
//

app.get("/", async (req, res) => {
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const products = await axios.get(base_url + "/products");
  res.render("product/product", { products: products.data });
});

app.get("/orders", async (req, res) => {
  const orders = await axios.get(base_url + "/orders");
  res.render("order/order", { orders: orders.data });
});

app.get("/orderDetails", async (req, res) => {
  const orderDetails = await axios.get(base_url + "/orderDetails");
  res.render("orderDetail", { orderDetails: orderDetails.data });
});

app.get("/customers", async (req, res) => {
  const customers = await axios.get(base_url + "/customers");
  res.render("customer/customer", { customer: customers.data });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Create
//////////////////////////////////Product

app.get("/product/create_P", (req, res) => {
  res.render("product/create_P");
});

app.post("/create_P", async (req, res) => {
  try {
    const data = {
      ProductName: req.body.ProductName,
      Description: req.body.Description,
      Price: req.body.Price,
      StockQuantity: req.body.StockQuantity,
    };
    await axios.post(base_url + "/products", data);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});
//////////////////////////////////Order
app.get("/order/create_O", async (req, res) => {
  try {
    const customers = await axios.get(base_url + "/customers");
    const products = await axios.get(base_url + "/products");
    const promotion = await axios.get(base_url + "/Promotion");
    res.render("order/create_O", {
      customers: customers.data,
      products: products.data,
	  promotion:promotion.data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/order/create_O", async (req, res) => {
  try {
    const data = {
      CustomerID: Number(req.body.CustomerID),
      ProductID: Number(req.body.ProductID),
      TotalAmount: Number(req.body.Quantity),
      PromotionID: Number(req.body.PromotionID),
    };

    await axios.post(base_url + "/orders", data);
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Create Order");
  }
});
//////////////////////////////////Orderdetail

app.get("/create_OD", (req, res) => {
  res.render("create_OD");
});

app.get("/create_OD", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/products");
    res.render("create_OD", { products: products }); // ส่งข้อมูลผลิตภัณฑ์ไปยังเทมเพลต
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/create_OD", async (req, res) => {
  try {
    const data = {
      OrderID: req.body.OrderID,
      ProductID: req.body.ProductID,
      Quantity: req.body.Quantity,
      Subtotal: req.body.Subtotal,
    };
    await axios.post(base_url + "/orderDetails", data);
    res.redirect("/orderDetails");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

//////////////////////////////////Customer

app.get("/customer/create_C", (req, res) => {
  res.render("customer/create_C");
});

app.post("/create_C", async (req, res) => {
  try {
    const data = {
      CustomerName: req.body.customerName,
      Email: req.body.Email,
      Phone: req.body.Phone,
    };
    await axios.post(base_url + "/customers", data);
    res.redirect("/customers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error 500");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Update
//////////////////////////////////Product
app.get("/update_P/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/products/" + req.params.id);
    res.render("product/update_P", { product: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/update_P/:id", async (req, res) => {
  try {
    const data = {
      ProductName: req.body.ProductName,
      Description: req.body.Description,
      Price: req.body.Price,
      StockQuantity: req.body.StockQuantity,
    };
    await axios.put(base_url + "/products/" + req.params.id, data);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});
//////////////////////////////////Order
app.get("/update_O/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/orders/" + req.params.id);
    const customers = await axios.get(base_url + "/customers");
    const products = await axios.get(base_url + "/products");
    const promotion = await axios.get(base_url + "/Promotion");

    console.log(response.data);
    console.log(customers.data);
    res.render("order/update_O", {
      order: response.data,
      customers: customers.data,
      products: products.data,
      promotion: promotion.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/order_detail/:id", async (req, res) => {
    try {
		const response = await axios.get(base_url + "/orders/" + req.params.id);
		console.log(response.data);
        res.render("order/order_detail", { response: response.data });
    } catch (error) {
        res.status(500).send("Error");
    }
})

app.post("/update_O/:id", async (req, res) => {
  try {
    const data = {
      CustomerID: req.body.CustomerID,
      ProductID: req.body.ProductID,
      TotalAmount: req.body.TotalAmount,
      PromotionID: req.body.PromotionID,
    };
    await axios.put(base_url + "/orders/" + req.params.id, data);
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});
//////////////////////////////////orderDetail
app.get("/update_OD/:id", async (req, res) => {
  try {
    const response = await axios.get(
      base_url + "/orderDetails/" + req.params.id,
    );
    res.render("update_OD", { orderDetail: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/update_OD/:id", async (req, res) => {
  try {
    const data = {
      OrderID: req.body.OrderID,
      ProductID: req.body.ProductID,
      Quantity: req.body.Quantity,
      Subtotal: req.body.Subtotal,
    };
    await axios.put(base_url + "/orderDetails/" + req.params.id, data);
    res.redirect("/orderDetails");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});
//////////////////////////////////Customer
app.get("/customer/update_C/:id", async (req, res) => {
  try {
    console.log(req);
    const response = await axios.get(base_url + "/customers/" + req.params.id);
    res.render("customer/update_C", { customer: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.post("/update_C/:id", async (req, res) => {
  try {
    const data = {
      CustomerName: req.body.customerName,
      Email: req.body.Email,
      Phone: req.body.Phone,
    };
    await axios.put(base_url + "/customers/" + req.params.id, data);
    res.redirect("/customers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Delete
//////////////////////////////////Product
app.get("/deleteP/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/products/" + req.params.id);
    res.redirect("/products");
  } catch (err) {
    res.status(200).send(err.message);
    console.log(err.message);
  }
});
//////////////////////////////////Order
app.get("/deleteO/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/orders/" + req.params.id);
    res.redirect("/orders");
  } catch (err) {
    res.status(200).send(err.message);
    console.log(err.message);
  }
});
//////////////////////////////////orderDetail
app.get("/deleteOD/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/orderDetails/" + req.params.id);
    res.redirect("/orderDetails");
  } catch (err) {
    res.status(200).send(err.message);
    console.log(err.message);
  }
});
//////////////////////////////////customer
app.get("/customer/deleteC/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/customers/" + req.params.id);
    res.redirect("/customers");
  } catch (err) {
    res.status(200).send(err.message);
    console.log(err.message);
  }
});

app.get("/promotion",async(req,res)=>{
	try{
		const response =  await axios.get(base_url + "/Promotion" );
		// res.redirect("/orders");

		res.render("promotion/list", {data:response.data});
	}catch(err){
		res.send(err)
	}
})
app.get("/promotion/create",async(req,res)=>{
	try{
		

		res.render("promotion/create",);
	}catch(err){
		res.send(err)
	}
})

app.get("/promotion/update/:id", async (req,res)=>{
	try{
		// console.log(23432);

		const data = await axios.get(`${base_url}/Promotion/${req.params.id}`);
		res.render("promotion/update",{data : data.data});
	}catch(err){
		res.send(err)
	}
})

app.post("/promotion/create",async(req,res)=>{
	try{
		
		const  data = {  
			PromotionCode: req.body.PromotionCode,
			Discount: req.body.Discount,
	  };
	  await axios.post(base_url+"/Promotion", data )
	 res.redirect("/promotion",);
	}catch(err){
		res.send(err)
	}
})

app.post("/promotion/update",async(req,res)=>{
	try{
		const  data = {
			PromotionID: req.body.PromotionID,
			PromotionCode: req.body.PromotionCode,
			Discount: req.body.Discount,
	  	};
	  await axios.put(base_url+"/Promotion/"+req.body.PromotionID, data )
	 res.redirect("/promotion");
	}catch(err){
		res.send(err)
	}
})

app.get("/promotion/delete/:id", async (req, res) => {
	try {
		// console.log(req.params.id);
	  await axios.delete(base_url + "/Promotion/" + req.params.id);
	  res.redirect("/promotion");
	} catch (err) {
	  res.status(200).send(err.message);
	//   console.log(err.message);
	}
  });
app.listen(5500, () => console.log("http://localhost:5500"));
