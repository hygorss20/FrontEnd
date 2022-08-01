import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FirecapePageComponent } from "./pages/firecape-page/firecape-page.component";
import { AccountComponent } from "./pages/account-page/account.component";
import { Rs07GoldComponent } from "./pages/rs07-gold/rs07-gold.component";
import { Rs03GoldComponent } from "./pages/rs03-gold/rs03-gold.component";
import { ReceiptPageComponent } from "./pages/receipt-page/receipt-page.component";
import { GiveawaysPageComponent } from "./pages/giveaways-page/giveaways-page.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { AlbionSilverComponent } from "./pages/albion-silver/albion-silver.component";
import { AboutUsPageComponent } from "./pages/about-us-page/about-us-page.component";
import { ContactUsPageComponent } from "./pages/contact-us-page/contact-us-page.component";
import { NewWorldComponent } from "./pages/new-world/new-world.component";

const routes: Routes = [
  { path: "", component: HomePageComponent, data: { animation: "HomePage" } },
  {
    path: "sign-in",
    component: SignInComponent,
    data: { animation: "SignInPage" },
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    data: { animation: "SignUpPage" },
  },
  {
    path: "osrs",
    component: Rs07GoldComponent,
    data: { animation: "OsrsPage" },
  },
  { path: "rs3", component: Rs03GoldComponent, data: { animation: "Rs3Page" } },
  {
    path: "albion-silver",
    component: AlbionSilverComponent,
    data: { animation: "AlbionSilverPage" },
  },
  {
    path: "new-world",
    component: NewWorldComponent,
    data: { animation: "NewWorldPage" },
  },
  {
    path: "firecape",
    component: FirecapePageComponent,
    data: { animation: "FirecapePage" },
  },
  {
    path: "account",
    component: AccountComponent,
    data: { animation: "AccountPage" },
  },
  {
    path: "receipt",
    component: ReceiptPageComponent,
    data: { animation: "ReceiptPage" },
  },
  {
    path: "giveaways",
    component: GiveawaysPageComponent,
    data: { animation: "GiveawaysPage" },
  },
  {
    path: "about-us",
    component: AboutUsPageComponent,
    data: { animation: "AboutUsPage" },
  },
  {
    path: "contact-us",
    component: ContactUsPageComponent,
    data: { animation: "ContactUsPage" },
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
