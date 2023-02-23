import React from 'react'
import { labelsType } from '../../utilities/types'

const Status = (props:{name:string, labels:labelsType, initial:string})=>{
  return (
    <div>
      {props.name}
      {props.initial===props.name?"[INITIAL]":null}
      {props.labels.final.includes(props.name)?"[FINAL]":null}
      {props.labels.orphan.includes(props.name)?"[ORPHAN]":null}
    </div>
  )
}

export default Status