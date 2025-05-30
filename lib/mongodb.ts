import { MongoClient, type Db } from 'mongodb'

// Define global type for development mode
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

// Fix the MongoDB connection string
// Make sure you have a valid MongoDB connection URL
// For MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
// For local MongoDB: mongodb://localhost:27017/<dbname>
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

if (uri === '' || uri === undefined) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

// Simplify connection options to avoid errors
const options = {
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000   // 45 seconds
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (global._mongoClientPromise === null || global._mongoClientPromise === undefined) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase (): Promise<Db> {
  try {
    const client = await clientPromise
    // Extract database name from the URI or use default
    const dbName = uri.split('/').pop()?.split('?')[0] || 'portfolio'
    return client.db(dbName)
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}
