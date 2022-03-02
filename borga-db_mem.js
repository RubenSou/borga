const taskGames = require('./borga-games-data')
const errors = require('./errors/tasks-errors')
const crypto = require('crypto')

const users = [
    {id : "11", userName : "Ruben", password : "RubenSousa1", token : "3fa85f64-5717-4562-b3fc-2c963f66afa6", email : "ruben.msousa@gmail.com"},
    {id : "12", userName : "Filipe", password : "Filipe1", token : "3fa85f64-4562-5717-b3fc-2c963f66afa6", email : "ffreitas@cc.isel.ipl.pt"}
]

const groups = [
    {userId : "11", id : "1", nameOfGroup : "Arcade", description : "Arcade Games" },
    {userId : "12",  id : "2", nameOfGroup : "Action", description : "Action Games" }
]

const games = [
    {groupId : "1", nameOfGame : "Mario", id : "ASDAHU7"},
    {groupId : "1", nameOfGame : "Pacman", id : "WEHWE7" }
]


module.exports = {
    addUser : addUser,
    getUserByToken : getUserByToken,
    getUserByUsername : getUserByUsername,
    getFavoriteGames : getFavoriteGames,
    getGroupsByUserId : getGroupsByUserId,
    getGroup : getGroup,
    addGroup : addGroup,
    addGame : addGame,
    updateGroup : updateGroup,
    deleteGame : deleteGame,
    deleteGroup : deleteGroup
}

function addUser(userInfo){ //FEITO
    const newId = `${Math.floor(Math.random() *100)}`
    const newAuth = crypto.randomUUID()

    const newUser = {
        id : `${newId}`,
        userName : userInfo.username,
        password : userInfo.password,
        token : newAuth
    }
users.push(newUser)
return Promise.resolve(newUser)
}

function getUserByToken(token){ //FEITO
const user = users.find(u => u.token == token)
if(!user) return Promise.reject(errors.NOT_FOUND(token))
return Promise.resolve(user)
}

function getFavoriteGames(groupId,userId){
return Promise.resolve(games.filter(game => game.groupId == groupId))
}

function getGroupsByUserId(userId){ //FEITO
return Promise.resolve(groups.filter(group => group.userId == userId))

}

function getGroup(userId,groupId){ //FEITO
const group = groups.filter(group => (group.userID == userId && group.id == groupId))
if(!group) return Promise.reject(errors.NOT_FOUND(token))
return Promise.resolve(group)
}

function addGroup(userID, nameOfGroup, description){ 
const newId = groups.length
const newGroup = {userId : userID,id : newId, nameOfGroup : nameOfGroup, description : description}
groups.push(newGroup)
return Promise.resolve(newGroup)
}

function addGame(groupId,gameInfo){ //FEITO
const newGame = {
    id : `${gameInfo.id}`,
    name : `${gameInfo.name}`,
    description : `${gameInfo.description}`,
    url : `${gameInfo.url}`,
    image_url : `${gameInfo.image_url}`,
    mechanics : `${gameInfo.mechanics}`,
    categories : `${gameInfo.categories}`,
    groupId :`${groupId}`
}         
games.push(newGame)
return Promise.resolve(newGame)
    .catch(errors.NOT_FOUND(groupId))
}

function updateGroup(userId,groupId,nameOfGroup,description){ 
return getGroup(userId,groupId)
.then(group => {
    group.map(group => {group.nameOfGroup = nameOfGroup
        group.description = description})
    return group
})
.catch(errors.NOT_FOUND(groupId))
}

function deleteGroup(userId,groupId){
const idx = groups.findIndex( gr => gr.id == groupId)
groups.splice(idx, 1)
console.log(groups)
return getGroup(userId)
    .catch(errors.NOT_FOUND(groupId))
}  

function deleteGame(userId,groupId,gameId){
var idx = 0
var updatedGames = []
games.map(games => {
    idx++
    if(idx == groupId) {
        updatedGames.push(games.filter(game => game.id != gameId))
    }
    else updatedGames.push(games)
})
return getGroup(userId,groupId)  
.then(group => {
    games.map(gamess => {
        const index = games.indexOf(gamess)
        games[index] = updatedGames[index] 
        return games    
    })
    return group.map(group => {
        group.games = games[groupId-1]
        return group
    })    
})
.catch(errors.NOT_FOUND(groupId))
}

function getUserByUsername(username){ //FEITO
return Promise.resolve(users.filter(user => {
    if(user.userName == username) {
     return user
    }
}))
}

/*function getGame(groupId,gameId){ 

}*/

