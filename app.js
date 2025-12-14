const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const rootDir = require('./utill/path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* 🔥 IMPORTANT FOR DEPLOY */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Contact App running on port ${PORT}`);
});
