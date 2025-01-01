import User from "../models/userModel.js";

// export const signUp = async (req, res) => {
//     const { username, email, password } = req.body;

//     const errors = [];

//     if (!username || username.length < 3) {
//         errors.push({ msg: "Username must be at least 3 characters long" });
//     }

//     if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
//         errors.push({ msg: "Please provide a valid email" });
//     }

//     if (!password || password.length < 6) {
//         errors.push({ msg: "Password must be at least 6 characters long" });
//     }

//     if (errors.length > 0) {
//         return res.status(400).json({ errors });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User with this email already exists" });
//         }

//         const newUser = new User({
//             username,
//             email,
//             password,  // Password will be hashed automatically due to the pre-save hook
//         });

//         await newUser.save();

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 username: newUser.username,
//                 email: newUser.email,
//                 isVerified: newUser.isVerified,
//             },
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Server error, please try again" });
//     }
// }

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
