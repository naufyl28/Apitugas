const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

const route = express.Router();

route.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      return res.json({
        message: "Anda tidak dikenali",
      });
    }

    if (bcrypt.compareSync(data.password, user.password)) {
      const token = jwt.sign({ email: data.email }, "oljhcsaouhbgoq");
      return res.json({
        message: "anda berhasil login",
        token,
      });
    }

    return res.json({
      message: "password anda salah",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
});

route.post("/regis", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const existingUser = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return res.json({
        message: "Email already registered",
      });
    }

    const deletedUser = await User.findOne({
      where: {
        id: { [Op.ne]: null }, // Query for non-null IDs (assuming null means not deleted)
      },
      order: [["id", "DESC"]],
    });

    let newUserId;

    if (deletedUser) {
      // Increment the ID of the deleted user to get a new ID
      newUserId = deletedUser.id + 1;
    } else {
      // If no deleted user found, generate a new ID in another way
      // For example, you could query the current max ID in the users table
      // and increment it.
      // newUserId = await User.max('id') + 1;
      // Or use some other logic to generate a new ID.
    }

    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(data.password, saltRounds);

    await User.create({
      id: newUserId,
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashPassword,
    });

    return res.json({
      message: "berhasil regis",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = route;
