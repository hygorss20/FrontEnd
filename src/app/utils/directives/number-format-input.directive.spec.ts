import { NumberFormatInputDirective } from "./number-format-input.directive";

describe("InputLabelDirective", () => {
  it("should create an instance", () => {
    const directive = new NumberFormatInputDirective(null, null, null);
    expect(directive).toBeTruthy();
  });
});
