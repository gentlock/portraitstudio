export interface ICarouselFeed  {
  '_id'?: string,
  'isActive': boolean,
  addDate?: Date,
  'name': string
  'subtitle': string
  'desc': string
}

export interface IMyserviceFeed {
  _id?: string;
  isActive: boolean;
  addDate?: Date;
  name: string;
  subtitle: string;
  desc: string;
  priceList: string;
  coverPhoto?: string;
  gallery?: string[];
}

export interface IAlbumsFeed {
  _id?            : string,
  isActive        : boolean,
  fileToDownload? : string,
  addDate?       : Date,
  name          : string,
  clientName    : string,
  clientEmail   : string,
  desc          : string,
  accessCode    : string,
  serviceId     : string,
  clientInfo    : string,
  gallery?      : string[];
  coverPhoto?   : string,
}

export interface IHttpResponse {
  message: any,
  errFlag: boolean
}
