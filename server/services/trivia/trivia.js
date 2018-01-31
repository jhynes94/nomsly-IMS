module.exports = function (app) {
    /////////////////////////////trivia requests/////////////////////////////////////
    
    var question = [
        "The beaver is the national emblem of which country?",
        "In which movie did Humphrey Bogart play Charlie Allnut?",
        "What is the name of Batman's butler?",
        "Which US state is nearest to the old Soviet Union?"
    ];
    var fakeAnswer = [
        ["USA", "Germany", "France"],
        ["Home Alone", "Ghost Busters", "Saving Private Ryan"],
        ["Huston", "Frank", "Winston"],
        ["Hawaii", "Maine", "Massachusetts"]
    ];
    var trueAnswer = [
        "Canada",
        "African Queen",
        "Alfred",
        "Alaska",
    ];

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }


    var questionIterator = 0;

    app.get('/qna', function (req, res) {

        var ranAnswers = fakeAnswer[questionIterator].concat(trueAnswer[questionIterator]);
        ranAnswers = shuffle(ranAnswers);
        console.log("Sent: " + ranAnswers);

        var response = {
            "question": question[questionIterator],
            "answers": ranAnswers,
            "timeToRespond": this.timeLeft
        };
        res.send(response)
    })

    app.post("/submission", function (req, res) {
        var msg = req.body.answer;
        console.log("answered: " + msg);
        if (msg === trueAnswer[questionIterator]) {
            res.send({ message: true });
            questionIterator++;
            if (questionIterator == (question.length)) {
                questionIterator = 0;
            }
        }
        else {
            res.send({ message: false });
        }
    });

    app.post("/newQuestion", function (req, res) {
        var msg = req.body;
        question = question.concat(msg.question);
        var NewFakeAnswer = [msg.fakeAnswer]
        fakeAnswer = fakeAnswer.concat(NewFakeAnswer);
        trueAnswer = trueAnswer.concat(msg.trueAnswer);

        console.log("New Question: " + msg.question)
        res.sendStatus(200);
    });
};