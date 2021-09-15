const { response } = require('express');
const express = require('express')



const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate');

const router = express.Router();

require('../db/conn');
const {User,HomeBanner,DealOFTheDay,Mobiles,Electronics,Appliances,Men,Women} = require('../model/userSchema')

router.get('/', (req,res)=>{
    res.send(`hello world from the server router js`)
})

router.post('/homeBanner',  async (req,res)=>{
    try {
        const {title,path,img} = req.body;
        const banner = new HomeBanner({title,path,img});
        banner.save();
        res.status(200).json({
            message:'hello'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/homeBanner', async (req,res)=>{
    try {
        const data = await HomeBanner.find({title:'homeBanner'});
        res.send(data)
        // console.log(data);
    } catch (error) {
        // consol.log('error')
        console.log(error);
    }
})

router.post('/dealOfTheDay',  async (req,res)=>{
    try {
        const {title,path,img,name,qnt,prize} = req.body;
        const product = new DealOFTheDay({title,path,img,name,qnt,prize});
        product.save();
        res.status(200).json({
            message:'hello'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/dealOfTheDay', async (req,res)=>{
    try {
        const data = await DealOFTheDay.find({title:'dealOfTheDay'});
        res.send(data)
        // console.log(data);
    } catch (error) {
        consol.log('error')
    }
})

router.post('/mobiles', async (req,res)=>{
    try {

        const {title,path,img,name,qnt,prize} = req.body;
        const product = new Mobiles({title,path,img,name,qnt,prize}) 
        product.save();   
        res.status(200).json({
            message:'hello'
        })    
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/mobiles', async (req,res)=>{
    try {
        const data = await Mobiles.find({title:'mobiles'})
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})

router.post('/electronics', async (req,res)=>{
    try {

        const {title,path,img,name,qnt,prize} = req.body;
        const product = new Electronics({title,path,img,name,qnt,prize}) 
        product.save();   
        res.status(200).json({
            message:'hello'
        })    
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/electronics', async (req,res)=>{
    try {
        const data = await Electronics.find({title:'electronics'})
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})

router.post('/appliances', async (req,res)=>{
    try {

        const {title,path,img,name,qnt,prize} = req.body;
        const product = new Appliances({title,path,img,name,qnt,prize}) 
        product.save();   
        res.status(200).json({
            message:'hello'
        })    
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/appliances', async (req,res)=>{
    try {
        const data = await Appliances.find({title:'appliances'})
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})

router.post('/men', async (req,res)=>{
    try {

        const {title,path,img,name,qnt,prize} = req.body;
        const product = new Men({title,path,img,name,qnt,prize}) 
        product.save();   
        res.status(200).json({
            message:'hello'
        })    
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/men', async (req,res)=>{
    try {
        const data = await Men.find({title:'men'})
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})
router.post('/women', async (req,res)=>{
    try {

        const {title,path,img,name,qnt,prize} = req.body;
        const product = new Women({title,path,img,name,qnt,prize}) 
        product.save();   
        res.status(200).json({
            message:'hello'
        })    
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/women', async (req,res)=>{
    try {
        const data = await Women.find({title:'women'})
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})



///////////////// user //////////////// 

router.post('/register',async(req,res)=>{
    const { name,email,phone,password,cpassword } = req.body
    if( !name || !phone || !email || !password || !cpassword ){
        return res.status(422).json({error:'error'});
    }

    try {
        const userExits =  await  User.findOne({email:email});

        if(userExits){
            return res.status(422).json({error:'email already exist'})
        }

        const user = new User({ name,email,phone,password,cpassword});
        await user.save();

        res.status(201).json({ message: 'user registered' })

    } catch (error) {
        console.log(error);
    }
});


// login route

router.post('/signin', async (req,res)=>{
    console.log('in signin');
    try {
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error:'plz fill the data'
            })
        }

        const userLogin = await User.findOne({email:email});

        // console.log(userLogin);
        if(userLogin){
            console.log(User);
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            console.log(token);

            res.cookie("jwToken",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({
                    error:'invalid credentials'
                });
            }else{
                res.json({
                    message:'user sign in successfully'
                });
            }
        }else{
            res.status(400).json({
                error:'invalid credentials'
            });
        }

    } catch (error) {
        res.json({
            error:'error'
        });
    }
})

// get user data for contact us and home page

router.get('/about', authenticate , (req,res)=>{
    console.log(`hello my about`);
    res.send(req.rootUser);
})


router.get('/getdata', authenticate , (req,res)=>{
    console.log(`hello my about`);
    res.send(req.rootUser);
})

// contact us page

router.post('/addimg', authenticate ,  async (req,res)=>{
    try {
        const {img} = req.body;
        // console.log(img);
        const user = await User.findOne({_id:req.userID});
        if(user){
            const add = await user.addImg(img);
            await user.save();

            res.status(201).json({
                message:'img added'
            })

            console.log('img added');
        }

    
        
    } catch (error) {
        console.log(error);
    }
})

router.post('/addAddress', authenticate ,  async (req,res)=>{
    try {
        const {pincode,locality,address,city,state,landmark,aphone,addressType} = req.body;
        // console.log(img);
        const user = await User.findOne({_id:req.userID});
        if(user){
            const add = await user.addAddress(req.body);
            await user.save();

            res.status(200).json({
                message:'address added'
            })

            console.log('address added');
        }

    
        
    } catch (error) {
        console.log(error);
    }
})

router.post('/contact', authenticate , async (req,res)=>{

    try {
        const {name, email, phone, message} = req.body;
        if(!name || !email || !phone || !message){
            console.log('error in contact form');
            return res.json({
                error:'please fill the contact from'
            })
        }

        const userContact = await User.findOne({_id:req.userID});
        if(userContact){
            const userMessage = await userContact.addMessage(name,email,phone,message);

            await userContact.save();

            res.status(201).json({
                message:'user contact successfully'
            })
        }

    } catch (error) {
        console.log(error);
    }
})



////////// log out ///////////
router.get('/logout', (req,res)=>{
    console.log(`hello my logout page`);
    res.clearCookie('jwToken',{path:'/'})
    res.status(200).json({ message:'user logout'});
})


//////////////// payment /////


module.exports = router