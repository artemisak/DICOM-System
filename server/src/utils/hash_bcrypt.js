const bcrypt = require('bcryptjs');

module.exports = {
    hashStr: (str) => bcrypt.hashSync(str, bcrypt.genSaltSync(10)),
    compareHashStr: (str, hash) => bcrypt.compareSync(str, hash),
}