const httpErrors = require('./errors/http-errors')
const path = require('path');
var idOfGroup = 0
module.exports = function(router, tasksServices){

    const fileOptions = {
		root: path.join(__dirname, 'views'),
		dotfiles: 'deny'
	};

    router.get('/', getHomePage)
    router.get('/game',getGames)
    router.get('/games/:groupID',getFavoriteGames)
    router.get('/games/:groupID/:gameID',getGame)
    router.get('/group',getGroups)
    router.get('/group/:groupID',getGroup)
    router.get('/group/update/:id/:nameOfGroup', getUpdatedGroup)
    router.get('/register',getUserRegisterPage)
    router.post('/user',addUser)
    router.post('/group', addGroup)
    router.post('/game',addGame)
    router.delete('/group/:groupID',deleteGroup)
    router.delete('/group/:groupID/:gameID',deleteGame)

    return router

    async function getHomePage(req, resp){
        resp.render("home", {username : getUserName(req)})
    }

    async function getGame(req,resp){
        const game = await tasksServices.getGame(req.params.groupID,req.params.gameID,req.user.token)
        resp.render("games-list",{games : game,username : getUserName(req)})
    }

    async function getGames(req,resp){
        const games = await tasksServices.getGames(req.query.nameOfGame,req.query.gameID)
        resp.render("games-list",{games: games,groupID : idOfGroup, username : getUserName(req)})
    }

    async function getFavoriteGames(req, resp){
        idOfGroup = req.params.groupID
        const gamesOfGroup = await tasksServices.getFavoriteGames(req.params.groupID,req.user.token)
        resp.render("games-group", {gamesOfGroups : gamesOfGroup,username : getUserName(req)})
    }

    async function getGroups(req, resp){
        const groups = await tasksServices.getGroups(req.user.token)
        resp.render("groups-list", {groups : groups, username : getUserName(req)})
    }

    async function getGroup(req, resp){
        const group = await tasksServices.getGroup(req.params.groupID,req.user.token)  
        resp.render("group", {group : group, username : getUserName(req)})
    }

    async function getUpdatedGroup(req, resp){
        const group = await tasksServices.getGroup(req.params.id, req.user.token)
        resp.render("update-group", {group: group, scriptName : "update-group", username : req.user.userName})
    }

    async function addGroup(req, resp){
        const group = await tasksServices.addGroup(req.body.nameOfGroup,req.body.description,req.user.token)
        resp.redirect(303,`/group`)
    }

    async function addGame(req, resp){
        const game = await tasksServices.addGame(req.body,idOfGroup,req.user.token)
        resp.redirect(303,`/games/${game.groupId}`)
    }

    async function getUserRegisterPage(req, resp){
        resp.render("new-user")
    }

    async function addUser(req,resp){
        const newUser = await tasksServices.addUser(req.body)
        resp.redirect(303,`/`)
    }
    async function deleteGroup(req, resp){ 
        const delGroup = await tasksServices.getGroup(req.params.id, req.user.token)
        resp.redirect(303, `/group`)
    }

    async function deleteGame(req, resp){ 
        const game = await tasksServices.getGame(req.params.groupID,req.params.gameID,req.user.token)
        resp.redirect(303, `game/${req.params.groupID}`)
    }  
}

function getToken(req) {
    return req.user && req.user.token;
}

function getUserName(req) {
    return req.user && req.user.userName;
}
