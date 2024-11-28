import { Advertisment } from './advertisment';

export interface GetAds {
  success: boolean;
  message: string;
  data: {
    ads: Advertisment[];
  };
}
