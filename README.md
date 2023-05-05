# Hoppin
An application to help UCSB students and the local community to organize events. 

### Contributors
- Jesus Velarde - heyyysus

---

### Download
1. Clone this repository using:  
`> git clone git@github.com:heyyysus/study-buddies.git`
2. Change directory to project folder  
`> cd hoppin/`
3. Checkout whichever branch you'd like to build using  
   `> git checkout <branch_name>`

### Build and Deploy AWS Lambda Functions
1. Change directory to `aws/lambdas/<lambda_function>`
2. Build by running `npm run build` (this will create the lambda zip file in `/dist/`)
3. Deploy by running `npm run deploy` (this requires the aws-cli to be installed. See `package.json` to customize function destination.)

### Start 
1. Change directory to `react-app/`
2. Run `npm run start`
3. Development server will run on `http://localhost:3000`

### Run storybooks
1. Change directory to `react-app`
2. Run `npm run storybook`
