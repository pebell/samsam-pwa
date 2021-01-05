import { Component, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';

import { BehaviorSubject, concat, defer, from, fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, publishReplay, repeat, startWith, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { BackendService } from '../../services/backend.service';
import { timer } from 'rxjs';
import { atom, unresolved } from '@politie/sherlock';
import { fromObservable } from '@politie/sherlock-rxjs';

@Component({
  selector: 'app-pull-to-refresh',
  templateUrl: './pull-to-refresh.component.html',
  styleUrls: ['./pull-to-refresh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PullToRefreshComponent implements OnDestroy {

    touchstart$ = fromEvent<TouchEvent>(document, 'touchstart').pipe(tap(e => console.log('touchstart')));
    touchend$ = fromEvent<TouchEvent>(document, 'touchend').pipe(tap(e => console.log('touchend')));
    touchmove$ = fromEvent<TouchEvent>(document, 'touchmove');

    running$ = new BehaviorSubject<boolean>(false);
    stop$ = this.running$.pipe(filter(p => !p));

    mainContent = getMainContent();

    constructor(public readonly app: AppService, private readonly element: ElementRef, public readonly backend: BackendService) {  }

    drag$ = this.touchstart$.pipe(
        map(e =>  this.mainContent.scrollTop + e.touches[0].pageY ),
        switchMap(start => {
            this.pos$.set(0);
            this.running$.next(true); // needed to make sure stop$ doesn't fire straight away (see takeUntil)
            return concat(
                this.touchmove$.pipe(
                    map(move => move.touches[0].pageY + this.mainContent.scrollTop - start ),
                    map(y => getMovement(y)),
                    distinctUntilChanged(),
                    takeUntil(merge(this.touchend$, this.stop$)), // Stop als einde drag, of wanneer refresh klaar is
                ),
                // Als er een refresh draait, wacht totdat die eindigt
                defer(() => this.isRefreshing()
                    ? this.stop$.pipe(map(_ => this.pos$.get()) , take(1))
                    : from([this.pos$.get()]) ),
                // Genereer events om terug omhoog te scrollen
                defer(() => this.tweenObservable(0, 200)),
            );
        }),
        tap(m => this.pos$.set(m)), // zet de waarde (0 - 100) in "pos$" atom (overstap naar Sherlock wereld)
        repeat(), // repeat omdat anders niet meer naar touch event wordt geluisterd.
    );
    stopDrag = this.drag$.subscribe(a => a);


    pos$ = atom(0);
    pullheight$ = this.pos$.map(y => Math.floor(0.8 * y));
    doReload$ = this.pos$.map(d => d === 100);
    opacity$ = this.pos$;
    refreshing$ = atom(false);

    stopReload = this.doReload$.react(reload => {
        if (reload && !this.isRefreshing()) {
            this.changeRunningState(true);
            this.backend.refreshPortalUser().react(u => setTimeout(() => {
                console.log('ending it');
                this.changeRunningState(false);
            }, 500));
        }
    });

    changeRunningState(value: boolean) {
        this.running$.next(value);
        this.refreshing$.set(value);
    }

    isRefreshing() {
        return this.refreshing$.get();
    }

    ngOnDestroy(): void {
        console.log('stopping');
        this.stopReload();
        if (this.stopDrag) {
            this.stopDrag.unsubscribe();
        }
    }

    private tweenObservable(end: number, time: number) {
        const start = this.pos$.get();
        const emissions = time / 10;
        const step = (start - end) / emissions;
        // console.log(`creating tweenobservable for pos ${start}`);

        return timer(0, 10).pipe(
            map(x => start - step * (x + 1)),
            take(emissions)
        );
    }

}

function getMainContent() {
    const main = document.getElementsByTagName('main')[0];
    return main;
}

/* Returns value between 0 and 100 based on amount of drag movement in pixels */
function getMovement(y: number) {
    const r = Math.max(0, Math.min(y - 30, 165));
    const m = Math.floor(35 * Math.log(2 + 0.2 * r) - 24);
    // console.log(`translated ${y} to ${r} to ${m}`);
    return Math.min(Math.max(0, m), 100);
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
