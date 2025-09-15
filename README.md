# TFL Tube Line Status

A React app that displays real-time London Underground tube line statuses.

## How to Start

- Install node.js >=18.17.0
- Create .env file at the root level and add `REACT_APP_TFL_APP_KEY`. (APP_ID is no longer in used according to the API document)
- Development mode: `yarn start` or `npm start`
- Opens at http://localhost:3000

## How to Run Tests

- Run all tests: `yarn test` or `npm test`
- Tests run with coverage: `yarn test` (includes `--coverage` flag)

## Assumptions

- Node.js >= 18.17.0 required
- `APP_ID` is no longer in used according to the https://api-portal.tfl.gov.uk/
- `REACT_APP_TFL_APP_KEY` must be provided to run the API otherwise show error message
- Expect All tube lines are being returned from the API and show only from the result
- The first data in the array `lineStatuses` to be presented as the latest real time status. No extra handling regarding `validityPeriods`

## Additional Info

- Built with React 18, TypeScript, and Styled Components
- Responsive design as requested (mobile-friendly)
- Accessibility features included (ARIA labels, roles)
- Error handling for network failures and API errors
