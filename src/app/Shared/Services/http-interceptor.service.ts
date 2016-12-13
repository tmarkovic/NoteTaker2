import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';


@Injectable()
export class HttpInterceptorService extends Http {

    constructor(defaultOptions: RequestOptions, backend: XHRBackend, private router: Router) {
        super(backend, defaultOptions);
    }

    request(uri: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (typeof uri === 'string') {
            if (!options) {
                options = { headers: new Headers() };
            }
            this.setRequestOptions(options);
        } else {
            this.setRequestOptions(uri);
        }
        return super.request(uri, options).catch(this.catchErrors());
    }

    private setRequestOptions(reqOptions: Request | RequestOptionsArgs) {
        reqOptions.headers.set('Content-Type', 'application/json');
        reqOptions.headers.set('authorization-token', localStorage.getItem('token'));
    }
    private catchErrors() {
        return (res: Response) => {
            if (res.status === 401 || res.status === 403 || res.status === 498) {
                this.router.navigate(['/user/login'])
                localStorage.removeItem('token');
            }
            return Observable.throw(res);
        };
    }


}