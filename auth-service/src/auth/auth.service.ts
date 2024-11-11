export class AuthService {
  async login(payload: { username: string; password: string }) {
    console.log({ payload });
    return payload
  }
}
