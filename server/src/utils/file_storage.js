const fs = require('fs');
const path = require('path');

const filePath = (filename) => {
    return `${path.join(process.env.PWD, '../storage')}/${filename}.b64`;
}

const fileStorage = {
    saveDicom: (id, fileData) => fs.writeFileSync(filePath(id), new Buffer.from(fileData)),
    getDicomPath: (id) => filePath(id),
    removeFile: (id) => fs.unlinkSync(filePath(id))
}

module.exports = {
    fileStorage
}
