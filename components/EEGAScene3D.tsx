'use client';

import { useEffect } from 'react';

export default function EEGAScene3D() {
  useEffect(() => {
    const scene = document.querySelector('.iso-scene') as HTMLElement;
    let mouseX = 0,
      mouseY = 0,
      currentX = 0,
      currentY = 0;
    let rafId: number;

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 8;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;
      if (scene) {
        const floatY = -Math.sin(Date.now() * 0.001) * 22;
        scene.style.transform = `translateY(${floatY}px) rotateX(${2 + currentY * 0.3}deg) rotateZ(${currentX * 0.15}deg)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouse);
    animate();
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hero-right">
      <div className="scene-wrap">
        <div className="scene-glow" />
        <div className="scene-glow-2" />
        <div className="radar-rings">
          <div className="ring" />
          <div className="ring" />
          <div className="ring" />
          <div className="ring" />
        </div>
        <div className="iso-scene">
          <svg
            className="scene-svg"
            viewBox="60 50 460 400"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            <defs>
              <filter
                id="redGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="redGlowStrong"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="cyanGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="lightGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient
                id="platformGrad"
                cx="50%"
                cy="30%"
                r="70%"
              >
                <stop offset="0%" stopColor="#2a1a1a" />
                <stop offset="100%" stopColor="#0d0d0d" />
              </radialGradient>
              <radialGradient id="globeGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#1a3a1a" />
                <stop offset="60%" stopColor="#0a1a0a" />
                <stop offset="100%" stopColor="#050d05" />
              </radialGradient>
              <linearGradient
                id="pillarGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3a1a0a" />
                <stop offset="100%" stopColor="#1a0a05" />
              </linearGradient>
              <linearGradient
                id="neonFlow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FF2D2D" />
                <stop offset="50%" stopColor="#FF6B2D" />
                <stop offset="100%" stopColor="#FF2D2D" />
              </linearGradient>
            </defs>

            {/* PLATFORM BASE */}
            <ellipse
              cx="290"
              cy="460"
              rx="220"
              ry="35"
              fill="rgba(0,0,0,0.5)"
              filter="url(#redGlow)"
            />
            <polygon
              points="190,400 390,400 390,450 190,450"
              fill="#0a0808"
            />
            <polygon
              points="110,390 190,390 190,450 110,450"
              fill="#090707"
            />
            <polygon
              points="390,390 470,390 470,450 390,450"
              fill="#090707"
            />
            <polygon
              points="230,420 350,420 350,465 230,465"
              fill="#080606"
            />
            <polygon
              points="180,310 390,310 415,360 165,360"
              fill="url(#platformGrad)"
            />
            <polygon
              points="100,330 190,310 165,360 75,380"
              fill="#1a1010"
            />
            <polygon
              points="390,310 490,330 465,380 415,360"
              fill="#161010"
            />
            <polygon
              points="165,360 415,360 390,400 190,400"
              fill="#120d0d"
            />
            <polygon
              points="100,290 190,270 190,310 100,330"
              fill="#1e1212"
            />
            <polygon
              points="390,270 490,290 490,330 390,310"
              fill="#1a1010"
            />
            <polyline
              points="100,330 180,310 390,310 490,330"
              stroke="#FF2D2D"
              strokeWidth="2.5"
              fill="none"
              opacity=".8"
              filter="url(#redGlow)"
            />
            <line
              x1="100"
              y1="330"
              x2="75"
              y2="380"
              stroke="#FF2D2D"
              strokeWidth="1.5"
              opacity=".5"
            />
            <line
              x1="490"
              y1="330"
              x2="465"
              y2="380"
              stroke="#FF2D2D"
              strokeWidth="1.5"
              opacity=".5"
            />
            <line
              x1="200"
              y1="315"
              x2="200"
              y2="360"
              stroke="#FF2D2D"
              strokeWidth=".5"
              opacity=".2"
            />
            <line
              x1="240"
              y1="313"
              x2="240"
              y2="360"
              stroke="#FF2D2D"
              strokeWidth=".5"
              opacity=".2"
            />
            <line
              x1="280"
              y1="311"
              x2="280"
              y2="360"
              stroke="#FF2D2D"
              strokeWidth=".5"
              opacity=".2"
            />
            <line
              x1="320"
              y1="311"
              x2="320"
              y2="360"
              stroke="#FF2D2D"
              strokeWidth=".5"
              opacity=".2"
            />
            <line
              x1="360"
              y1="312"
              x2="360"
              y2="360"
              stroke="#FF2D2D"
              strokeWidth=".5"
              opacity=".2"
            />
            <line
              x1="150"
              y1="340"
              x2="420"
              y2="340"
              stroke="#FF2D2D"
              strokeWidth=".5"
              opacity=".2"
            />

            {/* NEON TUBES */}
            <path
              d="M115,340 L115,310 L190,295 L290,290"
              stroke="url(#neonFlow)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="neon-tube"
              filter="url(#redGlow)"
            />
            <path
              d="M465,340 L465,310 L390,295 L290,290"
              stroke="url(#neonFlow)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="neon-tube-2"
              filter="url(#redGlow)"
            />
            <line
              x1="180"
              y1="335"
              x2="290"
              y2="330"
              stroke="#FF4444"
              strokeWidth="2"
              className="data-line"
              opacity=".6"
            />
            <line
              x1="390"
              y1="335"
              x2="290"
              y2="330"
              stroke="#FF4444"
              strokeWidth="2"
              className="data-line"
              opacity=".6"
            />
            <circle
              cx="115"
              cy="340"
              r="5"
              fill="#FF6B2D"
              filter="url(#redGlow)"
            />
            <circle
              cx="465"
              cy="340"
              r="5"
              fill="#FF6B2D"
              filter="url(#redGlow)"
            />
            <circle
              cx="290"
              cy="290"
              r="6"
              fill="#FF2D2D"
              filter="url(#redGlowStrong)"
            />

            {/* PILLARS */}
            <rect
              x="100"
              y="270"
              width="30"
              height="70"
              rx="2"
              fill="url(#pillarGrad)"
            />
            <rect
              x="95"
              y="265"
              width="40"
              height="12"
              rx="1"
              fill="#2a1a0a"
            />
            <rect
              x="108"
              y="255"
              width="14"
              height="30"
              rx="3"
              fill="#111"
              stroke="#333"
              strokeWidth="1"
            />
            <rect
              x="110"
              y="258"
              width="10"
              height="22"
              rx="2"
              fill="rgba(255,255,255,0.9)"
              className="light-beam"
              filter="url(#lightGlow)"
            />
            <rect
              x="450"
              y="270"
              width="30"
              height="70"
              rx="2"
              fill="url(#pillarGrad)"
            />
            <rect
              x="445"
              y="265"
              width="40"
              height="12"
              rx="1"
              fill="#2a1a0a"
            />
            <rect
              x="458"
              y="255"
              width="14"
              height="30"
              rx="3"
              fill="#111"
              stroke="#333"
              strokeWidth="1"
            />
            <rect
              x="460"
              y="258"
              width="10"
              height="22"
              rx="2"
              fill="rgba(255,255,255,0.9)"
              className="light-beam"
              filter="url(#lightGlow)"
              style={{ animationDelay: '.5s' }}
            />
            <rect
              x="220"
              y="390"
              width="28"
              height="55"
              rx="2"
              fill="url(#pillarGrad)"
            />
            <rect
              x="215"
              y="385"
              width="38"
              height="10"
              rx="1"
              fill="#2a1a0a"
            />
            <rect
              x="226"
              y="374"
              width="13"
              height="28"
              rx="3"
              fill="#111"
              stroke="#333"
              strokeWidth="1"
            />
            <rect
              x="228"
              y="376"
              width="9"
              height="20"
              rx="2"
              fill="rgba(255,255,255,0.85)"
              className="light-beam"
              filter="url(#lightGlow)"
              style={{ animationDelay: '1s' }}
            />

            {/* CENTER PILLAR */}
            <ellipse
              cx="290"
              cy="365"
              rx="40"
              ry="15"
              fill="#1a1010"
              stroke="#FF2D2D"
              strokeWidth="1"
              opacity=".6"
            />
            <rect
              x="274"
              y="200"
              width="32"
              height="165"
              rx="4"
              fill="url(#pillarGrad)"
            />
            <ellipse
              cx="290"
              cy="250"
              rx="16"
              ry="5"
              fill="none"
              stroke="#FF4444"
              strokeWidth="2"
              opacity=".5"
            />
            <ellipse
              cx="290"
              cy="300"
              rx="16"
              ry="5"
              fill="none"
              stroke="#FF4444"
              strokeWidth="2"
              opacity=".5"
            />
            <ellipse
              cx="290"
              cy="350"
              rx="20"
              ry="7"
              fill="#2a1212"
              stroke="#FF2D2D"
              strokeWidth="1.5"
              opacity=".7"
            />
            <line
              x1="282"
              y1="205"
              x2="282"
              y2="360"
              stroke="rgba(255,150,100,.15)"
              strokeWidth="4"
            />

            {/* GLOBE */}
            <ellipse
              cx="290"
              cy="145"
              rx="75"
              ry="25"
              fill="none"
              stroke="#C87820"
              strokeWidth="3"
              opacity=".8"
            />
            <circle
              cx="290"
              cy="145"
              r="62"
              fill="url(#globeGrad)"
              stroke="#1a3a1a"
              strokeWidth="1"
            />
            <ellipse
              cx="290"
              cy="145"
              rx="62"
              ry="25"
              fill="none"
              stroke="#00AA00"
              strokeWidth=".8"
              opacity=".4"
            />
            <ellipse
              cx="290"
              cy="145"
              rx="62"
              ry="45"
              fill="none"
              stroke="#00AA00"
              strokeWidth=".8"
              opacity=".3"
            />
            <line
              x1="228"
              y1="145"
              x2="352"
              y2="145"
              stroke="#00AA00"
              strokeWidth=".8"
              opacity=".4"
            />
            <line
              x1="248"
              y1="100"
              x2="248"
              y2="190"
              stroke="#00AA00"
              strokeWidth=".8"
              opacity=".3"
            />
            <line
              x1="290"
              y1="83"
              x2="290"
              y2="207"
              stroke="#00AA00"
              strokeWidth=".8"
              opacity=".4"
            />
            <line
              x1="332"
              y1="100"
              x2="332"
              y2="190"
              stroke="#00AA00"
              strokeWidth=".8"
              opacity=".3"
            />
            <circle
              cx="290"
              cy="145"
              r="62"
              fill="none"
              stroke="#00FF44"
              strokeWidth=".5"
              opacity=".2"
            />
            <ellipse
              cx="270"
              cy="135"
              rx="22"
              ry="15"
              fill="#003300"
              opacity=".7"
            />
            <ellipse
              cx="315"
              cy="155"
              rx="18"
              ry="12"
              fill="#003300"
              opacity=".6"
            />
            <ellipse
              cx="265"
              cy="162"
              rx="12"
              ry="8"
              fill="#003300"
              opacity=".5"
            />
            <path
              d="M235,145 L245,145 L250,125 L255,165 L260,135 L265,145 L270,145 L275,130 L280,158 L285,145 L345,145"
              stroke="#00FF44"
              strokeWidth="2"
              fill="none"
              className="heartbeat-line"
              filter="url(#cyanGlow)"
            />
            <line
              x1="305"
              y1="100"
              x2="305"
              y2="118"
              stroke="#FF2D2D"
              strokeWidth="2"
            />
            <circle
              cx="305"
              cy="98"
              r="5"
              fill="#FF2D2D"
              filter="url(#redGlow)"
            />
            <ellipse
              cx="290"
              cy="145"
              rx="85"
              ry="28"
              fill="none"
              stroke="#C87820"
              strokeWidth="2.5"
              opacity=".6"
              transform="rotate(-20,290,145)"
            />
            <circle
              cx="370"
              cy="132"
              r="6"
              fill="#C87820"
              filter="url(#redGlow)"
            />
            <circle cx="215" cy="163" r="4" fill="#C87820" opacity=".7" />
            <ellipse
              cx="268"
              cy="118"
              rx="18"
              ry="12"
              fill="rgba(255,255,255,0.06)"
              transform="rotate(-20,268,118)"
            />
            <text
              x="262"
              y="180"
              fontFamily="DM Sans, sans-serif"
              fontSize="8"
              fill="#00FF44"
              opacity=".7"
              letterSpacing="1"
            >
              SCANNING...
            </text>

            {/* GEAR */}
            <g className="gear">
              <circle
                cx="430"
                cy="225"
                r="28"
                fill="#1a1010"
                stroke="#3a2010"
                strokeWidth="2"
              />
              <circle
                cx="430"
                cy="225"
                r="18"
                fill="#120d0d"
                stroke="#FF4400"
                strokeWidth="1"
                opacity=".5"
              />
              <circle cx="430" cy="225" r="8" fill="#0a0808" />
              <rect x="426" y="192" width="8" height="12" rx="1" fill="#2a1a0a" />
              <rect x="426" y="249" width="8" height="12" rx="1" fill="#2a1a0a" />
              <rect x="397" y="221" width="12" height="8" rx="1" fill="#2a1a0a" />
              <rect x="451" y="221" width="12" height="8" rx="1" fill="#2a1a0a" />
              <rect
                x="406"
                y="200"
                width="10"
                height="8"
                rx="1"
                fill="#2a1a0a"
                transform="rotate(45,411,204)"
              />
              <rect
                x="444"
                y="200"
                width="10"
                height="8"
                rx="1"
                fill="#2a1a0a"
                transform="rotate(-45,449,204)"
              />
              <rect
                x="406"
                y="240"
                width="10"
                height="8"
                rx="1"
                fill="#2a1a0a"
                transform="rotate(-45,411,244)"
              />
              <rect
                x="444"
                y="240"
                width="10"
                height="8"
                rx="1"
                fill="#2a1a0a"
                transform="rotate(45,449,244)"
              />
              <line
                x1="370"
                y1="225"
                x2="402"
                y2="225"
                stroke="#3a2010"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="458"
                y1="225"
                x2="490"
                y2="225"
                stroke="#3a2010"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>

            {/* MEDICAL CROSS */}
            <g className="med-cross">
              <rect
                x="238"
                y="285"
                width="34"
                height="80"
                rx="3"
                fill="#CC0000"
              />
              <rect
                x="213"
                y="310"
                width="84"
                height="34"
                rx="3"
                fill="#CC0000"
              />
              <rect
                x="240"
                y="287"
                width="30"
                height="76"
                rx="2"
                fill="#FF2D2D"
                opacity=".6"
              />
              <rect
                x="215"
                y="312"
                width="80"
                height="30"
                rx="2"
                fill="#FF2D2D"
                opacity=".6"
              />
              <rect
                x="242"
                y="289"
                width="10"
                height="72"
                rx="2"
                fill="rgba(255,120,120,.3)"
              />
            </g>

            {/* ICON CARDS */}
            <g className="icon-card-group icon-card-1">
              <rect
                x="145"
                y="335"
                width="60"
                height="55"
                rx="4"
                fill="#1a0f0f"
                stroke="#FF2D2D"
                strokeWidth="1.5"
                opacity=".8"
              />
              <rect
                x="147"
                y="337"
                width="56"
                height="51"
                rx="3"
                fill="url(#platformGrad)"
                opacity=".6"
              />
              <rect
                x="158"
                y="348"
                width="34"
                height="24"
                rx="4"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="162"
                y1="360"
                x2="184"
                y2="360"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="162"
                y1="365"
                x2="178"
                y2="365"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <polygon points="162,380 170,372 178,372" fill="#FF4444" />
            </g>
            <g className="icon-card-group icon-card-2">
              <rect
                x="213"
                y="340"
                width="60"
                height="55"
                rx="4"
                fill="#1a0f0f"
                stroke="#FF2D2D"
                strokeWidth="1.5"
                opacity=".8"
              />
              <rect
                x="215"
                y="342"
                width="56"
                height="51"
                rx="3"
                fill="url(#platformGrad)"
                opacity=".6"
              />
              <rect
                x="225"
                y="354"
                width="38"
                height="22"
                rx="3"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <rect
                x="225"
                y="354"
                width="12"
                height="22"
                rx="2"
                fill="#FF2D2D"
                opacity=".4"
              />
              <line
                x1="231"
                y1="361"
                x2="231"
                y2="369"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="228"
                y1="365"
                x2="234"
                y2="365"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <circle
                cx="232"
                cy="380"
                r="5"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <circle
                cx="251"
                cy="380"
                r="5"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
            </g>
            <g className="icon-card-group icon-card-3">
              <rect
                x="281"
                y="343"
                width="60"
                height="55"
                rx="4"
                fill="#1a0f0f"
                stroke="#FF2D2D"
                strokeWidth="1.5"
                opacity=".8"
              />
              <rect
                x="283"
                y="345"
                width="56"
                height="51"
                rx="3"
                fill="url(#platformGrad)"
                opacity=".6"
              />
              <circle
                cx="311"
                cy="356"
                r="7"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="311"
                y1="363"
                x2="311"
                y2="382"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="300"
                y1="370"
                x2="322"
                y2="370"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="311"
                y1="382"
                x2="303"
                y2="393"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="311"
                y1="382"
                x2="319"
                y2="393"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
            </g>
            <g className="icon-card-group icon-card-4">
              <rect
                x="349"
                y="346"
                width="60"
                height="55"
                rx="4"
                fill="#1a0f0f"
                stroke="#FF2D2D"
                strokeWidth="1.5"
                opacity=".8"
              />
              <rect
                x="351"
                y="348"
                width="56"
                height="51"
                rx="3"
                fill="url(#platformGrad)"
                opacity=".6"
              />
              <rect
                x="370"
                y="360"
                width="18"
                height="28"
                rx="4"
                fill="none"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <line
                x1="379"
                y1="355"
                x2="379"
                y2="360"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
              <path
                d="M379,355 Q395,345 400,360"
                stroke="#FF4444"
                strokeWidth="1.5"
                fill="none"
              />
              <line
                x1="373"
                y1="368"
                x2="385"
                y2="368"
                stroke="#FF4444"
                strokeWidth="1.5"
              />
            </g>

            {/* PARTICLES */}
            <circle
              className="particle"
              cx="150"
              cy="290"
              r="4"
              fill="#FF4444"
              filter="url(#redGlow)"
              opacity=".7"
            />
            <circle
              className="particle"
              cx="440"
              cy="280"
              r="3"
              fill="#FF6600"
              filter="url(#redGlow)"
              opacity=".6"
            />
            <circle
              className="particle"
              cx="200"
              cy="250"
              r="2.5"
              fill="#FF2D2D"
              filter="url(#redGlow)"
              opacity=".5"
            />
            <circle
              className="particle"
              cx="390"
              cy="260"
              r="3.5"
              fill="#FF8844"
              filter="url(#redGlow)"
              opacity=".6"
            />
            <circle cx="170" cy="210" r="2" fill="#FF2D2D" opacity=".4" />
            <circle cx="420" cy="190" r="1.5" fill="#FF4400" opacity=".5" />
            <circle cx="240" cy="180" r="1.5" fill="#FF2D2D" opacity=".3" />

            {/* CONNECTING WIRES */}
            <path
              d="M290,207 L290,270 L175,340"
              stroke="#FF4444"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 3"
              opacity=".3"
              className="data-line"
            />
            <path
              d="M290,207 L290,270 L243,343"
              stroke="#FF4444"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 3"
              opacity=".3"
              className="data-line"
            />
            <path
              d="M290,207 L311,330"
              stroke="#FF4444"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 3"
              opacity=".3"
              className="data-line"
            />
            <path
              d="M290,207 L379,330"
              stroke="#FF4444"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 3"
              opacity=".3"
              className="data-line"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
