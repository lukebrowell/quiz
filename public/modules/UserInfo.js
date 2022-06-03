import * as el from './join-selectors.js'

const user = {
    set name(name) {
        console.log(`setting user.name from ${this._.name} to ${name}`)
        this._.name = name;
    },
    get name() {
        console.log('getting user.name')
        return this._.name;
    },
    set team(team) {
        console.log(`setting user.team from ${this._.team} to ${team}`)
        this._.team = team;
    },
    get team() {
        console.log('getting user.team')
        return this._.team;
    },
    set id(id) {
        console.log(`setting user.id from ${this._.id} to ${id}`)
        this._.id = id;
    },
    get id() {
        console.log('getting user.id')
        return this._.id;
    },
    _: {
        name: "",
        team: "",
        id: ""
    }
}


const loadUserInfo = () => {
    console.log('loading user from local storage')
    let _user = JSON.parse(localStorage.getItem('user')) || {}
    user.name = _user.name || ""
    user.team = _user.team || ""
    user.id = _user.id
    if (user.name) {
      el.form.querySelector('[name=name]').value = user.name
      el.form.querySelector('[name=team]').value = user.team
    }
  }
const saveUserInfo = () => {
    console.log('saving user to local storage')
    localStorage.setItem('user', JSON.stringify({...user}))
}

export {user, loadUserInfo, saveUserInfo}