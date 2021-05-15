const express = require('express');
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const nlu = getNLUInstance();
    // const param = req.query.url;
    // const analyzeParam = {
    //     'url': param,
    //     'features': {
    //         'entities': {
    //             'emotion': true,
    //         },
    //         'keywords': {
    //             'emotion': true,
    //         },
    //     },
    // };

    // nlu.analyze(analyzeParam)
    //     .then(analyzeResults =>
    //     {
    //         const urlEmotion = analyzeResults.result.entities.emotion
    //             return res.send({emotions: urlEmotion});
    //     }).catch(error =>
    //         {
    //             console.log(error)
    //         })
    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    // const param = req.query.url;
    // const analyzeParam = {
    //     'url': param,
    //     'features': {
    //         'entities': {
    //             'sentiment': true,
    //         },
    //         'keywords': {
    //             'sentiment': true,
    //         },
    //     },
    // };

    // nlu.analyze(analyzeParam)
    //     .then(analyzeResults =>
    //     {
    //         const urlSentiment = analyzeResults.result.entities.sentiment
    //             return res.send({emotions: urlSentiment});
    //     }).catch(error =>
    //         {
    //             console.log(error)
    //         })
    const nlu = getNLUInstance();
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const nlu = getNLUInstance();
    // const param = req.query.text;
    // const analyzeParam = {
    //     'text': param,
    //     'features': {
    //         'entities': {
    //             'emotion': true,
    //         },
    //         'keywords': {
    //             'emotion': true,
    //         },
    //     },
    // };

    // nlu.analyze(analyzeParam)
    //     .then(analyzeResults =>
    //     {
    //         const textEmotion = analyzeResults.result.entities.emotion
    //             return res.send({emotions: textEmotion});
    //     }).catch(error =>
    //         {
    //             console.log(error)
    //         })
    return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    const nlu = getNLUInstance();
    // const param = req.query.text;
    // const analyzeParam = {
    //     'text': param,
    //     'features' : {
    //         'entities': {
    //             'sentiment': true,
    //         },
    //         'keywords': {
    //             'sentiment': true,
    //         },
    //     },
    // };

    // nlu.analyze(analyzeParam)
    //     .then(analyzeResults =>
    //     {
    //         const textSentiment = analyzeResults.result.entities.sentiment
    //             return res.send({emotions: textSentiment});
    //     }).catch(error =>
    //         {
    //             console.log(error)
    //         })
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

function getNLUInstance()
{
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}