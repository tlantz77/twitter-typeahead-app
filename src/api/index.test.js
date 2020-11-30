import moxios from 'moxios';
import { getSearchResults } from './';

describe('getSearchResults', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  
  it.only('should respond with a list of twitter users if valid mention', async () => {
    const mockAxiosResponse = [
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

    const expectedProcessedResults = [
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
  
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {users: mockAxiosResponse}
      })
    });
    const results = await getSearchResults('@Hom');
    expect(results).toEqual(expectedProcessedResults);
  });
});