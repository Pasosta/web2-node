function getCPUChoice() {
    
    return "rock";
}

function calculate(req, res) {
    var mailType = req.query.choice;
    var weight = parseInt(req.query.weight);
    var price = 0.00
    
    var offset = 0.21 * weight;
    
    switch(mailType) {
    case "stamped":
        price = offset + .50;
        break;
    case "metered":
        price = offset + .47;
        break;
    case "large":
        price = offset + 1.00; 
        break;
    case "package":
        if (weight < 5) {
            price = 3.50;
        } else if (weight < 9) {
            price = 3.75;
        } else if (weight < 10) {
            price = 4.10;
        } else if (weight < 11) {
            price = 4.45;
        } else if (weight < 12) {
            price = 4.80;
        } else if (weight < 13) {
            price = 5.15;
        } else {
            price = "invalid";
        }
        break;
    default:
        price = "invalid";
    }
    
    
    var postageData = {"choice": mailType, "weight":weight, "price":price };
    
    res.render('pages/result', postageData);
    
    
}

module.exports = {calculate: calculate};