import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagePickerService {
  constructor() {}

  async convertUrlsToFiles(imageUrls: string[]): Promise<File[]> {
    const files: File[] = [];

    for (const url of imageUrls) {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split('/').pop() || 'image';
      const file = new File([blob], fileName, { type: blob.type });

      files.push(file);
    }

    return files;
  }
}
