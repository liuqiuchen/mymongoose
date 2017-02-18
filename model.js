const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

// 在Schema里添加自定义方法
userSchema.methods.capitalizeName = () => {
    //this.name = this.name.toUpperCase();
    return this.name;
};

let User = mongoose.model('User', userSchema);

module.exports = User;