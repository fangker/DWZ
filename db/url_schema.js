// 链接 firstblood 集合
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/test');
// 链接错误
db.on('error', function (error) {
    console.log(error);
});
// Schema 结构
var Schema = mongoose.Schema;
var urlSchema = new Schema({
    user: { type : String },
    url: { type: String },
   content:{type:String},
    id:{type:Number},
    shorturlcode:{type:String}
},{versionKey:false
});
urlSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};
// 关联 urllist -> url 表
exports.urllist = db.model('url', urlSchema,'url');

exports.db = db;