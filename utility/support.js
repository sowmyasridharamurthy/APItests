class support{

    validateEmail(elementValue)
    {      
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue); 
    }

    
     compareOutput(obj1,obj2){
        var keys1 = Object.keys(obj1);
        var keys2 = Object.keys(obj2);
    
        //return true when the two json has same length and all the properties has same value key by key
        return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);

     
    }
}
export default support;

