
Many APIs are written here such as "/" path takes to default/Index UI page.
- "/addRule" api is connected to add-rule UI where we can add rule and persist it in mongo-db.
- "/getRules" lists all the rules which are stored in db.
- "/getRuleById" helps in fetching the rule using an ID.
- "/saveConditions" to save conditions of a rule and after saving redirects it to index.html.
App listens on port 3000.
