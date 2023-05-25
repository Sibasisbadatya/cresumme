const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    resumename: {
        type: String,
        required: true
    },
    personal:
        [
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                contact: {
                    type: Number,
                    required: true,
                },
                adress: {
                    type: String,
                    required: true,
                },
                github: {
                    type: String,
                    required: true,
                },
                linkedin: {
                    type: String,
                    required: true,
                },
                aboutyourself: {
                    type: String,
                    required: true,
                },
            }
        ]
    ,
    edu: [
        {
            id: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            eduname: {
                type: String,
                required: true,
            },
            eduadress: {
                type: String,
                required: true,
            },
            grade: {
                type: String,
                required: true,
            },
        }
    ],
    skills: [{
        id: {
            type: String,
            required: true,
        },
        skill: {
            type: String,
            required: true,
        },
    }],
    project: [
        {
            id: {
                type: String,
                required: true
            },
            pname: {
                type: String,
                required: true
            },
            pdescr: {
                type: String,
                required: true
            },
            pgithublink: {
                type: String,
                required: true
            },
            phostlink: {
                type: String,
                required: true
            },
        }
    ]
});



module.exports = mongoose.model('project', userSchema);