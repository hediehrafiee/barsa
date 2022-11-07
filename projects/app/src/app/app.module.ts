import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import {
  APP_VERSION,
  BarsaNovinRayCoreModule,
  RootPortalComponent,
} from 'barsa-novin-ray-core';
import { BarsaSapUiModule, BarsaSapUiRoutingModule } from 'barsa-sap-ui';
import { BarsaDevelopComponentsModule } from 'barsa-develop-components';
import { BarsaCustomComponentsModule } from '../../../barsa-custom-components/src/public-api';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    BarsaNovinRayCoreModule.forRoot(),
    BarsaSapUiModule.forRoot(),
    BarsaDevelopComponentsModule,
    BarsaSapUiRoutingModule,
    BarsaCustomComponentsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: APP_VERSION, useValue: '1' }],
  exports: [],
  bootstrap: [RootPortalComponent],
})
export class AppModule {}
