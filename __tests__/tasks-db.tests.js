const data = require('../tasks-db_mem');

test('get user by token 3fa85f64-5717-4562-b3fc-2c963f66afa6', () => {
   return data.getUserByToken("3fa85f64-5717-4562-b3fc-2c963f66afa6")
            .then(task => expect(task).
                        toStrictEqual({id : 11, userName : "Filipe", token : "3fa85f64-5717-4562-b3fc-2c963f66afa6"}))
});

test('get games from a group with id 1 and userID 1', () => {
   return data.getFavoriteGames(1,11)
            .then(task => expect(task).
                        toStrictEqual([
                           [
                               {
                                   "id": "ABSSF122",
                                   "name": "Roblox"
                               },
                               {
                                   "id": "NFDND675",
                                   "name": "Fortinite"
                               }
                           ]
                       ])
            )
})

  test('get groups with userID 11', () => {
   return data.getGroups(11)
            .then(task => expect(task).
                        toStrictEqual([
                           {
                               "userID": 11,
                               "id": 1,
                               "nameOfGroup": "Action",
                               "description": "Action Games",
                               "games": [
                                   {
                                       "id": "ABSSF122",
                                       "name": "Roblox"
                                   },
                                   {
                                       "id": "NFDND675",
                                       "name": "Fortinite"
                                   }
                               ]
                           }
                       ])
  )})

  test('get group with userId 11 and groupId 1', () => {
   return data.getGroup(11,1)
            .then(task => expect(task).
                        toStrictEqual([
                           {
                               "userID": 11,
                               "id": 1,
                               "nameOfGroup": "Action",
                               "description": "Action Games",
                               "games": [
                                   {
                                       "id": "ABSSF122",
                                       "name": "Roblox"
                                   },
                                   {
                                       "id": "NFDND675",
                                       "name": "Fortinite"
                                   }
                               ]
                           }
                       ])
  )})

  test('add group with userID 11, nameOfGroup Terror Games and description Games with terror', () => {
   return data.addGroup(11,"Terror Games","Games with terror")
            .then(task => expect(task).
                        toStrictEqual({
                           "userID": 11,
                           "id": 3,
                           "nameOfGroup": "Terror Games",
                           "description": "Games with terror",
                           "games": []
                       }))
  })

  test('add game with userId 11, groupId 1, gameID TAAifFP590', () => {
   return data.getTaskById(11,1,"TAAifFP590")
            .then(task => expect(task).
                        toStrictEqual([
                           [
                               {
                                   "id": "ABSSF122",
                                   "name": "Roblox"
                               },
                               {
                                   "id": "NFDND675",
                                   "name": "Fortinite"
                               },
                               {
                                   "id": "TAAifFP590",
                                   "name": "Root"
                               }
                           ]
                       ]))
  });

  test('update group with userId 11, groupId 1, nameOfGroup Adventure Games and description Games with adventure', () => {
   return data.updateGroup(11,1,"Adventure Games", "Games with adventure")
            .then(task => expect(task).
                        toStrictEqual([
                           {
                               "userID": 11,
                               "id": 1,
                               "nameOfGroup": "Adventure Games",
                               "description": "Games with adventure",
                               "games": [
                                   {
                                       "id": "ABSSF122",
                                       "name": "Roblox"
                                   },
                                   {
                                       "id": "NFDND675",
                                       "name": "Fortinite"
                                   },
                                   {
                                       "id": "TAAifFP590",
                                       "name": "Root"
                                   }
                               ]
                           }
                       ]))
  });

  test('delete a group with userId 11 and groupId 1', () => {
   return data.deleteGroup(11,1)
            .then(task => expect(task).
                        toStrictEqual([])
  )})

  test('delete a game with userId 11, groupId 1 and gameId ABSSF122', () => {
   return data.getTaskById(11,1,"ABSSF122")
            .then(task => expect(task).
                        toStrictEqual([
                           {
                               "userID": 11,
                               "id": 1,
                               "nameOfGroup": "Action",
                               "description": "Action Games",
                               "games": [
                                   {
                                       "id": "NFDND675",
                                       "name": "Fortinite"
                                   }
                               ]
                           }
                       ]))
  });