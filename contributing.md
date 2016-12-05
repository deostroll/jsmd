# How to contribute?

Adding code and features or test cases or test data *IS NOT THE ONLY WAY* to contribute. It is suggested that you read up on these if you are completely new to opensource development:

- https://guides.github.com/activities/contributing-to-open-source/#contributing
- http://stackoverflow.com/questions/4384776/how-do-i-contribute-to-others-code-in-github
- https://opensource.com/life/13/4/ten-ways-participate-open-source
- https://www.quora.com/How-do-I-participate-or-contribute-in-open-source-projects

## Setting up the project

Clone this repository to your local disk. You need node/npm as a prerequisite. In the working directory, run `npm install` from the command-line. This will install all the project dependencies. (Things might get nasty if you are behind a firewall).

To spin up a localhost live-reload web server at port 4582, in the command-line, run `grunt`. This will also spin up a web server (localhost) @ port 4583 - to specifically run mocha browser tests.

## Project management

The `master` branch is where things are supposed to be clean. Only releases happen on this branch.
Presently, there are no releases. (However, there are commits which don't result into anything significant).

All active development happens on the `dev` branch. Hence fork this repo and switch to this branch and work away...

Submit your PR to the `dev` branch.
