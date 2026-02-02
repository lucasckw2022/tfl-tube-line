# TFL Tube Line Status

A React app that displays real-time London Underground tube line statuses.

## How to Start

- Install node.js >=18.17.0
- Create .env file at the root level and add `VITE_TFL_APP_KEY`. (APP_ID is no longer in use according to the API document)
- Development mode: `yarn dev` or `npm run dev`
- Opens at http://localhost:5173

## How to Run Tests

- Run all tests: `yarn test` or `npm test`
- Watch mode: `yarn test:watch` or `npm run test:watch`
- Tests with coverage: `yarn test:coverage` or `npm run test:coverage`

## Assumptions

- Node.js >= 18.17.0 required
- `APP_ID` is no longer in used according to the https://api-portal.tfl.gov.uk/
- `VITE_TFL_APP_KEY` must be provided to run the API otherwise an error message is shown
- Expect All tube lines are being returned from the API and show only from the result
- The first data in the array `lineStatuses` to be presented as the latest real time status. No extra handling regarding `validityPeriods`

## Additional Info

- Built with Vite, React 18, TypeScript, and Styled Components
- Responsive design as requested (mobile-friendly)
- Accessibility features included (ARIA labels, roles)
- Error handling for network failures and API errors
