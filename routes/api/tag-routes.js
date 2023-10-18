const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll()
  .then(tags => res.json(tags))
  .catch(err => console.log(err));
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  const tagId = clientReq.params.id;
  // find a single tag by its `id`
  Tag.findByPk(tagId)
  .then(tag => {
    serverRes.json(product || { message: 'Tag not found with that id.' });
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  const data = req.body;

  if (!data.tag_name) {
    return res.status(400).send({
      message: 'tag_name field must be complete.'
    })
  }

  for (let prop in data) {
    const val = data[prop];
    if (typeof val === 'string') data[prop] = val.trim();
  }

  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return res.json(product);
    });
    //Change tag name wherever it occurs in a product
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;

  Tag.destroy({
    where: {
      id: tagId
    }
  }).then(() => res.json({ message: 'Tag deleted successfully!' }));
  // Remove tag from all products containing it
});

module.exports = router;
