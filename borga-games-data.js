'use strict'
const fetch = require('./node-fetch')
const client_id = 'Lcv6D9rwBY'


module.exports={
    fetchGames : fetchGames,
    fetchGamesByName : fetchGamesByName,
    fetchGamesById : fetchGamesById
}

function fetchGames(){ 
    return fetch(`https://api.boardgameatlas.com/api/search?limit=10&ids&client_id=${client_id}`)
    .then(response => response.json())
    .then(obj => obj.games)
    .then(games => games.map(info => {
        const information = {id: info.id, name: info.name, description: info.description, url: info.url, image_url: info.image_url, mechanics: JSON.stringify(info.mechanics), categories: JSON.stringify(info.categories)}
        return information 
    }))
}

function fetchGamesByName(name){
    return fetch(`https://api.boardgameatlas.com/api/search?name=${name}&limit=10&ids&client_id=${client_id}`)
    .then(response => response.json())    
    .then(obj => obj.games)
    .then(games => { 
        return games.map(info => { 
                const information = {id: info.id, name: info.name, description: info.description, url: info.url, image_url: info.image_url, mechanics: JSON.stringify(info.mechanics), categories: JSON.stringify(info.categories)}
                return information
        })
    })
}

function fetchGamesById(gameID){
    return fetch(`https://api.boardgameatlas.com/api/search?id=${gameID}&limit=1&ids&client_id=${client_id}`)
    .then(response => response.json())    
    .then(obj => obj.games)
    .then(games => { 
        return games.map(info => { 
                const information = {id: info.id, name: info.name, description: info.description, url: info.url, image_url: info.image_url, mechanics: JSON.stringify(info.mechanics), categories: JSON.stringify(info.categories)}
                return information
        })
    })
}
