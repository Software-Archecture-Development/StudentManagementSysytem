const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const {
  generateJWTWithPrivateKey,
  fetchStudents,
  fetchProfessors,
} = require("./util");
const { ROLES } = require("../../../consts");
const { access } = require("fs");

const router = express.Router();

dotenv.config();

// Student Login
router.post("/student", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    //Fetch the list of students
    const students = await fetchStudents();
    const student = students.find((s) => s.email === email);
    // // Verify the student exists
    // if (!student) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }
    // // Verify the password matches
    // const isMatch = await bcrypt.compare(password, student.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }
    //if not throw an correct error message
    //-----
    //if this dose not match throw an error

    const token = generateJWTWithPrivateKey({
      id: student._id,
      roles: [ROLES.STUDENT],
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Professor Login
router.post("/professor", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
// Professor Login
// router.post("/professor", async (req, res) => {
//   const { email, password } = req.body;
//
//   try {
//     // 1) Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     // 2) Fetch the list of professors from the database
//     const professors = await fetchProfessors();
//     const professor = professors.find((p) => p.email === email);

//     // 3) If professor does not exist, return authentication error
//     if (!professor) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 4) Compare provided password with stored hashed password
//     const isMatch = await bcrypt.compare(password, professor.password);

//     // 5) If passwords do not match, return authentication error
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 6) Generate JWT token with PROFESSOR role
//     const token = generateJWTWithPrivateKey({
//       id: professor._id,
//       roles: [ROLES.PROFESSOR]
//sub roles: [SUBROLES.PROFESSOR]
//.       COURSE_INSTRUCTOR: "COURSE_INSTRUCTOR"
//         LECTURER: "LECTURER",
//         EXAMINER: "EXAMINER",
//         GRADER: "GRADER",
//         MODERATOR: "MODERATOR",
//         RESEARCHER: "RESEARCHER,,

//     });

//     // 7) Send access token to client
//     return res.status(200).json({ access_token: token });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });
// //
