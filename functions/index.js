const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IODnGLLoRfRxVadeJwLXZLXnRrPH7rlf6JOqDh9hTk1EgfqyhHQG6RM9Ww2vbknxi3CCFddBsh3hZhBNNmKz4WX0051HfIHVR"
);

//API

//App设置
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  //得到传到此页面的total object
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!for amount>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "cny",
  });

  //201 创建成功
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command
exports.api = functions// .region("asia-east2")
.https
  .onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
