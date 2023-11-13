const { User, Todo } = require("../models");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      // Mengambil semua data pengguna dari model User
      const users = await User.findAll();
      console.log(users);

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data pengguna",
        error: error.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id; // Mengambil ID pengguna dari parameter permintaan

      // Mengambil pengguna berdasarkan ID
      const user = await User.findByPk(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Pengguna tidak ditemukan",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data pengguna",
        error: error.message,
      });
    }
  },

  editUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body; // Assuming that the updated data is sent in the request body

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          message: "Pengguna tidak ditemukan",
        });
      }

      // Update user data
      await user.update(updatedUserData);

      // Fetch the updated user to send in the response
      const updatedUser = await User.findByPk(userId);

      res.status(200).json({
        message: "Pengguna berhasil diupdate",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengupdate pengguna",
        error: error.message,
      });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          message: "Pengguna tidak ditemukan",
        });
      }

      await user.destroy();

      res.status(200).json({
        message: "Pengguna berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus pengguna",
        error: error.message,
      });
    }
  },
};
