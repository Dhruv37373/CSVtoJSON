const User = require("../models/User");
const fs = require("fs");
const fastcsv = require("fast-csv");
const path = require("path");
const ad = require("../extraFeatures/ageDistribution");


const upload = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    const pathToFile = `${__dirname}/../../resources/data/${req.file.filename}`;

    const users = [];
    const headers = [];

    const processRow = (row) => {
      const rowData = {};

      for (let i = 0; i < headers.length; i++) {
        const columns = headers[i].split(".");
        let temp = rowData;
        for (let j = 0; j < columns.length - 1; j++) {
          const column = columns[j].trim();;
          temp[column] = temp[column] || {};
          temp = temp[column];
        }
        temp[columns[columns.length - 1].trim()] = row[i].trim();
      }

      return rowData;
    };

    const stream = fs.createReadStream(pathToFile);

    stream.pipe(fastcsv.parse({ headers: true }))
      .on("data", (row) => {
        if (headers.length === 0) {
         for (const key of Object.keys(row)) {
            headers.push(key.trim());
          }
        }  
        const rowData = processRow(Object.values(row));
        users.push(rowData);
      })
      .on("end", () => {
        User.bulkCreate(users)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
              users,
          });
          ad();
        })
        .catch((error) => {
          res.status(500).send({
          message: "Fail to import data into the database!",
          error: error.message,
        });
      });
          
    })      
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
