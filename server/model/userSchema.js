const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now(),
    },
    img : {
        type : String,
        default : ''
    },
    messages : [
        {
            name : {
                type : String,
                required : true
            },
            email : {
                type : String,
                required : true
            },
            phone : {
                type : Number,
                required : true
            },
            message : {
                type : String,
                required : true
            }
        }
    ],
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    Address : {
        pincode : {
            type : String,
            default : null
        },
        locality : {
            type : String,
            default : null
        },
        address : {
            type : String,
            default : null
        },
        city : {
            type : String,
            default : null
        },
        state : {
            type : String,
            default : null
        },
        landmark : {
            type : String,
            default : null
        },
        aphone : {
            type : String,
            default : null
        },
        addressType:{
            type : String,
            default : null
        }
    }

})

const homeBanner = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true
    }
})


const dealOfTheDay = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    path:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required : true,
    },
    img:{
        type:String,
        required : true,
    },
    prize:{
        type:Number,
        required : true,
    },
    qnt:{
        type:Number,
        required : true,
    }
})

const mobiles = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    path:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required : true,
    },
    img:{
        type:String,
        required : true,
    },
    prize:{
        type:Number,
        required : true,
    },
    qnt:{
        type:Number,
        required : true,
    }
})

const electronics = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    path:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required : true,
    },
    img:{
        type:String,
        required : true,
    },
    prize:{
        type:Number,
        required : true,
    },
    qnt:{
        type:Number,
        required : true,
    }
})

const appliances = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    path:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required : true,
    },
    img:{
        type:String,
        required : true,
    },
    prize:{
        type:Number,
        required : true,
    },
    qnt:{
        type:Number,
        required : true,
    }
})

const men = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    path:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required : true,
    },
    img:{
        type:String,
        required : true,
    },
    prize:{
        type:Number,
        required : true,
    },
    qnt:{
        type:Number,
        required : true,
    }
})

const women = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    path:{
        type: String,
        required: true,
    },
    name:{
        type:String,
        required : true,
    },
    img:{
        type:String,
        required : true,
    },
    prize:{
        type:Number,
        required : true,
    },
    qnt:{
        type:Number,
        required : true,
    }
})



userSchema.pre('save', async function (next){
    console.log('i am insider');
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        console.log(token);
        return token;
    } catch (err) {
        console.log(err);
    }
}


userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        this.messages = this.messages.concat({
            name,email,phone,message
        })
        await this.save();
        return this.messages;
    } catch(err){
        console.log(err);
    }
}


userSchema.methods.addImg = async function(img){
    try{
        this.img = img;
        await this.save();
        return this.img;
    } catch(err){
        console.log(err);
    }
}

userSchema.methods.addAddress = async function(obj){
    try{
        this.Address = obj;
        await this.save();
        return this.Address;
    } catch(err){
        console.log(err);
    }
}




const User = mongoose.model('USER',userSchema);
const HomeBanner = mongoose.model('HOMEBANNER',homeBanner);
const DealOFTheDay = mongoose.model('DEALOFTHEDAY',dealOfTheDay);
const Mobiles = mongoose.model('MOBILES',mobiles);
const Electronics = mongoose.model('ELECTRONICS',electronics);
const Appliances = mongoose.model('APPLIANCES',appliances);
const Men = mongoose.model('MEN',men);
const Women = mongoose.model('WOMEN',women);
    
module.exports = {User,HomeBanner,DealOFTheDay,Mobiles,Electronics,Appliances,Men,Women};
