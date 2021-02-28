PPM Firefox Client
==================
Install
--------
There are some outdated packages such as `grunt-webpack` which require webpack v4.
However this project needs webpack v5 so npm needs come convincing that this peer
dependency mismatch is ok:

> npm install npm install --legacy-peer-deps


Bumping up the version
----------------------

Use `grunt version:project:patch` for bumping up patch versions.

Use `grunt version:project:minor` for bumping up minor versions.


Solving the 'eval' CSP issue:
-----------------------------
https://github.com/webpack/webpack/issues/6461
https://github.com/webpack/webpack/issues/5627

Extension packaging
-------------------
Lint the Production build by:
> web-ext lint

Sign the extension and build the signed xpi
> web-ext sign api-key "user:xxx" api-secret "123"


https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-sign
https://github.com/mozilla/web-ext#using-web-ext-in-nodejs-code