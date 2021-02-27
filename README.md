PPM Firefox Client
==================
Install
--------
> npm install --force


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