module.exports = {
  getIndex: (req, res) => {
    res.render('index', { title: 'Video Game Inventory Management' });
  },
};
