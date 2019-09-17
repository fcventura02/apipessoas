const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require ('mongoose-paginate');

const Person = new Schema({
    person_name:{
        type:String,
        required:true
    },
    person_cpf:{
        type:Number,
        required:true
    },

    createdAt:{
        type:Date,
        default: Date.now
    }

},{
    collection: 'person'
});

Person.plugin(paginate);
module.exports = mongoose.model('Person', Person);