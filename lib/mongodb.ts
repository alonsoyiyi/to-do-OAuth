import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Por favor, define la variable de entorno MONGODB_URI");
}

const options = {
  useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Usar el cliente global en desarrollo
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, crear un nuevo cliente
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
