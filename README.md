### This application is written in JavaScript to display the front end and Python to handle the backend and MySQL to save the data.

### To run this application requires installing the packages required to run the Flask(Py)-app and React(JS)-app 
and have terminals running for the Flask and React app simultaniously. 

------------------------------------------- Install Flask Packages -------------------------------------------
### Depending on your Python setup you may need to use -

### `python -m pip`
  or just 
### `pip`

Make sure to cd into "server" folder, parallel to flask_server folder.
Packages need to be installed to pipenv shell.
______________________________________________________________________
1. ### `python -m pip install flask ` \
(to enter python shell and install packages to shell) \
2. `python -m pipenv shell` \
3. `python -m pip flask_bcrypt` \
4. `python -m pip pymysql` \
RUN FLASK SERVER
----------------
### `python server.py`

------------------------------------------- Install React Packages -------------------------------------------
## First you must install node_modules which is not posted to github because .gitignore
## To install node_modules cd into "client-master" folder
### `npm i`
(i is short-cut for install)

### Must install axios to make requests to Python server
2. ### `npm i axios` \
Need to install react-router-dom which allows front end routes to work
3. ### `npm i react-router-dom`\

## Tailwind was used to customize front end, may or may need to be installed. 
4. ### `npm i -D tailwindcss` \
5. ### `npx tailwindcss init` \
RUN REACT SERVER \
----------------
### `npm start`

### These should be all the packages necessary to run this application! If anything is missing from the Python server 
### it should be indicated and sugested in the terminal. 

Thanks for stopping by!! :)
 
