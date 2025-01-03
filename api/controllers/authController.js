import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({
        message: "All fields are required (username, email, password).",
      });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already taken." });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};


export const signIn = async (req, res)=>{

  const {email, password}= req.body

  try{

    const validUser = await User.findOne({email})

    if(!validUser){
      return res.status(401).json({message:"Invalid credentials!!!"})
    }

    const validPassword = await bcrypt.compare(password, validUser.password)

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials!!!" });
    }

   const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin},process.env.JWT_SECRET, { expiresIn: '1h' } )

   res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000  }).status(200).json(validUser);

  }catch (error){

    console.error("Error in login:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }

  
}
