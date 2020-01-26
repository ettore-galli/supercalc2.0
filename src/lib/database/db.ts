import * as sldb from './shoppling-list-db';

let fcd: sldb.FirebaseConnectionData = new sldb.FirebaseConnectionData();

console.log(fcd.getFirebaseConfig());
console.log(fcd.getLoginCredentials());

let sld: sldb.ShoppingListDb = new sldb.ShoppingListDb(
    fcd.getFirebaseConfig(),
    fcd.getLoginCredentials()
);





sld.tryConnectDB(fcd.getLoginCredentials()).then(
    async () => {
        let testref = sld.getUserReference("test");

        await sld.setDataInReference(testref, { "x": 3, "y": 2 });

        await sld.getDataFromReference(testref).then(
            (ds) => {
                console.log(ds)
            }
        )
        
        console.log("post get");
        
        
    }

    
)





