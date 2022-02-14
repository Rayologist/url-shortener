import {
  isValidTimeString,
  isValidUrl,
  hasExpired,
} from "../src/api/v1/validations/validateShortener";

describe("Test validations/validateShortener", () => {
  it("should return true if input value is a valid url", () => {
    expect(isValidUrl("randomstring")).toBeFalsy();
    expect(isValidUrl("1https://www.dcard.tw/f")).toBeFalsy();
    expect(isValidUrl("https://www.dcard.tw/f")).toBeTruthy();
  });

  it("should return true input value is a valid time string", () => {
    expect(isValidTimeString("randomstring")).toBeFalsy();
    expect(isValidTimeString("2021-01-11T14:00:20Zz")).toBeFalsy();
    expect(isValidTimeString("2021-01-11 14:00:20")).toBeTruthy();
    expect(isValidTimeString("2021-01-11T14:00:20Z")).toBeTruthy();
  });

  it("should return true input time has expired compared with now", () => {
    expect(hasExpired("9999-5-5 3:3:3")).toBeFalsy();
    expect(hasExpired("1970-5-5 3:3:3")).toBeTruthy();
  });
});
