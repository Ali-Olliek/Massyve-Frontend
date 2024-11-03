export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export class Base {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(base: IBase) {
    this.id = base.id;
    this.createdAt = base.createdAt;
    this.updatedAt = base.updatedAt;
  }
}
