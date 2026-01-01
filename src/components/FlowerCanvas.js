"use client";

import { useEffect, useRef } from "react";

/**
 * Componente FlowerCanvas
 * Dibuja flores animadas y pétalos que caen en un canvas
 * Inspirado en FlowerJS y animaciones de sakura
 */
export default function FlowerCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let petals = [];
    let flowers = [];

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Colores dorados y cálidos para Año Nuevo
    const colors = [
      "#FFD700", // Gold
      "#FFA500", // Orange
      "#F4C430", // Saffron
      "#DAA520", // Goldenrod
      "#FFDF00", // Golden Yellow
      "#FFB347", // Pastel Orange
      "#FFC87C", // Topaz
    ];

    // Clase Pétalo
    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.swingAmplitude = Math.random() * 2;
        this.swingSpeed = Math.random() * 0.02;
        this.swingOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * this.swingSpeed + this.swingOffset) * this.swingAmplitude * 0.1;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // Dibujar pétalo (forma de gota/elipse)
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
          this.size * 0.5, -this.size * 0.5,
          this.size * 0.5, this.size * 0.5,
          0, this.size
        );
        ctx.bezierCurveTo(
          -this.size * 0.5, this.size * 0.5,
          -this.size * 0.5, -this.size * 0.5,
          0, -this.size
        );
        ctx.fill();

        // Brillo sutil
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.arc(-this.size * 0.2, -this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Clase Flor
    class Flower {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.petalCount = Math.floor(Math.random() * 3) + 5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.4 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.drift = {
          x: (Math.random() - 0.5) * 0.2,
          y: Math.random() * 0.3 + 0.1
        };
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.x += this.drift.x;
        this.y += this.drift.y;

        // Reset si sale de pantalla
        if (this.y > canvas.height + 50) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        const pulse = 1 + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.1;
        const currentSize = this.size * pulse;

        // Dibujar pétalos
        for (let i = 0; i < this.petalCount; i++) {
          const angle = (i / this.petalCount) * Math.PI * 2;
          ctx.save();
          ctx.rotate(angle);

          // Pétalo
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(
            currentSize * 0.3, -currentSize * 0.5,
            currentSize, -currentSize * 0.3,
            currentSize, 0
          );
          ctx.bezierCurveTo(
            currentSize, currentSize * 0.3,
            currentSize * 0.3, currentSize * 0.5,
            0, 0
          );
          ctx.fill();

          ctx.restore();
        }

        // Centro de la flor
        ctx.beginPath();
        ctx.fillStyle = "#FFF8DC";
        ctx.arc(0, 0, currentSize * 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Brillo del centro
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 215, 0, 0.6)";
        ctx.arc(0, 0, currentSize * 0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Clase Estrella brillante
    class Sparkle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.8 + 0.2;
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        this.fadeIn = true;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this.fadeIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) {
            this.fadeIn = false;
          }
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) {
            this.reset();
            this.fadeIn = true;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        // Dibujar estrella de 4 puntas
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x + this.size * 0.3, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x + this.size * 0.3, this.y);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x - this.size * 0.3, this.y);
        ctx.lineTo(this.x - this.size, this.y);
        ctx.lineTo(this.x - this.size * 0.3, this.y);
        ctx.closePath();
        ctx.fill();

        // Brillo central
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Inicializar elementos
    const petalCount = 25;
    const flowerCount = 8;
    const sparkleCount = 30;

    for (let i = 0; i < petalCount; i++) {
      const petal = new Petal();
      petal.y = Math.random() * canvas.height; // Distribuir inicialmente
      petals.push(petal);
    }

    for (let i = 0; i < flowerCount; i++) {
      flowers.push(new Flower(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(new Sparkle());
    }

    // Loop de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar y actualizar sparkles
      sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
      });

      // Dibujar y actualizar flores
      flowers.forEach(flower => {
        flower.update();
        flower.draw();
      });

      // Dibujar y actualizar pétalos
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
