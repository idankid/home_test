import './App.css';
import data from './utilities/data'
import {transition, updateFunctions, labelsType, variables} from './utilities/types';
import { useState } from 'react';
import List from './components/list/List';
import AddStatus from './components/status/AddStatus';
import AddTransition from './components/transition/AddTransition';


export async function getData(variables:variables, update:updateFunctions){
  update.status(await data.getStatus())
  update.transition(await data.getTransition())
  update.labels(await data.getLabels())
  update.initial(await data.getInitial())
}


function App() {
  const [gotData, setGotData] = useState<boolean>(false)
  const [initial,setInitial]  = useState<string>("")
  const [status, setStatus] = useState<string[]>([])
  const [transition, setTransition] = useState<transition[]>([])
  const [labels, setLabels] = useState<labelsType>({orphan:[], final:[]})

  const updateFunctions:updateFunctions = {"initial":setInitial, "labels":setLabels, "status":setStatus, "transition":setTransition}
  const variables: variables = {initial:initial, status:status, transition:transition, labels:labels}

  if(!gotData){
    getData(variables, updateFunctions);
    setGotData(true);
  }

  const reset = async()=>{
    await data.reset()
    setInitial("")
    setLabels({orphan:[], final:[]})
    setTransition([])
    setStatus([])
  }

  return (
    <div className="App">
      <div>
        <h1>Satuts List</h1>
        <AddStatus variable={variables} update={updateFunctions}/>
        <List list={status} stat={true} update={updateFunctions} variables={variables}/>
        <h1>Transition List</h1>
        <AddTransition variable={variables} update={updateFunctions}/>
        <List list={transition} stat={false} update={updateFunctions} variables={variables}/>
      </div>
      <button id="reset" onClick={reset}>reset</button>
    </div>
  );
}

export default App;
