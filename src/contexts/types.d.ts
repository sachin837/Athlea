import {ReactNode} from 'react';
import {Peripheral, PeripheralType} from './BleContext';

interface BleContextValue extends BleState {
  method: 'Ble';
  startScan: (peripheralType: PeripheralType) => Promise<void>;
  refreshScan: (peripheralType?: PeripheralType) => Promise<void>;
  stopScan: () => Promise<void>;
  connectPeripheral: (
    peripheral: Peripheral,
    peripheralType: PeripheralType,
  ) => Promise<void>;
  disconnectedPeripheral: (peripheral: Peripheral) => Promise<void>;
  retrieveConnected: () => Promise<void>;
  readFromPeripheral: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => Promise<void>;
  readHeartRate: () => Promise<void>;
  monitorDeviceCharacteristics: (
    peripheralId?: string,
    peripheralType?: PeripheralType,
  ) => Promise<void>;
  stopMonitorBikeCharacteristics: () => Promise<void>;
  monitorCharacteristic: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => Promise<void>;
  stopMonitorCharacteristic: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => Promise<void>;
  writeCharacteristic: (
    peripheralId: string,
    serviceUUID: string,
    characteristicUUID: string,
    data: any,
    maxByteSize?: number,
  ) => Promise<void>;
  updateBikeDataValue: (data: WriteBikeData) => Promise<void>;
  togglePairingModal: () => Promise<void>;
  getBikeList: () => Array<Peripheral>;
  getHRMList: () => Array<Peripheral>;
  updateBikeConfig: (data: RiderBikeConfig) => Promise<void>;
  startRecordData: () => void;
  pauseRecordData: () => void;
  stopRecordData: () => void;
}

/*
  These values start with capital so they can
  be used by Unity without modificiation that would add to latency
*/
export interface BikeDataState {
  Cadence: number;
  Power: number;
  Speed: number;
  TiltAngle: number;
  SteeringAngle: number;

  BPM: number;

  // Gear Setting
  CranksetTeeth: number;
  CassetteTeeth: number;

  // Braking
  LeftBrake: number;
  RightBrake: number;

  // Not being used yet
  AverageCadence: number;
  AverageSpeed: number;
}

// These are the values written to the bike
interface WriteBikeData {
  Grade: number;
  WindSpeed: number;
  Crr: number; // Coefficient of rolling resistance
  Cw: number; // Wind resistance coefficient
}

interface BleState {
  showPairingModal: boolean;
  connectedBikeId: string | null;
  connectedHrmId: string | null;
  isConnected: boolean;
  isTiltBike: boolean;
  hasControl: boolean;
  bikeData: BikeDataState;
  peripherals: Map<any, any>;
  list: Array<any>;
  initialising: boolean;
  isScanning: boolean;
  error: boolean;
  isRecording: boolean;
  recordedData: BikeDataState[];
}

interface BleNotification {
  value: any;
  characteristic: string;
  peripheral: string;
}

interface BleProps {
  children: ReactNode;
}

type InitialiseAction = {
  type: 'INITIALISE';
  payload: {
    initialising: boolean;
    error: boolean;
  };
};

type ConnectPeripheralAction = {
  type: 'CONNECTPERIPHERAL';
  payload: {
    connectedBikeId?: string;
    connectedHrmId?: string;
    isConnected: boolean;
    peripherals: Map<any, any>;
    list: Array<any>;
    error: boolean;
  };
};

type DisconnectPeripheralAction = {
  type: 'DISCONNECTPERIPHERAL';
  payload: {
    isConnected: boolean;
    peripherals: Map<any, any>;
    list: Array<any>;
    error: boolean;
  };
};

type StartScanAction = {
  type: 'STARTSCAN';
  payload: {
    isScanning: boolean;
    error: boolean;
  };
};

type StopScanAction = {
  type: 'STOPSCAN';
  payload: {
    isScanning: boolean;
    error: boolean;
  };
};

type DiscoverPeripheralAction = {
  type: 'DISCOVERPERIPHERAL';
  payload: {
    peripherals: Map<any, any>;
    list: Array<any>;
    error: boolean;
  };
};

type RefreshScanAction = {
  type: 'REFRESHSCAN';
  payload: {
    error: boolean;
  };
};

type RetrieveConnectedAction = {
  type: 'RETRIEVECONNECTED';
  payload: {
    peripherals: Map<any, any>;
    list: Array<any>;
    error: boolean;
  };
};

