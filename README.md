### About
Project is built using react, hooks, react-router, embla slider. For testing, I chose jest and jsdom. The whole testing approach is next: I render the entire app, emulate user interactions and check the final result.
There is an entity called a driver. It is just a set of methods that simulate user interactions. Each driver is responsible for a specific part of the app. One driver can contain other drivers which represent the composition of components in UI.
### How to start?
`npm i`
`npm start`


### How to run test
`npm t`
