export interface GetComplexities<T> {
  data: T;
  status: number;
}

export interface ForGetComplexities extends Omit<CommonComplexity, "isActive"> {
  id: string;
  active: boolean;
}

export interface PostComplexities {
  data: ForPostComplexities;
  status: number;
}

export interface ForPostComplexities {
  complexities: CommonComplexity[];
}

export interface PutComplexities {
  data: ForPutComplexities;
  status: number;
}

export interface ForPutComplexities extends Omit<CommonComplexity, "isActive"> {
  id: string;
  active: boolean;
}

export interface DeleteComplexities {
  status: number;
  data: string;
}

interface CommonComplexity {
  name: string;
  numberOfHours: string;
  numberOfFeatures: string;
  description: string;
  sample: string;
  isActive: boolean;
}
