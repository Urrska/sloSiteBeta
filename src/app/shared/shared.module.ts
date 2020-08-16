import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GapfillContentComponent} from './gapfill-content/gapfill-content.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    GapfillContentComponent,
    SafeHtmlPipe
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
  exports: [
    GapfillContentComponent,
    SafeHtmlPipe
  ]
})
export class SharedModule {
}
