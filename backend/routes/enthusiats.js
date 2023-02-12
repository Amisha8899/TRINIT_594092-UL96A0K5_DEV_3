const router = require("express").Router();
const { Enthusiats, validate } = require("../models/users");
const Token = require("../models/token");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post('/',async(req,res)=>{
    try {
        const {error}=validate(req.body);
        if(error){
            return res.status(400).send({ message: error.details[0].message });
        }
        let user=await Enthusiats.findOne({email:req.body.email});
        if(user){
            return res.status(409).send({message:"User exists already"});
        }
        if(req.body.password=== req.body.Confirm_password){
            const salt= await bcrypt.genSalt(Number(process.env.SALT));
            const hashpassword= await bcrypt.hash(req.body.password, salt)
            const hashCpassword= await bcrypt.hash(req.body.Confirm_password,salt);

            user= await new Enthusiats({...req.body, password:hashpassword, Confirm_password:hashCpassword}).save();
            // const token = await new Token({
            //     userId: user._id,
            //     token: crypto.randomBytes(32).toString("hex"),
            // }).save();
            // const url = `${process.env.BASE_URL}EnthusiatsRoutes/${user.id}/verify/${token.token}`;
            // await sendEmail(user.email, "Verify Email", url);
    
            // res
            //     .status(201)
            //     .send({ message: "An Email sent to your account please verify" });
        }
        
        else{
            return res.status(400).send({message:'passwords are not matching'});
        }
            
    } catch (error) {
        res.status(500).send({message:'internal server error'});
        console.log(error);
    }
})

// router.get("/:id/verify/:token/", async (req, res) => {
// 	try {
// 		const user = await Enthusiats.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ message: "Invalid link" });

// 		await Enthusiats.updateOne({_id: user._id},{
//             $set:{
//                 isverified:true  
//             }
//         });
// 		await token.remove();

// 		res.status(200).send({ message: "Email verified successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

module.exports = router;