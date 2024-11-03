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
