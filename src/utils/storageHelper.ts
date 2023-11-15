export const initStorage = (): void => {
  localStorage.setItem(
    "sessionState",
    JSON.stringify({
      unauthorized: false,
    })
  );
};

export const removeStateStorage = (): void => {
  localStorage.removeItem("sessionState");
};
