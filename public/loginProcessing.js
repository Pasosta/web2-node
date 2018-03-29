function login() {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
	};

    console.log("loggin in");
	$.post("/login", params, function(result) {
		if (result && result.success) {
			console.log("success\n");
		} else {
			console.log("failure\n");
		}
	});
}

function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

module.exports = {login: login, logout: logout};
