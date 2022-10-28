# Gaucho Group
An application to help UCSB students form and find study groups on campus. 

### Contributors
- Jesus Velarde - heyyysus
- Anthony Lo - tonesgainz
---

## Run on localhost
### Dependencies
**Docker and Docker Compose**
> Install Docker Desktop on your system: https://www.docker.com/products/docker-desktop/

### Download
1. Clone this repository using:  
`> git clone git@github.com:heyyysus/study-buddies.git`
2. Change directory to project folder  
`> cd study-buddies/`
3. Checkout whichever branch you'd like to build using  
   `> git checkout <branch_name>`

### Build and Run API Development Server
1. Build docker-compose image  
   `> docker-compose build`
2. Run docker-compose image   
   `> docker-compose up`
3. Service will run on `http://localhost:5000`

### Start Expo Development Server
1. Change directory to `expo-client/`
2. Run `npm install`
3. Run `expo start`
4. Expo will list instructions on viewing application on mobile phone.