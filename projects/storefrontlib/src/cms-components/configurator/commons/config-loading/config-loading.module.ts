import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { ConfigLoadingComponent } from './config-loading.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationOverviewLoading: {
          component: ConfigLoadingComponent,
        },
        VariantConfigurationLoading: {
          component: ConfigLoadingComponent,
        },
      },
    }),
  ],
  declarations: [ConfigLoadingComponent],
  exports: [ConfigLoadingComponent],
})
export class ConfigLoadingModule {}
