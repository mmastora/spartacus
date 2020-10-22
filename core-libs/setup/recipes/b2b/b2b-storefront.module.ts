import { ModuleWithProviders, NgModule } from '@angular/core';
import { CostCenterModule, provideConfig, provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';
import {
  CmsLibModule,
  defaultCmsContentConfig,
  layoutConfig,
  mediaConfig,
  StorefrontConfig,
  StorefrontModule
} from '@spartacus/storefront';
import { defaultB2bCheckoutConfig } from './config/default-b2b-checkout-config';
import { defaultB2bOccConfig } from './config/default-b2b-occ-config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    StorefrontModule,

    // the cms lib module contains all components that added in the bundle
    CmsLibModule,
    CostCenterModule.forRoot(),
  ],
  providers: [
    provideDefaultConfig(layoutConfig),
    provideDefaultConfig(mediaConfig),
    provideDefaultConfig(defaultB2bOccConfig),
    provideDefaultConfigFactory(defaultCmsContentConfig),
    provideDefaultConfig(defaultB2bCheckoutConfig),
  ],
  exports: [StorefrontModule],
})
export class B2bStorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<B2bStorefrontModule> {
    return {
      ngModule: B2bStorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
