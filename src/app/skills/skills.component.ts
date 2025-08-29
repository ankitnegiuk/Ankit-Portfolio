import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  items = [
    {
      name: 'Angular',
      des: 'Chase the Northern Lights under star-lit skies along scenic fjord roads.',
      image: 'https://wallpapercave.com/wp/wp5722050.png',
    },
    {
      name: 'ReactJs',
      des: 'Wander dramatic, mist-laden mountain paths that feel straight out of a dream.',
      image: 'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop',
    },
    {
      name: 'TypeScript',
      des: 'Discover serene mountain temples shrouded in dusk and ancient forest trails.',
      image: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'JavaScript',
      des: 'Discover serene mountain temples shrouded in dusk and ancient forest trails.',
      image: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Tailwind',
      des: 'Discover serene mountain temples shrouded in dusk and ancient forest trails.',
      image: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Html',
      des: 'Experience the mystical Highlands under twilight skies and misty lochs.',
      image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    },
    {
      name: 'Css',
      des: 'Experience the mystical Highlands under twilight skies and misty lochs.',
      image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    },
    {
      name: 'NodeJs',
      des: 'Experience the mystical Highlands under twilight skies and misty lochs.',
      image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    },
    {
      name: 'MongoDB',
      des: 'Experience the mystical Highlands under twilight skies and misty lochs.',
      image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg',
    },
  ];

  activeIndex = 0;

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
  }

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
  }
}
