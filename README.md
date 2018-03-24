# bundler-friendly-aurelia

## https://discourse.aurelia.io/t/discussion-bundler-friendly-aurelia/959

- [ ] router configuration: pass module directly
- [ ] router configuration: pass function that return a promise for the module
- [x] use `@inlineView` and import html files with explicit dependencies
- [x] manual bootstrapping: set host directly
- [ ] manual bootstrapping: pass app class instead of string


## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=6.0* with NPM 3 or Yarn.

From the project folder, execute the following commands:

```shell
yarn install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally.

To run the app execute the following command:

```shell
yarn nps
```

This command starts the webpack development server that serves the build bundles.
You can now browse the skeleton app at http://localhost:8080 (or the next available port, notice the output of the command). Changes in the code
will automatically build and reload the app.

### Running with Hot Module Reload

If you wish to try out the experimental Hot Module Reload, you may run your application with the following command:

```shell
yarn nps start.hmr
```

## Feature configuration

Most of the configuration will happen in the `webpack.config.js` file.
There, you may configure advanced loader features or add direct SASS or LESS loading support.

## Bundling

To build an optimized, minified production bundle (output to /dist) execute:

```shell
yarn nps build
```

To build

To test either the development or production build execute:

```shell
yarn bps build && yarn nps serve
```

The production bundle includes all files that are required for deployment.
