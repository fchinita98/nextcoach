import { editPlayer, findPlayer, newPlayer, removePlayer } from './playerService';
import * as playerData from '../data/playerData';
jest.mock('../data/playerData');

// Clean mocks after tests
afterEach(() => {
  jest.clearAllMocks();
});

// Test newPlayer
test('Throws error if mandatory fields are missing', async () => {
    const missingData = { teamId: 'teamId123', firstName: "Guilherme", lastName: "Santos" };

    await expect(newPlayer(missingData as any)).rejects.toThrow("Mandatory fields required.")
});
/*
// Test findPlayer if found
test('Returns player if found', async () => {
    const mockPlayer = { club: "AC Malveira", category: "U19", fut: 11 };
    (playerData.readPlayer as jest.Mock).mockResolvedValue(mockPlayer);

    const result = await findPlayer('id123');
    expect(result).toBe(mockPlayer)
});

// Test findPlayer if not found --> Player not found
test('Throws error if not found', async () => {
    (playerData.readPlayer as jest.Mock).mockResolvedValue(null);

    await expect(findPlayer('id123-missing')).rejects.toThrow('Player not found');
})

// Test editPlayer if updated --> True
test('Returns true when Player is updated with new fields', async () => {
    const mockPlayer = { club: "AC Malveira", category: "U19", fut: 9 };
    (playerData.readPlayer as jest.Mock).mockResolvedValue(mockPlayer);
    (playerData.updatePlayer as jest.Mock).mockResolvedValue(true);

    const input = await editPlayer('id123', {fut: 11});
    expect(input).toBe(true)
})

// Test removePlayer --> void
test('removes Player when it exists', async () => {
  const mockPlayer = { club: "AC Malveira", category: "U19", fut: 9 };

  (playerData.readPlayer as jest.Mock).mockResolvedValue(mockPlayer);
  (playerData.deletePlayer as jest.Mock).mockResolvedValue(undefined);

  await expect(removePlayer('id123')).resolves.toBeUndefined();
  expect(playerData.deletePlayer).toHaveBeenCalledWith('id123');
});
*/