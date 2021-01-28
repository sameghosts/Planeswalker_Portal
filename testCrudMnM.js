const db = require('./models');

db.card.findOrCreate({
  where {
    multiverseid: req.query.multiId
  },
  defaults: {
    name: `${result.data.}`
  }
})