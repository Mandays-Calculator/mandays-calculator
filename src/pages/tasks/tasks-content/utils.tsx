export enum Status {
  Invalid = "Invalid",
  Backlog = "Backlog",
  NotYetStarted = "Not Yet Started",
  InProgress = "In Progress",
  OnHold = "On Hold",
  Completed = "Completed",
}

export const StatusByValue: { [key: number]: Status } = {
  0: Status.Invalid,
  1: Status.Backlog,
  2: Status.NotYetStarted,
  3: Status.InProgress,
  4: Status.OnHold,
  5: Status.Completed,
};

export const StatusValues: { [key in Status]: number } = {
  [Status.Invalid]: 0,
  [Status.Backlog]: 1,
  [Status.NotYetStarted]: 2,
  [Status.InProgress]: 3,
  [Status.OnHold]: 4,
  [Status.Completed]: 5,
};

export enum MandaysEstimationStatus {
  NotYetStarted = "Not Yet Started",
  OnGoing = "On Going",
  Completed = "Completed",
}

export const MEStatusByValue: { [key: number]: MandaysEstimationStatus } = {
  0: MandaysEstimationStatus.NotYetStarted,
  1: MandaysEstimationStatus.OnGoing,
  2: MandaysEstimationStatus.Completed,
};

export enum StatusContainerColor {
  Backlog = "#E3E6E7",
  NotYetStarted = "#E4F7F9",
  InProgress = "#FFF4D4",
  OnHold = "#FFCECE",
  Completed = "#D5FFCD",
}

export enum StatusTitleColor {
  Backlog = "#000000",
  NotYetStarted = "#2C8ED1",
  InProgress = "#796101",
  OnHold = "#D54147",
  Completed = "#177006",
}
