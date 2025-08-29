import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  text: string = "Hi, I am Ankit Negi";
  mouse = { x: 0, y: 0 };              // mouse position
  w!: number;
  h!: number;
  circleArr: any[] = [];
  txtArr: { x: number, y: number }[] = [];
  backgroundImage!: HTMLImageElement;

  // Variables to track scroll speed
  scrollSpeed = 0;
  lastScrollY = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.w = canvas.width;
    this.h = canvas.height;

    // Load background image
    this.backgroundImage = new Image();
    this.backgroundImage.src = "images/home/bg.jpeg";
    this.backgroundImage.onload = () => {
      this.initScene();
      requestAnimationFrame(() => this.render());
    };
  }

  // Update mouse position
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  // Track scroll speed
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollY = window.scrollY;
    this.scrollSpeed = currentScrollY - this.lastScrollY; // calculate scroll delta
    this.lastScrollY = currentScrollY;
  }

  // Recalculate scene on window resize
  @HostListener('window:resize')
  onResize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.w = canvas.width;
    this.h = canvas.height;
    this.initScene();
  }

  // Update text dynamically
  onTextChange(newText: string) {
    this.text = newText;
    this.initScene();
  }

  // Particle class
  Circle = class {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    dest: { x: number, y: number };
    vx: number;
    vy: number;
    accX: number;
    accY: number;
    friction: number;
    ctx: CanvasRenderingContext2D;
    mouse: { x: number, y: number };

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, mouse: { x: number, y: number }) {
      this.ctx = ctx;
      this.mouse = mouse;
      this.x = Math.random() * ctx.canvas.width;
      this.y = Math.random() * ctx.canvas.height;
      this.dx = Math.random() - 1;
      this.dy = Math.random() - 1;
      this.radius = 1;
      this.dest = { x, y };
      this.vx = (Math.random() - 0.5) * 20;
      this.vy = (Math.random() - 0.5) * 20;
      this.accX = 0;
      this.accY = 0;
      this.friction = Math.random() * 0.05 + 0.94;
    }

    render() {
      // Calculate acceleration towards destination
      this.accX = (this.dest.x - this.x) / 1000;
      this.accY = (this.dest.y - this.y) / 1000;
      this.vx += this.accX;
      this.vy += this.accY;

      // Apply friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // Update position
      this.x += this.vx;
      this.y += this.vy;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "#1f5234ff"; // particle color
      this.ctx.fill();

      // Mouse repulsion
      let a = this.x - this.mouse.x;
      let b = this.y - this.mouse.y;
      let distance = Math.sqrt(a * a + b * b);
      if (distance < (this.radius * 70)) {
        this.vx += (this.x - this.mouse.x) / 100;
        this.vy += (this.y - this.mouse.y) / 100;
      }
    }
  };

  // Initialize particles based on text
  initScene() {
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text temporarily to get pixel data
    ctx.font = `${Math.floor(this.w / 15)}px Comfortaa, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(this.text, this.w / 2, this.h / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data32 = new Uint32Array(imageData.data.buffer);
    this.txtArr = [];

    const gap = 2; // particle density
    for (let y = 0; y < this.h; y += gap) {
      for (let x = 0; x < this.w; x += gap) {
        const index = y * this.w + x;
        if (data32[index] & 0xff000000) {
          this.txtArr.push({ x, y });
        }
      }
    }

    // Initialize circles
    this.circleArr = [];
    for (let i = 0; i < this.txtArr.length; i++) {
      this.circleArr.push(new this.Circle(this.txtArr[i].x, this.txtArr[i].y, ctx, this.mouse));
    }
  }

  // Animation loop
  render() {
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;

    requestAnimationFrame(() => this.render());

    // Draw background
    if (this.backgroundImage) {
      ctx.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    for (let i = 0; i < this.circleArr.length; i++) {
      // Apply scroll-based shake
      const speedFactor = this.scrollSpeed * 0.05; // adjust intensity
      this.circleArr[i].vx += (Math.random() - 0.5) * speedFactor;
      this.circleArr[i].vy += (Math.random() - 0.5) * speedFactor;

      this.circleArr[i].render();
    }

    // Smoothly decay scroll effect
    this.scrollSpeed *= 0.9;
  }


  scrollToNext() {
    // Get the next sibling element of this component's host element
    const homeEl = this.canvasRef.nativeElement.closest('app-home');
    if (!homeEl) return;

    // Get the next sibling element (About component)
    const nextEl = homeEl.nextElementSibling as HTMLElement;
    if (nextEl) {
      // Smooth scroll to the next component
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
