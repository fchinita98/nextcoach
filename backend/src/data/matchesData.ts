
import { ObjectId } from 'mongodb';
import {getConnection, closeConnection, getCollection} from '../config/mongodb'
import { Player } from './playerData';

// CRUD 

interface Match {
    _id?: ObjectId,
    type: string,
    game: number | null,
    date: Date,
    place: string,
    schedule: string,
    callUpList: Player[],
    lineup: Player[],
    substitutes: Player[]
}

// Create Match
async function createMatch(data: Match): Promise<ObjectId> {
    const collection = await getCollection("matches");
    const result = await collection.insertOne(data)
    return result.insertedId
}

// Read Match 
async function readMatch(id: string): Promise<Match | null> {
    const collection = await getCollection("matches");
    const objectId = new ObjectId(id)
    const result = await collection.findOne<Match>({_id: objectId})
    return result;
}

// Update Match
async function updateMatch(id: string, update: Partial<Match>): Promise<boolean> {
    const collection = await getCollection("matches");
    const objectId = new ObjectId(id);
    const result = await collection.updateOne({_id: objectId}, {$set: update})
    // return Boolean true or false if
    return result.modifiedCount > 0
}

// Delete Match
async function deleteMatch(id: string): Promise<void> {
    const collection = await getCollection("matches");
    const objectId = new ObjectId(id);
    await collection.deleteOne({_id: objectId})
}

export { createMatch, readMatch, updateMatch, deleteMatch, Match };