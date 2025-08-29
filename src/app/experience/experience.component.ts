import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;
  @ViewChild('wrap', { static: true }) wrap!: ElementRef<HTMLDivElement>;
  @ViewChildren('card') cardsEls!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('dotsBox', { static: true }) dotsBox!: ElementRef<HTMLDivElement>;

  current = 0;
  dots: HTMLElement[] = [];
  exp = [
    {
      title: 'Devherds',
      desc: 'Angular Developer | Jan 2023 – Dec 2024',
      content: `Worked on projects many projects Implemented secure payment gateways with best coding practices.
Built live tracking features using Google APIs and WebSockets.
Mentored a junior developer and ensured project deadlines were met.`,
      image: 'images/exp/first.jpeg',
    },
    {
      title: 'XPERGE',
      desc: 'Frontend Developer | Jan 2022 – Dec 2022',
      content: `Migrated AngularJS projects to Angular 16.
Worked on React and Vue.js projects from scratch, gaining hands-on experience.
Proved capability across multiple frontend frameworks by improving UI performance and API integrations.`,
      image: 'images/exp/second.jpeg',
    },
    {
      title: 'Infowiz',
      desc: 'Frontend Developer Intern | Jul 2021 – Dec 2021',
      content: `Learned Angular, React, Node.js, and MongoDB.
Helped build UIs and supported live company projects.
Worked with senior developers to deliver small features.`,
      image: 'images/exp/third.jpeg',
    }
  ];

  get cards(): HTMLElement[] {
    return this.cardsEls?.toArray().map((el) => el.nativeElement) ?? [];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Create dots dynamically
      this.cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => this.activate(i, true);
        this.dotsBox.nativeElement.appendChild(dot);
      });

      this.dots = Array.from(
        this.dotsBox.nativeElement.children
      ) as HTMLElement[];

      this.toggleUI(0);
      this.center(0);
    });
  }

  isMobile(): boolean {
    return matchMedia('(max-width:767px)').matches;
  }

  center(i: number): void {
    const card = this.cards[i];
    if (!card) return;
    const axis = this.isMobile() ? 'top' : 'left';
    const size = this.isMobile() ? 'clientHeight' : 'clientWidth';
    const start = this.isMobile() ? card.offsetTop : card.offsetLeft;

    this.wrap.nativeElement.scrollTo({
      [axis]: start - (this.wrap.nativeElement[size] / 2 - card[size] / 2),
      behavior: 'smooth'
    });
  }

  toggleUI(i: number): void {
    this.cards.forEach((c, k) => c.toggleAttribute('active', k === i));
    this.dots.forEach((d, k) => d.classList.toggle('active', k === i));
  }

  activate(i: number, scroll = false): void {
    if (i === this.current) return;
    this.current = i;
    this.toggleUI(i);
    if (scroll) this.center(i);
  }

  go(step: number): void {
    const target = Math.min(
      Math.max(this.current + step, 0),
      this.cards.length - 1
    );
    this.activate(target, true);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) this.go(1);
    if (['ArrowLeft', 'ArrowUp'].includes(e.key)) this.go(-1);
  }

  sx = 0;
  sy = 0;

  onTouchStart(e: TouchEvent) {
    this.sx = e.touches[0].clientX;
    this.sy = e.touches[0].clientY;
  }

  onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - this.sx;
    const dy = e.changedTouches[0].clientY - this.sy;

    if (this.isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
      this.go(this.isMobile() ? (dy > 0 ? -1 : 1) : (dx > 0 ? -1 : 1));
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.center(this.current);
  }
}
