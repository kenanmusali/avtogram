const { v4: uuidv4 } = require('uuid');
const readFromFile = require('../helpers/reFromFile');
const writeToFile = require('../helpers/writeTofile');

// filepath: c:\Users\kanan.musali\Desktop\avtogram\backend\src\controller\createfile.js
const createFileByCar = (req, res) => {
    const { platenumber } = req.params;
    if (!platenumber) {
        return res.status(400).json({ message: "Plate number is required" });
    }
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }

    const newFile = {
        id: uuidv4(),
        filePath: "/uploads/" + file.filename,
        type: file.mimetype.includes("video") ? "video" : "image",
        plateNumber: platenumber,
    };

    const platesNum = readFromFile("plateNumberList");
    let foundIndex = platesNum.findIndex((plate) => plate.plateNumber === platenumber);

    if (foundIndex === -1) {
        platesNum.push({
            id: uuidv4(),
            plateNumber: platenumber,
        });
        writeToFile("plateNumberList", platesNum);
    }

    const data = readFromFile("fileList");
    data.push(newFile);
    writeToFile("fileList", data);

    res.status(200).json({
        message: "File uploaded successfully",
        file: newFile,
    });
};

module.exports = createFileByCar