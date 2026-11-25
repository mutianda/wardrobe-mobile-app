export interface ApiResponse<T=any>{
    code:number
    message:string
    data:T
}



export interface PageParams{
    page:number
    size:number
    [key:string]:any
}
