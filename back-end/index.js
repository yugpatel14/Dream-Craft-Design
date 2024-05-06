const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

//Database Connection with MongoDB
mongoose.connect("mongodb+srv://yugpatel:yugpatel%401456@cluster0.zy0mid0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB CONNECTION SUCCESSFUL"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

//API Creation

app.get("/", (req,res) => {
    res.send("Express App is Running")
})

//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res) => {
    res.json({
        success:1, 
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        require:true,
    },
    name: {
        type: String,
        require:true,
    },
    image: {
        type: String,
        require:true,
    },
    category: {
        type: String,
        require:true,
    },
    new_price: {
        type: Number,
        require:true,
    },
    old_price: {
        type: Number,
        require:true,
    },
    date: {
        type: Date,
        default:Date.now,
    },
    avilable: {
        type: Boolean,
        default:true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length>0) {
        let last_product_arry = products.slice(-1);
        let last_product = last_product_arry[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API For deleting Products

app.post('/removeproduct', async (req,res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name:req.body.name
    })
})

//Creating API for getting all products
app.get('/allproducts', async (req,res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// for category of products
app.get('/products/:category', async (req, res) => {
    let products = await Product.find({ category: req.params.category });
    console.log("Category products fetched");
    res.send(products);
});

//Shema Creating for User Model

const Users = mongoose.model('Users', {
    name: {
        type:String,
    },
    email: {
        type: String,
        unique:true,
    },
    password: {
        type: String,
    },
    cartData: {
        type:Object,
    },
    date: {
        type: Date,
        default:Date.now,
    }
})

//Creating Enpoint for Registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart = {};
    for (let i = 0; i <300; i++) {
        cart[i]=0;
        
    }
    const user = new Users({
        name: req.body.username,
        email:req.body.email,
        password: req.body.password,
        cartData:cart,
    })
    await user.save();

    const data = {
        user: {
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
})

//Creating endpoint for NEW COLLECTIONS data
app.get('/newcollections', async (req,res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NEW COLLECTIONS fetched");
    res.send(newcollection);
})

//Creating endpoint for Popular
app.get('/popular', async (req,res) => {
    let products = await Product.find({ category: "Lighting" });
    let popular = products.slice(0, 4);
    console.log("Popular in Decor Fetched");
    res.send(popular);
})
//Creating middelware to feath user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}

//creating endpoint for adding product in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
})

//creatting endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")
})

//creating endpoint to gett cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Runneing on Port"+port)
    }
    else {
        console.log("Error : "+error)
    }
})