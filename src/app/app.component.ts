import { Component, AfterViewInit, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import Lenis from 'lenis';
import { TECH_ICONS, TechIcon } from './tech-icons';
import { SECTOR_ICONS } from './sector-icons';

interface SkillGroup {
  label: string;
  items: string[];
  extras?: string[];
}

interface Stage {
  name: string;
  note: string;
}

interface Project {
  sector: string;
  sectorIcon: string;
  role: string;
  period: string;
  /** Ongoing work — the only thing the signal colour marks. */
  active?: boolean;
  title: string;
  summary: string;
  highlights: string[];
  detail: string;
  tech: string[];
  /** Only for work that really is a sequence — the strip encodes the order, not decoration. */
  stages?: Stage[];
  stagesLabel?: string;
  /** Each diagram is bespoke markup; this only picks which one the template draws. */
  diagram?: 'coexistence' | 'releases';
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Marco Pérez - Portfolio';
  year = new Date().getFullYear();
  email = 'marco.perezj96@gmail.com';
  linkedin = 'https://www.linkedin.com/in/marcoprzj/';

  copied = signal(false);

  skillGroups: SkillGroup[] = [
    {
      label: 'Frontend',
      items: ['angular', 'vuedotjs', 'nuxt', 'react', 'nextdotjs', 'typescript'],
      extras: ['NgRx', 'RxJS']
    },
    { label: 'Backend', items: ['nestjs', 'nodedotjs', 'springboot', 'go'] },
    { label: 'Data & cloud', items: ['mysql', 'mongodb', 'amazonwebservices', 'docker'] },
    { label: 'Quality', items: ['playwright', 'jest'], extras: ['WCAG'] }
  ];

  projects: Project[] = [
    {
      sector: 'HR software',
      sectorIcon: 'people',
      role: 'Full-stack engineer',
      period: '2025 —',
      active: true,
      title: 'A legacy HR platform, rebuilt in place',
      summary:
        'Moving a multi-tenant HR suite off legacy PHP, one module at a time, without taking ' +
        'production down.',
      highlights: [
        'Payroll with QR-signed payslips and live integrations',
        'Savings fund: simulator, amortization schedules, approvals',
        'Advances and loans, with limits configurable per tenant',
        'Legacy pages embedded and authenticated inside the new portal'
      ],
      detail:
        'Every module ships front and back in the same pull request: a Nuxt 3 screen, an api-v2 ' +
        'module behind it, and the tenant configuration that decides who sees it. The hard part ' +
        'is coexistence rather than any single feature — the new portal keeps legacy pages ' +
        'embedded and authenticated through session tokens, so the platform migrates piece by ' +
        'piece while production stays up.',
      diagram: 'coexistence',
      tech: ['nuxt', 'vuedotjs', 'nestjs', 'mysql', 'amazonwebservices', 'typescript']
    },
    {
      sector: 'Genomics research',
      sectorIcon: 'helix',
      role: 'Full-stack engineer',
      period: '2026 —',
      active: true,
      title: 'Genomics data platform and customer portal',
      summary:
        'Reference genomes too large for an ordinary upload, and a bucket migration that had to ' +
        'be provably complete.',
      highlights: [
        'Multipart S3 uploads that resume instead of starting over',
        'Progress dashboard and smoke tests for every migration run',
        'Normalization rules the lab depends on every day'
      ],
      detail:
        'Reference genomes go to S3 in parts, and an interrupted transfer picks up where it ' +
        'stopped instead of restarting. Moving existing project archives between buckets needed ' +
        'more care: the pipeline inventories what exists, builds a manifest, copies folders in ' +
        'parallel, rewrites the paths held in MongoDB, and audits both directions to prove ' +
        'nothing was lost. Part of the work is the science itself — target concentration rules ' +
        'in the lab workflow, written so a lab tech can read them.',
      stages: [
        { name: 'inventory', note: 'List what exists in the source bucket.' },
        { name: 'manifest', note: 'Build the copy plan, path by path.' },
        { name: 'copy', note: 'Copy folders in parallel, retrying what fails.' },
        { name: 'rewrite', note: 'Repoint the MongoDB paths, scoped by project.' },
        { name: 'audit', note: 'Compare both buckets in both directions.' }
      ],
      stagesLabel: 'Migration pipeline',
      tech: ['nextdotjs', 'react', 'redux', 'nodedotjs', 'mongodb', 'amazonwebservices']
    },
    {
      sector: 'Education technology',
      sectorIcon: 'book',
      role: 'Full-stack engineer',
      period: '2025 —',
      active: true,
      title: 'A learning platform built for everyone',
      summary:
        'Web applications for a global education publisher, held to WCAG as they are built ' +
        'rather than audited for it at the end.',
      highlights: [
        'Semantic HTML and keyboard paths through every flow',
        'Screen reader support, audited continuously',
        'Go services behind the front end'
      ],
      detail:
        'Accessibility here is a build-time constraint, not a release checklist: semantic ' +
        'structure, keyboard paths through every flow, screen reader support, checked as the ' +
        'work happens. Unit tests in Jasmine and Karma, end-to-end coverage in Playwright.',
      tech: ['angular', 'go', 'playwright', 'typescript']
    },
    {
      sector: 'Banking',
      sectorIcon: 'bank',
      role: 'Software engineer',
      period: '2022 — 2025',
      title: 'Micro frontends for a national bank',
      summary:
        'An architecture that let teams ship on their own schedule instead of queueing behind ' +
        'a single release.',
      highlights: [
        'Micro frontend platform over Spring Boot services',
        'Testing standard set across front and back',
        'Code reviews, mentoring, and the technical interview process'
      ],
      detail:
        'Independent teams were blocked on one shared release train. A micro frontend ' +
        'architecture broke that dependency, backed by Spring Boot REST services. Alongside it: ' +
        'the testing standard the team adopted, regular code reviews, and the technical ' +
        'interview process it hired with.',
      diagram: 'releases',
      tech: ['angular', 'springboot', 'jest', 'typescript']
    },
    {
      sector: 'Invoicing',
      sectorIcon: 'document',
      role: 'Front-end engineer',
      period: '2021 — 2022',
      title: 'Electronic invoicing, off PHP',
      summary:
        'Replaced a legacy PHP invoicing system, then trained the team that had to keep it ' +
        'running afterwards.',
      highlights: [
        'Angular front end over a Django back end',
        'Training sessions for the staff mid-migration'
      ],
      detail:
        'The migration itself was the smaller half. The system was maintained by people who had ' +
        'only ever worked in the legacy stack, so the Angular training ran alongside the ' +
        'rewrite — which is what actually made it stick.',
      tech: ['angular', 'django', 'python']
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }

  icon(key: string): TechIcon {
    return TECH_ICONS[key];
  }

  sectorIcon(key: string): string[] {
    return SECTOR_ICONS[key];
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, denied permission) — the address is
      // still on screen as a mailto link, so there is nothing to recover from.
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Everything below is decorative. The page reads the same without it.
      return;
    }
    this.initLenis();
    this.initAnimations();
  }

  private initLenis(): void {
    new Lenis({ autoRaf: true });
  }

  private initAnimations(): void {
    // Hero: the headline rises line by line, once, on load. No mask — masking lines
    // clips ascenders and descenders at this line-height.
    const split = new SplitText('.hero-title', { type: 'lines' });
    gsap.from(split.lines, {
      duration: 1.1,
      yPercent: 40,
      opacity: 0,
      stagger: 0.09,
      ease: 'power3.out'
    });

    gsap.from('.hero-lede, .hero-actions, .hero-eyebrow', {
      duration: 0.9,
      y: 16,
      opacity: 0,
      stagger: 0.08,
      delay: 0.35,
      ease: 'power2.out'
    });

    // Sections rise as they enter. Kept on .reveal — initAnimations selects by class.
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: { trigger: elem, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Diagram parts appear in reading order.
    gsap.utils.toArray<HTMLElement>('.diagram').forEach((diagram) => {
      gsap.from(diagram.querySelectorAll('[data-part]'), {
        scrollTrigger: { trigger: diagram, start: 'top 88%' },
        opacity: 0,
        y: 8,
        duration: 0.5,
        stagger: 0.09,
        ease: 'power2.out'
      });
    });

    // The pipeline draws itself in order, because the order is the point.
    gsap.utils.toArray<HTMLElement>('.stages').forEach((strip) => {
      gsap
        .timeline({ scrollTrigger: { trigger: strip, start: 'top 88%' } })
        .from(strip.querySelectorAll('.stage-rule'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out'
        })
        .from(
          strip.querySelectorAll('.stage-name'),
          { opacity: 0, y: 6, duration: 0.4, stagger: 0.12, ease: 'power2.out' },
          0.1
        );
    });
  }
}
