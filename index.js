#! /usr/bin/env node

var jade = require('jade')
  , mkdirp = require('mkdirp')
  , _ = require('underscore')
  , fs = require('fs')
  , getFiles = require('./getfiles.js')
  , path = require('path')
  , optimist = require('optimist')
      .default('output', 'public')
      .argv

getFiles('views', function(files){
  files = _.filter(files, function(file){
    return !file.match(/^views\/includes*/)
  })
  _.each(files, function(file){
    var fn = jade.compile(fs.readFileSync(file), {
      filename : file
      , pretty : true
    })
    var out = file.replace(/^views/, '')
    out = path.join(optimist.output , out)
    out = out.replace(/\.jade$/,'.html')
    mkdirp.sync(path.dirname(out))
    fs.writeFileSync(out, fn())
  })
})
