window.addEventListener('load', loadHandler)

function loadHandler(){
    const buttonsDelete = document.querySelectorAll('button')
    buttonsDelete.forEach(b => b.addEventListener('click', deleteHandler))
}

function deleteHandler(){
    const checkGameOrGroup = this.id.split('_')[1] 
    const id = this.id.split('_')[2]
    const options = {
        method : "DELETE",
        headers : {"Accept" : "application/json"}
    }
    if(checkGameOrGroup == "group"){const row = document.getElementById("grouprow_" + id)
    
    fetch(`/group/${id}`, options)
    .then(res =>{
        console.log(req.status)
        return res.json()
    } )
    .then(body => {
        console.log(body)
        row.remove()
    })
    .catch(error => console.log(error))
    }
    else{
        const groupId = this.id.split('_')[3]
        const row = document.getElementById("gamerow_" + id)

        fetch(`/games/${groupId}/${id}`, options)
        .then(res =>{
            console.log(req.status)
            return res.json()
        })
        .then(body => {
            console.log(body)
            row.remove()
        })
        .catch(error => console.log(error))
    } 
} 