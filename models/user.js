const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    email : {
        type : String, 
        required : true, 
        unique : true
    },
    otp: {
        type: String,
        default: '0000'
    },
    userType : {
        type: String,
        require: true,
        default: 'USER'
    },
    password : {
        type: String,
        require: true
    },
    mobile_number: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    mobileNo_verify: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    emailId_verify: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    mobileNo_verified_at: {
        type: Date,
        default: null
    },
    emailId_verified_at: {
        type: Date,
        default: null
    },
    avatar: {
        type: String
    },
    permissions: [{
        Permission: {
            type: String,
            default: null
        },
        Status: {
            type: Boolean,
            default: false
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    wishlist : [{productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, quantity : Number}]

},{timestamps: true})


userSchema.methods.genAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "soyal");
    user.tokens = [{ token }]
    await user.save()
    return token;
};


// userSchema.methods.generateAuthToken = function () {
//     this.token = jwt.sign({ userID: this._id, email: this.email }, TOKEN_KEY, { expiresIn: '10h' })
// }

module.exports = mongoose.model('user',userSchema)