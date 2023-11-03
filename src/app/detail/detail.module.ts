import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { HelloComponent } from './hello/hello.component';



@NgModule({
  declarations: [
    DetailComponent,
    HelloComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DetailModule {

  static getComponent() {
    return DetailComponent;
  }
}
