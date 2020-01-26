import * as firebase from 'firebase';
import * as secrets from '../../../../supercalc-secrets';
import { isNull } from 'util';

interface FirebaseConfig {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string
}

interface LoginCredentials {
    email: string,
    password: string
}

class FirebaseConnectionData {


    private firebaseConfig: FirebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: ""
    };

    private loginCredentials: LoginCredentials = {
        email: "",
        password: ""
    }

    constructor() {

        this.firebaseConfig.apiKey = secrets.apiKey;
        this.firebaseConfig.authDomain = secrets.projectId + ".firebaseapp.com";
        this.firebaseConfig.databaseURL = "https://" + secrets.projectId + ".firebaseio.com";
        this.firebaseConfig.projectId = secrets.projectId;
        this.firebaseConfig.storageBucket = secrets.projectId + ".appspot.com";

        this.loginCredentials.email = secrets.email;
        this.loginCredentials.password = secrets.password;
    }

    getFirebaseConfig() {
        return this.firebaseConfig;
    }

    getLoginCredentials() {
        return this.loginCredentials;
    }

}

class ShoppingListDb {
    private __SHOPPING_LISTS_KEY: string = "lists";
    private __DESTINATIONS_LIST_KEY: string = "final_destinations";

    private db: firebase.auth.UserCredential | null;

    constructor(firebaseConfig: FirebaseConfig, loginCredentials: LoginCredentials | null) {
        firebase.initializeApp(firebaseConfig);
        this.db = null;

    }

    /**
     * 
     * @param loginCredentials 
     */
    tryConnectDB(loginCredentials: LoginCredentials | null): Promise<void> {
        if (!isNull(loginCredentials)) {
            return firebase.auth().signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password).then(
                (db) => {
                    this.db = db;
                    console.log("connesso?");
                }
            )
        } else {
            return new Promise<void>((a, r) => { });
        }
    }

    /**
     * 
     * @param path 
     */
    getUserPath(path: string): string {
        return "users/" + firebase.auth().currentUser!.uid + "/" + path;
    }





    getUserReference(key: string): firebase.database.Reference{
        return firebase.database().ref(this.getUserPath(key));
    }

    /**
     * 
     */
    getShoppingListsReference():firebase.database.Reference {
        return this.getUserReference(this.__SHOPPING_LISTS_KEY);
    }

    /**
     * 
     */
    getFinalDestinationsPath():firebase.database.Reference {
        return this.getUserReference(this.__SHOPPING_LISTS_KEY);
    }

    /**
     * 
     * @param key 
     */
    getDataFromReference(reference: firebase.database.Reference) {
        return new Promise<any>(
            (accept, reject) => {
                reference.once('value').then(
                    (dt) => { 
                        let v: any = dt.val();
                        reference.off();
                        accept(v);
                    }
                );
            }
        )
    }

    getDataFromReference2(reference: firebase.database.Reference) {
        return new Promise<any>(
            (accept, reject) => {
                reference.on ('value', 
                    (dt) => { 
                        let v: any = dt.val();
                        reference.off();
                        accept(v);
                    }
                )
            }
        )
    }

    /**
     * 
     * @param reference 
     * @param value 
     */
    setDataInReference(reference: firebase.database.Reference, value: any) {
        return new Promise<any>(
            (accept, reject) => {
                reference.set(value);
                accept(0);
            }
        )
    }

}


export { FirebaseConnectionData, ShoppingListDb };

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