# Full Stack Redux Tutorial Redo

## WIP --- only about 75% complete

This is an implementation of the terrific tutorial by @teropa
with a few updates. The tutorial is fantastic, thorough, and follows [common best practices](https://medium.com/javascript-and-opinions/state-of-the-art-javascript-in-2016-ab67fc68eb0b#.u80vh537a), but React is quickly changing. In just 6 months, some of it is no longer recommended by react.

This tutorial makes a few small changes as react recommends using class extends to create components instead of React.createClass and shallowRender for testing.

I also added the Enzyme testing library syntax to ease the test writing and take advantage of the newer shallowRender capabilities.

## Run the demo
Clone this repo and navigate to the voting-server folder where you can start the server. Then navigate to the voting-client directory where you can start webpack-dev-server and then open a browser and navigate to localhost:8080
If nothing loads, check the console of the webpage and see the error messages.

Here is an example:
```sh
git clone https://github.com/natomato/full_stack_redux.git
cd ./full_stack_redux/voting-server
npm install #the server's dependencies
npm start

# You should see this in your terminal
# > voting-server@1.0.0 start /Users/xxxx/Programming/tutorials/full_stack_redux/voting-server
# > babel-node index.js


cd ./full_stack_redux/voting-client
npm install #the client's dependencies
webpack-dev-server #if installed globally

# You should see this in your terminal
# > webpack: bundle is now VALID.
```
