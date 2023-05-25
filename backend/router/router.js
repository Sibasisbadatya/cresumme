const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require("fs");
router.use(cors());
const dotenv = require("dotenv");
dotenv.config();
require("../DB/connection");
const User = require("../models/registration");
const Project = require("../models/project");
const { log } = require("console");
const ObjectID = require('mongodb').ObjectId;
// const authenticate = require("../middleware/authenticate");
// const Task = require("../models/todo");
// let userRegistered;

router.get("/", (req, res) => {

});


// adding datas one by one for all section

router.post("/register", async (req, res) => {
    const { name, email, contact } = req.body;
    console.log("yes");
    if (!name || !email || !contact) {
        return res.status(422).json({ message: "plz fill all details properly" });
    }
    if (password !== cpassword)
        return res.status(422).json({ message: "Password does not matching" });
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({
                message: "Email already exist"
            });
        }
        if (name && email && contact) {

            const user = new User({ name, email, contact });
            await user.save();
            return res.json({
                message: "user registered", status: 201,
            });
        }
        else {
            return res.status(500).json({ message: "Failed to register" });
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error occured" })
    }
})

router.post("/login", async (req, res) => {
    try {
        let token;
        const { email, regdno } = req.body;
        console.log(regdno);
        const userLogin = await User.findOne({ email: email });
        if (!userLogin) {
            return res.json({ message: "Invalid Credenials" })
        }
        console.log(userLogin.regdno);
        if (userLogin.regdno == regdno) {
            console.log("mwef");
            token = await userLogin.generateAuthToken();
            console.log("token returned", token);
            res.json({
                message: "sign in succesfully", status: 201,
            });
        }
        else {
            res.json({ message: "Invalid Credenials" })
        }

    } catch (err) {
        console.log(err);
    }
})

router.post("/saveresumename", async (req, res) => {
    try {
        const { resumename } = req.body;
        console.log("save resume activated");
        const resumeExist = await Project.findOne({ resumename });
        if (resumeExist) {
            return res.status(422).json({
                message: "Resume on this name already exist plz try another name"
            });
        }
        console.log(resumename);
        const psave = new Project({ resumename });
        await psave.save();
        if (psave) {
            res.json({ status: 201, userID: psave._id })
        }
        else
            res.json({ message: "Error Occured" })
    } catch (e) {
        console.log(e);
    }
})

// checking already exist resume id

router.post("/checkresumename", async (req, res) => {
    try {
        const { resumeid } = req.body;
        console.log("save resume activated");
        const resumeExist = await Project.findOne({ _id: resumeid });
        if (resumeExist) {
            console.log("kli");
            return res.json({
                status: 200
            });
        }
        if (!resumeExist) {
            return res.json({ status: "This Resume id not exist" })
        }
    } catch (e) {
        return res.json({ status: "This Resume id not exist" })
    }
})

// ****************************************************************************************************** 

// projects section
// getting projects data 

router.post("/showproject", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Project.findById({ _id: id });
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
})

// add education
router.post("/addedu", async (req, res) => {
    try {
        const { uid, id, degree, eduname, eduadress, grade } = req.body;
        console.log(uid);
        const push = await Project.updateOne(
            { _id: uid }, { $push: { edu: { id, degree, eduname, eduadress, grade } } }
        )
        if (push)
            res.json("added");
    } catch (e) {
        console.log(e);
    }
})

// update edu

router.patch("/updatedu", async (req, res) => {
    try {
        const { uid, id, degree,
            eduname,
            eduadress,
            grade } = req.body;
        // const  _id  = req.params.id;
        console.log(uid);
        const delproject = await Project.updateOne({ _id: uid }, {
            $set: {
                'edu.$[o]': {
                    id, degree,
                    eduname,
                    eduadress,
                    grade
                }
            }
        }, { arrayFilters: [{ 'o.id': id }] });
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})

// delete edu

router.put("/deletedu", async (req, res) => {
    try {

        const { uid, id } = req.body;
        console.log(uid);
        const delproject = await Project.findByIdAndUpdate({ _id: uid }, { $pull: { edu: { id: id } } });
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
});

// *****************************************************************************************************

// personal data section

router.post("/addpersonal", async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, contact, adress, github, linkedin, aboutyourself, uid } = req.body;
        console.log(name);
        const push = await Project.updateOne(
            { _id: uid }, { $push: { personal: { name, email, contact, adress, github, linkedin, aboutyourself } } }
        )
        if (push)
            res.json("added");
    } catch (e) {
        console.log(e);
    }
})

