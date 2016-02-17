/**
 * Created by daiyongyi on 2016/2/6.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
var testSchema = mongoose.Schema;
var testUsers = new testSchema({
    name: String,
    password: String,
    email: String
});
exports.logAndReg = mongoose.model('logAndReg',testUsers);