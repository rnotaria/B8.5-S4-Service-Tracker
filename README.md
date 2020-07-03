# Maintenance Tracker

This project is still in development...

**To view the app go to b8s4.netlify.app and select _Guest_ at the Login Page**
**Click the "?" at the top of the page to view a tutorial on how to use the app**

## Summary

The goal of this project is organize maintenance information all in one centralized location. This app will provide users information on upcoming maintenance services including instructions, where to purchase parts, etc. When a task is completed, the date and miles will be recorded which the user can reference in the future. This project was specifically built around the B8/B8.5 Audi S4 models by populating tasks for each service interval but is fully customizable and can be used for any car model by adding or removing tasks as needed. This will be described in further detail below.

The site is currently deployed using Netlify and can be viewed at b8s4.netlify.app. Once the project is polished and the backend is complete, it will be moved to an official domain.

## How to use a Custom Service Schedule Template

As mentioned, this app was designed around the maintenance schedule of a specific make and model however, allowing users to easily import their own schedule is one of the future goals. In the meantime, customizing the schedule is still incredibly easy. Inside ../src/utils/defaultData there is a JavaScipt file called "maintenanceList.js". This fine contains a function that exports an object filled with the maintenance schedule. Each property in the object is structured as follows:

```
  <Task Name>: {
    start: <integer - What miles will the task first be performed?>,
    repeat: <integer - After how many miles will the task be repeated? Use "null" if task does not repeat.>,
    title: <string - Title of task>,
    info: {
      instructions: <string - Set of instructions for the task. Use HTML for formatting>,
      notes: <string - Any additional notes for the task>,
      completionInfo: {
        complete: false,
        date: "",
        miles: "",
        notes: "",
      },
    },
  },
```

**Example:**

```
  task_1: {
    start: 5000,
    repeat: 10000,
    title: "Engine oil / Oil filter - Change oil and replace filter",
    info: {
      instructions:
        '<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/5qKOrjDnFmg" height="315" width="560"></iframe><p><br></p>',
      notes: "",
      completionInfo: {
        complete: false,
        date: "",
        miles: "",
        notes: "",
      },
    },
  },
```

## Tutorial

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