// delete personal

router.put("/deletepersonal/:id", async (req, res) => {
    try {

        // const  _id  = req.params.id;
        const { uid, id } = req.body;
        const delproject = await Project.findByIdAndUpdate({ _id: uid }, { $pull: { personal: { id: idi } } });
        console.log(delproject.resume);
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})

// **********************************************************************************************************

// skills data ssection
// getting skills data 

router.post("/showskills", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Project.findById({ _id: id });
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
})

// adding skills

router.post("/addskills", async (req, res) => {
    try {
        const { uid, id, skill } = req.body;
        console.log(uid, skill);
        const push = await Project.updateOne(
            { _id: uid }, { $push: { skills: { id, skill } } }
        )
    } catch (e) {
        console.log(e);
    }
})

// delete skills

router.put("/deleteskills", async (req, res) => {
    try {
        // const  _id  = req.params.id;
        const { uid, id } = req.body;
        console.log(uid, id);
        const delproject = await Project.findByIdAndUpdate({ _id: uid }, { $pull: { skills: { id: id } } });
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
});

// update skills

router.patch("/updateskills", async (req, res) => {
    try {
        const { uid, id, skill } = req.body;
        // const  _id  = req.params.id;
        console.log(uid);
        const delproject = await Project.updateOne({ _id: uid }, {
            $set: { 'skills.$[o]': { id, skill } }
        }, { arrayFilters: [{ 'o.id': id }] });
        // console.log(delproject.resume);
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})

// ******************************************************************************************************* 

// projects data section
// showing project data

router.post("/showproject", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Project.findById({ _id: id });
        res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
    }
})

// adding projects
router.post("/addprojects", async (req, res) => {
    try {
        const { pname, pdescr, pgithublink, phostlink, uid, id } = req.body;
        console.log(pname, pdescr, pgithublink, phostlink, uid, id);
        // const id = req.params.id;
        const push = await Project.updateOne(
            { _id: uid }, { $push: { project: { id, pname, pdescr, pgithublink, phostlink } } }
        )

    } catch (e) {
        console.log(e);
    }
})

// deleting projects
router.put("/deleteproject", async (req, res) => {
    try {
        const { uid, id } = req.body;
        console.log(uid, id);
        const delproject = await Project.findByIdAndUpdate({ _id: uid }, { $pull: { project: { id: id } } });
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})

// updating projects

router.patch("/updateproject", async (req, res) => {
    try {
        const { pname, pdescr, pgithublink, phostlink, id, uid } = req.body;
        // const  _id  = req.params.id;
        console.log(id);
        // let idi = req.body._id;
        const delproject = await Project.updateOne({ _id: uid }, {
            $set: { 'project.$[o]': { id, pname, pdescr, phostlink, pgithublink } }
        }, { arrayFilters: [{ 'o.id': id }] });
        // console.log(delproject.resume);
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})


// ********************************************************************************************************
router.patch("/updatepersonal/:id", async (req, res) => {
    try {
        const { pname, pdescr, pgithublink, phostlink } = req.body;
        // const  _id  = req.params.id;
        console.log(pname);
        let idi = req.body._id;
        const delproject = await Project.updateOne({ _id: req.params.id }, {
            $set: { 'personal.$[o]': req.body }
        }, { arrayFilters: [{ 'o._id': idi }] });
        // console.log(delproject.resume);
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})
router.patch("/updatedu", async (req, res) => {
    try {
        const { uid, id, degree,
            eduname,
            eduadress,
            grade } = req.body;
        // const  _id  = req.params.id;
        console.log(uid);
        const delproject = await Project.updateOne({ _id: uid }, {
            $set: {
                'edu.$[o]': {
                    id, degree,
                    eduname,
                    eduadress,
                    grade
                }
            }
        }, { arrayFilters: [{ 'o.id': id }] });
        res.status(201).json(delproject);
    } catch (err) {
        res.status(422).json(err);
        console.log(err);
    }
})

module.exports = router;