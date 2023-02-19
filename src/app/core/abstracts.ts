export interface ICarouselFeed  {
    '_id'?: string,
    'isActive': boolean,
    addDate?: Date,
    'name': string
    'subtitle': string
    'desc': string
}

export interface IHttpResponse {
  message: any,
  errFlag: boolean
}
