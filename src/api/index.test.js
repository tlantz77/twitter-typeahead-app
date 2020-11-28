import moxios from 'moxios';
import { getSearchResults } from './';

describe('getSearchResults', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  
  it('should respond with a list of twitter users if valid mention', async () => {
    const expectedResponse = [
      { id: 0, 
        name: 'HomerSimpson',
        screen_name: 'Homer',
        verified: true,
        profile_image_url: 'mockUrl'
      },
      { id: 1, 
        name: 'HomeyTheClown',
        screen_name: 'Homey',
        verified: false,
        profile_image_url: 'mockUrl'
      },
    ];
  
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {users: expectedResponse}
      })
    });
    const results = await getSearchResults('@Hom');
    expect(results).toEqual(expectedResponse);
  });
});