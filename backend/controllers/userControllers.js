const User = require('../models/users')
const jwt = require('jsonwebtoken')


const updateUser = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      console.log({user, token})
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports = { updateUser }