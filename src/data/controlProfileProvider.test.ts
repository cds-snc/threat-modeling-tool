import { getControlProfileByName } from './controlProfileProvider';


describe('controlProfileProvider', () => {
  it('should return the profile for the given name', () => {
    const profile = getControlProfileByName('CCCS Medium');
    expect(profile).toBeDefined();
  });

  it('should return the default profile if the given name does not exist', () => {
    const profile = getControlProfileByName('Non-existent profile');
    expect(profile).toBeDefined();
  });
});
