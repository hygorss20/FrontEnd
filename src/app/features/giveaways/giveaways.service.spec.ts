import { TestBed } from "@angular/core/testing";

import { GiveawaysService } from "./giveaways.service";

describe("GiveawaysService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: GiveawaysService = TestBed.get(GiveawaysService);
    expect(service).toBeTruthy();
  });
});
