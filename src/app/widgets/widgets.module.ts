import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { MatCardModule } from '@angular/material/card';
import { MaandbedragComponent } from './maandbedrag/maandbedrag.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSherlockModule } from '@politie/ngx-sherlock';
import { DatadumpComponent } from './datadump/datadump.component';

@NgModule({
    declarations: [StatusComponent, MaandbedragComponent, DatadumpComponent],
    exports: [StatusComponent, MaandbedragComponent, DatadumpComponent],
    imports: [CommonModule, MatCardModule, NgApexchartsModule, NgxSherlockModule],
})
export class WidgetsModule {}
