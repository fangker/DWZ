var urldb = require('../db/url_schema').urllist;

var NewUrl = function (re){
    this.user = re.user;
    this.url = re.url;
    this.content = re.content;
    }
module.exports = NewUrl;

NewUrl.prototype.create = function (callback) {
    var This=this;
    urldb.findAndModify({idsign:"X"}, [],{$inc:{'id':1}},{ new: true, upsert: true }, function (err, doc) {

        var c1 = {
            user:This.user,
            url :This.url,
            content:This.content,
            id:doc.value.id,
            shorturlcode:trans(doc.value.id)
        }
       callback(null,c1);
    });
    };
NewUrl.prototype.insert=function(c1,callback)
{
   var inc1=new urldb(c1);
    inc1.save(function(err,doc){
           var shorturlcode=doc.shorturlcode;
       return  callback(null,shorturlcode);
    });
}

var secrect = "q,0,w,e,a,6,s,d,x,1,z,9,c,2,r,f,v,t,7,g,b,y,h,3,n,u,8,4,j,m,i,5,k,l,o,p,q,0,w,e,a,6,s,d,x,1,z,9,c,2,r,f,v,t,7,g,b,y,h,3,n,u,8,4,j,m,i,5,k,l,o,p";
var sec = new Array();
sec = secrect.split(",");
function  trans(s) {
    var res = "";
    while (s >= 62) {
        res = sec[(s % 62)] + res;
        s = Math.round(s / 62);
    }
    if (s > 0) {
        res = sec[(s)] + res;
    }
    return (res);
}
