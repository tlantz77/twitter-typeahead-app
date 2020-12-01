import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

//filter raw api response data into objects containing only the data that
//the app needs
export const processSearchResults = (data) => {
  return data.users.map(user => {
    const {id, name, screen_name, verified, profile_image_url} = user;
    return {
      id,
      name,
      screenName: `@${screen_name}`,
      verified,
      profileImageUrl: profile_image_url
    }
  })
}

//Makes axios call to api endpoint to fetch and cache data in localStorage
//localStorage key=mention value=fetched data
//Will check localStorage first and return data from there if it's present
export const getSearchResults = async (mention) => {
  if (localStorage[mention]) {
    return JSON.parse(localStorage.getItem(mention));
  }
  const searchTerm = mention.substring(1);
  const searchPath = `${BASE_URL}/twitter/user/search`;
  const { data } = await axios.get(searchPath, {
    params: {
      username: searchTerm
    }
  });
  const processedSearchResults = processSearchResults(data);
  localStorage.setItem(mention, JSON.stringify(processedSearchResults));
  return processedSearchResults;
}

