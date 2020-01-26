"use strict";
exports.__esModule = true;
var firebase = require("firebase");
var secrets = require("../../../../supercalc-secrets");
var util_1 = require("util");
var FirebaseConnectionData = /** @class */ (function () {
    function FirebaseConnectionData() {
        this.firebaseConfig = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: ""
        };
        this.loginCredentials = {
            email: "",
            password: ""
        };
        this.firebaseConfig.apiKey = secrets.apiKey;
        this.firebaseConfig.authDomain = secrets.projectId + ".firebaseapp.com";
        this.firebaseConfig.databaseURL = "https://" + secrets.projectId + ".firebaseio.com";
        this.firebaseConfig.projectId = secrets.projectId;
        this.firebaseConfig.storageBucket = secrets.projectId + ".appspot.com";
        this.loginCredentials.email = secrets.email;
        this.loginCredentials.password = secrets.password;
    }
    FirebaseConnectionData.prototype.getFirebaseConfig = function () {
        return this.firebaseConfig;
    };
    FirebaseConnectionData.prototype.getLoginCredentials = function () {
        return this.loginCredentials;
    };
    return FirebaseConnectionData;
}());
exports.FirebaseConnectionData = FirebaseConnectionData;
var ShoppingListDb = /** @class */ (function () {
    function ShoppingListDb(firebaseConfig, loginCredentials) {
        this.__SHOPPING_LISTS_KEY = "lists";
        this.__DESTINATIONS_LIST_KEY = "final_destinations";
        firebase.initializeApp(firebaseConfig);
        this.db = null;
    }
    /**
     *
     * @param loginCredentials
     */
    ShoppingListDb.prototype.tryConnectDB = function (loginCredentials) {
        var _this = this;
        if (!util_1.isNull(loginCredentials)) {
            return firebase.auth().signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password).then(function (db) {
                _this.db = db;
                console.log("connesso?");
            });
        }
        else {
            return new Promise(function (a, r) { });
        }
    };
    /**
     *
     * @param path
     */
    ShoppingListDb.prototype.getUserPath = function (path) {
        return "users/" + firebase.auth().currentUser.uid + "/" + path;
    };
    ShoppingListDb.prototype.getUserReference = function (key) {
        return firebase.database().ref(this.getUserPath(key));
    };
    /**
     *
     */
    ShoppingListDb.prototype.getShoppingListsReference = function () {
        return this.getUserReference(this.__SHOPPING_LISTS_KEY);
    };
    /**
     *
     */
    ShoppingListDb.prototype.getFinalDestinationsPath = function () {
        return this.getUserReference(this.__SHOPPING_LISTS_KEY);
    };
    /**
     *
     * @param key
     */
    ShoppingListDb.prototype.getDataFromReference = function (reference) {
        return new Promise(function (accept, reject) {
            reference.once('value').then(function (dt) {
                var v = dt.val();
                reference.off();
                accept(v);
            });
        });
    };
    ShoppingListDb.prototype.getDataFromReference2 = function (reference) {
        return new Promise(function (accept, reject) {
            reference.on('value', function (dt) {
                var v = dt.val();
                reference.off();
                accept(v);
            });
        });
    };
    /**
     *
     * @param reference
     * @param value
     */
    ShoppingListDb.prototype.setDataInReference = function (reference, value) {
        return new Promise(function (accept, reject) {
            reference.set(value);
            accept(0);
        });
    };
    return ShoppingListDb;
}());
exports.ShoppingListDb = ShoppingListDb;
/**
 *
 *

Rispondo, qui nella "root" deli commenti, un po' a tutti quelli che mi hanno scritto finora.

Innanzitutto grazie per l'attenzione al mio post, i consigli arrivati finora sono molto interessanti e li approfonditò tutti.

Spiego però un po' meglio il mio caso

* Il progetto:

Il progetto è didattico, sarà una pwa, e sarà didattico più nel senso di react e typescript che nel senso del database.
Dovrà gestire "quattro dati in croce" (delle liste della spesa con ben pochi campi ma con molta logica e post elaborazione) per cui probabilmente sql o no sql è quasi indifferente; i database relazionali li conosco decisamente bene (forse Oracle e SQL server un po' meno degli altri ma me li sono fatti passare quasi tutti, Informix incluso, siete autorizzati a vomitare :-) )
Vorrei legarmi il meno possibile ad uno o all'altro database, il componente della app che si occuperà della persistenza dovrà semplicemente caricare e salvare una di queste "liste della spesa" che sarà un semplice array di json "piatti" (campo/valore), poi tutta l'elaborazione avverrà localmente.
La dipendenza della app dal tipo di database dovrà essere tenuta al minimo.

* La scelta del DB e la neccessità del DB "hostato" online:

Di app ne ho già una funzionante (in javascript) che però salva nell' Indexed DB del browser; di qui la scelta di un NO SQL da usare per persistere i dati in modo più stabile ma mantenendo lo stesso pattern ; probabilmente farebbe degli snapshot di queste liste oppure ne gestirebbe l'archivio in modo un po piu tradizionale, non lo so devo vedere in opera come riesce meglio.
In una parola, non ho e mi piacerebbe non dover fare un back end, servendo solo per lo storage, perchè non è nello scopo della app.

Non escludo comunque alcuna strada.

Ciao a tutti e ancora grazie



 */ 
