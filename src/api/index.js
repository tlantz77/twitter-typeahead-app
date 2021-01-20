import axios from 'axios';

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
  const { data } = await axios.get('/twitter/user/search', {
    params: {
      username: searchTerm
    }
  });
  console.log("DATA IN GETSEARCHRESULTS:", data)
  const processedSearchResults = processSearchResults(data);
  localStorage.setItem(mention, JSON.stringify(processedSearchResults));
  return processedSearchResults;
}

