window.addEventListener('load', loadHandler)

function loadHandler(){
    const buttonUpdate = document.querySelector('#btn_update')
    buttonUpdate.addEventListener('click', updateGroupHandler)
}

function updateGroupHandler(){
    const groupId = document.querySelector('#group_id').value
    document.querySelector('#message1').innerHTML = groupId
    const groupName = document.querySelector('#group_name').value
    document.querySelector('#message2').innerHTML = groupName
    const groupDescription = document.querySelector('#group_description').value
    document.querySelector('#message3').innerHTML = groupDescription

    //if(!taskText) document.querySelector('#message').appendChild(document.createTextNode("Text Empty"))
    if(!groupName) document.querySelector('#message').innerHTML = "TextEmpty"
    const options = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify({
            nameOfGroup : groupName,
            description : groupDescription
        })
    }

    fetch(`/group/${groupId}`, options)
    .then(res =>{
        document.querySelector('#message4').innerHTML = res.status
        if(res.status == 401)  return Promise.reject("Unauthorize") 
        return res.json() 
    } )
    .then(body => {
        document.querySelector('#message').innerHTML = body
        document.location.href=`/group/${groupId}`
    })
    .catch(error => {
        console.warn(xhr.responseText)
        document.querySelector('#message').innerHTML = error
        console.log(error)
    })
}

