const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    email:{type:String, required: true , unique:true},
    password:{type:String, required:true},
    pic:{
        type:String,
        required: false,
        default:
            "https://media.istockphoto.com/id/470100848/vector/male-profile-icon-white-on-the-blue-background.jpg?s=612x612&w=0&k=20&c=2Z3As7KdHqSKB6UDBpSIbMkwOgYQtbhSWrF1ZHX505E="

    },
},
{timestamps:true}
);
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next){
    if(!this.ismodified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
const User = mongoose.model("User", userSchema);
module.exports = User;