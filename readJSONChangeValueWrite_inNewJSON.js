 var filesystem = require("fs");
// Get content from file

filesystem.readFile('myTestDemoJson.json', function (err, data){
    if(err) console.log(err);
    // we log out the readFile results    
    console.log(" Reading JSON file \n "+ data);
    var jsonData = data;	
    var jsonParsed = JSON.parse(jsonData);

    
    //console.log("jsonParsed "+ jsonParsed.graph.node[0].name);
    //console.log("jsonParsed "+ jsonParsed.graph.node[1].name);
    //console.log(" aEEAY JSON length \n "+ jsonParsed.graph.node.length);
    
     // Get Value from JSON
     
     for(var i = 0; i < jsonParsed.graph.node.length; i++) {
               if (jsonParsed.graph.node[i].name == "Wipro") {
            	   jsonParsed.graph.node[i].name = "Wipro Ltd.";
                   break;
               }
     }
     var jsonContent = JSON.stringify(jsonParsed);
     console.log(jsonContent);
     
      filesystem.writeFile('newly-edited-testdemoJSON.json', jsonContent, function(err){
         if (err) console.log(err);
         
         console.log("\nsuccessfully change some values and write in newly edited JSON file (i.e. newly-edited-testdemoJSON.json file). \n");
      })   
  });
