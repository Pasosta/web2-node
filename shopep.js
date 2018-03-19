
function items(req, res) {
    var itemarray = new Array();
    
    var postageData = {"data": itemarray};
    
    res.render('pages/result', postageData);
}

function users(req, res) {
    //var item = req.query.item;
var userarray = new Array();
    
    var postageData = {"data": userarray};
    
    res.render('pages/result', postageData);
    
    
}

module.exports = {users: users, items: items};