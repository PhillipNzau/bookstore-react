// types.ts
export interface ApiResponse {
    id: number;
    title: string,
    image:string,
    author: AuthorsModel
    // Add other properties as needed
  }

  export interface AuthorsModel {
    id: number,
    name: string,
    age: number
  }
