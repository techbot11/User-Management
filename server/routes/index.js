var express = require('express');
var router = express.Router();
var connection = require('../db/config')
var jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');

      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, secreteKey);

      next();
    }
    else
      return res.status(401).json({
        message: "Unauthorized "
      });
  }
  catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Unauthorized "
    });
  }
}
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send([{ name: 'hello' }]);
});

router.get('/users', verifyToken, (req, res, next) => {
  jwt.verify(req.token, secreteKey)
  const sql = `select * from tbluser`
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
});

router.get('/counts', verifyToken, (req, res, next) => {
  jwt.verify(req.token, secreteKey)
  const sql = `SELECT 
  (SELECT count(*) as totaluser FROM tbluser) as Totaluser,
  (SELECT count(*) as totaluser FROM tbluser where status=0) as Activeuser,
  (SELECT count(*) as totaluser FROM tbluser where status=1) as Inactiveuser`
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows[0]
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
});

router.get('/getuser', verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey)
  const sql = `select * from tbluser where userId = ` + req.query.id
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
})

router.get('/search', verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey)
  const sql = `select * from tbluser where fullname like '%`
    + req.query.search + `%' or  address like '%`
    + req.query.search + `%' or  email like '%`
    + req.query.search + `%' or  phoneno like '%`
    + req.query.search + `%' or  gender like '%`
    + req.query.search + `%'`
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
})

router.post('/adduser', verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey)
  let { fullname, address, email, password, phoneno, gender, usertype } = req.body
  const sql = "INSERT INTO `tbluser` (`fullname`, `address`, `email`, `password`, `phoneno`, `gender`,`usertype`) VALUES ('" + fullname + "', '" + address + "', '" + email + "', '" + password + "', '" + phoneno + "', '" + gender + "', '" + usertype + "');"
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
})

router.put('/updateuser', verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey)
  let { userId, fullname, address, email, password, phoneno, gender, status, createdon, Modifiedon } = req.body
  const sql = "update `tbluser` set `fullname`='" + fullname + "', `address`='" + address + "', `email`='" + email + "', `password`='" + password + "', `phoneno`='" + phoneno + "', `gender`='" + gender + "', `status`='" + status + "', `createdon`='" + createdon + "', `Modifiedon`='" + Modifiedon + "' where `userId`='" + userId + "'"
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
})

router.delete('/deleteuser', verifyToken, (req, res) => {
  jwt.verify(req.token, secreteKey)
  let { userId } = JSON.parse(req.headers.data)
  if (userId == undefined)
    return res.status(500).json({
      message: 'fields are missing'
    })
  const sql = "delete from `tbluser` where `userId` = " + userId
  connection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send({
        status: true,
        data: rows
      })
    }
    else
      res.send({
        status: false,
        err: err
      })
  })
})

router.post('/login', (req, res, next) => {
  var mail = req.body.email;
  var pass = req.body.password;
  //var dec_pass =atob(pass);
  //var encrypted_pass = cryptr.encrypt(dec_pass);
  console.log(pass);
  console.log(mail)
  //console.log(encrypted_pass);
  var sql = "SELECT * from  tbluser WHERE email='" + mail + "' and password = '" + pass + "'";
  connection.query(sql, (err, rows, fields) => {
    console.log(rows)
    if (!err && rows.length) {
      let data = {
        "password": rows.password,
        "email": rows.email
      }

      var now = Math.floor(Date.now() / 1000),
        iat = (now - 10),
        expiresIn = 36000,
        expr = (now + expiresIn),
        notBefore = (now - 10),
        jwtId = Math.random().toString(36).substring(7);
      var payload = {
        iat: iat,
        jwtid: jwtId,
        audience: 'TEST',
        data: data
      };


      jwt.sign(payload, secreteKey, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {

        if (err) {
          console.log('Error occurred while generating token');
          console.log(err);
          return false;
        }
        else {
          if (token != false) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header();
            res.send({
              status: true,
              "token": token,
              "data": rows

            });
          }
          else {
            res.statusMessage = 'User No Found'
            res.status(404)
            res.send("Could not create token");
            res.end();
          }

        }
      });
    }
    else if (rows == "") {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header();
      res.send({
        status: false,
        "token": null,
        message: 'no user found'

      });
    }
  })
})

module.exports = router;
