var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToUser = functions.database.ref('orders/{pushId}/').onWrite(event => {
    const order = event.data.val();

    console.log(order);

    const userId = order.userId;
    const statuState = order.status.state;

    console.log('status state: ' + statuState);
    if (statuState == 'Assigned to Chef' || statuState == 'Assigned to Delivery Boy') {
        return admin.database().ref(`notificationTokens/${order.status.staffMemberId}`).once('value').then((tokensSnapshot) => {
            const devicetoken = tokensSnapshot.val().id;
            console.log(devicetoken);
            if (devicetoken === null || devicetoken === undefined) {
                console.log('There is no device token available.');
                return;
            }
            sendNotification(devicetoken, 'A new order has arrived.');
        });
    }
    else if (statuState == 'Accepted by Chef') {
        return admin.database().ref(`notificationTokens/${order.userId}`).once('value').then((tokensSnapshot) => {
            const devicetoken = tokensSnapshot.val().id;
            if (devicetoken === null || devicetoken === undefined) {
                console.log('There is no user device token available');
            }
            else {
                sendNotification(devicetoken, 'You order has been accepted.');
            }

            return admin.database().ref('notificationTokens/admins').once('value').then((tokens) => {
                var adminNotificationTokens = [];
                tokens.forEach((element) => {
                    adminNotificationTokens.push(element.val().id);
                });

                if (adminNotificationTokens === null || adminNotificationTokens === undefined) {
                    console.log('There is no admin device tokens available.');
                    return;
                } else {
                    sendNotification(adminNotificationTokens, 'order number ' + order.orderId + ' has been accepted by chef.');
                    return;
                }
            });
        });
    }
    else if (statuState == 'Order Ready') {
        return admin.database().ref('notificationTokens/admins').once('value').then((tokens) => {
            var adminNotificationTokens = [];
            tokens.forEach((element) => {
                adminNotificationTokens.push(element.val().id);
            });

            if (adminNotificationTokens.length > 0) {
                sendNotification(adminNotificationTokens, 'order number ' + order.orderId + ' is ready.');
                return;
            }
            else {
                console.log('There is no admin token available.');
                return;
            }
        });
    }
    else if (statuState == 'Received by Delivery Boy') {
        return admin.database().ref('notificationTokens/admins').once('value').then((tokens) => {
            var adminNotificationTokens = [];
            tokens.forEach((element) => {
                adminNotificationTokens.push(element.val().id);
            });

            if (adminNotificationTokens.length > 0) {
                sendNotification(adminNotificationTokens, 'order number ' + order.orderId + ' is received by delivery boy.');
                return;
            }
            else {
                console.log('There is no admin token available.');
                return;
            }
        });
    }
    else if (statuState == 'Order Delivered') {
        return admin.database().ref(`notificationTokens/${order.userId}`).once('value').then((tokensSnapshot) => {
            const devicetoken = tokensSnapshot.val().id;
            if (devicetoken === null || devicetoken === undefined) {
                console.log('There is no user device token available.');
            }
            else {
                sendNotification(devicetoken, 'You order has been delivered.');
            }

            return admin.database().ref('notificationTokens/admins').once('value').then((tokens) => {
                var adminNotificationTokens = [];
                tokens.forEach((element) => {
                    adminNotificationTokens.push(element.val().id);
                });

                if (adminNotificationTokens === null || adminNotificationTokens === undefined) {
                    console.log('There is no admin device tokens available.');
                    return;
                } else {
                    sendNotification(adminNotificationTokens, 'order number ' + order.orderId + ' has been delivered.');
                    return;
                }
            });
        });
    }
    else if (statuState == 'Pending' || statuState == 'Cancelled') {
        return admin.database().ref('notificationTokens/admins').once('value').then((tokens) => {
            var adminNotificationTokens = [];
            tokens.forEach((element) => {
                adminNotificationTokens.push(element.val().id);
            });
            if (statuState == 'Cancelled') {
                if (adminNotificationTokens.length > 0) {
                    sendNotification(adminNotificationTokens, 'Order number ' + order.orderId + ' has been cancelled.');
                }
                else {
                    console.log('There is no admin token available');
                }
                admin.database().ref(`notificationTokens/${order.userId}`).once('value').then((tokensSnapshot) => {
                    if (tokensSnapshot.val().id === undefined || tokensSnapshot.val().id === null) {
                        console.log('There is no user device token available.');
                        return;
                    }
                    else {
                        sendNotification(tokensSnapshot.val().id, 'Your order has been cancelled.');
                        return;
                    }
                });
            }
            else if (statuState == 'Pending' && !event.data.previous.exists()) {
                if (adminNotificationTokens.length > 0) {
                    sendNotification(adminNotificationTokens, 'A new order has arrived.');
                    return;
                }
                else {
                    console.log('There is no admin token available.');
                    return;
                }
            }
        });
    }
})



function sendNotification(deviceToken, body) {
    var payload = {
        notification: {
            title: 'Canteen Automation',
            body: body
            // ,
            // icon: follower.photoURL
        }
    }
    return admin.messaging().sendToDevice(deviceToken, payload).then((respone) => {
    })
}

// function getAdminTokens() {
//     admin.database().ref('notificationTokens/admins').once('value').then((tokens) => {
//         var adminNotificationTokens = [];
//         tokens.forEach((element) => {
//             adminNotificationTokens.push(element.val().id);
//         });

//         return adminNotificationTokens;
//     });
// }

// function getStaffToken(staffMemberId) {
//     admin.database().ref(`notificationTokens/${staffMemberId}`).once('value').then((tokensSnapshot) => {
//         return tokensSnapshot.val().id;
//     });
// }