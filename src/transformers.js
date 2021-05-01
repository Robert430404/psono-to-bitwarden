import { noteItem, loginItem, sourcePsonoTypes } from './types.js';

export const transformItem = (item) => {
  // Check if we have what should be translated as a note
  if ([sourcePsonoTypes.note, sourcePsonoTypes.bookmark].includes(item.type)) {
    return {
      type: noteItem,
      name: item.name,
      secureNote: {},
    };
  }

  // Otherwise assume it's a login
  let note;

  const credentials = {};

  if (item.website_password_username) {
    credentials.username = item.website_password_username;
  }

  if (item.website_password_password) {
    credentials.password = item.website_password_password;
  }

  if (item.website_password_notes) {
    note = item.website_password_notes;
  }

  if (item.website_password_url) {
    credentials.uris = [
      {
        match: null, // Use default matching algo
        uri: item.website_password_url,
      },
    ];
  }

  return {
    type: loginItem,
    name: item.name,
    login: credentials,
    note,
  };
};
