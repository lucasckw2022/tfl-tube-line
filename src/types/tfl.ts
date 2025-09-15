export interface LineStatus {
  id: number;
  lineId?: string;
  statusSeverity: number;
  statusSeverityDescription: string;
  reason?: string;
  created: string;
  validityPeriods?: ValidityPeriod[];
}

export interface ValidityPeriod {
  fromDate: string;
  toDate: string;
  isNow: boolean;
}

export interface TubeLine {
  id: string;
  name: string;
  modeName: string;
  disruptions: any[];
  created: string;
  modified: string;
  lineStatuses: LineStatus[];
  routeSections: any[];
  serviceTypes: ServiceType[];
}

export interface ServiceType {
  name: string;
  uri: string;
}
