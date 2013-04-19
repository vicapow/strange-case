var jade = require('jade')
var fs = require('fs')
var fn = jade.compile(fs.readFileSync('views/index.jade'))
fs.writeFileSync('index.html', fn())
