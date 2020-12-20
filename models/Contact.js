var express = require('express');
var mongoose =require('mongoose');



//DB schema
let contactSchema = mongoose.Schema ({
    name: {type: String, required: true, unique: true},
    email: {type: String},
    phone: {type: String}
});
// schema 모델 생성 첫번째 파라미터: mongoDB에서 사용되는 컬렉션 이름
// 두번째 파라미터: mongoose.Schema로 생성된 오브젝트
let Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;