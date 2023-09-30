export class ResponseError extends Error {
  response: Response; // Assuming response is of type Response
  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}
