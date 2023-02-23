import React from 'react'
import Transition from '../transition/Transition'
import Status from '../status/Status'
import data from "../../utilities/data"
import { updateFunctions, variables } from '../../utilities/types'
import { getData } from '../../App'
import '../../App.css'

const List = (props:{list:any[], stat:boolean, update:updateFunctions, variables:variables})=>{
    
    const removeStatus = async (name:string)=>{
        await data.deleteStatus(name)
        getData(props.variables, props.update)
    }
    
    const removeTransition = async (name:string)=>{
        await data.deleteTransition(name)
        getData(props.variables, props.update)
    }

    const updateInitial = async(name:string)=>{
        await data.setInitial(name);
        getData(props.variables, props.update)
    }

    return (
        <div>
            <ul>
                
                {props.list.map((item, index)=>
                <div key={index}>
                    {props.stat?
                    <div className="listItemStat" onChange={()=>updateInitial(item)}>
                        <input name="initial" type={"radio"} checked={props.variables.initial===item}></input>
                        <Status name={item} labels={props.variables.labels} initial={props.variables.initial}/>
                        <button onClick={()=>{removeStatus(item)}}>remove</button>   
                    </div>
                    :
                    <div className="listItemTransition">
                        <Transition item={item}/>
                        <button onClick={()=>{removeTransition(item.name)}}>remove</button>   
                    </div>
                    } 
                </div>
                    )}

            </ul>
        </div>
    )
}

export default List