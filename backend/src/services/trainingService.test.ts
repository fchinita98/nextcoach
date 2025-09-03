import { editTraining, findTraining, newTraining, removeTraining } from './trainingService';
import * as trainingData from '../data/trainingData';
jest.mock('../data/trainingData');

// Clean mocks after tests
afterEach(() => {
  jest.clearAllMocks();
});

// Test newTraining
test('Throws error if mandatory fields are missing', async () => {
    // missing teamId
    const missingData = {};

    await expect(newTraining(missingData as any)).rejects.toThrow("Mandatory fields required.")
});

// Test findTraining if found
test('Returns training if found', async () => {
    const mockTraining = { teamId: "teamId123" };
    (trainingData.readTraining as jest.Mock).mockResolvedValue(mockTraining);

    const result = await findTraining('trainingId456');
    expect(result).toBe(mockTraining)
});

// Test findTraining if not found --> Training not found
test('Throws error if not found', async () => {
    (trainingData.readTraining as jest.Mock).mockResolvedValue(null);

    await expect(findTraining('trainingId456-missing')).rejects.toThrow('Training not found.');
})

// Test editTraining if updated --> True
test('Returns true when training is updated with new fields', async () => {
    const mockTraining = { teamId: "teamId123" };
    (trainingData.readTraining as jest.Mock).mockResolvedValue(mockTraining);
    (trainingData.updateTraining as jest.Mock).mockResolvedValue(true);

    const input = await editTraining("trainingId456", {place: "Campo José Alegre"});
    expect(input).toBe(true)
})

// Test removeTraining --> void
test('removes Training when it exists', async () => {
  const mockTraining = { teamId: "teamId123" };

  (trainingData.readTraining as jest.Mock).mockResolvedValue(mockTraining);
  (trainingData.deleteTraining as jest.Mock).mockResolvedValue(undefined);

  await expect(removeTraining('trainingId456')).resolves.toBeUndefined();
  expect(trainingData.deleteTraining).toHaveBeenCalledWith('trainingId456');
});

