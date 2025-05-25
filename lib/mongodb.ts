import { MongoClient, type Db } from 'mongodb'

// Define global type for development mode
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI as string

if (uri === '' || uri === undefined) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

// These options are no longer needed in newer MongoDB driver versions
const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  maxPoolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false // Disable mongoose buffering
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
    return client.db('portfolio')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}
