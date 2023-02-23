import React, { ChangeEvent, useState } from 'react'
import { getData } from '../../App'
import data from '../../utilities/data'
import { updateFunctions, variables } from '../../utilities/types'

const AddStatus = (props:{variable:variables, update:updateFunctions})=> {
    const [name, setName] = useState<string>("")

    const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }

    const add = async()=>{
        await data.addStatus(name);
        setName("")
        getData(props.variable, props.update)
    }

  return (
    <div>
        <input type={"text"} onChange={handleInput} value={name}/>
        <button onClick={add}>add</button>
    </div>
  )
}

export default AddStatus