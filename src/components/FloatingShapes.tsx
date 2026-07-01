import { useEffect, useRef } from "react";

export function FloatingShapes({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let shapes: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      type: "circle" | "square" | "triangle";
    }> = [];
    
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initShapes();
      }
    };

    const initShapes = () => {
      shapes = [];
      const shapeCount = Math.floor((width * height) / 100000); // Significantly fewer shapes
      const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 15 + 10, // 10px to 25px
          speedX: (Math.random() - 0.5) * 0.4, // slightly slower too for fewer distractions
          speedY: (Math.random() - 0.5) * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.15 + 0.05,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      shapes.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.rotation += s.rotationSpeed;

        if (s.x < -s.size) s.x = width + s.size;
        if (s.x > width + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = height + s.size;
        if (s.y > height + s.size) s.y = -s.size;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        
        // Use neon green color to match theme, but low opacity
        ctx.fillStyle = `rgba(0, 255, 128, ${s.opacity})`;
        ctx.strokeStyle = `rgba(0, 255, 128, ${s.opacity * 1.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        if (s.type === "circle") {
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
        } else if (s.type === "square") {
          ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else if (s.type === "triangle") {
          ctx.moveTo(0, -s.size / 2);
          ctx.lineTo(s.size / 2, s.size / 2);
          ctx.lineTo(-s.size / 2, s.size / 2);
          ctx.closePath();
        }

        // Randomly fill or stroke
        if (s.opacity > 0.12) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
        
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    resize();
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
