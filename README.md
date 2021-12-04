# subscription-as-a-service
User and Subscription as a service api to add, retrieve and check subscription details of user.

# To Run locally:
- npm install in root folder
-  go to /src in cmd prompt 
-  node app.js

# To setup intial DB:
- localhost:3000/setupDB {Get call}

# To add new user
- PUT: localhost:3000/user/:username

# To add subscription data 
- POST: localhost:3000/subscription/
 ^ with load req data having plan id, start date and username.

# To fetch subscription data using username
- GET: localhost:3000/subscription/:username/

# To fetch plan validity for a user
- GET: localhost:3000/subscription/:username/:date


