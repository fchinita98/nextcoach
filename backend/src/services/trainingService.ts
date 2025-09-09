import { ObjectId} from 'mongodb';
import { createTraining, readTraining, readAllTrainingsByTeam, updateTraining, deleteTraining, Training } from '../data/trainingData'

async function newTraining (data: Training): Promise<ObjectId> {
    // Validar campos obrigatórios
    if (!data.teamId) {
        throw new Error ("Mandatory fields required.")
    }
    return await createTraining(data)
}

async function findTraining (id: string): Promise<Training> {
    const training = await readTraining(id);
    if (!training) {
        throw new Error ("Training not found.")
    }
    return training;
}

async function findAllTrainingsByTeam(teamId: string): Promise<Training[]> {
    const trainings = await readAllTrainingsByTeam(teamId);
    if (!trainings) {
        throw new Error ("Trainings not found.")
    }
    return trainings || [];
}

async function editTraining(id: string, update: Partial<Training>): Promise<boolean> {
    const existingTraining = await findTraining(id)
    if (!existingTraining) {
        throw new Error ("Training not found.")
    }
    const merged = { ...existingTraining, ...update }

    if (!merged.teamId) {
        throw new Error ("Mandatory fields required.")
    }

    return await updateTraining(id, update)
}

async function removeTraining (id: string): Promise<void> {
    const training = await readTraining(id)
    if (!training) {
        throw new Error("Training not found.");
    }
    return await deleteTraining(id)
}

export { newTraining, findTraining, findAllTrainingsByTeam, editTraining, removeTraining }