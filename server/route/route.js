/**
 * Created by arkulkar.
 */
var cntrl = require('../controller/cntrl');
module.exports = function(app){
    app.route('/api/db')
        .post(cntrl.dbCall)
};