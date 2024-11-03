interface IResponse {
  error: boolean;
  message: string;
}

class Response {
  public error: boolean;
  public message?: string;
  constructor(response: IResponse) {
    this.error = response.error;
    this.message = response.message;
  }
}

export interface ISuccessResponse {
  parent: IResponse;
  data: Record<string, unknown>;
}
export class SuccessResponse extends Response {
  public data: unknown;
  constructor(success: ISuccessResponse) {
    super(success.parent);
    this.error = false;
    this.data = success.data;
  }
}

export interface IFailResponse {
  parent: IResponse;
  message: string;
  exception: string | undefined;
}
export class FailResponse extends Response {
  public message: string;
  public exception?: string;
  constructor(fail: IFailResponse) {
    super(fail.parent);
    this.error = true;
    this.message = fail.message;
    this.exception = fail?.exception;
  }
}

interface IValidationResponse {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}

export class ValidationErrorResponse {
  public location: string;
  public msg: string;
  public path: string;
  public type: string;
  public value: string;
  constructor(validationErrorResponse: IValidationResponse) {
    this.location = validationErrorResponse.location;
    this.msg = validationErrorResponse.msg;
    this.path = validationErrorResponse.path;
    this.type = validationErrorResponse.type;
    this.value = validationErrorResponse.value;
  }
}
