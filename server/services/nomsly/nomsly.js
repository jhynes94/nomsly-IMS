module.exports = function (app) {
    /////////////////////////////trivia requests/////////////////////////////////////

    var meals = [
        {
            name: "Arabian Nights",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/arabiannights.png?v=1513120218",
            description: "Grilled Chicken Pita Pocket with Hummus and Dried Apricots",
            contents: "Wheat, Soy",
            quantity: 10
        },
        {
            name: "Brunch for Lunch",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Brunch-for-Lunch.png?v=1513120260",
            description: "Mini Pancakes, Chicken Sausage, and Vanilla Yogurt, with Carrot Sticks and Apples",
            contents: "Wheat, Dairy",
            quantity: 5
        },
        {
            name: "Falalala",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/falalalala-1.png?v=1513120711",
            description: "Falafel and Tzatziki Sauce with Blueberries and Cucumber Sticks",
            contents: "Wheat, Dairy",
            quantity: 0
        },
        {
            name: "Fiesta",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Fiesta-New.png?v=1513120373",
            description: "Whole Wheat, Black Bean, and Edamame Quesadilla with Apple Slices and Corn",
            contents: "Wheat, Dairy, Soy",
            quantity: 2
        },
    ];

    app.get('/meals', function (req, res) {
        var response = {
            "meals": meals
        };
        res.send(response)
        console.log("Response sent to account: " + req.query.account)
    })

    app.post("/vote", function (req, res) {
        var msg = req.body.vote;
        console.log("Account " + req.query.account + " Voted: " + msg);
        res.send({ message: "vote recieved!" });
    });
};