const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    // be sure to include its associated Products
    include: Product
  });
  res.send(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const id = req.params.id;
  const category = await Category.findByPk(id, {
    // be sure to include its associated Products
    include: Product
  });
  
  if (category) {
    res.send(category);
  } else res.status(404).send('No category by that ID found.')
});

router.post('/', async (req, res) => {
  // create a new category
  const newCat = req.body;
  const category = await Category.create(newCat);

  res.send({ message: 'New category added!' })

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  const catUpdate = req.body;
  const category = await Category.findByPk(id);

  if (category) {
    category.category_name = catUpdate.category_name;
    await category.save();
    res.send({ message: 'Category updated!' })
  } else res.status(404).send('No category by that ID found.')
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  const category = await Category.destroy({ where: { id }})
  res.send({ message: 'Category deleted!'})
});

module.exports = router;
