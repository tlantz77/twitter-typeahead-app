## Dependency Changes from initial repo

- updated React and React-dom to 16.13.1 (to use hooks)
- installed axios, enzyme, enzyme-adapter-react-16 and moxios

NOTE: after updating repo now requires Node version 10.13.0 due to dependency requirement (sorry about that).

## File structure

- React components in 'src/components'
- Api data fetching file in 'src/api'
- Image asset in 'src/assets'
- added setupTests.js and styles.css to 'src/'

I did not change execution scripts nor localhost ports so project should run as normal.  Api responses are cached in localStorage.