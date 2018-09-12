var assert = require('assert')
var fs = require('fs')

assert.equal(1+2,3)
countLines(function(err,val){
	assert.ifError(err);
	assert.equal(val,3);
})

function countLines(cb){
	fs.readFile('file.txt','utf8',function(err,src){
		if(err){ return cb(err);}
		else {return cb(null,src.trim().split('\n').length);}
	})
}
