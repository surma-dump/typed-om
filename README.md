#What is this?
This is a proof-of-concept polyfill for the proposed [Typed CSSOM API](https://drafts.css-houdini.org/css-typed-om-1/).

#Using this Polyfill
To use the code, download this repository and put
```
<script src='typed-om/typed-om.js'></script>
```
in your HTML file.

#Testing this Polyfill
The tests use the [Mocha framework](https://mochajs.org/) with [Chai asserts](http://chaijs.com/api/assert/). Other Chai tools can be pulled in if needed.

To run the tests do
```
sudo apt-get install npm
sudo npm install mocha
sudo npm install chai
```
Then open typed-om/test/runner.html in a web browser.
