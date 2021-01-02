# Scrabble Club App

This app is a front-end for app showing leader board of Scrabble players. Mock API is configured in `docker-compose.yml` file.

To run locally, in project folder use `docker-compose up` to run the API and `npm start` to run the front-end.

## Features contained

* A leaderboard screen showing 10 results, sortable by the number of wins or the average scores
* Each result displays the user's name, number of wins, number of losses and average score
* Popup with user details shows up when a user is clicked; besides numbers mentioned above, it also shows user's game with highest score and up to 5 details of won games
* A user's name, email and username are editable

## Technologies used

App is built in [React](https://reactjs.org/), the project scaffolding was created with [Create React App](https://github.com/facebook/create-react-app).
[Redux](https://redux.js.org/) is used for state management. 
