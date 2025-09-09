import { ObjectId } from 'mongodb';
import { createPlayer, readPlayer, readAllPlayersByTeam, updatePlayer, deletePlayer, Player } from '../data/playerData'

async function newPlayer (data: Player): Promise<ObjectId> {
    // Validar campos preenchidos
    if (!data.teamId || !data.firstName || !data.lastName || !data.mainPosition) {
        throw new Error ("Mandatory fields required.")
    }
    return await createPlayer(data)
}

async function findPlayer (id: string): Promise<Player> {
    const player = await readPlayer(id);
    if (!player) {
        throw new Error ("Player not found.")
    }
    return player;
}

async function findAllPlayersByTeam(teamId: string): Promise<Player[]> {
    const players = await readAllPlayersByTeam(teamId);
    if (!players) {
        throw new Error ("Players not found.")
    }
    return players || [];
}

async function editPlayer (id: string, update: Partial<Player>): Promise<boolean> {
    const existingPlayer = await findPlayer (id)
    if (!existingPlayer) {
        throw new Error ("Player not found.")
    }
    const merged = { ...existingPlayer, ...update }

    // Validar campos obrigatórios continuam preenchidos
    if (!merged.teamId || !merged.firstName || !merged.lastName || !merged.mainPosition) {
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

export { newPlayer, findPlayer, findAllPlayersByTeam, editPlayer, removePlayer }