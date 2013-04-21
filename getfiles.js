var fs = require('fs')
, _ = require('underscore')

// given a directory name, return all the files contained within it our any of 
// its child directories
function getFiles(dir, cb){
  getFilesRecursive([dir], cb)
  function getFilesRecursive(files, cb){
    var count = files.length
    var res = []
    _.each(files, function(filename){
      fs.stat(filename, function(err, stat){
        if(err) throw err
        if(stat.isFile()) return done([filename])
        else if(stat.isDirectory()) fs.readdir(filename, function(err, files){
          if(err) throw err
          files = _.map(files, function(file){
            return filename + '/' + file
          })
          getFilesRecursive(files, done)
        })
      })
    })
    function done(files){
      res = res.concat(files)
      if(!--count) cb(res)
    }
  }
}

module.exports = getFiles