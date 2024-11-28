import { Facility } from './facility';

export interface GetFacilitiesResponse {
  success: boolean;
  message: string;
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}
