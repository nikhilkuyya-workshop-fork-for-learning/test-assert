var test = require('tape');
var http = require('http');
var concat = require('concat-stream');

var elevenizer = require('../index.js');
var server = null;

test('this test has a name',function(t){
  t.plan(4);
  t.equal(1+1,2,'ok custom');
  t.equal(1+2,3);
  t.equal(2+2,4);
  setTimeout(function() {t.equal(3,3);},100)
})

test('setup',function(t){
    server = http.createServer(function(req,res){
        var n = req.url.slice(1);
        elevenizer(n,function(err,result){
            if(err) {
                result.statusCode = 500;
                res.end(err);
            }else{
                res.end(String(result));
            }
        })
    })
    
    server.listen(0,function(){
        t.end();
    })
})

test('single digits',function(t){
    t.plan(6)
    function testDigit(n,expected){
      var req = http.request({
        host: 'localhost',
        port : server.address().port,
        path : '/' + n
    },function(res){
        t.equal(res.statusCode,200);
       res.pipe(concat(function(body){
            t.equal(Number(body.toString()),expected)
       }))
    })
     req.end();
    }
    
   testDigit(1,11);
   testDigit(0,0);
   testDigit(-1,-11);

})

test('teardown',function(t){
    server.close(function(){
        t.end();
    })
})
