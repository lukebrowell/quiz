"use strict"

import http from 'http';
import express from 'express';
import {Server as IOServer} from 'socket.io'; 

// const http = require('http')
// const express = require('express')
// const socketio = require('socket.io')

const app = express();
const server = http.Server(app);
const io = new IOServer(server);

const title = 'Onboarding Checkpoint'

const PORT = process.env.PORT || 5000


// Consider using a Data Type Object (DTO) to validate each of these types.
let data = {
  users: new Set(),
  buzzes: new Set()
}

const getData = () => ({
  users: [...data.users],
  buzzes: [...data.buzzes].map(b => {
    const [ name, team ] = b.split('-')
    return { name, team }
  })
})

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (_req, res) => res.render('index', { title }))
app.get('/host', (_req, res) => res.render('host', Object.assign({ title }, getData())))

const isValidUser = user => (true) // stub for validation - use validation.js or json schema or dig into how swaggerhub generates code strubs from openapi spec.

//wrapper for express middlewares to reshape the function signature so that it can be used with socket.io
// we use this to allow us to use the express-validator middleware on our event payloads
// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// const validator = require("express-validator");
// io.use(wrap(validator({ param: "foo" })));
// see https://socket.io/docs/v4/middlewares/#compatibility-with-express-middleware for details

io.on('connection', (socket) => {

  socket.on('join', (user) => {
    
    if(isValidUser(user)) {
      data.users.add(user.id)
      io.emit('active', [...data.users].length)
      console.log(`${user.name} joined!`)
    } else {
      console.log('invalid user')
    }

  })

  socket.on('buzz', (user) => {
    if(isValidUser(user)) {
      data.buzzes.add(`${user.name}-${user.team}`)
      io.emit('buzzes', [...data.buzzes])
      console.log(`${user.name} buzzed in!`)
    } else {
      console.log('invalid user')
    }
  })

  socket.on('clear', () => {
    data.buzzes = new Set()
    io.emit('buzzes', [...data.buzzes])
    console.log(`Clear buzzes`)
  })
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
