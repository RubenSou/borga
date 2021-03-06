window.addEventListener('load', loadHandler)

function loadHandler(){
    const buttonUpdate = document.querySelector('#btn_update')
    buttonUpdate.addEventListener('click', updateTaskHandler)
}

function updateTaskHandler(){
    const taskId = document.querySelector('#task_id').value
    const taskText = document.querySelector('#task_text').value 
    //if(!taskText) document.querySelector('#message').appendChild(document.createTextNode("Text Empty"))
    if(!taskText) document.querySelector('#message').innerHTML = "TextEmpty"
    const options = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            text : taskText
        })
    }
    
    fetch(`/group/game/${taskId}`, options)
    .then(res =>{
        console.log(res.status)
        if(res.status==401)  return Promise.reject("Unauthorize") 
        return res.json() 
    } )
    .then(body => {
        console.log(body)
        document.location.href=`/tasks/${taskId}`
    })
    .catch(error => {
        document.querySelector('#message').innerHTML = error
        console.log(error)
    })
}

