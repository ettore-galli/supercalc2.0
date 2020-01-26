"use strict";
exports.__esModule = true;
var firebase = require("firebase");
console.log("***** FIREBASE DEMO / TEST *****");
/* var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  }; */
var projectId = "supercalc2-ettore-galli";
var apiKey = "AIzaSyBkVJJFgvupOu3xCif5_xIJyz7rDIaJi80";
var email = "ettore.galli@email.it";
var password = "p455w0rd";
var firebaseConfig = {
    apiKey: apiKey,
    authDomain: projectId + ".firebaseapp.com",
    databaseURL: "https://" + projectId + ".firebaseio.com",
    projectId: projectId,
    storageBucket: projectId + ".appspot.com"
};
firebase.initializeApp(firebaseConfig);
function getUserPath(path) {
    return "users/" + firebase.auth().currentUser.uid + "/" + path;
}
firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (db) {
    var userId = firebase.auth().currentUser.uid;
    console.log("userId", userId);
    var test_path = "test";
    firebase.database().ref(getUserPath(test_path)).set({ data: "prova" })
        .then(function () {
        return firebase.database().ref(getUserPath(test_path)).once('value');
    }).then(function (dt) {
        console.log(dt.val());
    });
})["catch"](function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("ERRORE AUTENTICAZIONE", errorCode, errorMessage);
});
/**
 * CLIENTE 2758952 FATTURA 3190422084 DEL 19-12-2019
 *
 */ 
