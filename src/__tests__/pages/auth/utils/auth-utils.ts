import { cleanup } from "@testing-library/react";

export const cleanAll = (): void => {
    jest.clearAllMocks();
    cleanup();
};

export const cleanAllCallback = (done: jest.DoneCallback): void => {
    jest.clearAllMocks();
    cleanup();
    done();
};