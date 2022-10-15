const express = require("express");
const app = express(); 
const cors = require("cors"); 
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// Routes

// add a new applicant
app.post("/applicants", async(req,res) => {
    try {
        const{firstname} = req.body;
        const newApp = await pool.query("INSERT INTO applicants (firstname) VALUES($1) RETURNING *",
        [firstname]);
        res.json(newApp.rows[0]); 

    } catch (error) {
        console.error(error.message); 
    }
})

// get all applicants
app.get("/applicants", async(req,res) => {
    try {
        const allApps = await pool.query("SELECT * FROM applicants")
        res.json(allApps.rows);
    } catch (error) {
        console.error(error.message)
    }
})

// update approval status of applicant
app.put("/applicants/:id", async(req,res) => {

    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateApp = await pool.query(
   //         "UPDATE applicants SET isapproved CASE WHEN isapproved = FALSE "
        )
    } catch (error) {
        console.error(error.message);
    }
})

// add a new corporation
app.post("/corporations", async(req, res)=> {
    try {
        const {name, amount_deposited} = req.body;
         const newCorp = await pool.query(
            "INSERT into corporations (name, amount_deposited) VALUES($1, $2) RETURNING *",
            [name, amount_deposited]
         );
         res.json(newCorp.rows[0]); 
    } catch (error) {
        console.error(error.message);
    }
})

// show all corporations
app.get("/corporations/:id", async(req,res) => {
    try {
        const allCorps = await pool.query("SELECT * FROM corporations")
        res.json(allCorps.rows);
    } catch (error) {
        console.error(error.message)
    }
})

// update corporation's total deposit
app.put("/corporations", async(req,res) => {
    try {
        const { id } = req.params;
        const {new_deposit} = req.body;

        const curSum = await pool.query("SELECT amount_deposited FROM corporations "+
        "WHERE id = $1", [id]); 

        const newSum = curSum + new_deposit;

        const updateCorp = await pool.query(
            "UPDATE corporations SET amount_deposited = $1 WHERE id = $2",
            [newSum, id]
        );

        res.json(updateCorp);

    } catch (error) {
        console.error(error.message)
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000"); 
});