import React, { ChangeEvent, useState } from 'react'
import { getData } from '../../App'
import data from '../../utilities/data'
import { transition, updateFunctions, variables } from '../../utilities/types'

function AddTransition(props:{variable:variables, update: updateFunctions}) {
    const [name, setName] = useState<string>("")
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")

    const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const handleFrom = (e:ChangeEvent<HTMLSelectElement>)=>{
        setFrom(e.target.value)
    }
    const handleTo = (e:ChangeEvent<HTMLSelectElement>)=>{
        setTo(e.target.value)
    }

    const add = async()=>{
        if(name.trim() === ""){
            alert("missing name")
            return;
        }
        if(from.trim() === ""){
            alert("missing from")
            return
        }

        if(to.trim() === ""){
            alert("missing to")
            return
        }
        let transition:transition = {name:name, from:from, to:to}
        await data.addTransition(transition);
        setName("")
        setFrom("")
        setTo("")
        getData(props.variable, props.update)
    }

  return (
    <div>
        <input type={"text"} placeholder={"name"} onChange={handleInput} value={name}/>
        <select onChange={handleFrom}>
                <option selected={from===""} disabled value="">from</option>
                {props.variable.status.map((item, index)=>
                    <option value={item}>{item}</option>
                )}
        </select>
        
        <select onChange={handleTo}>
                <option selected={to===""} disabled value="">to</option>
                {props.variable.status.map((item, index)=>
                  {return item!==from?  <option value={item}>{item}</option>:null}
                )}
        </select>
        <button onClick={add}>add</button>
    </div>
  )
}

export default AddTransition