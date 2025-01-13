import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { retry, take, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string = "";
  public tituloSubs: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(route.snapshot.children[0].data);
    this.tituloSubs = this.getBreadcrumbs()
                        .subscribe((data: any) => {
                          console.log(data);
                          this.titulo = data.titulo;
                          document.title = `Admin Pro - ${this.titulo}`;
                        });
  }

  getBreadcrumbs() {
    return this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }

  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();    
  }
}