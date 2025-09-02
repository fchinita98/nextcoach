import { ObjectId} from 'mongodb';
import { createTraining, readTraining, updateTraining, deleteTraining, Training } from '../data/trainingData'

async function newTraining (data: Training): Promise<ObjectId> {
    // Validar campos obrigatórios
    if (!data.team) {
        throw new Error ("Mandatory fields required.")
    }
    return await createTraining(data)
}

async function findTraining (id: string): Promise<Training | null> {
    return await readTraining (id)
}

async function editTraining(id: string, update: Partial<Training>): Promise<boolean> {
    const existingTraining = await findTraining(id)
    if (!existingTraining) {
        throw new Error ("Training not found!")
    }
    const merged = { ...existingTraining, ...update }

    if (!merged.team) {
        throw new Error ("Mandatory fields required.")
    }

    return await updateTraining(id, update)
}

async function removeTraining (id: string): Promise<void> {
    const training = await readTraining(id)
    if (!training) {
        throw new Error("Team not found");
    }
    return await deleteTraining(id)
}

export { newTraining, findTraining, editTraining, removeTraining }