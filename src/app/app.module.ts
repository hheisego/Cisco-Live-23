import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericService } from './services/generic.service';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BasichartComponent } from './components/basichart/basichart.component';
import { BasicgraphComponent } from './components/basicgraph/basicgraph.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    BasichartComponent,
    BasicgraphComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    NgApexchartsModule
    
  ],
  providers: [GenericService,
              NgChartsConfiguration
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
