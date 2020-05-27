export class RepositoryDto {
  private readonly id: number;
  private readonly clone_url: string;
  private readonly name: string;
  private readonly full_name: string;

  constructor(id: number, clone_url: string, name: string, full_name: string) {
    this.id = id;
    this.clone_url = clone_url;
    this.name = name;
    this.full_name = full_name;
  }
}
