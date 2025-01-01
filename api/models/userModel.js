import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required :true,
    },
    email:{
        type: String,
        required :true,
        unique : true,
    },
    password:{
        type: String,
        required :true
    },
    isVerified:{
        type: Boolean,
        default: false
    }
    
},{timestamps:true})

 // Hash the password before saving the user to the database
  userSchema.pre("save", async function (next) {
    // Check if the password field is modified
    if (!this.isModified("password")) {
        return next();
    }
    
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema)

export default User

