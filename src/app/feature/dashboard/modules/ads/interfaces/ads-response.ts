import { Ads } from "./ads";

export interface AdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: Ads[];
    totalCount: number;
  };
}
