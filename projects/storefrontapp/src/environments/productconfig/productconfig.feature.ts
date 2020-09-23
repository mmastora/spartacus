import { translations } from '@spartacus/assets';
import { ConfigModule } from '@spartacus/core';
//import { CommonConfiguratorModule } from '@spartacus/product/configurators/common';
import { configuratorTranslations } from '@spartacus/product/configurators/common/assets';
import { TextfieldConfiguratorModule } from '@spartacus/product/configurators/textfield';
//import { VariantConfiguratorModule } from '@spartacus/product/configurators/variant';
import { FeatureEnvironment } from '../models/feature.model';

export const productConfigFeature: FeatureEnvironment = {
  imports: [
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: { ...translations.en, ...configuratorTranslations.en },
        },

        fallbackLang: 'en',
      },

      featureModules: {
        configuratorCommon: {
          module: () =>
            import('@spartacus/product/configurators/common').then(
              (m) => m.CommonConfiguratorModule
            ),
          cmsComponents: [
            'ConfiguratorFormComponent',
            'ConfiguratorOverviewFormComponent',
            'ConfiguratorAddToCartButtonComponent',
            'ConfiguratorGroupTitleComponent',
            'ConfiguratorGroupMenuComponent',
            'ConfiguratorPreviousNextButtonsComponent',
            'ConfiguratorPriceSummaryComponent',
            'ConfiguratorProductTitleComponent',
            'ConfiguratorTabBarComponent',
            'ConfiguratorUpdateMessageComponent',
            'ConfiguratorAddToCartButtonComponent',
            'ConfiguratorAddToCartButtonComponent',
          ],
        },
      },
    }),
    // VariantConfiguratorModule,
    TextfieldConfiguratorModule,
  ],
};
