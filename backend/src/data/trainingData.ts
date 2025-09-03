
import { ObjectId } from 'mongodb';
import {getConnection, closeConnection, getCollection} from '../config/mongodb'

// CRUD 

interface Training {
    _id?: ObjectId,
    teamId: ObjectId,
    trainingNumber: number,
    date: Date,
    theme: string,
    place: string,
    schedule: string,
    attendance: ObjectId[],
    notes?: string
}

// Create Training
async function createTraining(data: Training): Promise<ObjectId> {
    const collection = await getCollection("trainings");
    const result = await collection.insertOne(data)
    return result.insertedId
}

// Read Training 
async function readTraining(id: string): Promise<Training | null> {
    const collection = await getCollection("trainings");
    const objectId = new ObjectId(id)
    const result = await collection.findOne<Training>({_id: objectId})
    return result;
}

// Update Training
async function updateTraining(id: string, update: Partial<Training>): Promise<boolean> {
    const collection = await getCollection("trainings");
    const objectId = new ObjectId(id);
    const result = await collection.updateOne({_id: objectId}, {$set: update})
    // return Boolean true or false if
    return result.modifiedCount > 0
}

// Delete Training
async function deleteTraining(id: string): Promise<void> {
    const collection = await getCollection("trainings");
    const objectId = new ObjectId(id);
    await collection.deleteOne({_id: objectId})
}

export { createTraining, readTraining, updateTraining, deleteTraining, Training };