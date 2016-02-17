/**
 * Created by daiyongyi on 2016/2/6.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var users = require('../logAndReg/models').logAndReg;


/* GET home page. */

router.get('/reg',function(req,res){
    res.render('regOn',{
        title: 'regOn',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/reg',function(req,res){
    var name = req.body.inputName;
    var password = req.body.inputPwd1;
    var re_password = req.body.inputPwd2;
    var email = req.body.inputEmail;
    if(!name){
        console.log('用户名不能为空！');
        req.flash('error','用户名不能为空！');
        return res.redirect('/reg');
    }
    if(!password){
        console.log('密码不能为空！');
        req.flash('error','密码不能为空！');
        return res.redirect('/reg');
    }
    if(!email){
        console.log('邮箱不能为空！');
        req.flash('error','邮箱不能为空！');
        return res.redirect('/reg');
    }
    if(password != re_password){
        console.log('两次密码不相同');
        req.flash('error','两次密码不相同');
        return res.redirect('/reg');
    }
    users.findOne({name: name},function(err,doc){
        if(err){
            console.log(err.toString());
            req.flash('error',err.toString());
            return res.redirect('/reg');
        }
        if(doc){
            console.log('用户名已存在');
            req.flash('error','用户名已存在');
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
        var data = {
            name: name,
            password: password,
            email: email
        };

        users.create(data,function(err,doc){
            if(err){
                console.log(err.toString());
                req.flash('error',err.toString());
                return res.redirect('/reg');
            }
            console.log('注册成功~');
            req.session.user = doc.name;
            console.log(req.session.user + '--' + doc);
            req.flash('success','注册成功！');
            res.redirect('/log');
        })
    })
});


router.get('/log',function(req,res){
    res.render('login',{
        title:'Login',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/log',function(req,res){
    var name = req.body.inputName;
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.inputPwd).digest('hex');
    users.findOne({name: name},function(err,doc){
        if(err){
            console.log(err.toString());
            req.flash('error',err.toString());
            return res.redirect('/log');
        }
        if(!doc){
            console.log('用户名不存在');
            req.flash('error','用户名不存在');
            return res.redirect('/log');
        }
        if(password != doc.password){
            console.log('密码错误！');
            req.flash('error','密码错误');
            return res.redirect('/log');
        }
        req.session.user = doc.name;
        console.log(req.session.user);
        console.log('登录成功！');
        req.flash('success','登录成功!');
        res.redirect('/');
    })
});

module.exports = router;
