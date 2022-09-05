module.exports = {
  getInventory: async (req, res) => {
    res.render('inventory', {
      user: req.user,
      title: `${req.user.userName}'s Inventory`,
    });
  },
};
