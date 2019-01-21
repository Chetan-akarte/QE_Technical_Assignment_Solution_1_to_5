var filesystem = require('fs'),
    parseString = require('xml2js').parseString,
    xml2js = require('xml2js');

filesystem.readFile('testdemoXML.xml', 'utf-8', function (err, data){
    if(err) console.log(err);
    // we log out the readFile results 
    console.log("Read a xml file");   
    console.log(data);
    // we then pass the data to our  here
    parseString(data, function(err, result){ 
        if(err) console.log(err);
        // here we log the results of our xml string conversionmethod
     //   console.log(result); 
        
        var json = result;
       
      //  console.log(result);

	//console.log(json.root.graph[0].node.length);

           for(var i = 0; i < json.root.graph[0].node.length; i++) {
               if (json.root.graph[0].node[i].name == "Wipro") {
                   json.root.graph[0].node[i].name = "Wipro Ltd.";
                   break;
               }
           }
        
       // json.root.graph[0].node[0].name = "Wipro Ltd.";
        
        // create a new builder object and then convert
        // our json back to xml.
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(json);
        
        filesystem.writeFile('newly-edited-testdemo.xml', xml, function(err, data){
            if (err) console.log(err);
            console.log("Edited/Updated data \n" + xml);
            console.log("\nsuccessfully change some xml values/content and write in to the xml new file (i.e. newly-edited-testdemo.xml). \n");

        })
                  
    });
});