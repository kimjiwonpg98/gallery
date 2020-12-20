const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Contact = require('../models/Contact');

//Contacts
// 모델.find(검색조건, 콜백함수) -> 검색조건에는 오브젝트 형태, {} 빈오브젝트면 모든 데이터 리턴
//find 결과는 배열로 나온다.파라미터 이름을 배열이기 때문에 복수형으로 써줌
router.get('/', (req, res) => {
    Contact.find({}, (err, contacts) => {
      if(err) return res.json(err);
      res.render('contacts/index', {contacts: contacts});
    });
  });
//Contacts -New
router.get('/new', (req, res) => res.render('contacts/new'));
//Contacts - create
router.post('/', (req, res) => {
    Contact.create(req.body, (err, contact) => {
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});
//Contacts-show
// :id라는 것은 해당 위치 값을 받아 res.params에 넣게 됌 contacts/abc가 입력되면 abc가 id에 들어감
router.get('/:id', (req, res) => {
    Contact.findOne({_id:req.params.id}, (err, contact) => {
        if(err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});
// findOne은 찾을 조건 오브젝트로 입력하고 데이터 찾은후에 콜백함수로 호출 find와 다르게 조건에 맞는 결과 하나를 object로 전달
// Contacts - edit //
router.get('/:id/edit', (req, res) => {
    Contact.findOne({_id:req.params.id}, (err, contact) => {
        if(err) return res.json(err);
        res.render('contacts/edit', {contact:contact});
    });
});
// Contacts - update // 5
router.put('/:id', function(req, res){
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
        if(err) return res.json(err);
        res.redirect('/contacts/'+req.params.id);
    });
});
// Contacts - destroy // 6
router.delete('/:id', function(req, res){
    Contact.deleteOne({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});

module.exports = router;