var http = require('http');
var sql = require('mssql');

var config = {
    server: '172.24.1.6',
    database: 'CMS',
    user: 'sa',
    password: 'p@$$w0rd',
    port: 1433
};


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});


var result
loadCMS(result, function(gg){ 
   res.write(JSON.stringify(gg.recordset));
   res.end("");
});
 

}).listen(8000,function(){
    console.log("Started!");
});


function loadCMS(recordSet,cb) {
    var dbConn = new sql.ConnectionPool(config);
   
    dbConn.connect().then(function () {
       
        var request = new sql.Request(dbConn);
       
              var id="A00A"
              var sname="a"
              //getall
       request.query("select * from [CMS].[dbo].[m_Account] order by 1 desc").then(function (recordSet) {
                  
       //getbyaccountid
       // request.query("select  * from [CMS].[dbo].[m_Account] where AccountId='"+id+"'").then(function (recordSet) {
          
       // getallaccountbynamehaving
        //request.query("select top 10 * from [CMS].[dbo].[m_Account] where AccountName like '%"+sname+"%'").then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
            cb(recordSet);

        }).catch(function (err) {
           
            console.log(err);
            dbConn.close();
           
        });
    }).catch(function (err) {
  
        console.log(err);
    });

   
};


