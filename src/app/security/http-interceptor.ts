import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const token = localStorage.getItem('bearerToken');
    //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjZhNzU5OWI5YjJjZTk4ZDNhZDc2ZGYzNGViNzQ3NjIyYWY1YTA3NzE4ZjI5ZTdmOTBhMzRmMGI5NWViN2QzYmUifQ.eyJpc3MiOiJsZWFkLWNlbnRlciIsImF1ZCI6ImxlYWQtY2VudGVyLWNsaWVudHMiLCJqdGkiOiI2YTc1OTliOWIyY2U5OGQzYWQ3NmRmMzRlYjc0NzYyMmFmNWEwNzcxOGYyOWU3ZjkwYTM0ZjBiOTVlYjdkM2JlIiwiaWF0IjoxNTM1MTMyMDQ2LCJuYmYiOjE1MzUxMzIwNDYsImV4cCI6MTUzNTE0Mjg0NiwidXNlcklkIjoxLCJ1c2VyTmFtZSI6ImViYXV0aXN0YSIsImVtYWlsQWRkcmVzcyI6ImViYXV0aXN0YUB3ZWJzb2x1dGlvbnNhZHZpc29yLmNvbSIsInJvbGVzIjpbeyJpZCI6MywibmFtZSI6Ik93bmVyIn1dLCJzcGVjaWFsaXN0cyI6W3siaWQiOjEsImZ1bGxOYW1lIjoiQWxlamFuZHJvIFBlZHJvem8gSUlJIiwiZGlzcGxheU5hbWVBcyI6IkRyLiBBbGVqYW5kcm8gUGVkcm96byBJSUkiLCJzcGVjaWFsaXR5VGl0bGUiOiJEZXJtYXRvbG9naXN0In1dfQ.WLUwC7yMryqmS6VO39Q1mkiArAIixOyhdqc-fwsaQ-4';
    if (token) {
      const newReq = req.clone(
        {
           headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true }
  ]
})
export class HttpInterceptorModule { }
