const taskGames = require('./borga-games-data.js')
const errors = require('./errors/tasks-errors')

module.exports = function(data){ //data contem as funções do borga-db.js e do borga-games-data.js

     return {
          getGames : getGames,
          getGame : getGame,
          getFavoriteGames : getFavoriteGames,
          getGroups : getGroups,
          getGroup : getGroup,
          addGroup : addGroup,
          addGame : addGame,
          addUser : addUser,
          updateGroup : updateGroup,
          deleteGroup : deleteGroup,
          deleteGame : deleteGame,
          validateUser : validateUser
     }

/**
     * Retorna os jogos através do url utilizado tendo em conta um limite de 10 jogos pesquisados da API 
     * com o uso da função:
     * fetchGamesByName caso o @param nameOfGame seja dado como argumento 
     * fetchGamesById caso o @param gameID seja dado como argumento
     * fetchGames caso ambos os parametros não sejam dados 
     * As funções a serem usadas estão localizadas no file tasks-games-data.js
     * @param nameOfGame da função a ser chamada faz parte da query para pesquisar apenas os jogos com o nome especifico
     * @param gameID da função a ser chamada faz parte da query para pesquisar apenas o jogo com o ID especifico
     */
function getGames(nameOfGame,gameID){ 
   if(nameOfGame != null) return taskGames.fetchGamesByName(nameOfGame)
   else if(gameID != null) return taskGames.fetchGamesById(gameID)
   else return taskGames.fetchGames()
}

/**   MUDAR
     * Retorna um Object groupo especifico contido no Array groups através da @function getGroup
     * dependente do token utilizado na  @function getUserByToken e da getGroup localizadas no file task-db_mem.js
     * @param groupId  e @param token da função a ser chamada são usados para buscar 
     * apenas um dos grupos do userId com o ID especifico
     */
 function getGame(groupId,gameId,userToken){   
     return data.getUserByToken(userToken)
     .then(() => data.getGame(groupId,gameId))
     //.catch(error => Promise.reject(error.NOT_AUTHORIZE()))
}

/**
     * Retorna os jogos contidos na propriedade do tipo Array games,
     * localizada no Object de um grupo que está situado como elemento do Array groups
     * através da @function getFavoriteGames e da  @function getUserByToken utilizada na busca do userId,
     * localizadas no file task-db_mem.js
     * @param groupID  e @param token da função a ser chamada são usados para buscar 
     * apenas um dos grupos do userId com o ID especifico
     */
function getFavoriteGames(groupID,userToken){ 
     idOfGroup = groupID
     //console.log(userToken)
     //console.log(groupID)
    return data.getUserByToken(userToken)
          .then(() => data.getFavoriteGames(groupID))
          //.catch(error => Promise.reject(error.NOT_AUTHORIZE()))
}

/**
     * Retorna os Object's grupo especificos contidos no Array groups através da @function getGroups
     * dependentes do token utilizado e da  @function getUserByToken utilizada na busca do userId, 
     * localizadas no file task-db_mem.js
     * @param token da função a ser chamada é usado como argumento na função getUserByToken para
     * buscarmos o userId
     */
function getGroups(userToken){  
     return data.getUserByToken(userToken)
          .then(user => {
               return data.getGroupsByUserId(user.id)
          })
}

/**
     * Retorna um Object groupo especifico contido no Array groups através da @function getGroup
     * dependente do token utilizado na  @function getUserByToken e da getGroup localizadas no file task-db_mem.js
     * @param groupId  e @param token da função a ser chamada são usados para buscar 
     * apenas um dos grupos do userId com o ID especifico
     */
function getGroup(groupId,userToken){   
     return data.getUserByToken(userToken)
     .then(user => data.getGroup(groupId,user.id))
     //.catch(error => Promise.reject(error.NOT_AUTHORIZE()))
}

/**
     * Adiciona um Object grupo ao Array groups e retornando todos os grupos do userId
     * através da  @function getUserByToken e da @function addGroup, localizadas no file task-db_mem.js
     * @param nameOfGroup e @param description da função a ser chamada são os valores adicionados 
     * ás propriedades nameOfGroup e description do grupo criado
     * @param userToken é utilizado na busca do userId
     */
function addGroup(nameOfGroup,description,userToken){ 
    return data.getUserByToken(userToken)
                    .then(user => data.addGroup(user.id,nameOfGroup,description))
                   // .catch(error => Promise.reject(errors.NOT_AUTHORIZE())) 
}

/**
     * Adiciona um Array games á propriedade games do Object grupo situado no Array groups
     * através da @function addGame e  @function getUserByToken utilizada na busca do userId,
     * localizadas no file task-db_mem.js
     * @param token e @param groupId,  da função a ser chamada são usadas na busca do Object grupo especifico
     * @param gameInfo é usado como valor da propriedade id situada no object game 
     */
function addGame(gameInfo,groupId,userToken){ //fazer de forma a não ter a variavel criada acima
     return data.getUserByToken(userToken)
     .then(() => data.addGame(groupId,gameInfo))
     //.catch(error => Promise.reject(error.NOT_AUTHORIZE()))
}

/** MUDAR
     * Adiciona um Array games á propriedade games do Object grupo situado no Array groups
     * através da @function addGame e  @function getUserByToken utilizada na busca do userId,
     * localizadas no file task-db_mem.js
     * @param token e @param groupId,  da função a ser chamada são usadas na busca do Object grupo especifico
     * @param gameInfo é usado como valor da propriedade id situada no object game 
     */
 function addUser(userInfo){
          return data.addUser(userInfo)
     
     
     //.catch(error => Promise.reject(error.NOT_AUTHORIZE()))
}

function validateUser(username, password){
     return data.getUserByUsername(username)
            .then(user => {
                 if(password == user[0].password) return Promise.resolve({userName : username , password : password, token : user[0].token, email: user[0].email})
                 //else return Promise.reject(errors.INVALID_CREDENTIALS())
            })
 }

 /**
     * Atualiza as propriedades nameOfGroup e description de um Object grupo
     * segundo o seu token e gameId especifico atraves da @function updateGroup
     * e da @function getUserByToken utilizada na busca do userId, localizadas no file task-db_mem.js
     * @param groupId e @param token na chamada da função busca o grupo especifico para a alteração das propriedades
     * @param nameOfGroup e @param token são os valores atualizados das propriedades do grupo
     */
function updateGroup(groupId,nameOfGroup,description,userToken){// mudar de forma a usar o userToken para autentificar
     return data.getUserByToken(userToken)
     .then(() => data.updateGroup(user.id,groupId,nameOfGroup,description))
    // .catch(error => Promise.reject(error.NOT_AUTHORIZE()))
}

/**
     * Elimina o Object grupo especifico situado no Array groups usando as @function deleteGroup e @function getUserByToken 
     * utilizada na busca do userId localizadas no file task-db_mem.js
     * @param groupId e @param token na chamada da função para filtrar o grupo com o id e userID especificos
     */
function deleteGroup(groupId){
    return data.deleteGroup(user.id,groupId)
}

/**
     * Elimina o Object game especifico situado no Array games usando as @function deleteGame e @function getUserByToken 
     * utilizada na busca do userId localizadas no file task-db_mem.js
     * @param groupId e @param gameId na chamada da função para filtrar o game localizado no grupo com cada um dos especificos id's
     */
function deleteGame(groupId,gameId){
    return data.deleteGame(user.id,groupId,gameId)
}


}
