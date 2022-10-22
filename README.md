# dbcsos - Digital Business Cards for International SOS

## Available Scripts

In the project directory, you can run:

### `npm install`

It downloads all the required node modules that helps for this project.
And it won't update package-lock.json. If package-lock.json needs to be updated
with latest node module's information then run "npm install" or "npm i".
Make sure that you have node version 16 or above.


### `npm run build`

Builds the app for production to the `dist` folder.\
For the best performance it optimizes the build.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

NOTE: this needs live server hook

### `npm run dev-start`

This is similar to "npm start" but concurrently it runs json server which provides
you the mock db json to your application.


## Troubleshooting

### Any issue while running "npm install", then run `npm cache clean --force' command and then run "npm install"