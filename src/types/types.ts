export interface Data {
  id: string;
}
export interface IResponse<T> {
  content: T;
  retcode: number;
  msg: string;
  errmsg: string;
}
