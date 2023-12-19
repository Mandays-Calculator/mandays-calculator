export const genders = [
  {
    label: "FEMALE",
    value: "FEMALE",
  },
  {
    label: "MALE",
    value: "MALE",
  },
  {
    label: "NON-BINARY",
    value: "NON_BINARY",
  },
  {
    label: "PREFER NOT TO SAY",
    value: "PREFER_NOT_TO_SAY",
  },
];

export const rolesData = [
  {
    label: "System Admin",
    value: "ROLE_SYS_ADMIN",
  },
  {
    label: "Sprint Manager",
    value: "ROLE_SPRINT_MANAGER",
  },
  {
    label: "User",
    value: "ROLE_USER",
  },
];

export const ERROR_MESSAGES = {
  unauthorized:
    "Access denied. The token provided is unauthorized or has expired.",
};

export const CHANNELS = {
  items: {
    sessionState: "sessionState",
  },
  events: {
    unauthorized: "Unauthorized",
    systemError: "SystemError",
  },
};

export const SESSION_STORAGE_ITEMS = {
  mcUser: "mc-user",
};

export const ERROR_CODES = {
  genericError: "GE000001",
  userNotFound: "US000004",
  networkError: "ERR_NETWORK",
};
