class JsonResponse{
    constructor(message,statusCode){
        this.message = message,
        this.statusCode = statusCode
    }

}

class SuccessResponse extends JsonResponse{

    constructor({message,statusCode,result}){
        super(message,statusCode)
        this.result = result
    }

    toJson(){
        return {
            status:"Success",
            statusCode: this.statusCode,
            "message": this.message,
            "result": this.result
        }
    }

}

class ErrorResponse extends JsonResponse{

    constructor({message,statusCode,error=null}){
        super(message,statusCode)
        this.result = error
    }

    toJson(){
        return {
            status:"Failure",
            statusCode: this.statusCode,
            "message": this.message,
            "error": this.error
        }
    }

}

module.exports = {
    ErrorResponse,
    SuccessResponse
}