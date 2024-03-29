import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { sweetAlertError } from 'src/sweetalert';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoResolverService {
  productId: number = 0;
  constructor(
    private _HttpClient: HttpClient,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    // console.log('Called Get Product in resolver...', route);

    this.productId = route.params.id;

    return this._HttpClient.get(environment.baseUrl + this.productId).pipe(
      catchError((error) => {
        sweetAlertError("No Data Found")
        return of('No data');
      })
    );
  }
}
