import { Component, ViewContainerRef, Directive, ViewChildren, QueryList, Injector, createNgModuleRef } from '@angular/core';
import { Observable, of } from 'rxjs';

@Directive({
  selector: '[hostDir]'
})
export class HostDirective {
  constructor(public vcr: ViewContainerRef){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChildren(HostDirective) hostDir!: QueryList<HostDirective>;
  
  headers: any[]=[
    'Id',
    'Title'
  ];
  expandedRow: any = null;
  expandedRowIndex:number|null = null;

  data$: Observable<any[]>;

  constructor(private _injector: Injector){
    this.data$ = this.getMockData();
  }

  toggleDetails(row: any, i:number) {
    if (i == this.expandedRowIndex) {
      return;
    }
    let previousHost = this.expandedRowIndex!=null ? this.hostDir.get(this.expandedRowIndex): undefined;
    this.clearView(previousHost);
    this.setDetail(row,i);
    import('./detail/detail.module').then(m => m.DetailModule).then(detailModule => {
      const moduleRef = createNgModuleRef(detailModule, this._injector);
      const currentHost = this.hostDir.get(i); // get current templateRef
      if (currentHost) {
        const compRef = currentHost.vcr.createComponent(detailModule.getComponent(), { ngModuleRef: moduleRef});
        console.info(compRef, compRef.instance)
      }

      // const moduleFactory = await this._compiler.compileModuleAsync(detailModule)
      // const moduleRef = moduleFactory.create(this._injector);
      // const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(detailModule.getComponent())
      // const currentHost = this.hostDir.get(i);
      // if (currentHost) {
      //   currentHost.vcr.createComponent(factory);
      // }
    });    
  }

  setDetail(row: any, i:number) {
    this.expandedRowIndex = i;
    if (!this.expandedRow) {
      this.expandedRow = row; // set details obj
    }
  }

  clearView(hostDir?: HostDirective) {
    if(hostDir) {
      hostDir.vcr.clear();
    }
  }

  getMockData(): Observable<any[]> {
    return of([
      {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "sunt qui excepturi placeat culpa"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "omnis laborum odio"
      },
      {
        "userId": 1,
        "id": 4,
        "title": "non esse culpa molestiae omnis sed optio"
      },
      {
        "userId": 1,
        "id": 5,
        "title": "eaque aut omnis a"
      }
    ])
  }
}


