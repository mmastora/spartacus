import { FULL_BASE_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company.utils';
import { MyCompanyConfig } from '../../../helpers/my-company/models/my-company.config';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'Budget',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/budgets`,
  apiEndpoint: '/users/current/budgets',
  objectType: 'budgets',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/budgets/',
      inputType: 'text',
      createValue: `Test Entity ${randomString()}`,
      updateValue: `Edited Test Entity ${randomString()}`,
      sortLabel: 'name',
      showInTable: true,
      formLabel: 'Name',
      showInDetails: true,
    },
    {
      label: 'Status',
      variableName: 'uid',
      inputType: 'text',
      createValue: 'Active',
      updateValue: 'Active',
      showInTable: true,
      showInDetails: true,
    },
    {
      label: 'Code',
      sortLabel: 'code',
      variableName: 'uid',
      inputType: 'text',
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formLabel: 'Code',
      showInDetails: true,
      useInUrl: true,
    },
    {
      label: 'Amount',
      variableName: 'budget',
      sortLabel: 'value',
      showInTable: true,
      inputType: 'text',
      createValue: '10000',
      updateValue: '35000',
      formLabel: 'Amount',
      showInDetails: true,
    },
    {
      label: 'Start - End',
      variableName: ['startDate', 'endDate'],
      useDatePipe: true,
      showInTable: true,
    },
    {
      label: 'Start',
      variableName: 'startDate',
      inputType: 'datetime',
      formLabel: 'Start',
      createValue: '3020-10-10T10:48',
      updateValue: '3025-01-10T03:22',
    },
    {
      label: 'End',
      variableName: 'endDate',
      inputType: 'datetime',
      formLabel: 'End',
      createValue: '3020-11-10T10:48',
      updateValue: '3026-05-15T09:53',
    },
    {
      label: 'Currency',
      variableName: 'currency',
      inputType: 'ngSelect',
      formLabel: 'Currency',
      createValue: 'US Dollar',
      updateValue: 'US Dollar',
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      sortLabel: 'unit',
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
      showInTable: true,
      formLabel: 'Unit',
      showInDetails: true,
    },
  ],
  subCategories: [
    {
      name: 'Cost Centers',
      baseUrl: '/cost-centers',
      objectType: 'costCenters',
      apiEndpoint: '**/constcenters**',
    },
  ],
};

testMyCompanyFeatureFromConfig(config);
