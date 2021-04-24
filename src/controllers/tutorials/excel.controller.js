const Tutorial = require("../../models/tutorial.model");
const excel = require("exceljs");
const readXlsxFile = require("read-excel-file/node");


const download = async (req, res) => {
  await Tutorial.find().then((objs) => {
    let tutorials = [];

    objs.forEach((obj) => {
      tutorials.push({
        id: obj._id,
        title: obj.title,
        description: obj.description,
        published: obj.published,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "Published", key: "published", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(tutorials);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const uploadFile = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).json("Please upload an excel file!");
    }

    let path =
      __basedir + "/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let tutorials = [];

      rows.forEach((row) => {
        let tutorial = {
          id: row[0],
          title: row[1],
          description: row[2],
          published: row[3],
        };

        tutorials.push(tutorial);
      });

      Tutorial.insertMany(tutorials)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
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

const getTutorials = async (req, res) => {

  try {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const result = await Tutorial.find().skip(offset).limit(limit);
    res.status(200).json(result);
    res.end();
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
    res.end();
  }
};

module.exports = {
  download,
  uploadFile,
  getTutorials
};
