import { Component, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../app.service';

import { concat, defer, fromEvent, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BackendService } from '../../services/backend.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-pull-to-refresh',
  templateUrl: './pull-to-refresh.component.html',
  styleUrls: ['./pull-to-refresh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PullToRefreshComponent {

    touchstart$ = fromEvent<TouchEvent>(document, 'touchstart');
    touchend$ = fromEvent<TouchEvent>(document, 'touchend');
    touchmove$ = fromEvent<TouchEvent>(document, 'touchmove');

    mainContent = this.getMainContent();

    drag$ = this.touchstart$.pipe(
        map(e =>  this.mainContent.scrollTop + e.touches[0].pageY ),
        switchMap(start => {
        let pos = this.mainContent.scrollTop;
        return concat(
            this.touchmove$.pipe(
                map(move => move.touches[0].pageY + this.mainContent.scrollTop - start ),
                map(y => getMovement(y)),
                tap(y => pos = y),
                takeUntil(this.touchend$)),
            defer(() => this.tweenObservable(pos, 0, 200)),
        );
        })
    );

    pullheight$ = this.drag$.pipe(
        startWith(0),
        map(y => Math.floor (0.8 * y))
    );

    doReload$ = this.drag$.pipe(
        distinctUntilChanged(),
        filter(d => d === 100)
    );

    opacity$ = this.drag$.pipe(
        distinctUntilChanged(),
    );

    constructor(public readonly app: AppService, private readonly element: ElementRef, public readonly backend: BackendService) {
        this.doReload$.subscribe(_ => backend.refreshPortalUser());
    }

    private tweenObservable(start: number, end: number, time: number) {
    const emissions = time / 10;
    const step = (start - end) / emissions;

    return timer(0, 10).pipe(
        map(x => start - step * (x + 1)),
        take(emissions)
    );
    }

    getMainContent() {
        const main = document.getElementsByTagName('main')[0];
        return main;
    }
}

function getMovement(y: number) {
    const r = Math.max(0, Math.min(y - 30, 327));
    const m = Math.floor(35 * Math.log(2 + 0.1 * r) - 24);
    // console.log(`translated ${y} to ${r} to ${m}`);
    return m;
}

// function getScrollParent(node: any): any {
//     if (node == null) {
//       return document;
//     }
//     console.log('testing',node);
//     if (node.scrollHeight > node.clientHeight) {
//       return node;
//     } else {
//       return getScrollParent(node.parentNode);
//     }
//   }
