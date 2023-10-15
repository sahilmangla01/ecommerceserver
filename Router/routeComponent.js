const route = require('express').Router();
const { register, loginUser } = require('../Controller/loginSignup');
const {product, singleProduct,categoryProduct,addNewProduct, companyProduct , addToCart , displayCart,closeProduct,setIncrease, setDecrease} = require('../Controller/productController')

route.get('/api/products' , product)
route.get('/api/products/:id' , singleProduct)
route.get('/api/category/:category' , categoryProduct)
route.get('/api/company/:company' , companyProduct)


route.get('/api/createproduct' , addNewProduct)

route.post('/api/register', register)
route.post('/api/login', loginUser)
route.post('/api/cart', addToCart)
route.post('/api/displayCart' , displayCart)
route.post('/api/closeProduct' , closeProduct)
route.post('/api/setIncrease' , setIncrease)   
route.post('/api/setDecrease' , setDecrease)   


module.exports = route