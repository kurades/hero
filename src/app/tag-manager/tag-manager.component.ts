import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Tag } from '../core/models/tag';
import { Store, on } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import {
  addTag,
  deleteTag,
  editTag,
  getTags
} from '../core/store/Hero/hero.actions';
import { selectTags } from '../core/store/Hero/hero.selector';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagManagerComponent implements OnInit, OnDestroy {
  isEdit = -1;
  tags: Tag[];
  tags$: Observable<Tag[]>;
  chosenTag: Tag;
  tagsSubscription: Subscription;
  constructor (private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit (): void {
    this.getTags();
    console.log('1');
  }

  getTags (): void {
    this.store.dispatch(getTags());
    this.tagsSubscription = this.store.select(selectTags).subscribe(tags => {
      this.tags = tags;
      this.cdr.markForCheck();
    });
  }

  editTag (event: HTMLInputElement): void {
    console.log('edit');
    const newTag = event.value;
    if (this.chosenTag.name !== newTag) {
      this.store.dispatch(editTag({ _id: this.chosenTag._id, name: newTag }));
    }
    this.toggleEdit(-1);
    this.cdr.markForCheck();
  }

  toggleEdit (i: number): void {
    this.isEdit = i;
    this.chosenTag = this.tags[i];
  }

  deleteTag (id: string): void {
    this.store.dispatch(deleteTag({ _id: id }));
  }

  addTag (event: HTMLInputElement): void {
    this.store.dispatch(addTag({ name: event.value }));
  }

  identify (index: number, item: Tag) {
    return item._id;
  }

  ngOnDestroy(): void {
      this.tagsSubscription.unsubscribe()
  }
}
