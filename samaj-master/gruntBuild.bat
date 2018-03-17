@echo off

cmd /c node --version
cmd /c npm --version

echo Installing or updating bower...
cmd /c npm install -g bower

cmd /c bower --version

echo Installing or updating dependencies...
cmd /c npm install

echo Installing or updating grunt-cli...
cmd /c npm install -g grunt-cli

echo Cleaning the bower cache
cmd /c bower cache clean


echo Installing or updating bower dependencies...
cmd /c bower install

echo Building...
grunt build --no-color

echo Done.