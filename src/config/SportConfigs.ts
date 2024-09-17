export interface CyclingSegment {
  duration: string;
  rpm: string;
  ftp: string;
  intensity: string;
  zone: string;
  rationale?: string;
}

export interface RunningSegment {
  distance: string;
  hm: string;
  zone: string;
  rationale?: string;
}

export interface StrengthSegment {
  name: string;
  reps: string;
  sets: string;
  rest: string;
  load_percentage: number;
  body_part: string;
  rationale?: string;
}

export interface Segment {
  duration?: string;
  rpm?: string;
  ftp?: string;
  intensity?: string;
  distance?: string;
  hm?: string;
  zone?: number;
  name?: string;
  reps?: string;
  sets?: string;
  rest?: string;
  load_percentage?: number;
  body_part?: string;
  rationale?: string;
}

export interface Session {
  ZoneDistribution?: string;
  IntensityLevel?: string;
  Location?: string;
  Distance?: number;
  StressLevelMeasure?: string;
  SkillCategory?: string;
  StressLevel?: number;
  Duration?: string;
  CoachingPoints?: string;
  StressLevelTSS?: number;
  IntensityMeasure?: string;
  CommonErrors?: string;
  CyclingCategory?: string[];
  SessionDescription?: string;
  SessionName: string;
  IntensityLevelIF?: number;
  SessionID: string;
  sessionType?: string;
  segments?: Segment[];
}

export interface SportConfig {
  sessionTable: string;
  segmentTable: string;
  parseZoneDistribution?: (
    zoneDistribution: string,
    totalDistance: number,
  ) => CyclingSegment[] | RunningSegment[];
  transformSegments: (segments) => Segment[];
}

export const sportConfigs: { [key: string]: SportConfig } = {
  cycling: {
    sessionTable: 'Cycling Sessions',
    segmentTable: 'Cycling Segments',
    parseZoneDistribution: (zoneDistribution: string) => {
      const zonePattern = /Z(\d+): (\d+)%/g
      const segments: CyclingSegment[] = []
      let match
      while ((match = zonePattern.exec(zoneDistribution)) !== null) {
        const [_, zone, percentage] = match
        segments.push({
          duration: percentage,
          rpm: '80',
          ftp: '200',
          intensity: 'Moderate',
          zone: `Z${zone}`,
          rationale: '',
        })
      }
      return segments
    },
    transformSegments: (segments) =>
      segments.map((segment) => ({
        duration: segment.Duration as string,
        rpm: segment.Cadence as string,
        ftp: segment.IntensityFTP as string,
        intensity: segment.IntensityWatts as string,
        zone: segment.SegmentType as number,
        rationale: segment.Rationale as string,
      })),
  },
  running: {
    sessionTable: 'Running Sessions',
    segmentTable: 'Running Segments',
    parseZoneDistribution: (
      zoneDistribution: string,
      totalDistance: number,
    ) => {
      const zonePattern = /Z(\d+): (\d+)%/g
      const segments: RunningSegment[] = []
      let match
      while ((match = zonePattern.exec(zoneDistribution)) !== null) {
        const [_, zone, percentage] = match
        segments.push({
          distance: ((parseFloat(percentage) / 100) * totalDistance).toFixed(2),
          hm: percentage + '%',
          zone: `Z${zone}`,
        })
      }
      return segments
    },
    transformSegments: (segments) =>
      segments.map((segment) => ({
        distance: segment.Duration as string,
        hm: (segment.Intensity + '%') as string,
        zone: segment.SegmentType as number,
        rationale: segment.Rationale as string,
      })),
  },
  strength: {
    sessionTable: 'S&C Sessions',
    segmentTable: 'S&C Segments',
    transformSegments: (segments, sessionDuration?: string) =>
      segments.map((segment) => {
        const reps = segment.Reps as string | undefined
        const intensity = segment.Intensity as string | undefined
        const sets = segment.Sets?.toString() || '1'
        const rest = (segment.RestPeriod as string) || '60 sec'

        return {
          name: (segment.Exercise as string) || 'Unnamed Exercise',
          reps: reps || '10-12',
          sets: sets,
          rest: rest,
          load_percentage: intensity
            ? parseInt(intensity.match(/\d+/)?.[0] || '0')
            : 0,
          duration: sessionDuration || '60 sec', // Use the session duration if provided
          body_part: segment.BodyPart as string,
          rationale: segment.Rationale as string,
        }
      }),
  },
}
