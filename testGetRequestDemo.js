const	https	=	require('https')
const assert = require('assert')
var filesystem = require("fs")

const	options	=	{	
	hostname:	'jsonplaceholder.typicode.com',	
	port:	443,	
	path:	'/posts/1',	
	method:	'GET' 
		}

const	req	=	https.request(options,	(res)	=>	{	
	var expectedStatusCode= 200
	var expectedUserId = 1
	
			res.on('data',	(d)	=>	{	
				console.log('\n ****** Response ****** \n '+	d)
				console.log('\n ****** Validation Started ****** \n '	)
				assert.equal(res.statusCode, expectedStatusCode, ' Not matching Status Code :: Actual Status Code is '+res.statusCode+' and we are expecting '+expectedStatusCode+'.')
				console.log('statusCode: '+	res.statusCode)

				console.log('1. Successfully validate Status code :: Actual Status Code - '+res.statusCode+'  Expected Status Code - '+expectedStatusCode+'.' )
				//process.stdout.write(d)	
				
				var jsonParsed = JSON.parse(d);
				assert.equal(jsonParsed.id, expectedUserId, ' Not matching UserId :: Actual userId is '+jsonParsed.userId+' and  expected UserId is '+expectedUserId+'.')
			    console.log('\n2. Successfully matching userId :: Actual userId is '+jsonParsed.userId+' and  expected UserId is '+expectedUserId+'.')
			     console.log('\n ****** Validation End ****** \n '	)
				})
			})
			req.on('error',	(error)	=>	{		
				console.error(error)
		})
	
req.end()