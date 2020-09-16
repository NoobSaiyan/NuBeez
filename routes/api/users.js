const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")

//getting the user model schema
const User = require("../../models/User")

//@route   POST api/users
//@desc    Test route
//@access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    //destructing the request body
    const { name, email, password } = req.body

    try {
      //checking if user already exists
      let user = await User.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] })
      }

      //setting up gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      })

      //creating user instance using User model
      user = new User({
        name,
        email,
        avatar,
        password,
      })

      //encrypting password using bcrypt
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      //saving user to database
      await user.save()

      res.send("User registered")
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
    }
  }
)

module.exports = router