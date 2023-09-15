import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Tag } from '../core/models/tag'
import { Store, on } from '@ngrx/store'
import { AppState } from '../core/store/app.state'
import {
  addTag,
  deleteTag,
  editTag,
  getTags
} from '../core/store/Hero/hero.actions'
import { selectTags } from '../core/store/Hero/hero.selector'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagManagerComponent implements OnInit {
  isEdit = -1
  tags: Tag[]
  tags$: Observable<Tag[]>
  chosenTag: Tag
  constructor (private store: Store<AppState>) {}

  ngOnInit (): void {
    this.getTags()
  }

  getTags (): void {
    this.store.dispatch(getTags())
    // this.store.select(selectTags).subscribe(tags => {
    //   this.tags = tags
    // })
    this.tags$ = this.store.select(selectTags)
  }

  editTag (event: HTMLInputElement): void {
    console.log('edit')
    const newTag = event.value
    if (this.chosenTag.name !== newTag) {
      this.store.dispatch(editTag({ _id: this.chosenTag._id, name: newTag }))
    }
    this.toggleEdit(-1)
  }

  toggleEdit (i: number): void {
    this.tags$.forEach(tags => {
      this.isEdit = i
      this.chosenTag = tags[i]
    })
  }

  deleteTag (id: string): void {
    this.store.dispatch(deleteTag({ _id: id }))
  }

  addTag (event: HTMLInputElement): void {
    this.store.dispatch(addTag({ name: event.value }))
  }

  stringToColour (str: string): string {
    console.count('a')
    let hash = 0
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }

  identify = (index: number, item: Tag) => item._id
}
