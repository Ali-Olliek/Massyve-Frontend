export class Base {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(base: any) {
    this.id = base.id;
    this.createdAt = base.createdAt;
    this.updatedAt = base.updatedAt;
  }
}
