console.log('Hello and Welcome to Node JS World');


function add(num1, num2){
	
   if(!num1 || !num2){
	   throw new Error('Numbers are requied for adding. ')
   }
   return num1 + num2;
}

module.exports = {

	add

}
