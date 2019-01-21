const	https	=	require('https')
const assert = require('assert')
var filesystem = require("fs")

const	data	=	JSON.stringify({	
	 title: 'foo',
     body: 'bar',
     userId: 1
 })
 
const	options	=	{	
	hostname:	'jsonplaceholder.typicode.com',	
	port:	443,	
	path:	'/posts',	
	method:	'POST',	
	headers:	{
		'Content-Type':	'application/json; charset=UTF-8',	
					
		} 
}

const	req	=	https.request(options,	(res)	=>	{	
	var expectedStatusCode= 201
	var expectedId = 101

		res.on('data',	(d)	=>	{	
			console.log('\n ****** Response ****** \n '+	d)
			console.log('\n ****** Validation Started ****** \n '	)
			assert.equal(res.statusCode, expectedStatusCode, ' Not matching Status Code :: Actual Status Code is '+res.statusCode+' and we are expecting '+expectedStatusCode+'.')
			console.log('statusCode: '+	res.statusCode)

			console.log('1. Successfully validate Status code :: Actual Status Code - '+res.statusCode+'  Expected Status Code - '+expectedStatusCode )
			
			
			//process.stdout.write(d)	
			//console.log('\n ****** Response ****** \n: '+	d)	
			var jsonParsed = JSON.parse(d);
			assert.equal(jsonParsed.id, expectedId, ' Not matching Id :: Actual Id is '+jsonParsed.id+' and  expected UId is '+expectedId+'.')
		    console.log('\n2. Successfully matching Id :: Actual Id is '+jsonParsed.id+' and  expected Id is '+expectedId+'.')
		    console.log('\n ****** Validation End ****** \n '	)
		})
	})
	
	req.on('error',	(error)	=>	{	
		console.error(error) 
	})
req.write(data)
req.end()

