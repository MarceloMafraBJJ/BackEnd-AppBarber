const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("workshoptdc"))
    .catch(err => console.log(err))

/* function findAll() {
    return global.conn.collection("customers").find().toArray();
}*/
 
function findAll() {
    return global.conn.collection("usuarios").find().toArray();
}

function findAllBarbers() {
    return global.conn.collection("barbeiros").find().toArray();
}

function findOneBarbeiro(req) {  
     const barber = req.body.idBarbeiro;
     return global.conn.collection("servicos").findOne({idBarbeiro : barber});
    // return global.conn.collection("servicos").find().toArray();
}

function findOneFavorite(req) {  
     const barber = req.body.idBarbeiro;
     return global.conn.collection("servicos").findOne({idBarbeiro : barber});
    // return global.conn.collection("servicos").find().toArray();
}

/* function findAllBarber() {
    return global.conn.collection("barbeiros").find().toArray();
} */

function insert(customer) {
    return global.conn.collection("customers").insertOne(customer);
}

/* const ObjectId = require("mongodb").ObjectId;
function findOne(id) {
    return global.conn.collection("customers").findOne(new ObjectId(id));
} */
 
function findOne(email, senha) {
    return global.conn.collection("usuarios").findOne(email, senha);
}

function update(id, customer) {
    return global.conn.collection("customers").updateOne({ _id: new ObjectId(id) }, { $set: customer });
}

function deleteOne(id) {
    return global.conn.collection("customers").deleteOne({ _id: new ObjectId(id) });
}
 
module.exports = { findAll, insert, findOne, update, deleteOne, findAllBarbers, findOneBarbeiro, findOneFavorite }








