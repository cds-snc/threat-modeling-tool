import controlProfiles from './controlProfiles.json';

export const getControlProfileByName = (name: string) => {
  let profiles = controlProfiles.securityProfiles.reduce((acc, cur) => {
    acc[cur.schema] = cur.controls;
    return acc;
  }, {});
  if (profiles[name] == undefined) {
    return profiles['CCCS Medium'];
  }
  return profiles[name];
};