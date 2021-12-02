

var rule = require('json-rules-engine');
var engine =  new rule.Engine()

let healthIsPED = {
    conditions: {
        all : [
            {
                fact : "HealthIsPED", 
                operator : "equal", 
                path : "$current_response.result.actionIncomplete", 
                value : false
            }, 
            {
                fact : "HealthIsPED", 
                operator : "equal", 
                path : "$default_params.IsPED", 
                value : "Yes"
            }, 
            {
                fact : "HealthIsPED", 
                operator : "equal", 
                path : "$current_response.result.parameters.ConfirmDetails", 
                value : "Yes"
            }
        ]
    },
    event: 
        {
            type : "eventcall", 
            eventName : "MedicalConditonConfirmation",
            params: {
                message: 'Health-IsPED TRUE!'
              }
        }
    
}
engine.addRule(healthIsPED)

let facts = {
    HealthIsPED: false
}

engine
  .run(facts)
  .then(results => {
    results.events.map(event => console.log(event.params.message))
  })