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
  getItem: async (req, res) => {
    console.log(req.params.id);
    try {
      const videoGame = await VideoGame.findById({ _id: req.params.id });
      res.render('item', {
        videoGame,
        title: videoGame.title,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addForm: (req, res) => {
    res.render('add', { title: 'Add Video Game' });
  },
  updateForm: async (req, res) => {
    try {
      const videoGame = await VideoGame.findById({ _id: req.params.id });
      res.render('edit', { title: 'Update Video Game', videoGame });
    } catch (err) {
      console.log(err);
    }
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
  updateItem: async (req, res) => {
    console.log(req.params.id);
    try {
      let videoGame = VideoGame.findById(req.params.id);
      videoGame = await VideoGame.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.redirect('/inventory');
    } catch (err) {
      console.log(err);
    }
  },
  updateStatus: async (req, res) => {
    console.log(req.body.id);
    try {
      await VideoGame.findOneAndUpdate(
        { _id: req.body.id },
        {
          status: req.body.status,
        }
      );
      console.log('Status Updated');
      res.json('Status Updated');
    } catch (err) {
      console.log(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      await VideoGame.findOneAndDelete({ _id: req.body.id });
      console.log('Item deleted');
      res.json('Item deleted');
    } catch (err) {
      console.log(err);
    }
  },
};
