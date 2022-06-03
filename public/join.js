import * as el from './modules/join-selectors.js';
import {user, loadUserInfo, saveUserInfo} from './modules/UserInfo.js'

const socket = io()

el.form.addEventListener('submit', (e) => {
  e.preventDefault()
  user.name = el.form.querySelector('[name=name]').value
  user.team = el.form.querySelector('[name=team]').value

  if (!user.id) {
    user.id = Math.floor(Math.random() * new Date())
  }
  
  console.log('emitting join event to server with user payload')
  socket.emit('join', {...user})
  saveUserInfo()
  el.joinedInfo.innerText = `${user.name} on Team ${user.team}`
  el.form.classList.add('hidden')
  el.joined.classList.remove('hidden')
  el.body.classList.add('buzzer-mode')
})

el.buzzer.addEventListener('mousedown', () => {
  console.log('emitting buzz event to server with user payload')
  socket.emit('buzz', {...user})
})

el.editInfo.addEventListener('click', () => {
  el.joined.classList.add('hidden')
  el.form.classList.remove('hidden')
  el.body.classList.remove('buzzer-mode')
})

loadUserInfo()

const audio = new Audio('./buzz.mp3')
el.button.addEventListener('mousedown', () => audio.play())