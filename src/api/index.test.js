import moxios from 'moxios';
import { getSearchResults } from './';

let mockAxiosResponse = [
  { id: 0, 
    name: 'HomerSimpson',
    screen_name: 'Homer',
    verified: true,
    profile_image_url: 'mockUrl',
    unusedField: 'stuff'
  },
  { id: 1, 
    name: 'HomeyTheClown',
    screen_name: 'Homey',
    verified: false,
    profile_image_url: 'mockUrl',
    unusedField: 'stuff'
  },
];



let expectedProcessedResults = [
  { id: 0, 
    name: 'HomerSimpson',
    screenName: '@Homer',
    verified: true,
    profileImageUrl: 'mockUrl'
  },
  { id: 1, 
    name: 'HomeyTheClown',
    screenName: '@Homey',
    verified: false,
    profileImageUrl: 'mockUrl'
  },
];


describe('getSearchResults', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  
  it('should respond with a list of twitter users if valid mention', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {users: mockAxiosResponse}
      })
    });
    const response = await getSearchResults('@Hom');
    expect(response).toEqual(expectedProcessedResults);
  });

  it('should store processed response in localStorage', () => {
    expect(localStorage.setItem.mock.calls.length).toEqual(1);
    expect(localStorage.setItem).toBeCalledWith('@Hom', JSON.stringify(expectedProcessedResults));
  });
  
  it('should return cached response for mention if present', async () => {
    const mockCachedData = JSON.stringify([{mockCachedKey:'mockCachedValue'}]);
    localStorage['@Cached'] = mockCachedData;
    localStorage.getItem.mockReturnValue(mockCachedData);

    const response = await getSearchResults('@Cached');
    expect(localStorage.getItem.mock.calls.length).toEqual(1);
    expect(localStorage.getItem).toBeCalledWith('@Cached');
    expect(response).toEqual([{mockCachedKey:'mockCachedValue'}]);
  });
});