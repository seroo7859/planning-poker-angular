# Planning Poker Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## Technologies
- Angular 15
- Bootstrap 5.2.3
- NG Bootstrap 14.1.0
- Chart.js 4.3.0
- Ng2-Charts 4.1.1
- NgRx 15.4.0
- RxJs 7.8.0
- RxStomp 2.0.0
- TypeScript 4.9.5
- Node 18.12.0 
- NPM 9.3.1
- NVM 0.39.3

## Setup
Install Node via NVM:
```shell
nvm install v18.12.0 && nvm use v18.12.0
```

Install the Angular CLI:
```shell
npm install -g @angular/cli@15.1.2
```

Install the dependencies:
```shell
rm -rf node_modules && npm install
```

Install Angular DevTools in your browser (optional):
- [Chrome Web Store](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh)
- [Firefox Addons](https://addons.mozilla.org/en-GB/firefox/addon/angular-devtools/)

Install Redux DevTools in your browser (optional):
- [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox Addons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

If necessary, change the proxy settings to allow running application locally without CORS setup.
You can find details in the [proxy.conf.json](proxy.conf.json) file.

The **planning poker service** is required to run this application.
You can find details about the installation in this [GitHub-Repository](https://github.com/seroo7859/planning-poker-service).

## Demo

Build an docker image:
```shell
docker image build -t planning-poker-angular .
```

Running the docker image as a container:
```shell
docker container run --name planning-poker-angular --network planning-poker-service_default -p 80:80 -d --rm planning-poker-angular
```

Navigate to "http://localhost" to access the running application.

Or navigate to "http://localhost/app/onboarding/join-session?id=00112233-4444-5567-8888-999999999999" and enter "John" as username to join to demo session as moderator. 

Stop the running container:
```shell
docker container stop planning-poker-angular
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
