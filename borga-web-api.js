
const errors = require('./errors/http-errors')

module.exports = function(router, tasksServices){

    router.get('/game',getGames)
    router.get('/group/game/:groupID',getFavoriteGames)
    router.get('/group',getGroups)
    router.get('/group/:groupID',getGroup)
    router.post('/users',addUser)
    router.post('/group', addGroup)
    router.post('/group/:groupID',addGame)
    router.put('/group/:groupID', updateGroup)
    router.delete('/group/:groupID',deleteGroup)
    router.delete('/group/:groupID/:gameID',deleteGame)


    return router
    
function addUser(req,resp){
    tasksServices.addUser(req.body.userName)
        .then(user => resp.json(user))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
    //async-await
    /* 
    const request1 = await tasksServices.addUser(req.body.userName)
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */    

}

function getGames(req,resp){ 
    tasksServices.getGames(req.query.nameOfGame,req.query.gameID) 
        .then(games => resp.json(games))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    const request1 = await tasksServices.getGames(req.query.nameOfGame,req.query.gameID) 
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function getFavoriteGames(req,resp){
    tasksServices.getFavoriteGames(req.params.groupID,req.header('Authorization'))
        .then(games => resp.json(games))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    /* 
    const request1 = await tasksServices.getFavoriteGames(req.params.groupID,req.header('Authorization'))
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
    
}

function addGroup(req,resp){ 
    tasksServices.addGroup(req.body.nameOfGroup,req.body.description, req.header('Authorization'))
        .then(group=>resp.status(201).json(group))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    const request1 = await tasksServices.addGroup(req.body.nameOfGroup,req.body.description, req.header('Authorization'))
    const request2 = await resp.status(201).json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function getGroups(req,resp){
    tasksServices.getGroups(req.header('Authorization'))
        .then(groups => resp.json(groups))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    const request1 = await tasksServices.getGroups(req.header('Authorization')) 
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function updateGroup(req,resp){ 
    tasksServices.updateGroup(req.params.groupID,req.body.nameOfGroup,req.body.description, req.header('Authorization'))
        .then(group=>resp.status(201).json(group))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
const request1 = await tasksServices.updateGroup(req.params.groupID,req.body.nameOfGroup,req.body.description, req.header('Authorization'))
    const request2 = await resp.status(201).json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function deleteGroup(req,resp){
    tasksServices.deleteGroup(req.params.groupID, req.header('Authorization'))
    .then(group => resp.json(group))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    const request1 = await tasksServices.deleteGroup(req.params.groupID, req.header('Authorization')) 
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function addGame(req,resp){ 
    tasksServices.addGame( req.body.gameID,req.params.groupID, req.header('Authorization'))
    .then(game => resp.status(201).json(game))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    const request1 = await tasksServices.addGame( req.body.gameID,req.params.groupID, req.header('Authorization'))
    const request2 = await resp.status(201).json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function getGroup(req,resp){ 
    tasksServices.getGroup(req.params.groupID, req.header('Authorization'))
        .then(group => resp.json(group))
        .catch(error =>{
            const httpError = errors.convertToHttpError(error)
            resp.status(httpError.status).json(httpError.body)
        })
        //async-await
    /* 
    const request1 = await tasksServices.getGroup(req.params.groupID, req.header('Authorization'))
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)
    */  
}

function deleteGame(req,resp){ 
    tasksServices.deleteGame(req.params.groupID,req.params.gameID, req.header('Authorization')) 
    .then(game => resp.json(game))
    .catch(error => {
        const httpError = errors.convertToHttpError(error)
        resp.status(httpError.status).json(httpError.body)
    })
    //async-await
    /* 
    const request1 = await tasksServices.deleteGame(req.params.groupID,req.params.gameID, req.header('Authorization'))
    const request2 = await resp.json(request1)
    const array = [request1,request2]
    const results = await Promise.all(array)    
    */  
}
}















