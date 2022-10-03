const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const Role = require("../role/role.model");
const User = require("./user.model");

module.exports = {
  async singup(req, res, next) {
    try {
      const data = req.body;

      //brcypt recibe (password,Salto)
      const encPassword = await bcrypt.hash(data.password, 8);

      const role = await Role.findOne({ name: data.role });

      const newUser = {
        ...data,
        password: encPassword,
        role: role.name,
      };

      const user = await User.create(newUser);

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({ message: "User created", data: token });
    } catch (err) {
      next(err);
    }
  },

  async singin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("Not valid credentials");
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({ message: "Valid User", data: { email, token } });
    } catch (err) {
      res.status(400).json({ message: "Unvalid Data", data: err });
    }
  },

  async show(req, res) {
    try {
      const UserId = req.userId;

      const user = await User.findById(UserId);

      if (!user) {
        return res.status(401).send("Not user found");
      }

      const { password, _id, ...expUser } = { ...user };

      res.status(201).json({ message: "User found", data: expUser });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Probelem in server finding user", data: err });
    }
  },

  async list(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "users list", data: users });
    } catch (err) {
      res.status(400).json({ message: "no users list", data: err });
    }
  },
};
