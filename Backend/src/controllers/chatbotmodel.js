// import dialogflow from '@google-cloud/dialogflow';
// import { v4 as uuidv4 } from 'uuid';  // Correct import
// import express from 'express';  // Import Express

// const app = express();
// const port = 3000;  // Port for the Express server

// // Middleware to parse JSON data
// app.use(express.json());

// // Function to send Dialogflow response to the frontend
// const response_Result = (result, res) => {
//   console.log(result.queryText, "Received from Dialogflow");
//   // Send response back to the frontend
//   res.json({
//     query: result.queryText,
//     response: result.fulfillmentText,
//   });
// };

// /**
//  * Send a query to the Dialogflow agent, and return the query result.
//  * @param {string} projectId The project to be used
//  * @param {string} queryText The query text from the frontend
//  * @param {object} res The Express response object
//  */
// async function runSample(projectId,queryText,res) {
//   // A unique identifier for the given session
//   const sessionId = uuidv4();  // Correct usage of uuid

//   // Create a new session
//   const sessionClient = new dialogflow.SessionsClient({
//     keyFilename: 'C:/Users/Amreen/Downloads/newagent-ttok-fcb97b5e19ab.json',
//   });

//   const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

//   // The text query request
//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: queryText,  // Use queryText received from the frontend
//         languageCode: 'en-US',
//       },
//     },
//   };

//   // Send request and log result
//   const responses = await sessionClient.detectIntent(request);
//   console.log('Detected intent');
//   const result = responses[0].queryResult;
//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);

//   // Send the result back to the frontend
//   response_Result(result, res);

//   if (result.intent) {
//     console.log(`  Intent: ${result.intent.displayName}`);
//   } else {
//     console.log('  No intent matched.');
//   }
// }

// // Define a POST endpoint to receive queries from the frontend
// app.post('/chat', async (req, res) => {
//   const queryText = req.body.query;  // Get the query from the frontend request
//   try {
//     // Call runSample and pass the query from the frontend
//     await runSample('newagent-ttok', queryText, res);
//   } catch (error) {
//     console.error('Error during Dialogflow request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // // Start the Express server
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });
