export class SignInUserCommand {
  constructor(
    public readonly mail: string,
    public readonly password: string,
  ) {}
}
