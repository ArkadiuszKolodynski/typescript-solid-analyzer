export class RepositoryDto {
  private readonly id: number;
  private readonly clone_url: string;
  private readonly name: string;
  private readonly full_name: string;

  constructor(id, clone_url, name, full_name) {
    this.id = id;
    this.clone_url = clone_url;
    this.name = name;
    this.full_name = full_name;
  }
}
