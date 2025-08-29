import { Component, AfterViewInit, OnInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AOS from 'aos';
// Register the plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit, OnInit {

  ngOnInit() {
    AOS.init();
  }

  projects = [
    {
      title: 'Mak.Today',
      excerpt: 'A domestic cleaning booking platform enabling users to browse professional cleaners, view profiles, schedule appointments, and leave reviews. The app simplified household service management through an intuitive interface and seamless booking experience',
      image: '/images/projects/first.jpeg',
      link: 'https://maktoday.co.uk/'
    },
    {
      title: 'Speedyssey',
      excerpt: 'A logistics and delivery app providing fast, secure, and cost-efficient delivery services across iOS, Android, and web. The platform ensured secure transactions, real-time tracking, and PCI-compliant payments, focusing on innovation and user-friendliness.',
      image: '/images/projects/second.jpeg',
      link: 'https://speedyssey.com/'
    },
    {
      title: 'STAG',
      excerpt: 'A smart business card platform leveraging NFC technology for digital contact sharing. It replaced disposable paper cards with eco-friendly, customizable NFC cards, enabling professionals to share unlimited social and business links instantly.',
      image: '/images/projects/third.jpg',
      link: 'https://stagnfc.com/#/'
    },
    {
      title: 'Plan & Work',
      excerpt: 'A workforce management platform automating scheduling, time tracking, and payroll. It provided real-time data insights, reduced manual effort, and improved employee satisfaction while enabling businesses to manage operations efficiently.',
      image: '/images/projects/fourth.avif',
      link: 'https://www.app.planandwork.net/'
    },
    {
      title: 'Jcobs Dry Cleaner',
      excerpt: 'An on-demand dry cleaning and laundry service app offering pick-up and delivery options. Provided comprehensive cleaning services with order tracking and customer feedback integration for enhanced convenience and trust.',
      image: '/images/projects/fifth.jpg',
      link: 'https://jacobsdrycleaners.co.uk/'
    }
  ];

  ngAfterViewInit(): void {
    const cards = gsap.utils.toArray<HTMLElement>('.c-card');
    const lastCardIndex = cards.length - 1;

    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: 'center center'
    });

    cards.forEach((card, index) => {
      const scale = index === lastCardIndex ? 1 : 0.5;
      const scaleDown = gsap.to(card, { scale: scale });

      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: () => lastCardST.start,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        // ease: 'none',
        animation: scaleDown,
        toggleActions: 'restart none none reverse'
      });
    });
  }
}
