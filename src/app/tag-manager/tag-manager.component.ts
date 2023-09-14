import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../core/models/tag';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import { addTag, deleteTag, editTag, getTags } from '../core/store/Hero/hero.actions';
import { selectTags } from '../core/store/Hero/hero.selector';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.css']
})
export class TagManagerComponent implements OnInit {
  inputTag = '';
  isEdit = -1;
  tags: Tag[];
  chosenTag: Tag;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.store.dispatch(getTags())
    this.store.select(selectTags).subscribe((tags) => {
      this.tags = tags
    })
  }

  editTag(event: HTMLInputElement): void {
    console.log("edit");
    const value = event.value;
    if (this.chosenTag.name !== value) {
      this.store.dispatch(editTag({ _id: this.chosenTag._id, name: value }))
    }
    this.toggleEdit(-1)
  }

  toggleEdit(i: number): void {
    this.isEdit = i
    this.chosenTag = this.tags[i];
  }

  deleteTag(id: string): void {
    this.store.dispatch(deleteTag({ _id: id }))
  }

  addTag(event: HTMLInputElement): void {
    this.store.dispatch(addTag({ name: event.value }))
  }

  stringToColour(str: string): string {
    let hash = 0;
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

}
