import OpenAI from "openai";
import  express from "express";
import bodyParser from "body-parser";
import cors from "cors";
 // node js handling of api
const openai = new OpenAI({
  apiKey: 'insert key here',
  organization: "insert org name here",
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const {message} = req.body;

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: 'user', content: `you are a clinical psychologist and you are given test results based on this quiz :     

    [
      {
        "question": "Am the life of the party",
        "type": 1,
        "modifier": "+"
      },
      {
        "question": "Feel little concern for others",
        "type": 2,
        "modifier": "-"
      },
      {
        "question": "Am always prepared",
        "type": 3,
        "modifier": "+"
      },
      {
        "question": "Get stressed out easily",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Have a rich vocabulary",
        "type": 5,
        "modifier": "+"
      },
      {
        "question": "Don't talk a lot",
        "type": 1,
        "modifier": "-"
      },
      {
        "question": "Am interested in people",
        "type": 2,
        "modifier": "+"
      },
      {
        "question": "Leave my belongings around",
        "type": 3,
        "modifier": "-"
      },
      {
        "question": "Am relaxed most of the time",
        "type": 4,
        "modifier": "+"
      },
      {
        "question": "Have difficulty understanding abstract ideas",
        "type": 5,
        "modifier": "-"
      },
      {
        "question": "Feel comfortable around people",
        "type": 1,
        "modifier": "+"
      },
      {
        "question": "Insult people",
        "type": 2,
        "modifier": "-"
      },
      {
        "question": "Pay attention to details",
        "type": 3,
        "modifier": "+"
      },
      {
        "question": "Worry about things",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Have a vivid imagination",
        "type": 5,
        "modifier": "+"
      },
      {
        "question": "Keep in the background",
        "type": 1,
        "modifier": "-"
      },
      {
        "question": "Sympathize with others feelings",
        "type": 2,
        "modifier": "+"
      },
      {
        "question": "Make a mess of things",
        "type": 3,
        "modifier": "-"
      },
      {
        "question": "Seldom feel blue",
        "type": 4,
        "modifier": "+"
      },
      {
        "question": "Am not interested in abstract ideas",
        "type": 5,
        "modifier": "-"
      },
      {
        "question": "Start conversations",
        "type": 1,
        "modifier": "+"
      },
      {
        "question": "Am not interested in other people's problems",
        "type": 2,
        "modifier": "-"
      },
      {
        "question": "Get chores done right away",
        "type": 3,
        "modifier": "+"
      },
      {
        "question": "Am easily disturbed",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Have excellent ideas",
        "type": 5,
        "modifier": "+"
      },
      {
        "question": "Have little to say",
        "type": 1,
        "modifier": "-"
      },
      {
        "question": "Have a soft heart",
        "type": 2,
        "modifier": "+"
      },
      {
        "question": "Often forget to put things back in their proper place",
        "type": 3,
        "modifier": "-"
      },
      {
        "question": "Get upset easily",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Do not have a good imagination",
        "type": 5,
        "modifier": "-"
      },
      {
        "question": "Talk to a lot of different people at parties",
        "type": 1,
        "modifier": "+"
      },
      {
        "question": "Am not really interested in others",
        "type": 2,
        "modifier": "-"
      },
      {
        "question": "Like order",
        "type": 3,
        "modifier": "+"
      },
      {
        "question": "Change my mood a lot",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Am quick to understand things",
        "type": 5,
        "modifier": "+"
      },
      {
        "question": "Don't like to draw attention to myself",
        "type": 1,
        "modifier": "-"
      },
      {
        "question": "Take time out for others",
        "type": 2,
        "modifier": "+"
      },
      {
        "question": "Shirk my duties",
        "type": 3,
        "modifier": "-"
      },
      {
        "question": "Have frequent mood swings",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Use difficult words",
        "type": 5,
        "modifier": "+"
      },
      {
        "question": "Don't mind being the center of attention",
        "type": 1,
        "modifier": "+"
      },
      {
        "question": "Feel others emotions",
        "type": 2,
        "modifier": "+"
      },
      {
        "question": "Follow a schedule",
        "type": 3,
        "modifier": "+"
      },
      {
        "question": "Get irritated easily",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Spend time reflecting on things",
        "type": 5,
        "modifier": "+"
      },
      {
        "question": "Am quiet around strangers",
        "type": 1,
        "modifier": "-"
      },
      {
        "question": "Make people feel at ease",
        "type": 2,
        "modifier": "+"
      },
      {
        "question": "Am exacting in my work",
        "type": 3,
        "modifier": "+"
      },
      {
        "question": "Often feel blue",
        "type": 4,
        "modifier": "-"
      },
      {
        "question": "Am full of ideas",
        "type": 5,
        "modifier": "+"
      }
    ]
    
    this is what the types mean
    
    1  = extraversion 
    2 =  agreeableness
    3 = conscientiousness
    4 = emotional stability
    5 = imagination / intelligence
    
    The modifier is for scoring in my javascript so ignore it.
    
    you will be given the scores of each of the 5 types
    each has a max score of 50.

     In your assessment include a paragraph describing them and their traits,
      what the scores mean and word it in an understandable and supportive
       but honest way. also include what jobs they would be good at as well
        as a mystical paragraph about the person based on the scores.

        between each paragraph add an html <br> and make an html <h1> with a title for each paragraph, use this for the class - class="result-paragraph"
        the paragraphs will be plain text, no need to add elements for the rest of the text, i have my own formatting for it already.

        on the final mystical paragraph add the html <h1> with the same class as the other with a title of: Final thoughts

        make no mention of the prompt above as the user wont understand the context, only refrence the scores
        
        here are thier scores:

         ${message}`},     //
  ],
  temperature: 1,
  max_tokens: 1429,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
    res.json({
        completion: response.choices[0].message
    })
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
})




