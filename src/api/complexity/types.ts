export interface GetComplexities<T> {
  data: T;
  status: number;
}

export interface ForGetComplexities extends CommonComplexity {
  id: string;
  active: boolean;
}

export interface PostComplexities {
  data: ForPostComplexities[];
  status: number;
}

export interface ForPostComplexities extends CommonComplexity {
  isActive: boolean;
}

export interface PutComplexities {
  data: ForPutComplexities;
  status: number;
}

export interface ForPutComplexities extends CommonComplexity {
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
}
