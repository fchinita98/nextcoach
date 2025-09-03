import { editTeam, findTeam, newTeam, removeTeam } from './teamService';
import * as teamData from '../data/teamData';
jest.mock('../data/teamData');

// Clean mocks after tests
afterEach(() => {
  jest.clearAllMocks();
});

// Test newTeam
test('Throws error if mandatory fields are missing', async () => {
    const missingData = { category: 'U19', fut: 11 };

    await expect(newTeam(missingData as any)).rejects.toThrow("Mandatory fields required.")
});

// Test findTeam if found
test('Returns team if found', async () => {
    const mockTeam = { club: "AC Malveira", category: "U19", fut: 11 };
    (teamData.readTeam as jest.Mock).mockResolvedValue(mockTeam);

    const result = await findTeam('id123');
    expect(result).toBe(mockTeam)
});

// Test findTeam if not found --> Team not found
test('Throws error if not found', async () => {
    (teamData.readTeam as jest.Mock).mockResolvedValue(null);

    await expect(findTeam('id123-missing')).rejects.toThrow('Team not found');
})

// Test editTeam if updated --> True
test('Returns true when team is updated with new fields', async () => {
    const mockTeam = { club: "AC Malveira", category: "U19", fut: 9 };
    (teamData.readTeam as jest.Mock).mockResolvedValue(mockTeam);
    (teamData.updateTeam as jest.Mock).mockResolvedValue(true);

    const input = await editTeam('id123', {fut: 11});
    expect(input).toBe(true)
})

// Test removeTeam --> void
test('removes team when it exists', async () => {
  const mockTeam = { club: "AC Malveira", category: "U19", fut: 9 };

  (teamData.readTeam as jest.Mock).mockResolvedValue(mockTeam);
  (teamData.deleteTeam as jest.Mock).mockResolvedValue(undefined);

  await expect(removeTeam('id123')).resolves.toBeUndefined();
  expect(teamData.deleteTeam).toHaveBeenCalledWith('id123');
});
