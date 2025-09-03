import { normalizeText } from "./normalize";

// Clean mocks after tests
afterEach(() => {
  jest.clearAllMocks();
});

test('normalize text', () => {
    const input = '   ÁC   Malveira  ';
    const output = normalizeText(input);
    expect(output).toBe('acmalveira');
})