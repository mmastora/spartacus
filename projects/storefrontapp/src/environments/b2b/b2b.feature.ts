import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import { OrganizationRootModule } from '@spartacus/organization/administration/root';
import { B2bStorefrontModule } from '@spartacus/setup';
import { FeatureEnvironment } from '../models/feature.model';
import { OrderApprovalModule } from '@spartacus/organization/order-approval';
import { OrganizationModule} from '@spartacus/organization/administration'

// #9423
export const b2bFeature: FeatureEnvironment = {
  imports: [
    OrganizationRootModule,
    OrderApprovalModule,
    OrganizationModule,
    B2bStorefrontModule.withConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },

      /*featureModules: {
        organization: {
          module: () =>
            import('@spartacus/organization/administration').then(
              (m) => m.OrganizationModule
            ),
        },
      },*/

      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
};
