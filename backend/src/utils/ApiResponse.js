class ApiResponse {
    constructor(status = 200, data = "", message = "success") {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;