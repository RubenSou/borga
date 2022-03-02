/* From https://www.elastic.co/guide/en/elastic-stack-glossary/current/terms.html#d-glos
index - Collection of JSON documents. 
document - JSON object containing data stored in Elasticsearch

Criação de locais de dados:

curl -X PUT http://localhost:9200/game
curl -X PUT http://localhost:9200/group
curl -X PUT http://localhost:9200/users

Criação dos users:

curl -X PUT --data "{\"id\" : \"11\", \"userName\" : \"Ruben\", \"password\" : \"RubenSousa1\", \"token\" : \"3fa85f64-5717-4562-b3fc-2c963f66afa6\", \"email\" : \"ruben.msousa@gmail.com\" }" -H "Content-Type: application/json" http://localhost:9200/users/_doc/1
curl -X PUT --data "{\"id\" : \"12\", \"userName\" : \"Filipe\", \"password\" : \"Filipe1\", \"token\" : \"3fa85f64-4562-5717-b3fc-2c963f66afa6\", \"email\" : \"ffreitas@cc.isel.ipl.pt\" }" -H "Content-Type: application/json" http://localhost:9200/users/_doc/1

Criação dos Groups:

curl -X PUT --data "{\"userId\" : \"11\", \"id\" : \"1\", \"nameOfGroup\" : \"Arcade\", \"description\" : \"Arcade Games\" }" -H "Content-Type: application/json" http://localhost:9200/group/_doc/1
curl -X PUT --data "{\"userId\" : \"12\",  \"id\" : \"2\", \"nameOfGroup\" : \"Action\", \"description\" : \"Action Games\" }" -H "Content-Type: application/json" http://localhost:9200/group/_doc/1

Criação dos Games:

curl -X PUT --data "{\"groupId\" : \"1\", \"nameOfGame\" : \"Mario\", \"id\" : \"ASDAHU7\" }" -H "Content-Type: application/json" http://localhost:9200/game/_doc/1
curl -X PUT --data "{\"groupId\" : \"1\", \"nameOfGame\" : \"Pacman\", \"id\" : \"WEHWE7\" }" -H "Content-Type: application/json" http://localhost:9200/game/_doc/1
*/

//TODO Errors control and refactor code
const crypto = require('crypto')
const errors = require('./errors/tasks-errors')
const fetch = require('node-fetch')
const gamesData = require('./borga-games-data');

const baseURL = "http://localhost:9200/"

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
    deleteGroup : deleteGroup,
    deleteGame : deleteGame
}
/*
function getUserByToken(token){ 
   return fetch(baseURL + `users/_search?q=token:"${token}"`, {
            headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(t => { 
        return {id : t._source.id , userName : t._source.userName, password : t._source.password }
    })[0])
}

function getUserByUsername(username){ 
    console.log("HELLO")
    return fetch(baseURL + `users/_search?q=userName:"${username}"`, {
        headers : {"Accept" : "application/json"}
    })
   .then(response => response.json())
   .then(body => body.hits.hits.map(t => {
        return {id : t._source.id, password : t._source.password, token : t._source.token}
    })[0])
}

function addUser(userInfo){ 
    console.log(userInfo)
    const newId = `${Math.floor(Math.random() *100)}`
    const newAuth = crypto.randomUUID()

    const newUser = {
        id : `${newId}`,
        userName :userInfo.username,
        password :userInfo.password,
        token : newAuth
    }

    return fetch(baseURL + `users/_doc?refresh=wait_for`, {
        method : "POST",
        body : JSON.stringify(newUser),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
    .then(() => {
        return newUser})   
}

function getFavoriteGames(groupId){  
    return fetch(baseURL + `game/_doc/_search?q=groupId:"${groupId}"`, {
        headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(t=> {
            const information = {groupId : t._source.groupId, id: t._source.id, name: t._source.name, description: t._source.description, url : t._source.url, image_url : t._source.image_url, mechanics : t._source.mechanics, categories : t._source.categories}
            return information
    })
)}

function getGame(groupId,gameId){ 
    return fetch(baseURL + `game/_search?q=groupId:"${groupId}"&q=id:"${gameId}"`, {
        headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(t=> { 
        return {    
            id : t._source.id, 
            nameOfGroup : t._source.nameOfGroup, 
            description : t._source.description, 
        }
    }))
}


function getGroupsByUserId(userId){ 
    return fetch(baseURL + `group/_search?q=userId:"${userId}"`, {
        headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(t=> { 
        return {    
            id : t._source.id, 
            nameOfGroup : t._source.nameOfGroup, 
            description : t._source.description, 
        }
    }))
}

function getGroup(groupId,userId){ 
    return fetch(baseURL + `group/_search?q=id:"${groupId}"&q=userId:"${userId}"`, {
        headers : {"Accept" : "application/json"}
    })
    .then(response => response.json())
    .then(body => body.hits.hits.map(t=> { 
        console.log(t._source)
        return {    
            id : t._source.id, 
            nameOfGroup : t._source.nameOfGroup, 
            description : t._source.description, 
        }
    }))
}

function addGroup(userId,nameOfGroup,description){  
    const newBody = {
        userId : `${userId}`, 
        id : `${Math.floor(Math.random() *100)}`,                                                   
        nameOfGroup : nameOfGroup, 
        description : description,
    }
    
    return fetch(baseURL + `group/_doc?refresh=wait_for`, {
        method : "POST",
        body : JSON.stringify(newBody),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}        
        })
    .then(() => {
        return newBody
    })
}

function addGame(groupId,gameInfo){ 
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
    return fetch(baseURL + `game/_doc?refresh=wait_for`, {
        method : "POST",
        body : JSON.stringify(newGame),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
    .then(() => {
        return newGame
    }) 
}

function updateGroup(groupId,nameOfGroup,description){ 
    const body = {
        nameOfGroup : nameOfGroup,
        description : description    
    }
    
    return fetch(baseURL + `group/_doc/_search?q=id:"${groupId}"`, {
        method : "PUT",
        body : JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
     .then(response => response.json())
     .then(result => {return {userID : result.userID, id : result._id, nameOfGroup : body.nameOfGroup, description : body.description, games : result.games }})
}

function deleteGroup(groupId){  
    return fetch(baseURL + `group/_doc/_search?q=id:"${groupId}"`, { 
        method : "DELETE",
        headers : { 
            "Accept" : "application/json"}})
    .then(() => {return getGroups()})
}

function deleteGame(groupId,gameId){  
    return fetch(baseURL + `group/_doc/_search?q=id:"${groupId}"&q=games.id:"${gameId}"`, { 
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"}
     })
    .then(() => getFavoriteGames(groupId))
}
*/

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

