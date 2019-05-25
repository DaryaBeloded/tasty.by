const mongoose = require ('mongoose'); 

mongoose.connect("mongodb://tasty:tasty1@ds261116.mlab.com:61116/heroku_phkvcc85" || "mongodb://localhost:27017/tasty", { useNewUrlParser: true });