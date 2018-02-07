# trivia-Vue

Nomsly's client and frontend for gaugeing customer interaction and manageing supply chain

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/jhynes94/trivia-Vue
# Go into the repository
cd personal-webserver
# Install dependencies for client
cd client
npm install
# Build for development
npm run build
# Install dependencies for server
cd ../server
npm install
# Install background run tool to keep website alive
sudo npm install pm2 -g
# Start backend Server
pm2 start server.js
# Access server at http://localhost:3000/
# To Stop or Restart type:
# pm2 stop server
# pm2 restart server
```

More about [pm2](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04)

## To Develop on system

This will cocurrently run a gulp file that refreshes the webpage when changes are made to the html and CSS. It will also auto restart the server when changes are made to the backend.

```bash
# Clone this repository
git clone https://github.com/jhynes94/trivia-Vue
# Go into the repository
cd personal-webserver
# Install dependencies for client
cd client
npm install
# Start frontend Server
npm start
# Install dependencies for server
cd ../server
npm install
# Start backend Server
npm start
# Access server at http://localhost:8080/
```

## Todo

- Support Mongo Backend localy
- Support GraphQL
- Remove console.log's when going into production mode

## License

[CC0 1.0 (Public Domain)](LICENSE.md)