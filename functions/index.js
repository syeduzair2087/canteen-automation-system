var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })


var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToUser = functions.database.ref('orders/{pushId}/').onWrite(event => {
    const order = event.data.val();
    console.log(order);
})

// exports.sendAdminNotification = functions.database.ref('/orders/{userId}').onWrite(event => {
//     const userId = event.params.userId;
//     const order = event.data.val();


//     console.log("sender id = " + event.params.userIdream524628d);
//     if (!event.data.val()) {
//         return console.log("user not register");
//     }

//     const getUserToken = admin.database().ref(`/usersToken/${userId}`).once('value');
//     const getUserProfilePromise = admin.auth().getUser(userId);

//     return Promise.all([getUserToken, getUserProfilePromise]).then(result => {
//         const tokenSnapshot = result[0];
//         const follwer = result[1];

//         if (!tokenSnapshot.hasChildren()) {
//             return console.log('There is no token is no token to send notification');
//         }

//         console.log('There is token is no token to send notification');

//         const payload = {
//             notification: {
//                 title: 'you have new order',
//                 body: `order place by ${follwer.displayName}`,
//                 icon: follwer.photoURL
//             }
//         };

//         const token = Object.keys(tokenSnapshot.val());

//         return admin.messaging().sendToDevice(token, payload).then(response => {
//             const tokenToRemove = [];

//             response.results.forEach((result, index) => {
//                 const error = result.error;
//                 if (error) {
//                     console.log('Failure sending notification to', token[index], error);

//                     if (error.code === 'messaging/invalid-registration-token' ||
//                         error.code === 'messaging/registration-token-not-registered') {
//                         tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
//                     }
//                 }
//             });
//             return Promise.all(tokenToRemove);
//         })

//     })
// })