import { Brandy } from "./brandy";

export interface ApiResponseBrandy {
    content: Brandy[];
    pageable: any;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: any;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }