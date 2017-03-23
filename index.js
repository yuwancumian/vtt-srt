#!/usr/bin/env node

var fs = require('mz/fs')
var exec = require('mz/child_process').exec

function isVtt(file){
  return file.split('.').pop() === 'vtt' 
}

fs.readdir('./')
  .then(data => data.filter(isVtt))
  .then(arr => arr.map( file => {
    fs.readFile(file, 'utf-8')
    .then(content => content)
    .then(content => {
      var filename = file.substr(0,file.length -3 ) + 'srt'
      fs.writeFile(filename, content)
    })
  }))
  .then(()=> exec('rm *.vtt'))
  .then(()=>console.log('Done'))
  .catch(err=>console.log(err))

