
module.exports = function(n,cb){
    setTimeout(function(){
           cb(null,n*11);
    },500)

}
