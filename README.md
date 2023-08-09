# Hoppin
An application to help UCSB students and the local community to organize events. 

### Contributors
- Jesus Velarde - heyyysus

---

### Download
1. Clone this repository using:  
`> git clone git@github.com:heyyysus/hoppin.git`
2. Change directory to project folder  
`> cd hoppin/`
3. Checkout whichever branch you'd like to build using 
   `> git checkout <branch_name>`

### Build and Deploy AWS Lambda Functions
1. Change directory to `aws/lambdas/<lambda_function>`
2. Run `npm run update-deps` to install node modules in `dist` 
3. Build by running `npm run build` (this will create the lambda zip file in `/dist/`)
4. Deploy by running `npm run deploy` (this requires the aws-cli to be installed. See `package.json` to customize function destination.)

### Start Frontend Development Server
1. Change directory to `react-app/`
2. Run `npm run start`
3. Development server will run on `http://localhost:3000`

### Build and Deploy Frontend Application
1. Change directory to `react-app/`
2. Run `npm i` to install node modules
3. Run `npm run build` to only build application
4. Run `npm run deploy` to build and deploy to AWS S3 bucket (you must configure AWS cli and use correct S3 bucket name in package.json)
5. Run `npm run invalidate` to update CDN immediately (if using Cloudfront, must use correct distribution id in package.json)

### Run Storybook
1. Change directory to `react-app`
2. Run `npm run storybook`
