
import { ObjectId } from 'mongodb';
import {getConnection, closeConnection, getCollection} from '../config/mongodb'
import { Player } from './playerData';

// CRUD 

interface Team {
    _id?: ObjectId,
    club: string,
    teamLevel: string,
    fut: number,
    staff?: { [key: string]: string },
    players?: Player[],
}

// Create Team
async function createTeam(data: Team): Promise<ObjectId> {
    const collection = await getCollection("teams");
    const result = await collection.insertOne(data)
    return result.insertedId
}

// Read Team 
async function readTeam(id: string): Promise<Team | null> {
    const collection = await getCollection("teams");
    const objectId = new ObjectId(id)
    const result = await collection.findOne<Team>({_id: objectId})
    return result;
}

// Update Team
async function updateTeam(id: string, update: Partial<Team>): Promise<boolean> {
    const collection = await getCollection("teams");
    const objectId = new ObjectId(id);
    const result = await collection.updateOne({_id: objectId}, {$set: update})
    // return Boolean true or false if
    return result.modifiedCount > 0
}

// Delete Team
async function deleteTeam(id: string): Promise<void> {
    const collection = await getCollection("teams");
    const objectId = new ObjectId(id);
    await collection.deleteOne({_id: objectId})
}

export { createTeam, readTeam, updateTeam, deleteTeam, Team }