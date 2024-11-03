export class Base {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(base: any) {
    this.id = base.id;
    this.createdAt = base.created_at;
    this.updatedAt = base.updated_at;
  }
}
