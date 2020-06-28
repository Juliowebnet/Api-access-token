const mongoose = require('mongoose');


mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
  .then(db => console.log('DB is connect'))
  .catch(err => console.log(err))