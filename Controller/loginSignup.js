const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require('../Model/userModel')

async function register(req, res) {
    try {
        const temp = req.body
        // validation 
       
        //bcrypt
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(temp.password, salt)
       
        //create user
        const user = await User.create({ firstName:temp.firstName, lastName: temp.lastName, email: temp.email, password: `${hashedPassword}` })
        
        res.status(200).send({msg:"user register Sucessfully" ,user:user})


    }

    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }

}

async function loginUser(req, res) {
    try {
        let data = req.body
        console.log(data)
        // validation
        // check for user in database 
        // const login = await User.findOne({ where: { username: username }, attributes: ["firstname", "lastname", "email", "password"] })
        const login = await User.findOne({email:data.email})
        if (!login) {
            return res.send({ msg: "user not found" })
        }
        
        // compare the password from request and database
        if (await bcrypt.compare(data.password, login.password) == false) {
            return res.send({ msg: "incorrect password" })

        }

        // create jwttoken

        const token = jwt.sign({ _id: login._id }, "secret", { expiresIn: "24h" })

        console.log(login, token)
        res.status(200).send({msg:"user Loggedin Sucessfully", user: login, token: token })
    }
    catch (e) {
        res.status(500).send("error occured", e)
    }

}

module.exports={register , loginUser}