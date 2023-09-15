import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  OnDestroy
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, switchMap, Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
@UntilDestroy()
@Directive({
  selector: '[appCopy]'
})
export class CopyDirective implements OnInit, OnDestroy {
  subscription: Subscription;
  @Input() copy: string;

  constructor (
    private host: ElementRef<HTMLElement>,
    private zone: NgZone,
    private messageService: MessageService
  ) {}

  ngOnInit () {
    this.zone.runOutsideAngular(() => {
      this.subscription = fromEvent(this.host.nativeElement, 'click')
        .pipe(
          switchMap(() => navigator.clipboard.writeText(this.copy)),
          untilDestroyed(this)
        )
        .subscribe(() => this.messageService.add('add to clipboard'));
    });
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }
}
