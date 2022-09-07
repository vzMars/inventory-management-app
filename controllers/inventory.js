const VideoGame = require('../models/VideoGame');

module.exports = {
  getInventory: async (req, res) => {
    try {
      const videoGames = await VideoGame.find({ userId: req.user._id });
      res.render('inventory', {
        user: req.user,
        title: `${req.user.userName}'s Inventory`,
        videoGames,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addForm: (req, res) => {
    res.render('add', { title: 'Add Video Game' });
  },
  getAvailable: async (req, res) => {
    try {
      const videoGames = await VideoGame.find({
        userId: req.user._id,
        status: 'available',
      });
      res.render('inventory', {
        user: req.user,
        title: `${req.user.userName}'s Available Inventory`,
        videoGames,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSold: async (req, res) => {
    try {
      const videoGames = await VideoGame.find({
        userId: req.user._id,
        status: 'sold',
      });
      res.render('inventory', {
        user: req.user,
        title: `${req.user.userName}'s Sold Inventory`,
        videoGames,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addItem: async (req, res) => {
    try {
      await VideoGame.create({
        title: req.body.title,
        description: req.body.description,
        price: +req.body.price,
        status: req.body.status,
        imgURL: req.body.imgURL,
        userId: req.user._id,
      });
      console.log('Video Game has been added!');
      res.redirect('/inventory');
    } catch (err) {
      res.render('/inventory/add', {
        errorMessage: 'Error creating Video Game',
      });
    }
  },
};
