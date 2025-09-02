import { ObjectId, Collection } from 'mongodb';
import { createTeam, readTeam, updateTeam, deleteTeam, Team } from '../data/teamData'
import { getCollection } from '../config/mongodb';

async function newTeam(data: Team): Promise<ObjectId> {
    const collection = await getCollection("teams");
    // verificação de dados obrigatórios
    if (!data.club || !data.category || typeof data.fut !== "number") {
        throw new Error ("Missing mandatory fields.")
    }
    // verificação de dados normalizados se existe club com o mesmo nome
    const clubName = data.club.trim()
    const clubSlug = clubName.toLowerCase()
    const existingTeams = await collection.find({clubSlug: clubSlug, category: data.category}).toArray();
    // se existir lança erro
    if (existingTeams.length > 0) {
        throw new Error (`Club ${clubName} with Category ${data.category} already exists`)
    }
    // valores de club e clubSlug adicionados
    const newTeamData = {
        ...data,
        club: clubName,
        clubSlug: clubSlug
    }
    // criar equipa e retorna ID
    return await createTeam(newTeamData)
}

async function findTeam(id: string): Promise<Team | null> {
    const team = await readTeam(id);
    if (!team) {
        throw new Error ("Team not found")
    }
    return team;
}

async function editTeam(id: string, update: Partial<Team>): Promise<boolean> {
    const team = await readTeam(id);
    if (!team) {
        throw new Error("Team not found");
    }
    // se o campo atualizado for o Club, atualizar o clubSlug
    if (update.club) {
        const clubName = update.club.trim();
        update.club = clubName;
        update.clubSlug = clubName.toLowerCase();
    }

    return await updateTeam(id, update)
}

async function removeTeam(id: string): Promise<void> {
    const team = await readTeam(id)
    if (!team) {
        throw new Error("Team not found");
    }
    return await deleteTeam(id)
}

export { newTeam, findTeam, editTeam, removeTeam }

