const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});

class Director {
    constructor(name, lastName){
        this._name=name;
        this._lastName=lastName;
    }

    get name(){
        return this._name;
    }
    set name(v){
        this._name=v;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(v){
        this._lastName=v;
    }

}

schema.loadClass(Director);
module.exports = mongoose.model('Director', schema);
