class classErrorHandling extends Error {

    constructor(message, statusCode) {

      super(message); // Call the parent class (Error) constructor
      this.statusCode = statusCode; // Set custom status code

    }
  }
  
  export default classErrorHandling;