import axios from 'axios';
import { isValidMention } from '../utilities';

const BASE_URL = 'http://localhost:4000';

export const processSearchResults = (data) => {
  return data.users.map(user => {
    const {id, name, screen_name, verified, profile_image_url} = user;
    return {
      id,
      name,
      screen_name,
      verified,
      profile_image_url
    }
  })
}

export const getSearchResults = async (mention) => {
  if (isValidMention(mention)) {
    const searchTerm = mention.substring(1);
    const searchPath = `${BASE_URL}/twitter/user/search`;
    const { data } = await axios.get(searchPath, {
      params: {
        username: searchTerm
      }
    });
    return processSearchResults(data);
  } else {
    throw new Error('Not a valid mention.')
  }
}
