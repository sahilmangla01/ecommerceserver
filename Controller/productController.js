const data = require('../Data')
const productSchema = require('../Model/productModel')
const User = require('../Model/userModel')
const Razorpay = require('razorpay')

async function addNewProduct(req,res){
        try{
           const productdata = await productSchema.create(data)
              res.send({user:  productdata})
        }
        catch(err){
            res.send('error occured' , err)
        }
    
    }

const product =async (req , res)=>{
        try{
                const data = await productSchema.find()
                   res.send(data)
             }
             catch(err){
                 res.send('error occured' , err)
             }
}
const singleProduct =async (req,res)=>{
        try{
                const data = await productSchema.find({id:req.params.id})
                   res.send(data)
             }
             catch(err){
                 res.send('error occured' , err)
             }
      
}

const categoryProduct = async(req,res)=>{
        try{
                const data = await productSchema.find({category:req.params.category})
                   res.send(data)
             }
             catch(err){
                 res.send('error occured' , err)
             }
  
}
const companyProduct = async(req,res)=>{
        try{
                const data = await productSchema.find({company:req.params.company})
                   res.send(data)
             }
             catch(err){
                 res.send('error occured' , err)
             }
  
}

const addToCart = async(req,res)=>{
    try{
        const {productId , userId , quantity ,stock, price} = req.body
        const user = await User.findById(userId)
        // const cartItemIndex = user.cart.findIndex((item) => item.productId.equals(product))
        //         user.cart.push({ productId: productId, quantity: 1 })
     
    //    const find=user.cart.find(item=>item.productId==productId)
       
       const find=await User.findOne({_id:userId,'cart.productId':productId})
            if(!find){
                await User.findByIdAndUpdate(userId,{
                    $push: { cart: { productId:productId ,quantity:quantity, stock:stock , price:price } }
                }, { new: true })
                return  res.status(200).send({msg: "product Added to cart"})
       
            }
            else{
               
        const obj= find.cart.find(item=>item.productId.toString()===productId)
        obj.quantity+=1
        await find.save()
                return res.status(200).send({msg:"product already exist in cart"})
                
            }

            


    }
    catch(err){
        res.send("error occured", err)
    }
}

 const displayCart =async(req,res)=>{

    try {
        const userId=req.body.userId

      const populatedCart=  await User.findById(userId)
        .populate('cart.productId') // Populate the 'productId' field in the 'cart' array
        
                res.send({msg:"this is cart" ,user:populatedCart})
              
           
        
    } catch (e) {
        res.status(500).send({ msg: e })  
    }

}

const closeProduct=async(req,res)=>{
    try{
        const { userId ,productId } = req.body
        const find=await User.findOne({_id:userId,'cart.productId':productId})
    
    
        if(!find){
         console.log("error")
        }
        else{
        const user=await User.updateOne({_id:userId},{
             $pull: { cart: { productId:productId }}
         })
         return  res.status(200).send({msg: "product removed",user:user})
 
        }
     
 
    }
    catch(err){
        res.send("error occured", err)
    }
}

const setIncrease=async(req,res)=>{
    try{
        const { userId ,productId } = req.body
        
        const find=await User.findOne({_id:userId,'cart.productId':productId})
        const obj= find.cart.find(item=>item.productId.toString()===productId)
        
       
        if(obj.quantity<obj.stock){
            obj.quantity+=1
        } 
        await find.save()
                return res.status(200).send({msg:"product already exist in cart"})
    }
    catch(err){
        res.send("error occured", err)
    }
}
const setDecrease=async(req,res)=>{
    try{
        const { userId ,productId } = req.body
        console.log(productId);
        console.log(userId);
        const find=await User.findOne({_id:userId,'cart.productId':productId})
        const obj= find.cart.find(item=>item.productId.toString()===productId)
        if(obj.quantity>1){
            obj.quantity-=1;
        }
        await find.save()
                return res.status(200).send({msg:"product already exist in cart"})
    }
    catch(err){
        res.send("error occured", err)
    }
}



const razorpay = new Razorpay({
    key_id: 'rzp_test_5PB9AGsx0x9agg',
    key_secret: '2I4UfNjZlVQfJHTcThve0TZN',
})

const newOrder=async (req,res)=>{
    


        const amount=req.body.amount
    
        const options = {
            amount:amount,
            currency: 'INR',
            receipt: 'manglasahil9050@gmail.com',
          
        }
    
        try {
            const response = await razorpay.orders.create(options);
            res.send({
                success:true,
                msg:'Order Created',
                order_id:response.id,
                amount:options.amount,
                key_id:'rzp_test_5PB9AGsx0x9agg'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }



const placeOrder=async (req,res)=>{
    try{
        const userId=req.body.userId;  
       const user= await User.findById(userId)
         console.log(user.cart);
       user.orderedProducts.push(...user.cart)
       user.cart=[]
       await user.save()
     
        res.send({user:user})

       }
    catch(err){
        res.send('error occured' , err)
    }

}


module.exports = {product ,singleProduct , categoryProduct, addNewProduct , companyProduct,addToCart , displayCart, closeProduct ,setIncrease,setDecrease , newOrder,  placeOrder}