type DisconnectAction = {
  type: 'DISCONNECTPERIPHERAL';
  payload: {
    isConnected: boolean;
    peripherals: Map<any, any>;
    list: Array<any>;
    error: boolean;
  };
};

type ReadSensorDataAction = {
  type: 'READSENSORDATA';
  payload: {
    bikeData: Partial<BikeDataState>;
    error: boolean;
  };
};

type NotifyDataAction = {
  type: 'NOTIFYDATA';
  payload: {
    bikeData: Partial<BikeDataState>;
    error: boolean;
  };
};

type IsTiltBikeAction = {
  type: 'ISTILTBIKE';
  payload: {
    isTiltBike: boolean;
  };
};

type ControlPointAction = {
  type: 'CONTROLPOINT';
  payload: {
    hasControl: boolean;
  };
};

type TogglePairingModalAction = {
  type: 'TOGGLEPAIRINGMODAL';
  payload: {
    showPairingModal: boolean;
  };
};

export type Action =
  | InitialiseAction
  | StartScanAction
  | StopScanAction
  | DiscoverPeripheralAction
  | RefreshScanAction
  | RetrieveConnectedAction
  | DisconnectAction
  | ConnectPeripheralAction
  | ReadSensorDataAction
  | NotifyDataAction
  | IsTiltBikeAction
  | ControlPointAction
  | TogglePairingModalAction;

export type deviceOrientationTypes = 'portrait' | 'landscape';

export interface deviceInfoTypes {
  deviceOrientation: deviceOrientationTypes;
  screenFraction: number;
}

export interface RiderBikeConfig {
  riderMass: number;
  wheelSize: number;
  bikeMass: number;
}

export interface DeviceOrientationValue extends deviceInfoTypes {
  calculateAspectRatio: (
    widthRatio: number,
    heightRatio: number,
    orientationBase?: deviceOrientationTypes,
  ) => void;
}

// BikeData
export type Map = 'Sa Calobra' | 'Skills Course' | 'Open Space';
export type Activity =
  | 'Up Hill'
  | 'Down Hill'
  | 'Clockwise'
  | 'Anti Clockwise'
  | 'Free Ride';

export type PowerZone = {
  key: string; // time
  value: number; // power
};

export type HeartRateZone = {
  key: string; // time
  value: number; // heart rate
};

export type TimeInGear = {
  key: string; // time
  value: number; // gear
};

export type IBikeDataState = {
  // Steering
  tiltAngle: number[];
  steeringAngle: number[];

  // Speed
  speed: number[];
  maxSpeed: number;

  // Distance
  distance: number[];

  // Power
  power: number[];
  powerZone: PowerZone[];
  avgPower: number[];

  // Gear
  gear: number[];
  timeInGear: TimeInGear[];

  // Heart rate
  heartRate: number[];
  heartRateZone: HeartRateZone[];

  // Other
  cadence: number[];
  incline: number[];
  gradient: number[];
  metersAscended: number[];
  metersDescended: number[];

  // Player position
  posX: number[];
  posY: number[];
  posZ: number[];
  rotX: number[];
  rotY: number[];
  rotZ: number[];
};

export type BikeSegmentData = {
  name: string;
  duration: number;
  data: IBikeDataState;
};

export type BikeData = {
  map: Map;
  activity: Activity;
  frequency: number;
  distance: number;
  duration: number;
  position: number;
  completed: boolean;
  segmentData: {
    name: string;
    duration: number;
    data: {
      cadence: number[];
      averageCadence: number[];
      power: number[];
      speed: number[];
      averageSpeed: number[];
      tiltAngle: number[];
      steeringAngle: number[];
      bpm: number[];
      cranksetTeeth: number[];
      cassetteTeeth: number[];
      leftBrake: number[];
      rightBrake: number[];
      // Steering
      // tiltAngle: number[];
      // steeringAngle: number[];

      // // Speed
      // speed: number[];
      // maxSpeed: number;

      // // Distance
      // distance: number[];

      // // Power
      // power: number[];
      // powerZone: PowerZone[];
      // avgPower: number[];

      // // Gear
      // gear: number[];
      // timeInGear: TimeInGear[];

      // // Heart rate
      // heartRate: number[];
      // heartRateZone: HeartRateZone[];

      // // Other
      // cadence: number[];
      // incline: number[];
      // gradient: number[];
      // metersAscended: number[];
      // metersDescended: number[];

      // Player position
      // posX: number[];
      // posY: number[];
      // posZ: number[];
      // rotX: number[];
      // rotY: number[];
      // rotZ: number[];
    };
  }[];
};
