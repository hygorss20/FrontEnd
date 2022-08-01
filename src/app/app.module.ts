import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MainNavComponent } from "./components/main-nav/main-nav.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FirecapePageComponent } from "./pages/firecape-page/firecape-page.component";
import {
  AccountComponent,
  DialogBuyAccountComponent,
} from "./pages/account-page/account.component";
import { LogoComponent } from "./components/logo/logo.component";
import { FooterComponent } from "./components/footer/footer.component";
import { Rs03GoldComponent } from "./pages/rs03-gold/rs03-gold.component";
import { Rs07GoldComponent } from "./pages/rs07-gold/rs07-gold.component";
import { GoldFormComponent } from "./components/gold-form/gold-form.component";
import { PageTitleComponent } from "./components/page-title/page-title.component";
import { PaymentMethodsOptionsComponent } from "./components/payment-methods-options/payment-methods-options.component";
import { PaymentMethodsOptionsFirecapeComponent } from "./components/payment-method-options-firecape/payment-methods-options-firecape.component";
import { NumberFormatInputDirective } from "./utils/directives/number-format-input.directive";
import { AddToCartComponent } from "./components/buttons/add-to-cart/add-to-cart.component";
import { CheckoutComponent } from "./components/buttons/checkout/checkout.component";
import { UserInfoFormComponent } from "./components/user-info-form/user-info-form.component";
import { FirecapeUserInfoFormComponent } from "./components/firecape-user-info-form/firecape-user-info-form.component";
import { TermsOfServicesComponent } from "./components/terms-of-services/terms-of-services.component";
import { BuyAccountComponent } from "./components/buy-account/buy-account.component";
import { BuyFirecapeComponent } from "./components/buy-firecape/buy-firecape.component";
import { BuyFirecapeIronmanComponent } from "./components/buy-firecape-ironman/buy-firecape-ironman.component";
import { BuyFirecapeJadKillComponent } from "./components/buy-firecape-jad-kill/buy-firecape-jad-kill.component";
import {
  FirecapeComponent,
  DialogBuyFirecapeComponent,
  DialogBuyFirecapeIronmanComponent,
  DialogBuyFirecapeJadKillComponent,
} from "./components/firecape/firecape.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReceiptPageComponent } from "./pages/receipt-page/receipt-page.component";
import { GiveawaysPageComponent } from "./pages/giveaways-page/giveaways-page.component";
import { GiveawaysModule } from "./features/giveaways/giveaways.module";
import { CommonAppModule } from "./features/common/common-app.module";
import { AuthInterceptor } from "./utils/interceptors/auth-interceptor";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { AlbionSilverComponent } from "./pages/albion-silver/albion-silver.component";
import { NextStepComponent } from "./components/buttons/next-step/next-step.component";
import { TermsOfServiceDialogComponent } from "./components/footer/components/dialogs/terms-of-service-dialog/terms-of-service-dialog.component";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { PrivacyPolicyDialogComponent } from "./components/footer/components/dialogs/privacy-policy-dialog/privacy-policy-dialog.component";
import { RefundReturnPolicyDialogComponent } from "./components/footer/components/dialogs/refund-return-policy-dialog/refund-return-policy-dialog.component";
import { RefundReturnPolicyComponent } from "./components/refund-return-policy/refund-return-policy.component";
import { ContactUsPageComponent } from "./pages/contact-us-page/contact-us-page.component";
import { AboutUsPageComponent } from "./pages/about-us-page/about-us-page.component";
import { PageDescriptionComponent } from "./components/page-description/page-description.component";
import { FeaturesListComponent } from "./pages/home-page/components/features-list/features-list.component";
import { ProductsListComponent } from "./pages/home-page/components/products-list/products-list.component";
import { NewWorldComponent } from "./pages/new-world/new-world.component";
import { CurrencyMenuComponent } from "./components/main-nav/components/currency-menu/currency-menu.component";
import { AnalyticsModule } from "./features/analytics/analytics.module";

@NgModule({
  declarations: [
    AppComponent,
    CurrencyMenuComponent,
    MainNavComponent,
    HomePageComponent,
    FirecapePageComponent,
    AccountComponent,
    LogoComponent,
    FooterComponent,
    Rs03GoldComponent,
    Rs07GoldComponent,
    AlbionSilverComponent,
    NewWorldComponent,
    GoldFormComponent,
    PageTitleComponent,
    PageDescriptionComponent,
    PaymentMethodsOptionsComponent,
    NumberFormatInputDirective,
    AddToCartComponent,
    CheckoutComponent,
    NextStepComponent,
    UserInfoFormComponent,
    TermsOfServicesComponent,
    TermsOfServiceDialogComponent,
    PrivacyPolicyComponent,
    PrivacyPolicyDialogComponent,
    RefundReturnPolicyComponent,
    RefundReturnPolicyDialogComponent,
    ReceiptPageComponent,
    GiveawaysPageComponent,
    AboutUsPageComponent,
    ContactUsPageComponent,
    BuyFirecapeComponent,
    DialogBuyFirecapeComponent,
    FirecapeUserInfoFormComponent,
    FirecapeComponent,
    BuyFirecapeIronmanComponent,
    DialogBuyFirecapeIronmanComponent,
    BuyFirecapeJadKillComponent,
    DialogBuyFirecapeJadKillComponent,
    PaymentMethodsOptionsFirecapeComponent,
    BuyAccountComponent,
    DialogBuyAccountComponent,
    SignInComponent,
    SignUpComponent,
    FeaturesListComponent,
    ProductsListComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    CommonAppModule,
    GiveawaysModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  entryComponents: [
    TermsOfServiceDialogComponent,
    PrivacyPolicyDialogComponent,
    RefundReturnPolicyDialogComponent,
    DialogBuyFirecapeComponent,
    DialogBuyFirecapeIronmanComponent,
    DialogBuyFirecapeJadKillComponent,
    DialogBuyAccountComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
