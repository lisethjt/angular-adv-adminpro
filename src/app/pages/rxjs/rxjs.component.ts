import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {


  public intervalSubs: Subscription
  constructor() {


    // this.retornaObservable().pipe(
    //   retry()
    // )
    // .subscribe(
    //   (valor: any) => console.log('Subs: ', valor),
    //   (err: any) => console.warn('Error: ', err),
    //   () => console.info('Obs terminado')
    // );
   this.intervalSubs = this.retornaIntervalo().subscribe( console.log );
  }

  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
                      .pipe(
                        take(10),
                        map( (valor: any) => valor + 1),
                        filter((valor: any) => (valor%2===0) ? true: false)
                      );   
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer: any) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          console.log('i es igual a 2 .... Error! ');
          observer.error('i llegó al valor de 2');
        }
      }, 1000);
    });
    return obs$;
  }
}