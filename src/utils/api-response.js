class APIResponse{
    constructor(statusCode,data,message="succes"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.successCode=statusCode<400
        
    }
}

export{APIResponse}