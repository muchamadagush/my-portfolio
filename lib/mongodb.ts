import { MongoClient, type Db } from 'mongodb'

// Define global type for development mode
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI as string
// These options are no longer needed in newer MongoDB driver versions
const options = {}

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
  const client = await clientPromise
  return client.db('portfolio')
}
