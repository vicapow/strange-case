#! /usr/bin/env node

var jade = require('jade')
  , mkdirp = require('mkdirp')
  , _ = require('underscore')
  , fs = require('fs')
  , getFiles = require('./getfiles.js')
  , path = require('path')
  , argv = require('optimist')
      .default('output', 'public')
      .default('pretty', true)
      .argv

getFiles('views', function(files){
  files = _.filter(files, function(file){
    return !file.match(/^views\/includes*/)
  })
  _.each(files, function(file){
    var fn = jade.compile(fs.readFileSync(file), {
      filename : file
      , pretty : argv.pretty
    })
    var out = file.replace(/^views/, '')
    out = path.join(argv.output , out)
    out = out.replace(/\.jade$/,'.html')
    mkdirp.sync(path.dirname(out))
    fs.writeFileSync(out, fn())
  })
})
