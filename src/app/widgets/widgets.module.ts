import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { MatCardModule } from '@angular/material/card';
import { MaandbedragComponent } from './maandbedrag/maandbedrag.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSherlockModule } from '@politie/ngx-sherlock';
import { DatadumpComponent } from './datadump/datadump.component';
import { BufferComponent } from './buffer/buffer.component';
import { ComponentsModule } from '../components/components.module';
import { PromoComponent } from './promo/promo.component';
import { NgswComponent } from './ngsw/ngsw.component';

@NgModule({
    declarations: [StatusComponent, MaandbedragComponent, DatadumpComponent, BufferComponent, PromoComponent, NgswComponent],
    exports: [StatusComponent, MaandbedragComponent, DatadumpComponent, BufferComponent, PromoComponent, NgswComponent],
    imports: [CommonModule, MatCardModule, NgApexchartsModule, NgxSherlockModule, ComponentsModule],
})
export class WidgetsModule {}
