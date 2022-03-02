const taskGames = require('./borga-games-data')
const errors = require('./errors/tasks-errors')
const crypto = require('crypto')

const users = [
    {id : 11, userName : "Filipe", token : "3fa85f64-5717-4562-b3fc-2c963f66afa6"},
    {id : 12, userName : "Joao", token : "3fa85f64-5717-4562-b3fc-2c963f66afa7" }
]

const games = [ [{id : "ABSSF122", name: "Roblox"},{id : "NFDND675", name : "Fortinite"}] , [{id : "ASDAHU7", name: "Mario"},{id : "WEHWE7", name : "Pacman"}] ] 

const groups = [
    {userID : 11, id : 1, nameOfGroup : "Action", description : "Action Games", games : games[0] },
    {userID : 12, id : 2, nameOfGroup : "Arcade", description : "Arcade Games", games : games[1] }
] 

let userid = 13

module.exports = {
    addUser : addUser,
    getUserByToken : getUserByToken,
    getFavoriteGames : getFavoriteGames,
    getGroups : getGroups,
    getGroup : getGroup,
    addGroup : addGroup,
    addGame : addGame,
    updateGroup : updateGroup,
    deleteGame : deleteGame,
    deleteGroup : deleteGroup
}

function addUser(userName){
    const newUserId = userid++
    const newToken = crypto.randomUUID().toString()
    const newUser = {id : newUserId, userName : userName, token : newToken}
    users.push(newUser)
    return Promise.resolve(users)
}

function getUserByToken(token){ 
    const user = users.find(u => u.token == token)
    if(!user) return Promise.reject(errors.NOT_FOUND(token))
    return Promise.resolve(user)
}

function getFavoriteGames(groupId,userId){
    return getGroup(userId,groupId).then(group => group.map(group => group.games))
}

function getGroups(userId){
    return Promise.resolve(groups.filter(group => group.userID == userId))
    .catch(errors.NOT_FOUND(userId))
}

function getGroup(userId,groupId){
    const group = groups.filter(group => (group.userID == userId && group.id == groupId))
    if(!group) return Promise.reject(errors.NOT_FOUND(token))
    return Promise.resolve(group)
}

function addGroup(userID, nameOfGroup, description){ 
    const newId = groups.length+1
    const newGroup = {userID : userID,id : newId,nameOfGroup : nameOfGroup, description : description, games : []}
    groups.push(newGroup)
    return Promise.resolve(newGroup)
}

function addGame(userId,groupId,gameID){ 
    return getGroup(userId,groupId)
        .then(group => {
            return taskGames.fetchGamesById(gameID).then(game => {
                const newGame = {id: game[0].id, name: game[0].name}
                return newGame 
            })
            .then(newGame => { 
                games[groupId-1].push(newGame)
                return games[groupId-1]                                           
            })
            .then(games => {
                return group.map(groupWithOldGames => {
                    groupWithOldGames.games = games
                    return groupWithOldGames.games
                })
            })
        })
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


