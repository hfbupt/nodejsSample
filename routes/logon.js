var express = require('express');
var router = express.Router();
//var user = require('../database/db').user;
//
var mongodb = require("mongodb") ;
 var server = new mongodb.Server("localhost",27017,{
     auto_reconnect : true
 }) ;
 var conn = new mongodb.Db("testdb",server,{
     safe : true
 }) ;
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('logon', { title: 'Express登陆实例'});
});
router.post('/', function(req, res) {
  
  userName = req.body.txtUserName,
  userPwd = req.body.txtUserPwd;
  /*if(userName=="hfbupt"&&userPwd=="123456"){
  res.render('menuPage', { title: '登陆成功' });
}
else{
res.render('errorPage',{title:'登陆失败',msg:'请检查输入用户名或者密码'});

}*/
 conn.open(function(error,db){
     if(error) throw error ;
     db.collection("user",{
         safe : true
     },function(err,collection){
         if(err) throw err ;
         /*collection.find().toArray(function(e,docs){
             if(e) throw e ;
             console.log(docs) ;
         }) ;*/

        collection.findOne({id:userName,pwd:userPwd},function(err, doc) {
        if (doc){
           res.render('menuPage', { title: '登陆成功',id:userName});
        } else {
           res.render('errorPage',{title:'登陆失败',msg:'请检查输入用户名或者密码'});
        }
    });
     }) ;
 }) ;

});
module.exports = router;
