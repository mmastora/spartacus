import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { MessageModule } from '../organization-message/message.module';
import { OrganizationListComponent } from './organization-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SplitViewModule,
    TableModule,
    IconModule,
    UrlModule,
    I18nModule,
    PaginationModule,
    NgSelectModule,
    FormsModule,
    MessageModule,
    KeyboardFocusModule,
  ],
  declarations: [OrganizationListComponent],
  exports: [OrganizationListComponent],
})
export class OrganizationListModule {}
