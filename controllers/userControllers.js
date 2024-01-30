const User = require("../models/User");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ messagee: "Successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(200).json({ messagee: "user not found", data: {} });
      }
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json({ messagee: "Successful", data: userData });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
