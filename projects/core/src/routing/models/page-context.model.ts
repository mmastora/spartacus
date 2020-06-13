import { PageType } from '../../model/cms.model';

export class PageContext {
  id: string;
  type?: PageType;
  cxRoute?: string;

  constructor(id: string, type?: PageType, cxRoute?: string) {
    this.id = id;
    this.type = type;
    this.cxRoute = cxRoute;
  }
}
