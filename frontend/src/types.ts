export interface Tab {
  id: string;
  name: string;
}

export interface FlowResult {
  count: number;
  coordinates: Array<[number, number]>;
  grid: number[][];
}

export interface FlowApiResponse {
  result: FlowResult;
  grid: number[][];
}
