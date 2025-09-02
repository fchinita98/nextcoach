import { ObjectId } from 'mongodb';
import { createPlayer, readPlayer, updatePlayer, deletePlayer, Player } from '../data/playerData'
import { getCollection } from '../config/mongodb';

async function newPlayer (data: Player): Promise<ObjectId> {
    // Validar campos preenchidos
    if (!data.team || !data.firstName || !data.lastName || !data.mainPosition) {
        throw new Error ("Mandatory fields required.")
    }
    return await createPlayer(data)
}

async function findPlayer (id: string): Promise<Player | null> {
    return await readPlayer(id)
}

async function editPlayer (id: string, update: Partial<Player>): Promise<boolean> {
    const existingPlayer = await findPlayer (id)
    if (!existingPlayer) {
        throw new Error ("Player not found.")
    }
    const merged = { ...existingPlayer, ...update }

    // Validar campos obrigatórios continuam preenchidos
    if (!merged.team || !merged.firstName || !merged.lastName || !merged.mainPosition) {
        throw new Error ("Mandatory fields required.")
    }
    return await updatePlayer (id, update)
}

async function removePlayer (id: string): Promise<void> {
    const player = await readPlayer(id)
    if (!player) {
        throw new Error("Team not found");
    }
    return await deletePlayer (id)
}

export { newPlayer, findPlayer, editPlayer, removePlayer }