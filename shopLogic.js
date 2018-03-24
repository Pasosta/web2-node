function getItems() {
    jQuery.ajax({
       url: "/shop/items",
       type: 'GET',
       data: {
           item: itemNum,
           quantity: quantity
       },
       success: function(){
           console.log("item successfully added item:" + itemNum + " #" + quantity);
       }
    });
}

function addToCart(itemNum, quantity) {
    jQuery.ajax({
       url: "./cartLogic.php",
       type: 'POST',
       data: {
           item: itemNum,
           quantity: quantity
       },
       success: function(){
           console.log("item successfully added item:" + itemNum + " #" + quantity);
           //this should probably get the num of items from the session var
           document.getElementById("cartNum").innerHTML = Number(document.getElementById("cartNum").innerHTML) + Number(quantity);
       }
    });
}

function updateCart(itemNum, quantity) {
    jQuery.ajax({
       url: "./updateItem.php",
       type: 'POST',
       data: {
           item: itemNum,
           quantity: quantity
       },
       success: function(){
           console.log("item successfully updated item:" + itemNum + " #" + quantity);
       }
    });
}

function removeItem(itemNum) {
    jQuery.ajax({
       url: "./removeItem.php",
       type: 'POST',
       data: {
           item: itemNum
       },
       success: function(){
           console.log("item successfully removed item:" + itemNum);
           $("tr").remove("." + itemNum)
       }
    });
}

function checkout(buttonId) {
    document.getElementById(buttonId).onclick = function () {
        console.log("hit");
        location.href = "./viewCart.php";
    }
}