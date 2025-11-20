import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Marco Perez - Portfolio';

  skills = [
    'Angular', 'React', 'TypeScript', 'Node.js', 'SCSS', 'GSAP', 'Three.js', 'AWS'
  ];

  projects = [
    {
      title: 'E-commerce Platform',
      description: 'A high-performance e-commerce solution with real-time inventory management.',
      tech: ['Angular', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'AI Dashboard',
      description: 'Analytics dashboard powered by machine learning algorithms for predictive insights.',
      tech: ['React', 'Python', 'TensorFlow'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Fintech App',
      description: 'Secure mobile-first banking application with biometric authentication.',
      tech: ['Flutter', 'Firebase', 'Cloud Functions'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    // Initial setup if needed
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initLenis();
      this.initAnimations();
    }
  }

  private initLenis(): void {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    // Listen for the scroll event and log the event data
    // lenis.on('scroll', (e: any) => {
    //   console.log(e);
    // });
  }

  private initAnimations(): void {
    // Hero Animation
    gsap.from('.hero-title', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      stagger: 0.2
    });

    gsap.from('.hero-subtitle', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5
    });

    // Scroll Triggers for Sections
    gsap.utils.toArray('.reveal').forEach((elem: any) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }
}
