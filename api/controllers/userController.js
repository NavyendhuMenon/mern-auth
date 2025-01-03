import User from "../models/userModel.js";

// import upload from "../config/multerConfig.js";

import { errorHandler } from "../utils/errorHandler.js";

// import path from 'path'

// const uploadProfilePicture = async (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     try {
//       // Generate the image URL
//       const imageUrl = `/uploads/${req.file.filename}`;

//       const updatedUser = await User.findByIdAndUpdate(
//         req.user.id,
//         { profilePicture: imageUrl },
//         { new: true }
//       );

//       res.json({
//         message: 'Profile picture uploaded successfully.',
//         imageUrl: updatedUser.profilePicture
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error uploading profile picture.');
//     }
//   };

//update user

export const updateUser = async (req, res, next) => {
  console.log(req.body);
  
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }

  // upload.single('profilePicture')(req, res, async (err) => {
  //   if (err) {
  //     return next(errorHandler(400, 'Error uploading file. ' + err.message));
  //   }

    try {
      const { username, email, password } = req.body;

      if (!username || !email) {
        return next(errorHandler(400, 'Username and email are required.'));
      }

      const updateData = {
        username: username.trim(),
        email: email.trim(),
      };

      // If profile picture was uploaded, add its path to the update data
      if (req.file) {
        updateData.profilePicture = req.file.path; // Multer stores the file path in req.file.path
      }

      if (password && password !== '') {
        updateData.password = bcryptjs.hashSync(password, 10); // Hash the password
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true } // Return the updated user document
      );

      // Remove password from the response
      const { password: userPassword, ...restUser } = updatedUser._doc;
      
      res.status(200).json(restUser);
    } catch (error) {
      next(error); 
    }
  // });
};


// delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
