// ============================================
// PORTFOLIO ARTURO RÓDEN - ANIMACIONES v2.0
// Versión limpia y funcional
// ============================================

(function() {
  'use strict';
  
  console.log('🎬 Animations v2.0 - Iniciando...');
  
  // ============================================
  // CONFIGURACIÓN
  // ============================================
  
  var CONFIG = {
    preloaderDuration: 1500,  // ms que se muestra el preloader
    enableLenis: true,        // smooth scroll
    enableFadeIn: true,       // elementos aparecen al scroll
    enableTilt: true,         // 3D tilt en cards (solo desktop)
    debug: true               // logs en consola
  };
  
  // ============================================
  // UTILIDADES
  // ============================================
  
  function log(message) {
    if (CONFIG.debug) {
      console.log(message);
    }
  }
  
  function isMobile() {
    return window.innerWidth < 1024;
  }
  
  // ============================================
  // PRELOADER
  // ============================================
  
  function hidePreloader() {
    var preloader = document.getElementById('preloader');
    if (!preloader) {
      log('⚠️ Preloader no encontrado');
      return;
    }
    
    log('🎬 Ocultando preloader...');
    
    preloader.style.transition = 'opacity 0.5s ease-out';
    preloader.style.opacity = '0';
    
    setTimeout(function() {
      preloader.style.display = 'none';
      log('✅ Preloader oculto');
    }, 500);
  }
  
  // ============================================
  // LENIS SMOOTH SCROLL - Versión optimizada
  // ============================================
  
  var lenisInstance = null; // Variable global para evitar duplicados
  
  function initLenis() {
    // Evitar múltiples instancias
    if (lenisInstance) {
      log('⚠️ Lenis ya existe - ignorando');
      return;
    }
    
    if (!CONFIG.enableLenis) {
      log('⚠️ Lenis desactivado en config');
      return;
    }
    
    if (typeof Lenis === 'undefined') {
      log('❌ Lenis no está cargado');
      return;
    }
    
    if (isMobile()) {
      log('📱 Lenis desactivado en mobile');
      return;
    }
    
    try {
      // Configuración optimizada para scroll MUY suave
      lenisInstance = new Lenis({
        duration: 1.4,           // Más suave (1.2 → 1.4)
        easing: function(t) {    // Easing ease-out-expo
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        },
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,    // Menos sensible (1 → 0.8)
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true,
        lerp: 0.1                // Interpolación suave
      });
      
      // RAF loop - SOLO UNO
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      // Exponer para debug en consola
      window.lenis = lenisInstance;
      
      log('✅ Lenis inicializado');
      log('   → Prueba en consola: window.lenis.scrollTo("#proyectos")');
      
    } catch (error) {
      console.error('❌ Error inicializando Lenis:', error);
      lenisInstance = null;
    }
  }
  
  // ============================================
  // FADE IN AL SCROLL - MEJORADO
  // ============================================
  
  function initFadeIn() {
    if (!CONFIG.enableFadeIn) {
      log('⚠️ Fade-in desactivado');
      return;
    }
    
    // Selectores para elementos animables
    var elements = document.querySelectorAll(
      '.reveal-up, .reveal-fade, .reveal-stagger, [data-animate="fade"], [data-animate="stagger"]'
    );
    
    log('🎨 Elementos para fade-in: ' + elements.length);
    
    if (elements.length === 0) {
      log('⚠️ No se encontraron elementos para animar');
      return;
    }
    
    // Configuración del observer - adaptada para móvil y desktop
    var isMobileDevice = window.innerWidth < 768;
    var observerOptions = {
      root: null,                    // viewport
      threshold: isMobileDevice ? 0.05 : 0.15,  // Móvil: 5%, Desktop: 15%
      rootMargin: isMobileDevice ? '0px 0px -30px 0px' : '0px 0px -80px 0px'
    };
    
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Pequeño delay para que se sienta más natural
          setTimeout(function() {
            entry.target.classList.add('is-visible');
            if (CONFIG.debug) {
              log('✨ Visible: ' + entry.target.className.split(' ')[0]);
            }
          }, 50);
        }
      });
    }, observerOptions);
    
    // Observar cada elemento
    elements.forEach(function(el) {
      observer.observe(el);
    });
    
    log('✅ Fade-in configurado (' + elements.length + ' elementos)');
  }
  
  // ============================================
  // 3D TILT - SOLO DESKTOP
  // ============================================
  
  function initTilt() {
    // Solo activar en desktop (no móvil/tablet)
    if (!CONFIG.enableTilt) {
      log('⚠️ Tilt desactivado en config');
      return;
    }
    
    if (isMobile() || window.innerWidth < 1024) {
      log('📱 Tilt desactivado en móvil/tablet');
      return;
    }
    
    var tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (tiltElements.length === 0) {
      log('⚠️ No se encontraron elementos con data-tilt');
      return;
    }
    
    log('🎯 Elementos tilt encontrados: ' + tiltElements.length);
    
    tiltElements.forEach(function(element) {
      
      // Configuración del efecto
      var maxTilt = 8;        // Grados máximos de inclinación
      var perspective = 1000;  // Perspectiva 3D
      var speed = 400;         // Velocidad de transición (ms)
      
      // Aplicar estilos base
      element.style.transformStyle = 'preserve-3d';
      element.style.transition = 'transform ' + speed + 'ms ease-out';
      
      // Mouse enter - preparar perspectiva
      element.addEventListener('mouseenter', function() {
        element.style.transition = 'transform 150ms ease-out';
      });
      
      // Mouse move - calcular inclinación
      element.addEventListener('mousemove', function(e) {
        var rect = element.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        
        var mouseX = e.clientX - centerX;
        var mouseY = e.clientY - centerY;
        
        var rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
        var rotateY = (mouseX / (rect.width / 2)) * maxTilt;
        
        element.style.transform = 
          'perspective(' + perspective + 'px) ' +
          'rotateX(' + rotateX + 'deg) ' +
          'rotateY(' + rotateY + 'deg) ' +
          'scale3d(1.02, 1.02, 1.02)';
      });
      
      // Mouse leave - resetear suavemente
      element.addEventListener('mouseleave', function() {
        element.style.transition = 'transform ' + speed + 'ms ease-out';
        element.style.transform = 'perspective(' + perspective + 'px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
      
    });
    
    log('✅ Tilt inicializado (' + tiltElements.length + ' elementos)');
  }
  
  // ============================================
  // INICIALIZACIÓN
  // ============================================
  
  function init() {
    log('📄 DOM listo');
    log('📱 Mobile: ' + isMobile());
    log('📐 Width: ' + window.innerWidth + 'px');
    
    // 1. Mostrar preloader por X tiempo, luego ocultarlo
    log('⏳ Preloader visible por ' + CONFIG.preloaderDuration + 'ms...');
    
    setTimeout(function() {
      hidePreloader();
      
      // 2. Iniciar efectos después del preloader
      setTimeout(function() {
        initLenis();
        initFadeIn();
        initTilt();
        log('');
        log('========================================');
        log('✅ INICIALIZACIÓN COMPLETA');
        log('========================================');
      }, 100);
      
    }, CONFIG.preloaderDuration);
  }
  
  // Ejecutar cuando DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
