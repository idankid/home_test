
// get the statuses
const getStatus = async()=>{
    let data = await fetch("http://localhost:8000/status",{method:"GET"})
    return data.ok?await data.json(): data.text()
}
//  get the transitions
const getTransition = async()=>{
    let data = await fetch("http://localhost:8000/transition",{method:"GET"})
    return data.ok?await data.json(): data.text()
}

// get the initial status
const getInitial = async()=>{
    let data = await fetch("http://localhost:8000/initial",{method:"GET"})
    return await data.text()
}

// get the label status
const getLabels = async()=>{
    let data = await fetch("http://localhost:8000/labels",{method:"GET"})
    return data.ok?await data.json(): data.text()
}

// adds a status
const addStatus = async(toAdd:string)=>{
    let data = await fetch("http://localhost:8000/status/"+toAdd,{method:"POST"})
    return await data.text()
}

// adds a transition
const addTransition = async(toAdd:{name:string, from:string, to:string})=>{
    let data = await fetch("http://localhost:8000/transition",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(toAdd)
    })
    return await data.text()
}

// sets the initial
const setInitial = async(toAdd:string)=>{
    let data = await fetch("http://localhost:8000/initial/"+toAdd,{method:"PUT"})
    return await data.text()
}

// deletes a status
const deleteStatus = async(toAdd:string)=>{
    let data = await fetch("http://localhost:8000/status/"+toAdd,{method:"DELETE"})
    return await data.text()
}

// deletes a transitions
const deleteTransition = async(toAdd:string)=>{
    let data = await fetch("http://localhost:8000/transition/"+toAdd,{method:"DELETE"})
    return await data.text()
}

// resets the data
const reset = async()=>{
    let data = await fetch("http://localhost:8000/reset",{method:"DELETE"})
    return await data.text()
}

const data = {getStatus, getTransition, getInitial, getLabels,
addStatus, addTransition, setInitial,
deleteStatus, deleteTransition, reset};

export default data;