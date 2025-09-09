import { ObjectId } from 'mongodb';
import { createTeam, readTeam, readAllTeams, readTeamByClubAndCategory, updateTeam, deleteTeam, Team } from '../data/teamData'
import { normalizeText } from '../utils/normalize'

async function newTeam(data: Team): Promise<ObjectId> {
    // verificação de dados obrigatórios
    if (!data.club || !data.category || typeof data.fut !== "number") {
        throw new Error ("Mandatory fields required.")
    }
    // verificação de dados normalizados se existe club com o mesmo nome
    const normalizedClub = normalizeText(data.club)
    const category = data.category
    const existingTeam = await readTeamByClubAndCategory(normalizedClub, category)
    // se existir lança erro
    if (existingTeam !== null) {
        throw new Error (`Club ${data.club} with Category ${data.category} already exists`)
    }
    // valores de club e normalizedClub adicionados
    const newTeamData = {
        ...data,
        club: data.club.trim(),
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

async function findAllTeams(): Promise<Team[]> {
    const teams = await readAllTeams();
    if (!teams) {
        throw new Error ("Teams not found.")
    }
    // retorna lista ordenada alfabeticamente
    return teams.sort((a, b) => a.club.localeCompare(b.club));
}


async function editTeam(id: string, update: Partial<Team>): Promise<boolean> {
    const team = await readTeam(id);
    if (!team) {
        throw new Error("Team not found");
    }
    // se o campo atualizado for o Club, atualizar o normalizedClub
    if (update.club) {
        const clubName = update.club.trim();
        update.normalizedClub = normalizeText(clubName);
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

export { newTeam, findTeam, findAllTeams, editTeam, removeTeam }

