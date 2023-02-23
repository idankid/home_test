const fs = require('fs')

//reading the the data from the data file
const readData = (callback:Function)=>{
    fs.readFile('./data.json', "utf-8", (err,data)=>{
        if(err)
            console.log(err)

        if(!data) data = "{}";
        callback(JSON.parse(data))
    })
}

// writing data into the file
const writeData = (fileData:String, callback:Function) => {
    fs.writeFile("./data.json", fileData,"utf-8", (err) => {
        if (err)
            console.log(err);
        else
            callback();
    });
};

//returns a list of orphan and final statuses
const findLabels = (statuses:string[], transitions:{name:string, from:string, to:string}[], init:string)=>{
      // the orphan label
      let all:string[] = [init]
      let possible:string[] = []
      
      // a type of bfs where we get all the possible outcomes
      while(all.length > 0){
          let current = all.shift()
          if(possible.includes(current))
              continue;
          // adding the possibilities
          transitions.forEach(item=>{
              if(item.from === current && !possible.includes(item.from))
                all.push(item.to)
          })
          possible.push(current)
      }

    //   final states
    let not_final=[]
    transitions.forEach(item=>{
        if(!not_final.includes(item.from))
            not_final.push(item.from)
    })

    //the final and orhpan arrays
    let final = [], orphan=[]
    statuses.forEach(item=>{
        if(!not_final.includes(item))
            final.push(item)
        if(!possible.includes(item))
            orphan.push(item)
    })

    return {orphan, final}
}

module.exports = {
    // getting the statuses
    getStatus: (req, res)=>{
        readData((data:JSON)=>{
            res.status(200).send(data["status"]);
        })
    },

    // getting the transitions
    getTransitions: (req, res)=>{
        readData((data:JSON)=>{
            res.status(200).send(data["transition"]);
        })
    },

    // getting the initial status
    getInitial: (req, res)=>{
        readData((data:JSON)=>{
            res.status(200).send(data["initial"]);
        })
    },

    // getting the labels
    getLabels: (req, res)=>{
        readData((data:JSON)=>{
            res.status(200).send({"orphan":data["orphan"], "final":data["final"]});
        })
    },

    // adding a new status
    addStatus: (req, res)=>{
        let name = req.params["name"];
        if(!name || name.trim()==""){
            res.status(400).send("missing name")
            return;
        }
        readData((data:JSON)=>{
            // checking if the name exists
            if(!data["status"]?.includes(name)){
                data["status"].push(name);
                if(data["initial"]==="")
                    data["initial"] = name
                let labels = findLabels(data['status'], data['transition'], data['initial'])
                data['orphan'] = labels.orphan
                data['final'] = labels.final
            }
            else{
                res.status(400).send("name already exists");
                return;
            }
            // writing the data
            writeData(JSON.stringify(data), ()=>{res.status(200).send("added status")})
        })

    },

    // adding a transition
    addTransition:(req, res)=>{
        console.log(req.body)
        // checking for the parameters
        if(!req.body?.name || !req.body?.from || !req.body?.to){
            res.status(400).send("missing parameter");
            return;
        }

        readData((data:JSON)=>{
            // seeing if the name already exists
            if(data["transition"].some((item)=>item.name === req.body.name)){
                res.status(400).send("transition name already exists");
                return;
            }
            // adding only available statuses
            if(!data["status"]?.includes(req.body?.from) || !data["status"]?.includes(req.body?.to)){
                res.status(404).send("wanted status does not exist");
                return;
            }
            // adding the transition
            let newTransition = {"name":req.body.name, "from":req.body.from, "to":req.body.to}
            data["transition"].push(newTransition);
            let labels = findLabels(data['status'], data['transition'], data['initial'])
            data['orphan'] = labels.orphan
            data['final'] = labels.final

            writeData(JSON.stringify(data),()=>{res.status(200).send("added transition")})
        })
    },

    //setting the initial status
    setInitial: (req, res)=>{
        if(!req.params["init"]){
            res.status(400).send("missing initial status");
        }

        readData((data)=>{
            if(!data["status"].includes(req.params["init"])){
                res.status(404).send("status not found");
                return;
            }
            data? data["initial"] = req.params["init"]: data["initial"] = "";
            let labels = findLabels(data['status'], data['transition'], data['initial'])
            data['orphan'] = labels.orphan
            data['final'] = labels.final
            writeData(JSON.stringify(data),()=>{res.status(200).send("initial status was set")})
        })
    },

    // deleting a stauts and all transitions with it
    deleteStatus: (req, res)=>{
        if(!req.params["name"]){
            res.status(400).send("missing status name");
            return
        }
        readData((data:JSON)=>{
            // status exists
            if(data["status"].includes(req.params["name"])){
                // removing the status
                data["status"] = data["status"]?.filter((item)=>item!== req.params["name"])

                // removing the transitions with the status
                data["transition"] =  data["transition"]?.filter(
                                ((item:JSON)=>(item["from"]!==req.params["name"] && item["to"]!==req.params["name"])))
            
                // updating initial
                if(data["initial"]==req.params["name"]){
                    data["initial"] = data["status"].length>0?data["status"][0]:""
                }
                
                // updaing the labels
                let labels = findLabels(data['status'], data['transition'], data['initial'])
                data['orphan'] = labels.orphan
                data['final'] = labels.final

                writeData(JSON.stringify(data),()=>{res.status(200).send("status has been deleted")})
            }
            else{
                res.status(404).send("status does not exist");
                return;
            }
        })
    },

    // deleting a transition
    deleteTransition: (req, res)=>{
        if(!req.params["name"]){
            res.status(400).send("missing transition name");
            return
        }

        readData((data:JSON)=>{
            // if the transition does not exist
            if(!data["transition"]?.some(item=>item["name"]===req.params["name"])){
                res.status(404).send("transition not found");
                return
            }
            data["transition"] =  data["transition"]?.filter(((item:JSON)=>item["name"]!==req.params["name"] ))
            let labels = findLabels(data['status'], data['transition'], data['initial'])
            data['orphan'] = labels.orphan
            data['final'] = labels.final
            writeData(JSON.stringify(data),()=>{res.status(200).send("transition removed")})
        })
    },

    // reseting the data
    reset: (req, res) => {
        writeData(JSON.stringify(
            {"status":[] , "transition":[],
            "initial":"",
            "orphan":[], 
            "final":[]}),()=>{
            res.status(200).send("data has been reset")
        })
    }
}