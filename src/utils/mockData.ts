import { TubeLine } from "../types/tfl";

export const mockTubeData: TubeLine = {
  id: "bakerloo",
  name: "Bakerloo",
  modeName: "tube",
  disruptions: [],
  created: "2025-09-11T15:21:16.64Z",
  modified: "2025-09-11T15:21:16.64Z",
  lineStatuses: [
    {
      id: 0,
      statusSeverity: 9,
      statusSeverityDescription: "Minor Delays",
      reason: "Bakerloo Line: Minor delays due to train cancellations.",
      created: "0001-01-01T00:00:00",
      validityPeriods: [
        {
          fromDate: "2025-09-14T14:00:26Z",
          toDate: "2025-09-15T00:29:00Z",
          isNow: true,
        },
      ],
    },
  ],
  routeSections: [],
  serviceTypes: [
    {
      name: "Regular",
      uri: "/Line/Route?ids=Bakerloo&serviceTypes=Regular",
    },
  ],
};

export const mockTubeDataArray: TubeLine[] = [
  {
    id: "bakerloo",
    name: "Bakerloo",
    modeName: "tube",
    disruptions: [],
    created: "2025-09-11T15:21:16.64Z",
    modified: "2025-09-11T15:21:16.64Z",
    lineStatuses: [
      {
        id: 0,
        lineId: "bakerloo",
        statusSeverity: 9,
        statusSeverityDescription: "Minor Delays",
        reason: "Bakerloo Line: Minor delays due to train cancellations.",
        created: "0001-01-01T00:00:00",
        validityPeriods: [
          {
            fromDate: "2025-09-14T14:00:26Z",
            toDate: "2025-09-15T00:29:00Z",
            isNow: true,
          },
        ],
      },
    ],
    routeSections: [],
    serviceTypes: [
      {
        name: "Regular",
        uri: "/Line/Route?ids=Bakerloo&serviceTypes=Regular",
      },
    ],
  },
  {
    id: "central",
    name: "Central",
    modeName: "tube",
    disruptions: [],
    created: "2025-09-11T15:21:16.64Z",
    modified: "2025-09-11T15:21:16.64Z",
    lineStatuses: [
      {
        id: 0,
        lineId: "central",
        statusSeverity: 10,
        statusSeverityDescription: "Good Service",
        created: "0001-01-01T00:00:00",
        validityPeriods: [],
      },
    ],
    routeSections: [],
    serviceTypes: [
      {
        name: "Regular",
        uri: "/Line/Route?ids=Central&serviceTypes=Regular",
      },
    ],
  },
];
