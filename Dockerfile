FROM node:14     // select the base image of the project for docker image
RUN mkdir -p /src/user/app   //create a working directory for our image
WORKDIR /src/user/app   // set the directory for our app as working directory
COPY package*.json ./    // copy the package.json file to image
COPY . .      //copy all the files from base directory to work directory
EXPOSE 3000     // expose the port number your app is running on.
RUN npm install    // run npm install commands
CMD ["node", "index.js"]  // run the node index.js command after image is created