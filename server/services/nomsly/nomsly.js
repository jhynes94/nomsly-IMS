module.exports = function (app) {
    const moment = require('moment')
    /////////////////////////////trivia requests/////////////////////////////////////

    var meals = [
        {
            id: 000001,
            name: "Arabian Nights",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/arabiannights.png?v=1513120218",
            description: "Grilled Chicken Pita Pocket with Hummus and Dried Apricots",
            contents: "Wheat, Soy",
            quantity: 10
        },
        {
            id: 000002,
            name: "Brunch for Lunch",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Brunch-for-Lunch.png?v=1513120260",
            description: "Mini Pancakes, Chicken Sausage, and Vanilla Yogurt, with Carrot Sticks and Apples",
            contents: "Wheat, Dairy",
            quantity: 5
        },
        {
            id: 000003,
            name: "Falalala",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/falalalala-1.png?v=1513120711",
            description: "Falafel and Tzatziki Sauce with Blueberries and Cucumber Sticks",
            contents: "Wheat, Dairy",
            quantity: 0
        },
        {
            id: 000004,
            name: "Fiesta",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Fiesta-New.png?v=1513120373",
            description: "Whole Wheat, Black Bean, and Edamame Quesadilla with Apple Slices and Corn",
            contents: "Wheat, Dairy, Soy",
            quantity: 2
        },
        {
            id: 000005,
            name: "Pergoies n'AT",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Perogies.png?v=1513120638",
            description: "Potato & Cheese Pierogies and Kielbasa, with Cherry Tomatoes and Blueberries",
            contents: "Wheat, Dairy, Egg, Soy",
            quantity: 0
        },
        {
            id: 000006,
            name: "Ham It Up",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/ham-it-up-1.png?v=1513120515",
            description: "Ham and Cheese Cubes with Apple Slices and Peas",
            contents: "Dairy",
            quantity: 0
        },
        {
            id: 000007,
            name: "Italian Stallion",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/italian-2.png?v=1513120547",
            description: "Ham, Salami, and Provolone Wheat Wrap, with Orange Slices and Snap Peas",
            contents: "Wheat, Dairy",
            quantity: 0
        },
        {
            id: 000008,
            name: "Leggo my Turkey",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/LeggoMyTurkey-New.png?v=1513120609",
            description: "Turkey, Swiss Cheese, and Kale Wrap, with Apple Slices and Bell Pepper Sticks",
            contents: "Wheat, Dairy",
            quantity: 0
        },
        {
            id: 000009,
            name: "Tomato Tomahto",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/JE7A9134.jpg?v=1513121055",
            description: "Cherry Tomatoes & Cucumber Slices with Ranch Dressing",
            contents: "Dairy, Egg",
            quantity: 0
        },
        {
            id: 000010,
            name: "Open Sez Me",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/sez_me.jpg?v=1513119741",
            description: "Carrots & Celery with Hummus",
            contents: "Sesame",
            quantity: 0
        },
        {
            id: 000011,
            name: "Ants On A Log",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/ants.jpg?v=1513120137",
            description: "Celery & Dried Berry Mix with Sunbutter",
            contents: "N/A",
            quantity: 0
        },
        {
            id: 000012,
            name: "Appl'e Ever After",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/ants.jpg?v=1513120137",
            description: "Apples & Carrots with Vanilla Yogurt",
            contents: "Dairy",
            quantity: 0
        },
        {
            id: 000013,
            name: "Growin'Ola",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/growin.jpg?v=1513119831",
            description: "Nut-Free Granola & Blueberries with Vanilla Yogurt",
            contents: "Dairy",
            quantity: 0
        },
    ];

    AccountDatabase = [
        {
            id: 1,
            name: "Digital Lumens",
            mealNumbers: [7, 8, 2],
            mealVotes: []
        },
        {
            id: 2,
            name: "Grove Labs",
            mealNumbers: [1, 4, 12, 11],
            mealVotes: []
        },
        {
            id: 3,
            name: "Oracle",
            mealNumbers: [7, 8],
            mealVotes: []
        }
    ]

    function gatherAccountMealData(accountNumber) {

        let accountMeal = AccountDatabase.find(function (account) {
            return account.id == parseInt(accountNumber);
        })

        console.log(accountMeal.name + " id(" + parseInt(accountNumber) + ") Requested meal data")

        let accountMealNumbers = accountMeal.mealNumbers;

        let returnMeals = []

        for (let i = 0; i < accountMealNumbers.length; i++) {
            returnMeals = returnMeals.concat(meals[accountMealNumbers[i]])
        }
        return returnMeals;
    }

    app.get('/CurrentMealOfferings', function (req, res) {
        res.send({ "meals": meals })
    })

    app.get('/CurrentAccounts', function (req, res) {
        res.send({ "accounts": AccountDatabase })
    })

    app.get('/meals', function (req, res) {

        //default response
        if (req.query.account == "undefined" || req.query.account == "") {
            console.log("default Call")
            res.send({ "meals": meals })
        }

        //Search for account
        else {
            try {
                let accountMealPlan = gatherAccountMealData(req.query.account)
                res.send({ "meals": accountMealPlan })
            }
            catch (error) {
                console.log("ERROR! " + error)
                console.log("Cannot find accountNumber")
                res.send({
                    "meals": [{
                        id: 000000,
                        name: "ACCOUNT NOT FOUND",
                        imageLink: "",
                        description: "",
                        contents: "",
                        quantity: 0
                    }]
                });
            }
        }
    })

    app.post("/vote", function (req, res) {
        let msg = req.body;
        let now = moment()
        console.log("Account: " + req.query.account + " voted they " + req.body.vote + " " + req.body.mealLiked.name + " at " + now.format('YYYY-MM-DD HH:mm:ss Z'));

        res.send({ message: "Vote recieved!" });


        //Add vote to system
        try {
            var accountNumber = req.query.account;
            AccountDatabase.find(function (account) {
                if (account.id == parseInt(accountNumber)) {
                    account.mealVotes = account.mealVotes.concat([{
                        name: account.name,
                        vote: req.body.vote,
                        mealVotedFor: req.body.mealLiked.name,
                        time: now.format('YYYY-MM-DD HH:mm:ss Z')
                    }])
                }
                return;
            })
        }
        catch (error) {
            console.log("ERROR! " + error)
            console.log("Cannot find accountNumber")
        }

        console.log(AccountDatabase)
    });

    app.post("/stocking", function (req, res) {
        let meal = req.body.meal;
        console.log("Account " + req.query.account + " has " + meal.quantity + " stock of: " + meal.name);
        res.send({ message: "Stocking notice recieved!" });
    });
};