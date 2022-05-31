<p align="center">
  <img width="400px" src="https://github.com/bufferapp/buzzer/blob/master/public/buzzer-logo.svg?raw=true&sanitize=true" alt="Buzzer"/>
</p>
Quizz app for running your own quizzes or game shows! Uses websockets to sent messages. Not secure.

## Running the app

You'll need [Node.js](https://nodejs.org) 

```
npm install
node index.js
```

Open http://localhost:5000 in your browser to start!

## How to use

The players goto the homepage (`http://localhost:5000/`) and they can enter their name and team
number. Joining will give them a giant buzzer button!

The host heads over to `/host` and will be able to see everyone that buzzes in and clear the list
in between questions.


## License

MIT

