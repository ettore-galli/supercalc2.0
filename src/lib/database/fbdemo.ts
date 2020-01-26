import * as firebase from 'firebase';

console.log("***** FIREBASE DEMO / TEST *****");

/* var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  }; */
let projectId = "supercalc2-ettore-galli";
let apiKey = "AIzaSyBkVJJFgvupOu3xCif5_xIJyz7rDIaJi80";

let email = "ettore.galli@email.it";
let password = "p455w0rd";

let firebaseConfig = {
    apiKey: apiKey,
    authDomain: projectId + ".firebaseapp.com",
    databaseURL: "https://" + projectId + ".firebaseio.com",
    projectId: projectId,
    storageBucket: projectId + ".appspot.com"
};
firebase.initializeApp(firebaseConfig);

function getUserPath(path: string): string {
    return "users/" + firebase.auth().currentUser.uid + "/" + path;
}

firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
        function (db) {

            let userId = firebase.auth().currentUser.uid;
            console.log("userId", userId);

            let test_path = "test";
            firebase.database().ref(getUserPath(test_path)).set({ data: "prova" })
                .then(
                    () => {
                        return firebase.database().ref(getUserPath(test_path)).once('value');
                    }

                ).then(
                    (dt) => {
                        console.log(dt.val());
                    }
                )


        }


    )
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERRORE AUTENTICAZIONE", errorCode, errorMessage);
    });
/**
 * CLIENTE 2758952 FATTURA 3190422084 DEL 19-12-2019
 * 
 */