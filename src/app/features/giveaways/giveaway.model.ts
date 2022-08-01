import { GiveawayPrize } from "./giveaway-prize.model";

export class Giveaway {
  id?: string;
  startTime?: Date;
  endTime?: Date;
  active?: boolean;
  availablePrizes?: GiveawayPrize[];

  static fromJson(obj): Giveaway {
    if (!obj) {
      return null;
    }

    const giveaway: Giveaway = {
      id: obj.id,
      startTime: new Date(obj.startTime),
      endTime: new Date(obj.endTime),
      active: obj.active,
      availablePrizes: obj.availablePrizes,
    };

    return giveaway;
  }
}
