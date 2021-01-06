# Luminate Event Manager Center Demo
This is an example of how to get around EMC in order to update website content


## Getting Started

Install the necessary dependencies
```shell
yarn install
```

Then run the development server:
```shell
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Build and ftp the dist folder up to LO server to test. Note this wont work locally since you will run into CORS issues.

```shell
yarn build
```

Will need to log in as Event Manager for event id 24014 in qa env:
[https://fundraising.qa.stjude.org/wes-dev/emc-poc/dist/index.html](https://fundraising.qa.stjude.org/wes-dev/emc-poc/dist/index.html)
