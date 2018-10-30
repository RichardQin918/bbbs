const http = require('http')
const app = require('./app');

var port = process.env.PORT || 4001;




//run server
app.listen(port, () => {
    console.log('Running on ' + port);
});

