import { Product } from "./product-model";
import { OsrsSkills } from "./osrsSkills";

export interface Account extends Product {
  password: string;
  rsn: string;
  skills: OsrsSkills;
  status: string;
}
