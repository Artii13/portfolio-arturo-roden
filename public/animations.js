/**
 * GSAP Animations for Arturo Róden Portfolio
 * Features: Preloader, Scroll Reveals, Hero Animations
 */

document.addEventListener("DOMContentLoaded", function() {
  
  // ========================================
  // PRELOADER
  // ========================================
  window.addEventListener('load', function() {
    setTimeout(function() {
      var preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(function() {
          preloader.remove();
        }, 600);
      }
    }, 1500);
  });
  
  // ========================================
  // CHECK GSAP
  // ========================================
  if (typeof gsap === 'undefined') {
    // Show all content without animations
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  
  // Register plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // ========================================
  // SPLIT TEXT (fallback - animate whole text)
  // ========================================
  gsap.utils.toArray('.split-text').forEach(function(element) {
    gsap.from(element, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // ========================================
  // SCROLL REVEALS
  // ========================================
  
  // Reveal Up
  gsap.utils.toArray('.reveal-up').forEach(function(element) {
    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Fade In
  gsap.utils.toArray('.reveal-fade').forEach(function(element) {
    gsap.to(element, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Scale In
  gsap.utils.toArray('.reveal-scale').forEach(function(element) {
    gsap.to(element, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Stagger (grupos)
  gsap.utils.toArray('.reveal-stagger').forEach(function(container) {
    var children = container.children;
    if (children.length > 0) {
      gsap.from(children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }
  });
  
  // ========================================
  // HERO ANIMATIONS (on load, not scroll)
  // ========================================
  var heroTimeline = gsap.timeline({ delay: 1.8 });
  
  var heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTimeline.from(heroTitle, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }
  
  var heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    heroTimeline.from(heroSubtitle, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");
  }
  
  var heroDesc = document.querySelector('.hero-description');
  if (heroDesc) {
    heroTimeline.from(heroDesc, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
  }
  
  var heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroTimeline.from(heroImage, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");
  }
  
  var floatingElements = document.querySelectorAll('.hero-float');
  if (floatingElements.length > 0) {
    heroTimeline.from(floatingElements, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.5");
    
    // Continuous float animation
    floatingElements.forEach(function(el, i) {
      gsap.to(el, {
        y: -10,
        duration: 2 + (i * 0.3),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });
  }
  
  // ========================================
  // REFRESH SCROLL TRIGGER
  // ========================================
  setTimeout(function() {
    ScrollTrigger.refresh();
  }, 2000);
  
});
