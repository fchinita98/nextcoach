import { editMatch, findMatch, newMatch, removeMatch } from './matchesService';
import * as matchesData from '../data/matchesData';
jest.mock('../data/matchesData');

// Clean mocks after tests
afterEach(() => {
  jest.clearAllMocks();
});

// Test newMatch
test('Throws error if mandatory fields are missing', async () => {
    // missing teamId
    const missingData = { type: 'friendly', opponent: 'CF Estrela Amadora' };

    await expect(newMatch(missingData as any)).rejects.toThrow("Mandatory fields required.")
});


// Test findMatch if found
test('Returns Match if found', async () => {
    const mockMatch = { teamId: "teamId123", type: "friendly", opponent: "CF Estrela Amadora" };
    (matchesData.readMatch as jest.Mock).mockResolvedValue(mockMatch);

    const result = await findMatch('matchid123');
    expect(result).toBe(mockMatch)
});

// Test findMatch if not found --> Match not found
test('Throws error if not found', async () => {
    (matchesData.readMatch as jest.Mock).mockResolvedValue(null);

    await expect(findMatch('matchId456-missing')).rejects.toThrow('Match not found.');
})

// Test editMatch if updated --> True
test('Returns true when Match is updated with new fields', async () => {
    const mockMatch = { teamId: "teamId123", type: "friendly", opponent: "CF Estrela Amadora" };
    (matchesData.readMatch as jest.Mock).mockResolvedValue(mockMatch);
    (matchesData.updateMatch as jest.Mock).mockResolvedValue(true);

    const input = await editMatch("matchId456", {opponent: "Atlético CP"});
    expect(input).toBe(true)
})


// Test removeMatch --> void
test('removes Match when it exists', async () => {
  const mockMatch = { teamId: "teamId123", type: "friendly", opponent: "CF Estrela Amadora" };

  (matchesData.readMatch as jest.Mock).mockResolvedValue(mockMatch);
  (matchesData.deleteMatch as jest.Mock).mockResolvedValue(undefined);

  await expect(removeMatch('matchId456')).resolves.toBeUndefined();
  expect(matchesData.deleteMatch).toHaveBeenCalledWith('matchId456');
});

