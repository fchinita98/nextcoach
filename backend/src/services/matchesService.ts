import { ObjectId } from 'mongodb';
import { createMatch, readMatch, readAllMatchesByTeam, updateMatch, deleteMatch, Match } from '../data/matchesData'

async function newMatch (data: Match): Promise<ObjectId> {
    // Validar campos obrigatórios
    if (!data.teamId || !data.type || !data.opponent) {
        throw new Error ("Mandatory fields required.")
    }
    const matchData = {
        ...data,
        isFinished: false
    }
    return await createMatch(matchData)
};

async function findMatch (id: string): Promise<Match> {
    const match = await readMatch(id);
    if (!match) {
        throw new Error ("Match not found.")
    }
    return match;
}

async function findAllMatchesByTeam(teamId: string): Promise<Match[]> {
    const matches = await readAllMatchesByTeam(teamId);
    if (!matches) {
        throw new Error ("Matches not found.")
    }
    return matches || [];
}

async function editMatch (id: string, update: Partial<Match>): Promise<boolean> {
    const existingMatch = await findMatch(id)

    if (!existingMatch) {
        throw new Error ("Match not found.")
    }

    const merged = { ...existingMatch, ...update }

    // Validar campos obrigatórios
    if (!merged.teamId || !merged.type || !merged.opponent) {
        throw new Error ("Mandatory fields required.")
    }
    return await updateMatch(id, update)
}

async function removeMatch (id: string): Promise<void> {
    const match = await readMatch(id);
    if (!match) {
    throw new Error("Match not found");
    }
    return await deleteMatch(id)
}

export { newMatch, findMatch, findAllMatchesByTeam, editMatch, removeMatch }