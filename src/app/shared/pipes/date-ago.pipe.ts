import { Pipe, PipeTransform } from '@angular/core';

/**
 * User-friendly date ago pipe (minutes / hours / days / months / years ago)
 * Source: https://gist.github.com/shifatul-i/cfacd00f6d36a7d6d03aa52f33ca23fd
 */
@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: string): string {
    const seconds: number  = Math.floor((Date.now() - Date.parse(value)) / 1000);
    if (seconds < 10) {
      return 'just now'
    }

    const intervals: {[key: string]: number} = {
      'year': 31536000,
      'month': 2592000,
      'week': 604800,
      'day': 86400,
      'hour': 3600,
      'minute': 60,
      'second': 1
    };

    let text: string = 'long time ago';
    for (let i in intervals) {
      const counter: number = Math.round(seconds / intervals[i]);
      if (counter > 0) {
        const plural: string = counter > 1 ? 's' : '';
        text = counter + ' ' + i + plural + ' ago';
        break;
      }
    }
    return text;
  }

}
