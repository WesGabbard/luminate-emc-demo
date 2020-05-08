# Luminate Event Manager Center API
Event Manager Center has no product API avaliable. This project provides basic API endpoints in order to execute updates in Luminate EMC by using Puppeteer to run a headless browser and perform updates. Thus, these endpoints can be used to allow in-line editing from a TeamRaiser Greeting page.

# TODO
- make web content more dynamic, allow to pass target and have open up correct page

- Work on speed, auth seems the slowest

- Occasionaly auth fails for no reason, need to have it try omne more time before returning error

- running into issues where i think the apps IP address has been blocked from too many login fails. Need to look into how LO handles that, can we whitelist the app ip to ensure this wont happen? Should be edge case, since we wont expose the endpoints unless we have correct username/password already. But, once ip gets blocked this app will no longer work

## Getting Started

Install the necessary dependencies
```shell
yarn install
```

Then run the development server:
```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## API
All API endpoints are located in this application at */pages/api/* and each at a minimum take the following required params:
```javascript
params: {
  username, // Event Manager username
  password, // Event Manager password
  domain, // secure domain for client, eg https://fundraising.qa.stjude.org/
  frId // Event Id for the EMC that will be accessed
}
```

In addition each api method takes additional params as listed below.

### Event Properties
Updates to the Event Properties tab also take the following params:

```javascript
params: {
  target, // The field to update, this based of the inputs id attribute in the EMC
  content // string of text to use for update
}
```

Example endpoint would look like:
```
/api/event-properties?username=[username]&password=[password]&domain=https://fundraising.qa.stjude.org/site&frId=24014&targetField=shared_event_propsprop_sponsor_4.field&content=Oh%20boy%20this%20works

```
### Update Website Page Content
```javascript
params: {
  target, // The TeamRaiser page selected to be edited. This value is represented by the query string param in the url for 'pg='. So for Greeting Page the value would be 'entry'
  sid, //Optional param for updating TeamRaiser Custom Pages. If the target value is 'informational', then you will also need to pass the sid parameter as well
  content // string of html to use for updates
}
```

Example endpoint would look like:
```
/api/website-content?username=[username]&password=[password]&domain=https://fundraising.qa.stjude.org/site&frId=24014&target=entry&content=<h1>Update%20content%20from%20our%20app</h1><p>Holy%20moly%20this%20works</p>

```
