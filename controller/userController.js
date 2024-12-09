const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //check on username length
    if (username.length < 4) {
      return res.status(400).send({
        code: 0,
        message: "Username length should be more than 3",
      });
    }

    //check existing username
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).send({ code: 0, message: "User already exist" });
    }
    //check existing email
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).send({ code: 0, message: "Email already exist" });
    }

    //check password length
    if (password.length < 5) {
      return res.status(400).send({
        code: 0,
        message: "Password length should be more than 5",
      });
    }
    //hash the password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).send({ code: 1, message: "Sign Up Success!!!" });
  } catch (error) {
    res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      res.status(404).send({ code: 0, message: "Invalid Credentials" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = {
          id: existingUser._id,
          name: existingUser.username,
          role: existingUser.role,
        };

        const token = jwt.sign({ authClaims }, process.env.SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send({
          code: 1,
          message: "Sign in Success!",
          id: existingUser.id,
          role: existingUser.role,
          token: token,
        });
      } else {
        res.status(400).send({ code: 0, message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    //const data = req.user;
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).send({
        code: 0,
        message: `User not found`,
      });
    }
    return res.status(200).send({
      code: 1,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};

const updateController = async (req, res) => {
  try {
    const id = req.params.id;
    const address = req.body.address;
    const user = await User.findById({_id:req.params.id});
    if (!user) {
      return res.status(404).send({
        code: 0,
        message: "No user Found!!!",
      });
    }
    if (address) {
      user.address = address;
    }
    await user.save();
    return res.status(200).send({
      code: 1,
      id: id,
      message: "user updated successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      code: 0,
      message: `Internal server error: ${error.message}`,
    });
  }
};
module.exports = { loginController, registerController, getUserController,updateController };
