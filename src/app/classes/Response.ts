class Response {
  public error: boolean;
  public message?: string;
  constructor(response: any) {
    this.error = response.error;
    this.message = response.message;
  }
}

export class SuccessResponse extends Response {
  public data: any;
  constructor(success: any) {
    super(success);
    this.error = false;
    this.data = success.data;
  }
}

export class FailResponse extends Response {
  public message: string;
  public exception?: string;
  constructor(fail: any) {
    super(fail);
    this.error = true;
    this.message = fail.message;
    this.exception = fail?.exception;
  }
}

export class ValidationErrorResponse {
  public location: string;
  public msg: string;
  public path: string;
  public type: string;
  public value: string;
  constructor(validationErrorResponse: any) {
    this.location = validationErrorResponse.location;
    this.msg = validationErrorResponse.msg;
    this.path = validationErrorResponse.path;
    this.type = validationErrorResponse.type;
    this.value = validationErrorResponse.value;
  }
}