
import { ObjectId } from 'mongodb';
import {getConnection, closeConnection, getCollection} from '../config/mongodb'

// CRUD 

interface Player {
    _id?: ObjectId,
    teamId: ObjectId,
    firstName: string,
    lastName: string,
    birthDate: Date,
    height: number,
    weight: number,
    foot: string,
    photoUrl?: string,
    mainPosition: string,
    secondaryPositions: string[]
}

// Create Player
async function createPlayer(data: Player): Promise<ObjectId> {
    const collection = await getCollection("players");
    const result = await collection.insertOne(data)
    return result.insertedId
}

// Read Player 
async function readPlayer(id: string): Promise<Player | null> {
    const collection = await getCollection("players");
    const objectId = new ObjectId(id)
    const result = await collection.findOne<Player>({_id: objectId})
    return result;
}

// Update Player
async function updatePlayer(id: string, update: Partial<Player>): Promise<boolean> {
    const collection = await getCollection("players");
    const objectId = new ObjectId(id);
    const result = await collection.updateOne({_id: objectId}, {$set: update})
    // return Boolean true or false if
    return result.modifiedCount > 0
}

// Delete Player
async function deletePlayer(id: string): Promise<void> {
    const collection = await getCollection("players");
    const objectId = new ObjectId(id);
    await collection.deleteOne({_id: objectId})
}

export { createPlayer, readPlayer, updatePlayer, deletePlayer, Player };