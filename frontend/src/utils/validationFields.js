export default function validationField(...fields){

    for(var field in fields){
        if(fields[field] === '' || fields[field].length <= 0){
            return true;
        }else{
            return false;
        }
    }
}