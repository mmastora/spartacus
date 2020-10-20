import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, CountryType, Region } from '../../model/address.model';
import { BaseSite, Currency, Language } from '../../model/misc.model';
import { SiteAdapter } from './site.adapter';

@Injectable({
  providedIn: 'root',
})
export class SiteConnector {
  constructor(protected adapter: SiteAdapter) {}

  getLanguages(): Observable<Language[]> {
    return this.adapter.loadLanguages();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.adapter.loadCurrencies();
  }

  getCountries(type?: CountryType): Observable<Country[]> {
    return this.adapter.loadCountries(type);
  }

  getRegions(countryIsoCode: string): Observable<Region[]> {
    return this.adapter.loadRegions(countryIsoCode);
  }
  /**
   * @deprecated since 3.0, use getBaseSites() instead
   */
  getBaseSite(): Observable<BaseSite> {
    return this.adapter.loadBaseSite();
  }

  getBaseSites(): Observable<BaseSite[]> {
    return this.adapter.loadBaseSites();
  }
}
