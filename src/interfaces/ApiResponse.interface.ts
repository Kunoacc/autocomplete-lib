export interface CatsResponse extends Array<Cat> { }

export interface Cat {
  id: string;
  name: string;
}