import { e as createComponent, r as renderTemplate, m as maybeRenderHead, k as renderComponent, n as renderScript, l as renderHead } from '../chunks/astro/server_LHX_jZwX.mjs';
import 'piccolore';
import { $ as $$EvervaultHead, a as $$OriginalHeader } from '../chunks/OriginalHeader_D07xdS4d.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$JsonToUICanvas = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<div class="json-to-ui-canvas-wrapper" data-astro-cid-q2dpztgz> <canvas id="json-to-ui-canvas" data-astro-cid-q2dpztgz></canvas> </div>  <script>
  // JSON character set
  const JSON_CHARS = ['{', '}', '[', ']', '"', ':', ',', 'data', 'type', 'value', 'props'];
  
  // UI component types
  const UIComponentType = {
    INPUT: 'input',
    BUTTON: 'button',
    CARD: 'card',
    CHECKBOX: 'checkbox',
    SLIDER: 'slider'
  };

  // Load Three.js from CDN
  import('https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js').then((THREE) => {

  // Random color pool (rich and colorful)
  const COLORS = [
    '#6432e6', // Purple
    '#e62e8b', // Rose
    '#2e86e6', // Blue
    '#e6962e', // Orange
    '#2ee6a6', // Cyan
    '#e6e62e', // Yellow
    '#8b2ee6', // Deep purple
    '#2ee65a', // Green
    '#e62e5a', // Red
    '#5a2ee6', // Blue-purple
  ];

  class JsonToUIAnimation {
    constructor(canvas) {
      this.canvas = canvas;
      this.particles = [];
      this.particleCount = 50;
      this.uiTextureCache = new Map();
      this.init();
      this.createParticles();
      this.animate();
      
      window.addEventListener('resize', () => this.onResize());
    }

    init() {
      this.scene = new THREE.Scene();

      const wrapper = this.canvas.parentElement;
      const aspect = wrapper.clientWidth / wrapper.clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
      this.camera.position.z = 400;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true
      });
      this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // Create JSON text texture (neon glow effect)
    createTextTexture(text, color = '#6432e6') {
      const canvas = document.createElement('canvas');
      // Dynamically adjust canvas width based on text length
      const width = text.length > 2 ? 512 : 256;
      canvas.width = width;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      ctx.font = '120px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Use composite mode to create glow effect
      ctx.globalCompositeOperation = 'lighter'; // Key: additive glow
      
      // Outer glow (large blur)
      ctx.fillStyle = color;
      ctx.filter = 'blur(20px)';
      ctx.globalAlpha = 0.3;
      ctx.fillText(text, width / 2, 128);
      ctx.fillText(text, width / 2, 128);
      ctx.fillText(text, width / 2, 128);
      
      // Middle glow
      ctx.filter = 'blur(10px)';
      ctx.globalAlpha = 0.5;
      ctx.fillText(text, width / 2, 128);
      ctx.fillText(text, width / 2, 128);
      
      // Inner glow
      ctx.filter = 'blur(5px)';
      ctx.globalAlpha = 0.7;
      ctx.fillText(text, width / 2, 128);
      
      // Core text (clear, no blur)
      ctx.filter = 'none';
      ctx.globalAlpha = 1.0;
      ctx.fillText(text, width / 2, 128);

      return new THREE.CanvasTexture(canvas);
    }

    // Create UI component icon texture (neon glow effect)
    createUIIconTexture(type, color = '#8a2be2') {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 6;
      
      // Use composite mode to create glow effect
      ctx.globalCompositeOperation = 'lighter';
      
      // Define drawing function
      const drawIcon = () => {
        switch (type) {
          case UIComponentType.INPUT:
            ctx.strokeRect(40, 100, 176, 56);
            ctx.fillRect(50, 116, 40, 24);
            break;
          
          case UIComponentType.BUTTON:
            ctx.beginPath();
            ctx.roundRect(50, 90, 156, 76, 16);
            ctx.fill();
            ctx.stroke();
            break;
          
          case UIComponentType.CARD:
            ctx.strokeRect(40, 60, 176, 136);
            ctx.fillRect(50, 70, 156, 16);
            ctx.fillRect(50, 100, 80, 12);
            ctx.fillRect(50, 124, 100, 12);
            break;
          
          case UIComponentType.CHECKBOX:
            ctx.strokeRect(80, 80, 96, 96);
            ctx.beginPath();
            ctx.moveTo(100, 128);
            ctx.lineTo(120, 148);
            ctx.lineTo(156, 104);
            ctx.stroke();
            break;
          
          case UIComponentType.SLIDER:
            ctx.beginPath();
            ctx.moveTo(40, 128);
            ctx.lineTo(216, 128);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(140, 128, 24, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
        }
      };
      
      // Outer glow (multiple draws for enhanced effect)
      ctx.filter = 'blur(15px)';
      ctx.globalAlpha = 0.3;
      drawIcon();
      drawIcon();
      drawIcon();
      
      // Middle glow
      ctx.filter = 'blur(8px)';
      ctx.globalAlpha = 0.5;
      drawIcon();
      drawIcon();
      
      // Inner glow
      ctx.filter = 'blur(4px)';
      ctx.globalAlpha = 0.7;
      drawIcon();
      
      // Core icon (clear)
      ctx.filter = 'none';
      ctx.globalAlpha = 1.0;
      drawIcon();

      return new THREE.CanvasTexture(canvas);
    }

    createParticles() {
      const uiTypes = Object.values(UIComponentType);
      const wrapper = this.canvas.parentElement;
      const canvasWidth = wrapper.clientWidth;
      const margin = 150; // Edge margin

      for (let i = 0; i < this.particleCount; i++) {
        // Start position outside left edge (with margin)
        const startX = -canvasWidth / 2 - margin + Math.random() * 200;
        const y = (Math.random() - 0.5) * 400; // Increase vertical range
        const z = (Math.random() - 0.5) * 200;

        // Random color
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // 50% probability to transform into UI icon
        const willTransform = Math.random() > 0.5;
        let texture;
        let targetType;

        // Initially all are JSON symbols
        const char = JSON_CHARS[Math.floor(Math.random() * JSON_CHARS.length)];
        texture = this.createTextTexture(char, color);
        
        // Adjust sprite width based on text length (reduced by 1/4: 16\u219212, 32\u219224)
        const spriteWidth = char.length > 2 ? 24 : 12;
        const spriteHeight = 12;
        
        // Only particles with willTransform will become UI icons on the right
        if (willTransform) {
          targetType = uiTypes[Math.floor(Math.random() * uiTypes.length)];
        }

        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0, // Initially transparent
          blending: THREE.AdditiveBlending
        });

        const sprite = new THREE.Sprite(material);
        sprite.position.set(startX, y, z);
        sprite.scale.set(spriteWidth, spriteHeight, 1); // Adjust based on text length
        
        this.scene.add(sprite);

        this.particles.push({
          mesh: sprite,
          velocity: new THREE.Vector3(
            Math.random() * 0.4 + 0.25, // x: rightward (half speed)
            (Math.random() - 0.5) * 0.15, // y: slight up/down (half speed)
            (Math.random() - 0.5) * 0.1  // z: slight forward/back (half speed)
          ),
          startX,
          phase: 'json',
          targetType, // If undefined, always stays JSON
          rotationSpeed: (Math.random() - 0.5) * 0.01, // Half rotation speed
          color,
          currentText: char // Record current text
        });
      }
    }

    updateParticle(particle) {
      const pos = particle.mesh.position;
      const wrapper = this.canvas.parentElement;
      const canvasWidth = wrapper.clientWidth;
      const margin = 150; // Edge margin
      const edgeFadeDistance = 100; // Edge fade in/out distance
      const centerFadeDistance = 120; // Center line fade in/out distance
      
      // Update position
      pos.x += particle.velocity.x;
      pos.y += particle.velocity.y;
      pos.z += particle.velocity.z;

      // Rotation effect
      particle.mesh.material.rotation += particle.rotationSpeed;

      // Calculate boundaries (considering margin)
      const leftBoundary = -canvasWidth / 2 + margin;
      const rightBoundary = canvasWidth / 2 - margin;
      const centerLine = 0; // Screen center line
      
      // Determine phase and opacity based on X coordinate
      if (pos.x < centerLine - centerFadeDistance) {
        // Left area: display JSON symbols
        particle.phase = 'json';
        // Set width based on current text length (reduced by 1/4: 32\u219224, 16\u219212)
        const spriteWidth = (particle.currentText && particle.currentText.length > 2) ? 24 : 12;
        if (particle.mesh.scale.x !== spriteWidth || particle.mesh.scale.y !== 12) {
          particle.mesh.scale.set(spriteWidth, 12, 1);
        }
        
        // Edge fade-in effect
        if (pos.x < leftBoundary + edgeFadeDistance) {
          const fadeProgress = (pos.x - (leftBoundary - edgeFadeDistance)) / edgeFadeDistance;
          particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeProgress * 0.85));
        } else {
          particle.mesh.material.opacity = 0.85;
        }
      } else if (pos.x < centerLine) {
        // Near center line left: JSON fades out and disappears
        particle.phase = 'transition';
        const fadeOutProgress = (centerLine - pos.x) / centerFadeDistance; // 1 \u2192 0
        particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeOutProgress * 0.85));
      } else if (particle.targetType && pos.x < centerLine + centerFadeDistance) {
        // Near center line right: only particles with targetType become UI and fade in
        particle.phase = 'ui';
        const fadeInProgress = (pos.x - centerLine) / centerFadeDistance; // 0 \u2192 1
        particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeInProgress * 0.85));
        
        // Switch to UI texture and size (reduced by 1/4: 21\u219216)
        particle.mesh.material.map = this.getUITexture(particle.targetType, particle.color);
        particle.mesh.material.needsUpdate = true;
        if (particle.mesh.scale.x !== 16) {
          particle.mesh.scale.set(16, 16, 1); // UI icon size
        }
      } else if (particle.targetType) {
        // Right area: display UI icons (only particles with targetType)
        particle.phase = 'ui';
        if (particle.mesh.scale.x !== 16) {
          particle.mesh.scale.set(16, 16, 1); // UI icon size
        }
        
        // Edge fade-out effect
        if (pos.x > rightBoundary - edgeFadeDistance) {
          const fadeProgress = (rightBoundary - pos.x) / edgeFadeDistance;
          particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeProgress * 0.85));
        } else {
          particle.mesh.material.opacity = 0.85;
        }
      } else {
        // Particles without targetType remain transparent after center line (disappeared state)
        particle.mesh.material.opacity = 0;
      }

      // Loop: reset from right to left
      if (pos.x > rightBoundary + edgeFadeDistance) {
        pos.x = leftBoundary - edgeFadeDistance + Math.random() * 100;
        pos.y = (Math.random() - 0.5) * 400; // Increase vertical range
        pos.z = (Math.random() - 0.5) * 200;
        particle.phase = 'json';
        
        // Re-randomize color
        particle.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // Re-randomize decision to transform to UI
        if (Math.random() > 0.5) {
          const uiTypes = Object.values(UIComponentType);
          particle.targetType = uiTypes[Math.floor(Math.random() * uiTypes.length)];
        } else {
          particle.targetType = undefined; // Keep pure JSON
        }
        
        // Reset to JSON texture
        const char = JSON_CHARS[Math.floor(Math.random() * JSON_CHARS.length)];
        particle.currentText = char; // Update current text
        particle.mesh.material.map = this.createTextTexture(char, particle.color);
        particle.mesh.material.needsUpdate = true;
        // Set size based on text length (reduced by 1/4: 32\u219224, 16\u219212)
        const spriteWidth = char.length > 2 ? 24 : 12;
        particle.mesh.scale.set(spriteWidth, 12, 1);
        particle.mesh.material.opacity = 0; // Reset to transparent
      }

      // Y and Z boundaries (increased range)
      if (pos.y > 200) pos.y = -200;
      if (pos.y < -200) pos.y = 200;
      if (pos.z > 100) pos.z = -100;
      if (pos.z < -100) pos.z = 100;
    }

    // Cache UI textures (by type and color)
    getUITexture(type, color) {
      const key = \`\${type}-\${color}\`;
      if (!this.uiTextureCache.has(key)) {
        this.uiTextureCache.set(key, this.createUIIconTexture(type, color));
      }
      return this.uiTextureCache.get(key);
    }

    animate = () => {
      requestAnimationFrame(this.animate);

      this.particles.forEach(particle => this.updateParticle(particle));

      this.renderer.render(this.scene, this.camera);
    };

    onResize() {
      const wrapper = this.canvas.parentElement;
      const aspect = wrapper.clientWidth / wrapper.clientHeight;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    }
  }

    const canvas = document.getElementById('json-to-ui-canvas');
    if (canvas) {
      new JsonToUIAnimation(canvas);
    }
  }).catch(console.error);
<\/script>`], ["", `<div class="json-to-ui-canvas-wrapper" data-astro-cid-q2dpztgz> <canvas id="json-to-ui-canvas" data-astro-cid-q2dpztgz></canvas> </div>  <script>
  // JSON character set
  const JSON_CHARS = ['{', '}', '[', ']', '"', ':', ',', 'data', 'type', 'value', 'props'];
  
  // UI component types
  const UIComponentType = {
    INPUT: 'input',
    BUTTON: 'button',
    CARD: 'card',
    CHECKBOX: 'checkbox',
    SLIDER: 'slider'
  };

  // Load Three.js from CDN
  import('https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js').then((THREE) => {

  // Random color pool (rich and colorful)
  const COLORS = [
    '#6432e6', // Purple
    '#e62e8b', // Rose
    '#2e86e6', // Blue
    '#e6962e', // Orange
    '#2ee6a6', // Cyan
    '#e6e62e', // Yellow
    '#8b2ee6', // Deep purple
    '#2ee65a', // Green
    '#e62e5a', // Red
    '#5a2ee6', // Blue-purple
  ];

  class JsonToUIAnimation {
    constructor(canvas) {
      this.canvas = canvas;
      this.particles = [];
      this.particleCount = 50;
      this.uiTextureCache = new Map();
      this.init();
      this.createParticles();
      this.animate();
      
      window.addEventListener('resize', () => this.onResize());
    }

    init() {
      this.scene = new THREE.Scene();

      const wrapper = this.canvas.parentElement;
      const aspect = wrapper.clientWidth / wrapper.clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
      this.camera.position.z = 400;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true
      });
      this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // Create JSON text texture (neon glow effect)
    createTextTexture(text, color = '#6432e6') {
      const canvas = document.createElement('canvas');
      // Dynamically adjust canvas width based on text length
      const width = text.length > 2 ? 512 : 256;
      canvas.width = width;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      ctx.font = '120px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Use composite mode to create glow effect
      ctx.globalCompositeOperation = 'lighter'; // Key: additive glow
      
      // Outer glow (large blur)
      ctx.fillStyle = color;
      ctx.filter = 'blur(20px)';
      ctx.globalAlpha = 0.3;
      ctx.fillText(text, width / 2, 128);
      ctx.fillText(text, width / 2, 128);
      ctx.fillText(text, width / 2, 128);
      
      // Middle glow
      ctx.filter = 'blur(10px)';
      ctx.globalAlpha = 0.5;
      ctx.fillText(text, width / 2, 128);
      ctx.fillText(text, width / 2, 128);
      
      // Inner glow
      ctx.filter = 'blur(5px)';
      ctx.globalAlpha = 0.7;
      ctx.fillText(text, width / 2, 128);
      
      // Core text (clear, no blur)
      ctx.filter = 'none';
      ctx.globalAlpha = 1.0;
      ctx.fillText(text, width / 2, 128);

      return new THREE.CanvasTexture(canvas);
    }

    // Create UI component icon texture (neon glow effect)
    createUIIconTexture(type, color = '#8a2be2') {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 6;
      
      // Use composite mode to create glow effect
      ctx.globalCompositeOperation = 'lighter';
      
      // Define drawing function
      const drawIcon = () => {
        switch (type) {
          case UIComponentType.INPUT:
            ctx.strokeRect(40, 100, 176, 56);
            ctx.fillRect(50, 116, 40, 24);
            break;
          
          case UIComponentType.BUTTON:
            ctx.beginPath();
            ctx.roundRect(50, 90, 156, 76, 16);
            ctx.fill();
            ctx.stroke();
            break;
          
          case UIComponentType.CARD:
            ctx.strokeRect(40, 60, 176, 136);
            ctx.fillRect(50, 70, 156, 16);
            ctx.fillRect(50, 100, 80, 12);
            ctx.fillRect(50, 124, 100, 12);
            break;
          
          case UIComponentType.CHECKBOX:
            ctx.strokeRect(80, 80, 96, 96);
            ctx.beginPath();
            ctx.moveTo(100, 128);
            ctx.lineTo(120, 148);
            ctx.lineTo(156, 104);
            ctx.stroke();
            break;
          
          case UIComponentType.SLIDER:
            ctx.beginPath();
            ctx.moveTo(40, 128);
            ctx.lineTo(216, 128);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(140, 128, 24, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
        }
      };
      
      // Outer glow (multiple draws for enhanced effect)
      ctx.filter = 'blur(15px)';
      ctx.globalAlpha = 0.3;
      drawIcon();
      drawIcon();
      drawIcon();
      
      // Middle glow
      ctx.filter = 'blur(8px)';
      ctx.globalAlpha = 0.5;
      drawIcon();
      drawIcon();
      
      // Inner glow
      ctx.filter = 'blur(4px)';
      ctx.globalAlpha = 0.7;
      drawIcon();
      
      // Core icon (clear)
      ctx.filter = 'none';
      ctx.globalAlpha = 1.0;
      drawIcon();

      return new THREE.CanvasTexture(canvas);
    }

    createParticles() {
      const uiTypes = Object.values(UIComponentType);
      const wrapper = this.canvas.parentElement;
      const canvasWidth = wrapper.clientWidth;
      const margin = 150; // Edge margin

      for (let i = 0; i < this.particleCount; i++) {
        // Start position outside left edge (with margin)
        const startX = -canvasWidth / 2 - margin + Math.random() * 200;
        const y = (Math.random() - 0.5) * 400; // Increase vertical range
        const z = (Math.random() - 0.5) * 200;

        // Random color
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // 50% probability to transform into UI icon
        const willTransform = Math.random() > 0.5;
        let texture;
        let targetType;

        // Initially all are JSON symbols
        const char = JSON_CHARS[Math.floor(Math.random() * JSON_CHARS.length)];
        texture = this.createTextTexture(char, color);
        
        // Adjust sprite width based on text length (reduced by 1/4: 16\u219212, 32\u219224)
        const spriteWidth = char.length > 2 ? 24 : 12;
        const spriteHeight = 12;
        
        // Only particles with willTransform will become UI icons on the right
        if (willTransform) {
          targetType = uiTypes[Math.floor(Math.random() * uiTypes.length)];
        }

        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0, // Initially transparent
          blending: THREE.AdditiveBlending
        });

        const sprite = new THREE.Sprite(material);
        sprite.position.set(startX, y, z);
        sprite.scale.set(spriteWidth, spriteHeight, 1); // Adjust based on text length
        
        this.scene.add(sprite);

        this.particles.push({
          mesh: sprite,
          velocity: new THREE.Vector3(
            Math.random() * 0.4 + 0.25, // x: rightward (half speed)
            (Math.random() - 0.5) * 0.15, // y: slight up/down (half speed)
            (Math.random() - 0.5) * 0.1  // z: slight forward/back (half speed)
          ),
          startX,
          phase: 'json',
          targetType, // If undefined, always stays JSON
          rotationSpeed: (Math.random() - 0.5) * 0.01, // Half rotation speed
          color,
          currentText: char // Record current text
        });
      }
    }

    updateParticle(particle) {
      const pos = particle.mesh.position;
      const wrapper = this.canvas.parentElement;
      const canvasWidth = wrapper.clientWidth;
      const margin = 150; // Edge margin
      const edgeFadeDistance = 100; // Edge fade in/out distance
      const centerFadeDistance = 120; // Center line fade in/out distance
      
      // Update position
      pos.x += particle.velocity.x;
      pos.y += particle.velocity.y;
      pos.z += particle.velocity.z;

      // Rotation effect
      particle.mesh.material.rotation += particle.rotationSpeed;

      // Calculate boundaries (considering margin)
      const leftBoundary = -canvasWidth / 2 + margin;
      const rightBoundary = canvasWidth / 2 - margin;
      const centerLine = 0; // Screen center line
      
      // Determine phase and opacity based on X coordinate
      if (pos.x < centerLine - centerFadeDistance) {
        // Left area: display JSON symbols
        particle.phase = 'json';
        // Set width based on current text length (reduced by 1/4: 32\u219224, 16\u219212)
        const spriteWidth = (particle.currentText && particle.currentText.length > 2) ? 24 : 12;
        if (particle.mesh.scale.x !== spriteWidth || particle.mesh.scale.y !== 12) {
          particle.mesh.scale.set(spriteWidth, 12, 1);
        }
        
        // Edge fade-in effect
        if (pos.x < leftBoundary + edgeFadeDistance) {
          const fadeProgress = (pos.x - (leftBoundary - edgeFadeDistance)) / edgeFadeDistance;
          particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeProgress * 0.85));
        } else {
          particle.mesh.material.opacity = 0.85;
        }
      } else if (pos.x < centerLine) {
        // Near center line left: JSON fades out and disappears
        particle.phase = 'transition';
        const fadeOutProgress = (centerLine - pos.x) / centerFadeDistance; // 1 \u2192 0
        particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeOutProgress * 0.85));
      } else if (particle.targetType && pos.x < centerLine + centerFadeDistance) {
        // Near center line right: only particles with targetType become UI and fade in
        particle.phase = 'ui';
        const fadeInProgress = (pos.x - centerLine) / centerFadeDistance; // 0 \u2192 1
        particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeInProgress * 0.85));
        
        // Switch to UI texture and size (reduced by 1/4: 21\u219216)
        particle.mesh.material.map = this.getUITexture(particle.targetType, particle.color);
        particle.mesh.material.needsUpdate = true;
        if (particle.mesh.scale.x !== 16) {
          particle.mesh.scale.set(16, 16, 1); // UI icon size
        }
      } else if (particle.targetType) {
        // Right area: display UI icons (only particles with targetType)
        particle.phase = 'ui';
        if (particle.mesh.scale.x !== 16) {
          particle.mesh.scale.set(16, 16, 1); // UI icon size
        }
        
        // Edge fade-out effect
        if (pos.x > rightBoundary - edgeFadeDistance) {
          const fadeProgress = (rightBoundary - pos.x) / edgeFadeDistance;
          particle.mesh.material.opacity = Math.max(0, Math.min(0.85, fadeProgress * 0.85));
        } else {
          particle.mesh.material.opacity = 0.85;
        }
      } else {
        // Particles without targetType remain transparent after center line (disappeared state)
        particle.mesh.material.opacity = 0;
      }

      // Loop: reset from right to left
      if (pos.x > rightBoundary + edgeFadeDistance) {
        pos.x = leftBoundary - edgeFadeDistance + Math.random() * 100;
        pos.y = (Math.random() - 0.5) * 400; // Increase vertical range
        pos.z = (Math.random() - 0.5) * 200;
        particle.phase = 'json';
        
        // Re-randomize color
        particle.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // Re-randomize decision to transform to UI
        if (Math.random() > 0.5) {
          const uiTypes = Object.values(UIComponentType);
          particle.targetType = uiTypes[Math.floor(Math.random() * uiTypes.length)];
        } else {
          particle.targetType = undefined; // Keep pure JSON
        }
        
        // Reset to JSON texture
        const char = JSON_CHARS[Math.floor(Math.random() * JSON_CHARS.length)];
        particle.currentText = char; // Update current text
        particle.mesh.material.map = this.createTextTexture(char, particle.color);
        particle.mesh.material.needsUpdate = true;
        // Set size based on text length (reduced by 1/4: 32\u219224, 16\u219212)
        const spriteWidth = char.length > 2 ? 24 : 12;
        particle.mesh.scale.set(spriteWidth, 12, 1);
        particle.mesh.material.opacity = 0; // Reset to transparent
      }

      // Y and Z boundaries (increased range)
      if (pos.y > 200) pos.y = -200;
      if (pos.y < -200) pos.y = 200;
      if (pos.z > 100) pos.z = -100;
      if (pos.z < -100) pos.z = 100;
    }

    // Cache UI textures (by type and color)
    getUITexture(type, color) {
      const key = \\\`\\\${type}-\\\${color}\\\`;
      if (!this.uiTextureCache.has(key)) {
        this.uiTextureCache.set(key, this.createUIIconTexture(type, color));
      }
      return this.uiTextureCache.get(key);
    }

    animate = () => {
      requestAnimationFrame(this.animate);

      this.particles.forEach(particle => this.updateParticle(particle));

      this.renderer.render(this.scene, this.camera);
    };

    onResize() {
      const wrapper = this.canvas.parentElement;
      const aspect = wrapper.clientWidth / wrapper.clientHeight;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    }
  }

    const canvas = document.getElementById('json-to-ui-canvas');
    if (canvas) {
      new JsonToUIAnimation(canvas);
    }
  }).catch(console.error);
<\/script>`])), maybeRenderHead());
}, "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/JsonToUICanvas.astro", void 0);

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="hero-section" data-astro-cid-nlow4r3u> <div class="gradient-background" data-id="gradient" data-astro-cid-nlow4r3u> <div class="hero-content" data-id="content" data-astro-cid-nlow4r3u> <!-- Particle flow effect area --> <div class="canvas-wrapper" data-astro-cid-nlow4r3u> ${renderComponent($$result, "JsonToUICanvas", $$JsonToUICanvas, { "data-astro-cid-nlow4r3u": true })} <!-- Mask layer: transparent on left side of baseline, visible content on right --> <div class="particle-mask" data-position="right" data-astro-cid-nlow4r3u> <div class="particle-scroller" style="--gap: 300;" data-astro-cid-nlow4r3u> <!-- Decrypted state card container --> <div class="card-decrypted" data-astro-cid-nlow4r3u> <!-- Purple credit card --> <div class="payment-card" data-variant="purple" data-astro-cid-nlow4r3u> <!-- Visa Logo --> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-brand" data-astro-cid-nlow4r3u> <path fill="currentColor" d="M16.539 9.186a4.155 4.155 0 00-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 011.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275l.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 00-.149-.199 6.948 6.948 0 00-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606l.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" data-astro-cid-nlow4r3u></path> </svg> <!-- RFID Icon --> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23" class="card-rfid" data-astro-cid-nlow4r3u> <path fill="currentColor" fill-rule="evenodd" d="M2.286 11.714a14 14 0 003.565 9.334A1 1 0 114.36 22.38a16 16 0 010-21.333A1 1 0 115.85 2.38a14 14 0 00-3.564 9.333z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M7.286 11.714a9 9 0 002.572 6.3 1 1 0 11-1.428 1.4 11 11 0 010-15.4 1 1 0 111.428 1.4 9 9 0 00-2.572 6.3z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M12.285 11.714a4 4 0 001.143 2.8 1 1 0 01-1.428 1.4 6 6 0 010-8.4 1 1 0 111.428 1.4 4 4 0 00-1.143 2.8z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <!-- EMV Chip --> <div class="card-chip" data-astro-cid-nlow4r3u></div> <!-- Evervault Logo --> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 219" class="card-logo" data-astro-cid-nlow4r3u> <path fill="#fff" fill-rule="evenodd" d="M7.84 28.668a15.058 15.058 0 00-7.79 11.94c-.028-.381-.045-.765-.05-1.15v48.546c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l9.028 2.956-14.39 7.854a15.06 15.06 0 00-7.79 11.939c-.029-.381-.045-.765-.05-1.15v48.547c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l79.84 26.145a38.174 38.174 0 0025.098 0l79.84-26.145a19.172 19.172 0 0013.152-16.797c.027.313.044.627.051.943v-48.547c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94l-14.391-7.853 9.028-2.956A19.172 19.172 0 00200.95 87.06c.027.313.044.627.051.943V39.458c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94L115.426 2.412a38.174 38.174 0 00-25.098 0L7.839 28.668h.001z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <!-- Card Number --> <div class="card-number" data-astro-cid-nlow4r3u> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>4242</span> </div> </div> <!-- Blue credit card --> <div class="payment-card" data-variant="blue" data-astro-cid-nlow4r3u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-brand" data-astro-cid-nlow4r3u> <path fill="currentColor" d="M16.539 9.186a4.155 4.155 0 00-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 011.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275l.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 00-.149-.199 6.948 6.948 0 00-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606l.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" data-astro-cid-nlow4r3u></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23" class="card-rfid" data-astro-cid-nlow4r3u> <path fill="currentColor" fill-rule="evenodd" d="M2.286 11.714a14 14 0 003.565 9.334A1 1 0 114.36 22.38a16 16 0 010-21.333A1 1 0 115.85 2.38a14 14 0 00-3.564 9.333z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M7.286 11.714a9 9 0 002.572 6.3 1 1 0 11-1.428 1.4 11 11 0 010-15.4 1 1 0 111.428 1.4 9 9 0 00-2.572 6.3z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M12.285 11.714a4 4 0 001.143 2.8 1 1 0 01-1.428 1.4 6 6 0 010-8.4 1 1 0 111.428 1.4 4 4 0 00-1.143 2.8z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-chip" data-astro-cid-nlow4r3u></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 219" class="card-logo" data-astro-cid-nlow4r3u> <path fill="#fff" fill-rule="evenodd" d="M7.84 28.668a15.058 15.058 0 00-7.79 11.94c-.028-.381-.045-.765-.05-1.15v48.546c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l9.028 2.956-14.39 7.854a15.06 15.06 0 00-7.79 11.939c-.029-.381-.045-.765-.05-1.15v48.547c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l79.84 26.145a38.174 38.174 0 0025.098 0l79.84-26.145a19.172 19.172 0 0013.152-16.797c.027.313.044.627.051.943v-48.547c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94l-14.391-7.853 9.028-2.956A19.172 19.172 0 00200.95 87.06c.027.313.044.627.051.943V39.458c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94L115.426 2.412a38.174 38.174 0 00-25.098 0L7.839 28.668h.001z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-number" data-astro-cid-nlow4r3u> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>4242</span> </div> </div> <!-- Pink credit card --> <div class="payment-card" data-variant="pink" data-astro-cid-nlow4r3u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-brand" data-astro-cid-nlow4r3u> <path fill="currentColor" d="M16.539 9.186a4.155 4.155 0 00-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 011.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275l.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 00-.149-.199 6.948 6.948 0 00-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606l.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" data-astro-cid-nlow4r3u></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23" class="card-rfid" data-astro-cid-nlow4r3u> <path fill="currentColor" fill-rule="evenodd" d="M2.286 11.714a14 14 0 003.565 9.334A1 1 0 114.36 22.38a16 16 0 010-21.333A1 1 0 115.85 2.38a14 14 0 00-3.564 9.333z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M7.286 11.714a9 9 0 002.572 6.3 1 1 0 11-1.428 1.4 11 11 0 010-15.4 1 1 0 111.428 1.4 9 9 0 00-2.572 6.3z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M12.285 11.714a4 4 0 001.143 2.8 1 1 0 01-1.428 1.4 6 6 0 010-8.4 1 1 0 111.428 1.4 4 4 0 00-1.143 2.8z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-chip" data-astro-cid-nlow4r3u></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 219" class="card-logo" data-astro-cid-nlow4r3u> <path fill="#fff" fill-rule="evenodd" d="M7.84 28.668a15.058 15.058 0 00-7.79 11.94c-.028-.381-.045-.765-.05-1.15v48.546c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l9.028 2.956-14.39 7.854a15.06 15.06 0 00-7.79 11.939c-.029-.381-.045-.765-.05-1.15v48.547c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l79.84 26.145a38.174 38.174 0 0025.098 0l79.84-26.145a19.172 19.172 0 0013.152-16.797c.027.313.044.627.051.943v-48.547c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94l-14.391-7.853 9.028-2.956A19.172 19.172 0 00200.95 87.06c.027.313.044.627.051.943V39.458c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94L115.426 2.412a38.174 38.174 0 00-25.098 0L7.839 28.668h.001z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-number" data-astro-cid-nlow4r3u> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>4242</span> </div> </div> </div> <!-- Decrypted state card container - second group (duplicated for seamless loop) --> <div class="card-decrypted" aria-hidden="true" data-astro-cid-nlow4r3u> <!-- Purple credit card --> <div class="payment-card" data-variant="purple" data-astro-cid-nlow4r3u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-brand" data-astro-cid-nlow4r3u> <path fill="currentColor" d="M16.539 9.186a4.155 4.155 0 00-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 011.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275l.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 00-.149-.199 6.948 6.948 0 00-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606l.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" data-astro-cid-nlow4r3u></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23" class="card-rfid" data-astro-cid-nlow4r3u> <path fill="currentColor" fill-rule="evenodd" d="M2.286 11.714a14 14 0 003.565 9.334A1 1 0 114.36 22.38a16 16 0 010-21.333A1 1 0 115.85 2.38a14 14 0 00-3.564 9.333z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M7.286 11.714a9 9 0 002.572 6.3 1 1 0 11-1.428 1.4 11 11 0 010-15.4 1 1 0 111.428 1.4 9 9 0 00-2.572 6.3z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M12.285 11.714a4 4 0 001.143 2.8 1 1 0 01-1.428 1.4 6 6 0 010-8.4 1 1 0 111.428 1.4 4 4 0 00-1.143 2.8z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-chip" data-astro-cid-nlow4r3u></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 219" class="card-logo" data-astro-cid-nlow4r3u> <path fill="#fff" fill-rule="evenodd" d="M7.84 28.668a15.058 15.058 0 00-7.79 11.94c-.028-.381-.045-.765-.05-1.15v48.546c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l9.028 2.956-14.39 7.854a15.06 15.06 0 00-7.79 11.939c-.029-.381-.045-.765-.05-1.15v48.547c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l79.84 26.145a38.174 38.174 0 0025.098 0l79.84-26.145a19.172 19.172 0 0013.152-16.797c.027.313.044.627.051.943v-48.547c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94l-14.391-7.853 9.028-2.956A19.172 19.172 0 00200.95 87.06c.027.313.044.627.051.943V39.458c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94L115.426 2.412a38.174 38.174 0 00-25.098 0L7.839 28.668h.001z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-number" data-astro-cid-nlow4r3u> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>4242</span> </div> </div> <!-- Blue credit card --> <div class="payment-card" data-variant="blue" data-astro-cid-nlow4r3u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-brand" data-astro-cid-nlow4r3u> <path fill="currentColor" d="M16.539 9.186a4.155 4.155 0 00-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 011.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275l.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 00-.149-.199 6.948 6.948 0 00-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606l.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" data-astro-cid-nlow4r3u></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23" class="card-rfid" data-astro-cid-nlow4r3u> <path fill="currentColor" fill-rule="evenodd" d="M2.286 11.714a14 14 0 003.565 9.334A1 1 0 114.36 22.38a16 16 0 010-21.333A1 1 0 115.85 2.38a14 14 0 00-3.564 9.333z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M7.286 11.714a9 9 0 002.572 6.3 1 1 0 11-1.428 1.4 11 11 0 010-15.4 1 1 0 111.428 1.4 9 9 0 00-2.572 6.3z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M12.285 11.714a4 4 0 001.143 2.8 1 1 0 01-1.428 1.4 6 6 0 010-8.4 1 1 0 111.428 1.4 4 4 0 00-1.143 2.8z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-chip" data-astro-cid-nlow4r3u></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 219" class="card-logo" data-astro-cid-nlow4r3u> <path fill="#fff" fill-rule="evenodd" d="M7.84 28.668a15.058 15.058 0 00-7.79 11.94c-.028-.381-.045-.765-.05-1.15v48.546c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l9.028 2.956-14.39 7.854a15.06 15.06 0 00-7.79 11.939c-.029-.381-.045-.765-.05-1.15v48.547c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l79.84 26.145a38.174 38.174 0 0025.098 0l79.84-26.145a19.172 19.172 0 0013.152-16.797c.027.313.044.627.051.943v-48.547c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94l-14.391-7.853 9.028-2.956A19.172 19.172 0 00200.95 87.06c.027.313.044.627.051.943V39.458c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94L115.426 2.412a38.174 38.174 0 00-25.098 0L7.839 28.668h.001z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-number" data-astro-cid-nlow4r3u> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>4242</span> </div> </div> <!-- Pink credit card --> <div class="payment-card" data-variant="pink" data-astro-cid-nlow4r3u> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="card-brand" data-astro-cid-nlow4r3u> <path fill="currentColor" d="M16.539 9.186a4.155 4.155 0 00-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 011.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275l.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 00-.149-.199 6.948 6.948 0 00-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606l.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" data-astro-cid-nlow4r3u></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 23" class="card-rfid" data-astro-cid-nlow4r3u> <path fill="currentColor" fill-rule="evenodd" d="M2.286 11.714a14 14 0 003.565 9.334A1 1 0 114.36 22.38a16 16 0 010-21.333A1 1 0 115.85 2.38a14 14 0 00-3.564 9.333z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M7.286 11.714a9 9 0 002.572 6.3 1 1 0 11-1.428 1.4 11 11 0 010-15.4 1 1 0 111.428 1.4 9 9 0 00-2.572 6.3z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> <path fill="currentColor" fill-rule="evenodd" d="M12.285 11.714a4 4 0 001.143 2.8 1 1 0 01-1.428 1.4 6 6 0 010-8.4 1 1 0 111.428 1.4 4 4 0 00-1.143 2.8z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-chip" data-astro-cid-nlow4r3u></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 219" class="card-logo" data-astro-cid-nlow4r3u> <path fill="#fff" fill-rule="evenodd" d="M7.84 28.668a15.058 15.058 0 00-7.79 11.94c-.028-.381-.045-.765-.05-1.15v48.546c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l9.028 2.956-14.39 7.854a15.06 15.06 0 00-7.79 11.939c-.029-.381-.045-.765-.05-1.15v48.547c.007-.316.024-.63.05-.943a19.172 19.172 0 0013.153 16.797l79.84 26.145a38.174 38.174 0 0025.098 0l79.84-26.145a19.172 19.172 0 0013.152-16.797c.027.313.044.627.051.943v-48.547c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94l-14.391-7.853 9.028-2.956A19.172 19.172 0 00200.95 87.06c.027.313.044.627.051.943V39.458c-.005.385-.021.769-.05 1.15a15.06 15.06 0 00-7.79-11.94L115.426 2.412a38.174 38.174 0 00-25.098 0L7.839 28.668h.001z" clip-rule="evenodd" data-astro-cid-nlow4r3u></path> </svg> <div class="card-number" data-astro-cid-nlow4r3u> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>••••</span> <span data-astro-cid-nlow4r3u>4242</span> </div> </div> </div> </div> </div> </div> <!-- Title text area --> <div class="hero-text" data-astro-cid-nlow4r3u> <h1 class="hero-title" data-astro-cid-nlow4r3u>AI-Powered Interactive UI</h1> <h2 class="hero-subtitle" data-astro-cid-nlow4r3u>Transform AI responses into intuitive interfaces</h2> <p class="hero-description" data-astro-cid-nlow4r3u>
Bridge AI and human interaction with beautiful, responsive components. 
          Turn complex AI outputs into engaging visualizations and dynamic forms 
          that users naturally understand.
</p> <button id="getStartedBtn" class="cta-button" data-astro-cid-nlow4r3u>
Get Started
</button> </div> </div> </div> </header> ${renderScript($$result, "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/components/HeroSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>A2UI - AI-Powered Interactive UI</title><!-- EdgeOne 原始资源（只加载 CSS） -->${renderComponent($$result, "EvervaultHead", $$EvervaultHead, {})}${renderHead()}</head> <body> <!-- 原始导航栏 --> ${renderComponent($$result, "OriginalHeader", $$OriginalHeader, {})} <!-- Hero Section --> ${renderComponent($$result, "HeroSection", $$HeroSection, {})} </body></html>`;
}, "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/pages/index.astro", void 0);

const $$file = "/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/a2ui-template/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
