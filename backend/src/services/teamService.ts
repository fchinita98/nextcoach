import { ObjectId, Collection } from 'mongodb';
import { createTeam, readTeam, readTeamByClubAndCategory, updateTeam, deleteTeam, Team } from '../data/teamData'
import { getCollection } from '../config/mongodb';

async function newTeam(data: Team): Promise<ObjectId> {
    // verificação de dados obrigatórios
    if (!data.club || !data.category || typeof data.fut !== "number") {
        throw new Error ("Missing mandatory fields.")
    }
    // verificação de dados normalizados se existe club com o mesmo nome
    const clubName = data.club.trim()
    const normalizedClub = clubName.toLowerCase()
    const category = data.category
    const existingTeam = await readTeamByClubAndCategory(normalizedClub, category)
    // se existir lança erro
    if (existingTeam !== null) {
        throw new Error (`Club ${clubName} with Category ${data.category} already exists`)
    }
    // valores de club e normalizedClub adicionados
    const newTeamData = {
        ...data,
        club: clubName,
        normalizedClub: normalizedClub
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
    // se o campo atualizado for o Club, atualizar o normalizedClub
    if (update.club) {
        const clubName = update.club.trim();
        update.club = clubName;
        update.normalizedClub = clubName.toLowerCase();
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

