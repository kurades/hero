import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/core/models/tag';
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() disable = true;
  @Input() shorten = true;
  @Input() tag: Tag;
  @Output() removeTag = new EventEmitter<Tag>();

  remove (): void {
    this.removeTag.next(this.tag);
  }
}
