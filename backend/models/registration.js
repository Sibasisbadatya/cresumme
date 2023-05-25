const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});



// userSchema.pre("save", async function (next) {
//     if (this.isModified('password')) {
//         this.password = bcrypt.hash(this.password, 12);
//         this.cpassword = bcrypt.hash(this.cpassword, 12);
//     }
//     next();
// })

userSchema.methods.generateAuthToken = async function () {
    try {
        console.log("token");
        const token = jwt.sign({
            _id: this._id
        }, "IICinductionTwoThousandTwentyThreeVssutBurla");
        console.log(token);
        this.tokens = this.tokens.concat({ token: token });
        console.log("token saved");
        await this.save();
        console.log("token");
        return token;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('user', userSchema);