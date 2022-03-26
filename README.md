# My Stats CSGO

## Description

The goal of this app is:

- List all my profiles.
- Per each profiles list all stats.
- Show a spinner while data is being loaded.
- Paging the stats if is it necessary.
- Display stats by frofile for each stats in list.
- Go to a profile/stats details screen when tapping a single profile.
- Show stats general together with an avatar based on stats profile.

Plus:

- If API endpoint returns error for some reason, this app show a button that allow user to refetch the characters and his homeworlds for a better UX.
- Paginating profiles/stats list.


## Code quality:

This project use this tools in order to create a consistent codebase, improve developer performance and reduce bugs:

- Eslint: Javascript linter
- Prettier: Code formater
- EditorConfig: Code consistence between OS and IDEs.

## Next steps

### Code

- Add Typescript to improve DX and minimize bugs.
- Add unit, snapshot and integration tests using jest and react native testing library.
- Add CI/CD for this project.
- Add fastlane to deploy this project in Apple Store and Play Store.
- Swap library react-native-avataaars because this library has a bad performance. It uses a webview under the hood. We can use a Image or Giphy to improve the UX (or create our own library).

### UX

- Add Animation in FlatList for a smooth fadeIn when scroll.
- Add a TabBar to render People, Planet and Films.
- Add SplashScreen.
- Accessibility.


## Development Dependencies 

<p>This project uses the following dependencies:</p>

- <p><strong>Axios: </strong> HTTP connections</p>
<pre>npm install --save axios</pre>

- <p><strong>Router dom: </strong> It is a router that allows you to rewrite sections of a page instead of loading entire new pages from a SPA-like server.</p>
<pre>npm install --save react-router-dom</pre>

- <p><strong>Redux</strong></p>
<p>
It allows me to store my state in a Store, this state will only be able to change through actions</p>
<pre>npm install --save redux</pre>

- <p><strong>React-redux:</strong> It allows me to store my state in a Store, this state will only be able to change through actions</p>
<pre>npm install --save react-redux</pre>

- <p><strong>Redux-thunk:</strong> It allows to connect with the action and instead of returning an object it returns a function with an asynchronous action</p>
<pre>npm install --save redux-thunk</pre>

## Run project

In root folder, run:

ios:

```javascript
yarn build-and-run:ios
```

android:

```javascript
yarn build-and-run:android
```

## Other commands:

Install dependencies:

```javascript
yarn
```

Start bundler:

```javascript
yarn start
```

Run lint:

```javascript
yarn lint
```

Run lint fix:

```javascript
yarn lint-fix
```

