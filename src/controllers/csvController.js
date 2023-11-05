const User = require("../models/User");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const ad = require("../extraFeatures/ageDistribution");


const upload = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    const users = [];
    const path = `${__dirname}/../../resources/data/${req.file.filename}`;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        for (const key of Object.keys(row)) {
          const trimmedKey = key.trim();
          if (key !== trimmedKey) {
            row[trimmedKey] = row[key];
            delete row[key];
          }
        }
        const fullName = `${row['name.firstName']}  ${row['name.lastName']}`;
        const jsonData = {
          name: fullName,
          age: parseInt(row.age),
          address: {
            line1: row['address.line1'],
            line2: row['address.line2'],
            city: row['address.city'],
            state: row['address.state'],
          },
          additional_info: {
            gender: row.gender,
          }
        };
        users.push(jsonData)
      })
      .on("end", () => {
        User.bulkCreate(users)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
            ad();
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into the database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
  
};

module.exports = {
  upload,
};
