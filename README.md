
# Angular Testing

This repository is updated to Angular v12, and there is a  package-lock.json file available, for avoiding semantic versioning installation issues.

## Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

```bash
npm install -g @angular/cli 
```


## How To run this app

Its also possible to install the modules using the following command:

```bash
npm install 
```

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

## To Run the Development Backend Server

We can start the sample application backend with the following command:

```bash
npm run server
```

This is a small Node REST API server.

## To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

```bash
npm start
``` 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

## To run test without `hot reloading`

```bash
ng test --no-watch
```

## Other sources

* [Jasmine](https://jasmine.github.io/index.html "Jasmine Official Documents")
* [Angular Official Test Docs](https://angular.io/guide/testing "Angular Official Test Documents")