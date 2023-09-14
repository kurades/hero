import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/core/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {
  @Input() disable = true;
  @Input() tag: Tag;
  @Input() shorten = true;
  @Output() removeTag = new EventEmitter<Tag>()
  ngOnInit(): void {

  }

  stringToColour(str: string): string | null {
    if (str) {
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
    return null
  }
  remove(): void {
    this.removeTag.next(this.tag)
  }
}
