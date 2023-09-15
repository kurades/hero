import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform (value: string, ...args: unknown[]): string {
    let val = value
    if (value.length > 10) {
      val = value.slice(0, 10)
      val += '...'
    }
    return val
  }
}
