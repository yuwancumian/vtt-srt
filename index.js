#!/usr/bin/env node

var os = require('os')
var fs = require('mz/fs')
var exec = require('mz/child_process').exec


exec('sed -i ".bak" "1d" *.vtt')
console.log('start')
fs.readdir('./').then(function(data){
  var len = data.length
  var arr = []
  for (var i = 0; i< len; i++){
    var filename = data[i].split('.').pop()
    if (filename === 'vtt'){
      arr.push(data[i]) 
    }
  }
  return(arr)
}).then(function(vttArray){
  console.log(vttArray)
  var len = vttArray.length
  for (let j = 0; j< len; j++){
    (function(){
      var filename = vttArray[j].split('.')[0] + '.srt'
      console.log('filename:' + filename)
      fs.readFile(vttArray[j]).then(function(data){
        return data
      }).then(function(fileContent){

        console.log('filecontent' +fileContent)
        fs.writeFile(filename, fileContent).then(function(){

        }) 
      }).then(function(){
        if (j == len-1){
          exec('rm *.vtt')
          exec('rm *.bak')
          console.log('Done!')
        }
      })
    })()
  }
})
