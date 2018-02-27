module.exports = function (app) {
    const moment = require('moment')
    
    //Setup Mongo DB
    const MongoClient = require('mongodb').MongoClient
    var db
    const url = 'mongodb://justinmongo:aFoolishPass4Mongo@ds251845.mlab.com:51845/test-db-personal-website';
    MongoClient.connect(url, (err, database) => {
        if (err) return console.log(err)

        db = database
        app.listen(3000, () => {
            console.log('listening on 3000')
        })
    })
    
    /////////////////////////////trivia requests/////////////////////////////////////

    var meals = [
        {
            id: 1,
            name: "Arabian Nights",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/arabiannights.png?v=1513120218",
            description: "Grilled Chicken Pita Pocket with Hummus and Dried Apricots",
            contents: "Wheat, Soy",
            quantity: 1
        },
        {
            id: 2,
            name: "Brunch for Lunch",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Brunch-for-Lunch.png?v=1513120260",
            description: "Mini Pancakes, Chicken Sausage, and Vanilla Yogurt, with Carrot Sticks and Apples",
            contents: "Wheat, Dairy",
            quantity: 1
        },
        {
            id: 3,
            name: "Falalala",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/falalalala-1.png?v=1513120711",
            description: "Falafel and Tzatziki Sauce with Blueberries and Cucumber Sticks",
            contents: "Wheat, Dairy",
            quantity: 1
        },
        {
            id: 4,
            name: "Fiesta",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Fiesta-New.png?v=1513120373",
            description: "Whole Wheat, Black Bean, and Edamame Quesadilla with Apple Slices and Corn",
            contents: "Wheat, Dairy, Soy",
            quantity: 1
        },
        {
            id: 5,
            name: "Pergoies n'AT",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/Perogies.png?v=1513120638",
            description: "Potato & Cheese Pierogies and Kielbasa, with Cherry Tomatoes and Blueberries",
            contents: "Wheat, Dairy, Egg, Soy",
            quantity: 1
        },
        {
            id: 6,
            name: "Ham It Up",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/ham-it-up-1.png?v=1513120515",
            description: "Ham and Cheese Cubes with Apple Slices and Peas",
            contents: "Dairy",
            quantity: 1
        },
        {
            id: 7,
            name: "Italian Stallion",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/italian-2.png?v=1513120547",
            description: "Ham, Salami, and Provolone Wheat Wrap, with Orange Slices and Snap Peas",
            contents: "Wheat, Dairy",
            quantity: 1
        },
        {
            id: 8,
            name: "Leggo my Turkey",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/LeggoMyTurkey-New.png?v=1513120609",
            description: "Turkey, Swiss Cheese, and Kale Wrap, with Apple Slices and Bell Pepper Sticks",
            contents: "Wheat, Dairy",
            quantity: 1
        },
        {
            id: 9,
            name: "Tomato Tomahto",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/JE7A9134.jpg?v=1513121055",
            description: "Cherry Tomatoes & Cucumber Slices with Ranch Dressing",
            contents: "Dairy, Egg",
            quantity: 1
        },
        {
            id: 10,
            name: "Open Sez Me",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/sez_me.jpg?v=1513119741",
            description: "Carrots & Celery with Hummus",
            contents: "Sesame",
            quantity: 1
        },
        {
            id: 11,
            name: "Ants On A Log",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/ants.jpg?v=1513120137",
            description: "Celery & Dried Berry Mix with Sunbutter",
            contents: "N/A",
            quantity: 1
        },
        {
            id: 12,
            name: "Appl'e Ever After",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/ants.jpg?v=1513120137",
            description: "Apples & Carrots with Vanilla Yogurt",
            contents: "Dairy",
            quantity: 1
        },
        {
            id: 13,
            name: "Growin'Ola",
            imageLink: "https://cdn.shopify.com/s/files/1/2568/7578/products/growin.jpg?v=1513119831",
            description: "Nut-Free Granola & Blueberries with Vanilla Yogurt",
            contents: "Dairy",
            quantity: 1
        },
    ];

    AccountDatabase = [
        {
            id: 1,
            name: "Digital Lumens",
            mealNumbers: [7, 8, 2],
            mealVotes: [],
            stockWarning: []
        },
        {
            id: 2,
            name: "Grove Labs",
            mealNumbers: [1, 4, 12, 11],
            mealVotes: [],
            stockWarning: []
        },
        {
            id: 3,
            name: "Oracle",
            mealNumbers: [7, 8],
            mealVotes: [],
            stockWarning: []
        }
    ]


    app.get("/getMeal", function (req, res) {
        console.log("Getting Meal: " + req.query.mealId);

        var meals_db = {}
        db.collection('meals').find({}).toArray(function (err, results) {
            console.log(results)
            meals_db = results

                    //Add vote to system
        try {
            var mealNumber = req.query.mealId;
            meals_db.find(function (meal) {
                if (meal.id == parseInt(mealNumber)) {
                    return res.send({ meal: meal});
                }
            })
        }
        catch (error) {
            console.log("ERROR! " + error)
            console.log("Cannot find MealNumber")
        }
        })
    });

    app.get('/CurrentMealOfferings', function (req, res) {
        db.collection('meals').find({}).toArray(function (err, results) {
            console.log(results)
            res.send({ "meals": results })
        })
    })

    app.post("/newMeal", function (req, res) {

        let msg = req.body;
        let meal;
        let newID = Math.floor(100000000 + Math.random() * 900000000);
        if(msg.meal == null){
            meal = {
                id: newID,
                name: "New Meal",
                imageLink: "",
                description: "",
                contents: "",
                quantity: 1
            };
        }
        else {
            meal = msg.meal;
            newID = msg.meal.id;
        }

        
        db.collection('meals').save(meal, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            console.log(req.body)
        })

        //meals = meals.concat([meal]);
        res.send({ "id": newID })
    })

    app.get('/meals', function (req, res) {

        //default response
        if (req.query.account == "undefined" || req.query.account == "") {
            console.log("default Call")

            db.collection('meals').find().toArray(function (err, results) {
                res.send({ "meals": results })
            })
        }

        //Search for account
        else {
            try {
                var accountNumber = req.query.account

                meals_db = {}
                db.collection('meals').find().toArray(function (err, results) {
                    meals_db = results;

                    account_db = {}
                    db.collection('clientAccounts').find().toArray(function (err, results) {
                        account_db = results;


                        let account = account_db.find(function (account) {
                            return account.id == parseInt(accountNumber);
                        })
                
                        console.log(account.name + " id(" + parseInt(accountNumber) + ") Requested meal data")
                
                        let returnMeals = []
                
                        for (let i = 0; i <  account.mealNumbers.length; i++) {
                            returnMeals = returnMeals.concat(
                                meals_db.find(function (meal) {
                                    return meal.id == parseInt(account.mealNumbers[i]);
                                })
                            )
                        }
                        
                        res.send({ "meals": returnMeals })
                    })
                })
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

    app.post("/updateMeal", function (req, res) {
        let msg = req.body;
        console.log("Meal: " + msg.meal.id + " Will be updated");

        res.send({ message: "Update recieved" });

        var myquery = { id: parseInt(msg.meal.id) };
        var newvalues = { $set: {
            name: msg.meal.name,
            imageLink: msg.meal.imageLink,
            description: msg.meal.description,
            contents: msg.meal.contents,
            quantity: msg.meal.quantity,
            }};
        db.collection("meals").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });


        // //Add vote to system
        // try {
        //     meals.find(function (meal) {
        //         if (meal.id == parseInt(msg.meal.id)) {
        //             meal.name = msg.meal.name
        //             meal.imageLink = msg.meal.imageLink
        //             meal.description = msg.meal.description
        //             meal.contents = msg.meal.contents
        //             meal.quantity = msg.meal.quantity
        //         }
        //         return;
        //     })
        // }
        // catch (error) {
        //     console.log("ERROR! " + error)
        //     console.log("Cannot find mealNumber")
        // }

        // console.log(meals)
    });

    app.post("/vote", function (req, res) {
        let msg = req.body;
        let now = moment()
        console.log("Account: " + req.query.account + " voted they " + req.body.vote + " " + req.body.mealLiked.name + " at " + now.format('YYYY-MM-DD HH:mm:ss Z'));

        res.send({ message: "Vote recieved!" });


        account_db = {};
        db.collection('clientAccounts').find().toArray(function (err, results) {
            account_db = results;

            //Add vote to system
            try {
                var accountNumber = req.query.account;
                account_db.find(function (account) {
                    if (account.id == parseInt(accountNumber)) {
                        account.mealVotes = account.mealVotes.concat([{
                            name: account.name,
                            vote: req.body.vote,
                            mealVotedFor: req.body.mealLiked.name,
                            mealVotedForID: req.body.mealLiked.id,
                            time: now.format('YYYY-MM-DD HH:mm:ss Z')
                        }])

                        var myquery = { id: parseInt(req.query.account) };
                        var newvalues = { $set: {
                            mealVotes: account.mealVotes
                            }};
                        db.collection("clientAccounts").updateOne(myquery, newvalues, function(err, res) {
                          if (err) throw err;
                          console.log("1 document updated");
                        });
                    }
                    return;
                })
            }
            catch (error) {
                console.log("ERROR! " + error)
                console.log("Cannot find accountNumber")
            }
        })
        //console.log(AccountDatabase)
    });

    app.post("/stocking", function (req, res) {
        let meal = req.body.meal;
        let now = moment()
        console.log("Account " + req.query.account + " has " + meal.quantity + " stock of: " + meal.name);
        res.send({ message: "Stocking notice recieved!" });

        account_db = {};
        db.collection('clientAccounts').find().toArray(function (err, results) {
            account_db = results;
            
            //Add/remove stocking warning
            try {
                var accountNumber = req.query.account;
                account_db.find(function (account) {
                    if (account.id == parseInt(accountNumber)) {
                        //Remove from warnings if quantity is greater than 1
                        if(meal.quantity >= 1){
                            for(let i =0; i < account.stockWarning.length; i++){
                                if(account.stockWarning[i].meal == meal.name){
                                    console.log("Removed from warnings");
                                    account.stockWarning.splice(i, 1)
                                }
                            }
                        }
                        //Add to warnings
                        else {
                            account.stockWarning = account.stockWarning.concat([{
                                name: account.name,
                                accountId: account.id,
                                meal: meal.name,
                                mealID: meal.id,
                                mealQuantity: meal.quantity,
                                time: now.format('YYYY-MM-DD HH:mm:ss Z')
                            }])
                        }

                        var myquery = { id: parseInt(accountNumber) };
                        var newvalues = { $set: {
                            stockWarning: account.stockWarning
                            }};
                        db.collection("clientAccounts").updateOne(myquery, newvalues, function(err, res) {
                          if (err) throw err;
                          console.log("1 document updated");
                        });
                    }
                    return;
                })
            }
            catch (error) {
                console.log("ERROR! " + error)
                console.log("Cannot find accountNumber")
            }
        })
    });

    app.get('/CurrentAccounts', function (req, res) {
        db.collection('clientAccounts').find().toArray(function (err, results) {
            res.send({ "accounts": results })
        })
        // res.send({ "accounts": AccountDatabase })
    })

    app.post("/newAccount", function (req, res) {
        let msg = req.body;
        let account;
        let newID = Math.floor(100000000 + Math.random() * 900000000);
        if(msg.account == null){
            account = {
                id: newID,
                name: "New Account Name",
                mealNumbers: [],
                mealVotes: [],
                stockWarning: []
            };
        }
        else {
            account = msg.account;
            newID = msg.account.id;
        } 

        db.collection('clientAccounts').save(account, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
        })
        //AccountDatabase = AccountDatabase.concat([account]);
        res.send({ "id": newID })
    })


    app.post("/updateAccount", function (req, res) {
        let msg = req.body;
        let now = moment()
        console.log("Account: " + msg.account.id + " Will be updated");

        var myquery = { id: parseInt(msg.account.id) };
        var newvalues = { $set: {
            name: msg.account.name,
            mealNumbers: msg.account.mealNumbers,
            mealVotes: msg.account.mealVotes,
            stockWarning: msg.account.stockWarning,
            }};
        db.collection("clientAccounts").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });

        res.send({ message: "Update recieved" });

        // //Add vote to system
        // try {
        //     AccountDatabase.find(function (account) {
        //         if (account.id == parseInt(msg.account.id)) {
        //             account.name = msg.account.name
        //             account.mealNumbers = msg.account.mealNumbers
        //             account.mealVotes = msg.account.mealVotes
        //             account.stockWarning = msg.account.stockWarning
        //         }
        //         return;
        //     })
        // }
        // catch (error) {
        //     console.log("ERROR! " + error)
        //     console.log("Cannot find accountNumber")
        // }

        // console.log(AccountDatabase)
    });
};