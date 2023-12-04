var fg = require("figlet");

function start(text) {
    fg(text, function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
}

module.exports = {start};