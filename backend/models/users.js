const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi=require('joi');

const farmerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	Confirm_password: { type: String, required: true },
	verified: { type: Boolean, default: false },
});


farmerSchema.methods.generateauthToken=async function(){
    try {
        const token =jwt.sign({_id:this._id.toString()},process.env.JWTSECRETKEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        
        console.log('the error part'+error);
    }
}

const enthusiatsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	Confirm_password: { type: String, required: true },
	verified: { type: Boolean, default: false },
});

enthusiatsSchema.methods.generateauthToken=async function(){
    try {
        const token =jwt.sign({_id:this._id.toString()},process.env.JWTSECRETKEY2);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        
        console.log('the error part'+error);
    }
}

const validate=(data)=>{
    const schema = joi.object({
        name: joi.string()
           .min(3)
           .max(30)
           .required(),
        email: joi.string()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
           password: joi.string().required().label("Password"),
   
           Confirm_password: joi.string().required().label("Confirm_password"),
        })
    return schema.validate(data);
}


const Farmer= new mongoose.model('Farmer',farmerSchema);
const Enthusiats= new mongoose.model('enthusiats',enthusiatsSchema);
module.exports={Farmer,Enthusiats,validate};