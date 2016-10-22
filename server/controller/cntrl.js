/**
 * Created by arkulkar
 */
var sql = require('mssql');

module.exports = {
    dbCall : dbCall
};

function dbCall(req, res){
    var body = req.body;
    var config = {
        user: body.config.user,
        password: body.config.password,
        server: body.config.server,
        port : body.config.port,
        database: body.config.database
    };

    var connection = new sql.Connection(config, function(err) {
        if(err){
            res.status(500).send({msg : err});
            return ;
        }

        var request = new sql.Request(connection);
        request.query(body.query, function (err, recordset) {
            if(err){
                res.status(500).send({msg : err});
                return;
            }
            res.send({record : recordset});
        });
    });
}