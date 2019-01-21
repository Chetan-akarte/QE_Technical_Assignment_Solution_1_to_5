const fs = require('fs');
const soapRequest = require('easy-soap-request');
const assert = require('assert')
 parseString = require('xml2js').parseString,
 xml2js = require('xml2js');
var os = require('os');

// example data
const url = 'http://www.dneonline.com/calculator.asmx';
const headers = {
	'user-agent': 'easy-soap-request-test',
	'Content-Type': 'text/xml;charset=UTF-8',
	'Content-Length': 'nnn',
};
const xml = fs.readFileSync('TestData.xml', 'utf-8');

// usage of module
(async () => {

	const { response } = await soapRequest(url, headers, xml,10000); // Optional timeout parameter(milliseconds)
	console.log('\n ****** Response ****** \n ')
	var expectedStatusCode = 200;
	const { body, statusCode } = response;
	//console.log("response  - \n"+  response)
	console.log("Response  - \n" +body)


//	console.log(json.root.graph[0].node.length);
	console.log('\n ****** Validation Started ****** \n '	)
	assert.equal(statusCode, expectedStatusCode, ' Not matching StatusCode :: Actual StatusCode  is '+statusCode+' and  expected StatusCode  is '+expectedStatusCode+'.')
	console.log('\n1. Successfully matching StatusCode  :: Actual StatusCode  is '+statusCode+' and  expected StatusCode  is '+expectedStatusCode+'.')
   
		fs.writeFile('soupResponse.xml', body, (err) =>	{
			if(err) console.log(err);
			//console.log('file	written	successfully');			
			
			if (os.platform() == 'win32') {  
			    var chilkat = require('chilkat_node10_win32'); 
			} 
			var xSoapEnvelope = new chilkat.Xml();

		    var success;
		    success = xSoapEnvelope.LoadXmlFile("soupResponse.xml");
		    if (success !== true) {
		        console.log(xSoapEnvelope.LastErrorText);
		        return;
		    }

		    //  The root node is the SOAP envelope, and in this particular case has a Tag of "soapenv:Envelope"
		   // console.log("SOAP envelope tag: " + xSoapEnvelope.Tag);

		    //  The SOAP body (in this case) is a direct child of the SOAP envelope
		    //  and has the tag "soapenv:Body"
		    // xSoapBody: Xml
		    var xSoapBody = xSoapEnvelope.FindChild("soap:Body");
		    if (xSoapBody == null ) {
		        console.log("No direct child having the tag \"soapenv:Body\" was found.");
		        return;
		    }

		    //  The SOAP message body is the direct child of the SOAP envelope body:
		    // xMessageBody: Xml
		    var xMessageBody = xSoapBody.FindChild("AddResponse");
		    var xMessageBodySub = xMessageBody.FindChild("AddResult");
		    //console.log('xMessageBodySub   --  '+ xMessageBodySub.Content);
		    if (xMessageBodySub == null ) {
		        console.log("No direct child having the tag \"AddResult\" was found.");

		        return;
		    }
		    var expectedAddResult = 20;
		    var actualAddResult = xMessageBodySub.Content;
			assert.equal(actualAddResult, expectedAddResult, ' Not matching addition Result :: Actual AddResult is '+actualAddResult+' and  expected AddResult is '+expectedAddResult+'.')
			console.log('\n2. Successfully matching Addition Result for :: Actual AddResult is '+actualAddResult+' and  expected AddResult is '+expectedAddResult+'.')
			
		    
		    var soapMessageXml = xSoapBody.GetXml();
		   // console.log(soapMessageXml);
         console.log('\n ****** Validation End ****** \n '	)

})
})();