# A Maze Thing

In this cross-platform Augmented Reality application, players navigate a maze to collect coins in a race against time. Players can also build their own maze to challenge friends and search for user-built mazes.

# Features

<h3>Coin Collection</h3>
<img src="./assets/collect-coin_sm.gif">

<h3>Maze Creation</h3>
<img src="./assets/create-maze.gif" width="400">

<h3>Find Maze</h3>
<img src="./assets/find-maze.gif" width="400">

### Prerequisites & Installing

Fork the project then clone via the following line:

```
git clone https://github.com/yourgithubname/A-Maze-Thing.git
```

Install the npm package with npm:

```
npm install
```

Install the Viro Media app from the <a href="https://play.google.com/store/apps/details?id=com.viromedia.viromedia&hl=en_US"> Google Playstore </a> or the <a href="https://apps.apple.com/us/app/viro-media/id1163100576">App Store </a>. <br />

Sign up for an API key from <a href="https://viromedia.com/signup">ViroMedia</a>. <br />

In your A-Maze-Thing directory root, create a file called secrets.js with the following format:

```javascript
export const secret = {
   apiKey: 'YOUR VIRO API KEY',
   mapBox: '',
};
```

In the terminal of the root directory run:

```
npm start
```

In the ViroMedia application on your mobile device click the hamburger menu on the top left:
<img src="./assets/hamburger.gif" width="400" />

Click enter testbed:
<img src="./assets/testbed.jpg" width="400" />

Enter your ngrok endpoint, located in your terminal:
<img src="./assets/ngrok.png" width="400" />

Enjoy!

## Built With

-  [React Native](https://facebook.github.io/react-native/) - Framework for Android and ios
-  [Node.js](https://nodejs.org/en/) - JavaScript Runtime
-  [Viro](https://viromedia.com/) - AR/VR Library
-  [Axios](https://www.npmjs.com/package/axios) - HTTP client

## Authors

-  **Kevin Lin** - _Developer_
-  **Alex Yi** - _Developer_
-  **Edward Lee** - _Developer_
-  **Alana "Ani" Kerr** - _Developer_

## Acknowledgments

-  <b>Ben Rodriguez @b17z</b>
-  <b>John McDonald @johnptmcdonald</b>
-  <b>Eric Folks @efolks</b>
