import React from 'react'
import {transition} from '../../utilities/types'

const Transition = (props:{item:transition})=> {
  return (
    <div>
        {props.item.name +": "+ props.item.from + " -> " + props.item.to}
    </div>
  )
}

export default Transition