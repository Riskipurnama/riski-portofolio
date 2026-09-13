import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimations() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => {
    lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)

    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {

      // SECTION REVEAL

      gsap.utils.toArray('section').forEach((section) => {
        const elements = section.querySelectorAll(
          '.section-label, h2, .small-title, p, .stats, .skills-grid, .projects-list, .contact-links, .footer'
        )

        gsap.from(elements, {
          opacity: 0,
          y: 35,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        })
      })


      // PROJECT IMAGE

      gsap.utils.toArray('.project-image-wrapper').forEach((image) => {
        gsap.from(image, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 1.1,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: image,
            start: 'top 82%',
            once: true,
          },
        })
      })


      // PROJECT TITLE

      gsap.utils.toArray('.project-title').forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            once: true,
          },
        })
      })


      // SKILLS

      gsap.utils.toArray('.skill-group').forEach((group, index) => {
        gsap.from(group, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: index * 0.05,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true,
          },
        })
      })


      // CERTIFICATES

      gsap.utils.toArray('.certificate-item').forEach((certificate, index) => {
        gsap.from(certificate, {
          opacity: 0,
          x: 35,
          duration: 0.7,
          delay: index * 0.05,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: certificate,
            start: 'top 88%',
            once: true,
          },
        })
      })


      // CONTACT

      gsap.utils.toArray('.contact-link').forEach((link, index) => {
        gsap.from(link, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          delay: index * 0.08,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: link,
            start: 'top 90%',
            once: true,
          },
        })
      })

    })

    ScrollTrigger.refresh()

    return () => {
    ctx.revert()
    gsap.ticker.remove(update)
    lenis.destroy()
    }
  }, [])

  return null
}