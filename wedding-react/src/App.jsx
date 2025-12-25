import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
  useAnimationFrame,
  useVelocity,
} from "framer-motion";
import "./styles/App.css";

// Photo Album Component with react-pageflip
const PhotoAlbum = () => {
  const book = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const weddingPhotos = [
    "/ảnh cưới/601402193_2331650270688118_5593697914528431237_n.jpg",
    "/ảnh cưới/601540165_2331650114021467_3966945044394946107_n.jpg",
    "/ảnh cưới/602373546_2331649940688151_5394101395903565589_n.jpg",
    "/ảnh cưới/602381395_2331650044021474_7958066473772867462_n.jpg",
    "/ảnh cưới/603741457_2331650290688116_2837945452041285079_n.jpg",
    "/ảnh cưới/603807655_2331650147354797_3534243951619987625_n.jpg",
    "/ảnh cưới/603858026_2331650164021462_5962000780130545971_n.jpg",
    "/ảnh cưới/605085668_2331649770688168_3294770530591460475_n.jpg",
    "/ảnh cưới/605230712_2331650187354793_2021941315531105741_n.jpg",
    "/ảnh cưới/605529303_2331649730688172_4347167537855835081_n.jpg",
  ];

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <section id="wedding-gallery" className="section wedding-section">
      <motion.div
        className="wedding-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.span className="wedding-label" variants={fadeInUp}>
          ✨ Khoảnh Khắc Thiêng Liêng ✨
        </motion.span>
        <motion.h2 className="wedding-title" variants={scaleIn}>
          Album Ảnh Cưới
        </motion.h2>
        <motion.p className="wedding-subtitle" variants={fadeInUp}>
          Click hoặc kéo để lật trang
        </motion.p>
      </motion.div>

      <motion.div
        className="album-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <HTMLFlipBook
          ref={book}
          width={isMobile ? 300 : 380}
          height={isMobile ? 400 : 520}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={600}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="album-book"
          style={{ margin: "0 auto" }}
          flippingTime={1000}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
          maxShadowOpacity={0.5}
        >
          {/* Cover */}
          <div className="album-page-content cover-page">
            <div className="cover-content">
              <div className="cover-ornament">❀</div>
              <h3>Wedding Album</h3>
              <p className="cover-names">Đạt & Liên</p>
              <p className="cover-date">03 . 01 . 2026</p>
              <div className="cover-ornament">❀</div>
            </div>
          </div>

          {/* Photo pages */}
          {weddingPhotos.map((photo, index) => (
            <div key={index} className="album-page-content photo-page">
              <img src={photo} alt={`Ảnh cưới ${index + 1}`} />
            </div>
          ))}

          {/* Back cover */}
          <div className="album-page-content cover-page back-cover">
            <div className="cover-content">
              <p className="end-text">The End</p>
              <p className="end-heart">💕</p>
              <p className="end-message">
                Cảm ơn bạn đã xem album của chúng tôi
              </p>
            </div>
          </div>
        </HTMLFlipBook>

        <div className="album-controls">
          <button onClick={() => book.current.pageFlip().flipPrev()}>
            ❮ Trang trước
          </button>
          <span className="page-indicator">
            {currentPage + 1} / {weddingPhotos.length + 2}
          </span>
          <button onClick={() => book.current.pageFlip().flipNext()}>
            Trang sau ❯
          </button>
        </div>
      </motion.div>
    </section>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Looking Glass Component
const LookingGlass = ({ photos }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth spring animation for the mask position and size
  const springConfig = { damping: 25, stiffness: 150 };
  const maskX = useSpring(mouseX, springConfig);
  const maskY = useSpring(mouseY, springConfig);
  const maskRadius = useSpring(0, springConfig);

  useEffect(() => {
    // On mobile, show mask by default or larger touch area?
    // Kept hover logic for now, but ensure radius fits
    maskRadius.set(isHovered ? (isMobile ? 150 : 200) : 0);
  }, [isHovered, maskRadius, isMobile]);

  // Create the mask image string
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskRadius}px at ${maskX}px ${maskY}px, black 60%, transparent 100%)`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Touch support for mobile
  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - left);
    mouseY.set(e.touches[0].clientY - top);
  };

  return (
    <div
      className="looking-glass-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "90vw" : "400px",
        height: isMobile ? "60vh" : "550px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "var(--shadow-medium)",
        cursor: isHovered ? "none" : "default",
      }}
    >
      {/* Background Layer - Blurry & Grayscale */}
      <img
        src={photos[0]}
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(2px) grayscale(0.6)", // Reduced blur slightly for better visibility
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          transition: "filter 0.5s ease",
        }}
      />

      {/* Foreground Layer - Sharp & Color with Mask */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          WebkitMaskImage: maskImage, // For Safari
          maskImage: maskImage,
        }}
      >
        <img
          src={photos[1] || photos[0]}
          alt="Focus"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.1)",
          }}
        />
      </motion.div>
    </div>
  );
};

// Timeline Chapter Component with Framer Motion
const Chapter = ({ number, title, date, quote, children }) => (
  <motion.div
    className="chapter"
    initial="hidden"
    whileInView="visible"
    // viewport={{ once: true, margin: "-100px" }} // Disabled "once" to replay animations
    viewport={{ margin: "-100px" }}
    variants={staggerContainer}
  >
    <motion.div className="chapter-header" variants={fadeInUp}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <p className="chapter-date">{date}</p>
      <p className="chapter-quote">"{quote}"</p>
    </motion.div>
    <motion.div variants={scaleIn}>{children}</motion.div>
  </motion.div>
);

// Photo Stack Component with stagger animation
const PhotoStack = ({ photos }) => (
  <motion.div
    className="photo-stack"
    data-count={photos.length}
    variants={staggerContainer}
  >
    {photos.map((photo, idx) => (
      <motion.div
        key={idx}
        className="stacked-photo"
        style={{ "--i": idx }}
        variants={{
          hidden: { opacity: 0, scale: 0.5, rotate: idx === 0 ? -15 : 15 },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: idx === 0 ? -5 : 5,
            transition: { duration: 0.5, delay: idx * 0.1 },
          },
        }}
        whileHover={{ scale: 1.05, zIndex: 100 }}
      >
        <img src={photo} alt="Đạt & Liên" loading="lazy" />
      </motion.div>
    ))}
  </motion.div>
);

// Photo Duo Component with slide animations
const PhotoDuo = ({ photos }) => (
  <motion.div className="photo-duo" variants={staggerContainer}>
    <motion.div
      className="duo-photo left"
      variants={slideFromLeft}
      whileHover={{ scale: 1.05, rotate: 0 }}
    >
      <img src={photos[0]} alt="Đạt & Liên" loading="lazy" />
    </motion.div>
    <motion.div
      className="duo-photo right"
      variants={slideFromRight}
      whileHover={{ scale: 1.05, rotate: 0 }}
    >
      <img src={photos[1]} alt="Đạt & Liên" loading="lazy" />
    </motion.div>
  </motion.div>
);

// Parallax Portal Component for Chapter 2
const ParallaxPortal = ({ photos }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      style={{
        height: isMobile ? "400px" : "550px", // Shorter container on mobile
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.4 }}
    >
      {/* Moving Photo: Left */}
      <motion.div
        variants={{
          hidden: { x: "-150%", rotate: -15, opacity: 1 },
          visible: {
            x: "0%",
            rotate: 0,
            opacity: 0,
            transition: {
              x: { duration: 1.2, ease: "easeInOut" },
              rotate: { duration: 1.2 },
              opacity: { delay: 1.1, duration: 0.1 },
            },
          },
        }}
        style={{
          position: "absolute",
          width: isMobile ? "40vw" : "280px", // Responsive width
          height: "auto",
          zIndex: 1,
          boxShadow: "var(--shadow-medium)",
          border: "8px solid white",
          borderRadius: "12px",
        }}
      >
        <img
          src={photos[0]}
          alt="Left Side"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "4px",
          }}
        />
      </motion.div>

      {/* Moving Photo: Right */}
      <motion.div
        variants={{
          hidden: { x: "150%", rotate: 15, opacity: 1 },
          visible: {
            x: "0%",
            rotate: 0,
            opacity: 0,
            transition: {
              x: { duration: 1.2, ease: "easeInOut" },
              rotate: { duration: 1.2 },
              opacity: { delay: 1.1, duration: 0.1 },
            },
          },
        }}
        style={{
          position: "absolute",
          width: isMobile ? "40vw" : "280px", // Responsive width
          height: "auto",
          zIndex: 1,
          boxShadow: "var(--shadow-medium)",
          border: "8px solid white",
          borderRadius: "12px",
        }}
      >
        <img
          src={photos[1]}
          alt="Right Side"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "4px",
          }}
        />
      </motion.div>

      {/* Burst Effect Layer */}
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: isMobile ? 1.5 : 2.5, // Smaller burst on mobile
            opacity: [0, 1, 0],
            transition: { delay: 1.1, duration: 0.8, ease: "easeOut" },
          },
        }}
        style={{
          position: "absolute",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: isMobile ? "3rem" : "5rem",
            position: "absolute",
            top: isMobile ? -50 : -80,
            left: isMobile ? -50 : -80,
          }}
        >
          💖
        </div>
        <div
          style={{
            fontSize: isMobile ? "2rem" : "4rem",
            position: "absolute",
            top: isMobile ? -60 : -100,
            left: isMobile ? 40 : 60,
          }}
        >
          ✨
        </div>
        <div
          style={{
            fontSize: isMobile ? "3rem" : "5rem",
            position: "absolute",
            top: isMobile ? 50 : 80,
            left: isMobile ? -40 : -60,
          }}
        >
          💕
        </div>
        <div
          style={{
            fontSize: isMobile ? "2rem" : "4rem",
            position: "absolute",
            top: isMobile ? 40 : 60,
            left: isMobile ? 50 : 80,
          }}
        >
          🌸
        </div>
        <div
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            position: "absolute",
            top: isMobile ? -80 : -120,
            left: 0,
          }}
        >
          💗
        </div>
        <div
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            position: "absolute",
            top: isMobile ? 80 : 120,
            left: 0,
          }}
        >
          💝
        </div>
      </motion.div>

      {/* Merged Giant Heart */}
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 1.0,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          },
        }}
        style={{
          position: "absolute",
          zIndex: 2,
          width: isMobile ? "90vw" : "600px", // Responsive heart size
          height: isMobile ? "90vw" : "600px",
          filter: "drop-shadow(0 10px 30px rgba(255, 105, 180, 0.6))",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <mask id="heartMaskGiant">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="white"
              />
            </mask>
          </defs>
          <foreignObject
            x="0"
            y="0"
            width="24"
            height="24"
            mask="url(#heartMaskGiant)"
          >
            <div style={{ width: "100%", height: "100%", display: "flex" }}>
              <img
                src={photos[0]}
                style={{
                  width: "50%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "9% 50%", // Tinh chỉnh vị trí ảnh trái (X% Y%)
                }}
                alt="Left Half"
              />
              <img
                src={photos[1]}
                style={{
                  width: "50%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "88% 50%", // Tinh chỉnh vị trí ảnh phải (X% Y%)
                }}
                alt="Right Half"
              />
            </div>
          </foreignObject>
        </svg>
      </motion.div>
    </motion.div>
  );
};

// Story Pop-Up Component for Chapter 5 - Open Book Effect
const StoryPopUp = ({ photos }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const decorItems = [
    { emoji: "🌸", x: -50, y: -65 },
    { emoji: "💕", x: 50, y: -65 },
    { emoji: "✨", x: 0, y: -75 },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: isMobile ? "70vh" : "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "20px 10px" : "40px 20px",
        perspective: "1500px",
      }}
    >
      {/* Book Container */}
      <motion.div
        initial={{ rotateX: 0, scale: 0.9, opacity: 0 }}
        animate={isInView ? { rotateX: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left Page - Starts closed (facing center), opens outward */}
        <motion.div
          initial={{ rotateY: 80, opacity: 0 }}
          animate={
            isInView ? { rotateY: 0, opacity: 1 } : { rotateY: 80, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            width: isMobile ? "42vw" : "300px",
            height: isMobile ? "55vw" : "400px",
            background: "linear-gradient(135deg, #fefefe 0%, #f8f4ef 100%)",
            borderRadius: "4px 0 0 4px",
            boxShadow:
              "-8px 8px 20px rgba(0,0,0,0.15), inset -2px 0 8px rgba(0,0,0,0.05)",
            padding: isMobile ? "8px" : "12px",
            paddingRight: isMobile ? "12px" : "18px",
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "3px",
              overflow: "hidden",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={photos[0]}
              alt="Left Page"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>

        {/* Book Spine */}
        <div
          style={{
            width: isMobile ? "8px" : "12px",
            height: isMobile ? "55vw" : "400px",
            background:
              "linear-gradient(90deg, #d4c4b0 0%, #e8ddd0 50%, #d4c4b0 100%)",
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        />

        {/* Right Page - Starts closed (facing center), opens outward */}
        <motion.div
          initial={{ rotateY: -80, opacity: 0 }}
          animate={
            isInView ? { rotateY: 0, opacity: 1 } : { rotateY: -80, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            width: isMobile ? "42vw" : "300px",
            height: isMobile ? "55vw" : "400px",
            background: "linear-gradient(225deg, #fefefe 0%, #f8f4ef 100%)",
            borderRadius: "0 4px 4px 0",
            boxShadow:
              "8px 8px 20px rgba(0,0,0,0.15), inset 2px 0 8px rgba(0,0,0,0.05)",
            padding: isMobile ? "8px" : "12px",
            paddingLeft: isMobile ? "12px" : "18px",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "3px",
              overflow: "hidden",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={photos[1]}
              alt="Right Page"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>

        {/* Decorative elements */}
        {decorItems.map((item, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.8 + i * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
              x: `calc(${item.x}% - 50%)`,
              y: item.y,
              fontSize: isMobile ? "1.5rem" : "2rem",
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.2))",
              zIndex: 20,
            }}
          >
            <motion.span
              animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              style={{ display: "inline-block" }}
            >
              {item.emoji}
            </motion.span>
          </motion.span>
        ))}

        {/* Bottom shadow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            position: "absolute",
            bottom: isMobile ? "-15px" : "-20px",
            left: "50%",
            x: "-50%",
            width: isMobile ? "80vw" : "550px",
            height: "15px",
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)",
            zIndex: -1,
          }}
        />
      </motion.div>
    </div>
  );
};

// Love Orbit Component for Chapter 6 - Enhanced 3D Version
const LoveOrbit = ({ photos }) => {
  const [isHovered, setIsHovered] = useState(false);
  const angle = useMotionValue(0);

  // Animation Loop
  useAnimationFrame((time, delta) => {
    if (!isHovered) {
      const newAngle = angle.get() + (delta / 10000) * (Math.PI * 2);
      angle.set(newAngle);
    }
  });

  // 3D orbit calculations with perspective
  const orbitRadiusX = 200;
  const orbitRadiusY = 80;

  // Satellite 1 transforms with 3D depth
  const x1 = useTransform(angle, (a) => Math.cos(a) * orbitRadiusX);
  const y1 = useTransform(angle, (a) => Math.sin(a) * orbitRadiusY);
  const scale1 = useTransform(angle, (a) => 0.7 + (Math.sin(a) + 1) * 0.25);
  const zIndex1 = useTransform(angle, (a) => (Math.sin(a) > 0 ? 20 : 5));
  const opacity1 = useTransform(angle, (a) => 0.6 + (Math.sin(a) + 1) * 0.2);
  const blur1 = useTransform(angle, (a) => (Math.sin(a) < -0.5 ? 2 : 0));
  const rotateY1 = useTransform(angle, (a) => Math.cos(a) * 15);

  // Satellite 2 transforms (opposite side)
  const x2 = useTransform(angle, (a) => Math.cos(a + Math.PI) * orbitRadiusX);
  const y2 = useTransform(angle, (a) => Math.sin(a + Math.PI) * orbitRadiusY);
  const scale2 = useTransform(
    angle,
    (a) => 0.7 + (Math.sin(a + Math.PI) + 1) * 0.25
  );
  const zIndex2 = useTransform(angle, (a) =>
    Math.sin(a + Math.PI) > 0 ? 20 : 5
  );
  const opacity2 = useTransform(
    angle,
    (a) => 0.6 + (Math.sin(a + Math.PI) + 1) * 0.2
  );
  const blur2 = useTransform(angle, (a) =>
    Math.sin(a + Math.PI) < -0.5 ? 2 : 0
  );
  const rotateY2 = useTransform(angle, (a) => Math.cos(a + Math.PI) * 15);

  // Floating hearts animation
  const floatingHearts = ["💕", "💗", "✨", "💖", "🌸", "💝"];

  return (
    <div
      style={{
        height: "650px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1000px",
        perspectiveOrigin: "center center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Orbit ring glow effect */}
      <motion.div
        style={{
          position: "absolute",
          width: orbitRadiusX * 2 + 100,
          height: orbitRadiusY * 2 + 40,
          border: "2px dashed rgba(255, 105, 180, 0.3)",
          borderRadius: "50%",
          transform: "rotateX(60deg)",
        }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(255, 105, 180, 0.2)",
            "0 0 40px rgba(255, 105, 180, 0.4)",
            "0 0 20px rgba(255, 105, 180, 0.2)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating hearts background */}
      {floatingHearts.map((heart, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            fontSize: `${1.2 + Math.random() * 1.5}rem`,
            pointerEvents: "none",
            zIndex: 1,
          }}
          initial={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 300,
            opacity: 0,
          }}
          animate={{
            y: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300 - 100],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          {heart}
        </motion.span>
      ))}

      {/* Central Sun Photo with glow */}
      <motion.div
        style={{
          position: "absolute",
          zIndex: 10,
          borderRadius: "16px",
          border: "5px solid #fff",
          maxWidth: "min(280px, 55vw)",
          maxHeight: "420px",
          transformStyle: "preserve-3d",
        }}
        animate={{
          boxShadow: [
            "0 0 30px rgba(255, 105, 180, 0.5), 0 20px 40px rgba(0, 0, 0, 0.2)",
            "0 0 50px rgba(255, 105, 180, 0.7), 0 25px 50px rgba(0, 0, 0, 0.25)",
            "0 0 30px rgba(255, 105, 180, 0.5), 0 20px 40px rgba(0, 0, 0, 0.2)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
        whileHover={{ scale: 1.1, zIndex: 30 }}
      >
        <img
          src={photos[0]}
          alt="Main"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: "11px",
            objectFit: "cover",
          }}
        />
      </motion.div>

      {/* Satellite 1 with 3D transforms */}
      <motion.div
        style={{
          position: "absolute",
          x: x1,
          y: y1,
          scale: scale1,
          zIndex: zIndex1,
          opacity: opacity1,
          rotateY: rotateY1,
          borderRadius: "12px",
          border: "4px solid #fff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#fff",
          maxWidth: "min(180px, 40vw)",
          maxHeight: "270px",
          transformStyle: "preserve-3d",
          filter: useMotionTemplate`blur(${blur1}px)`,
        }}
        whileHover={{ scale: 1.4, zIndex: 30, filter: "blur(0px)" }}
      >
        <img
          src={photos[1]}
          alt="Satellite 1"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </motion.div>

      {/* Satellite 2 with 3D transforms */}
      <motion.div
        style={{
          position: "absolute",
          x: x2,
          y: y2,
          scale: scale2,
          zIndex: zIndex2,
          opacity: opacity2,
          rotateY: rotateY2,
          borderRadius: "12px",
          border: "4px solid #fff",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#fff",
          maxWidth: "min(180px, 40vw)",
          maxHeight: "270px",
          transformStyle: "preserve-3d",
          filter: useMotionTemplate`blur(${blur2}px)`,
        }}
        whileHover={{ scale: 1.4, zIndex: 30, filter: "blur(0px)" }}
      >
        <img
          src={photos[2] || photos[1]}
          alt="Satellite 2"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </motion.div>
    </div>
  );
};

// Flying Memories Component for Chapter 7
const FlyingMemories = ({ photos }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Wind effect
  const windForce = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-50, 0, 50] // Reduced wind force slightly for stability
  );
  const windForceReverse = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [50, 0, -50]
  );

  // Responsive Configurations
  const configs = isMobile
    ? [
        // Mobile: Vertical Zigzag Stack (Larger relative size)
        { top: "2%", left: "5%", width: "65vw", delay: 0 },
        { top: "25%", right: "5%", width: "60vw", delay: 1 },
        { top: "50%", left: "5%", width: "65vw", delay: 0.5 },
        { top: "75%", right: "5%", width: "60vw", delay: 1.5 },
      ]
    : [
        // Desktop: Scattered (Larger pixel size)
        { top: "5%", left: "10%", width: "28vw", maxWidth: "450px", delay: 0 },
        {
          top: "10%",
          right: "12%",
          width: "24vw",
          maxWidth: "400px",
          delay: 1,
        },
        {
          top: "55%",
          left: "15%",
          width: "26vw",
          maxWidth: "420px",
          delay: 0.5,
        },
        {
          top: "60%",
          right: "15%",
          width: "22vw",
          maxWidth: "350px",
          delay: 1.5,
        },
      ];

  return (
    <div
      style={{
        height: isMobile ? "900px" : "800px", // Taller on mobile for stacking
        position: "relative",
        overflow: "visible",
      }}
    >
      {photos.slice(0, 4).map((photo, i) => {
        const config = configs[i] || configs[0];
        const x = i % 2 === 0 ? windForce : windForceReverse;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            dragElastic={0.2}
            style={{
              position: "absolute",
              top: config.top,
              left: config.left,
              right: config.right,
              width: config.width,
              maxWidth: config.maxWidth || "none",
              height: "auto",
              x: x,
              zIndex: 10 + i,
              cursor: "grab",
            }}
            whileDrag={{ cursor: "grabbing", scale: 1.1, zIndex: 100 }}
            animate={{
              y: [0, -15, 0], // Gentle float
              rotate: [0, i % 2 === 0 ? 2 : -2, 0],
            }}
            transition={{
              y: {
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: config.delay,
              },
              rotate: {
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <img
              src={photo}
              alt={`Flying Memory ${i + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "var(--shadow-medium)",
                border: "4px solid white",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Draggable Polaroid with Framer Motion
const DraggablePolaroid = ({ photo, rotation, caption, corkboardRef }) => {
  return (
    <motion.div
      className="polaroid"
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
      }}
      initial={{ rotate: rotation }}
      style={{
        rotate: rotation,
      }}
    >
      <img src={photo} alt="Đạt & Liên" loading="lazy" draggable={false} />
      <p className="polaroid-caption">{caption}</p>
    </motion.div>
  );
};

// Polaroid Corkboard Component
const PolaroidCorkboard = ({ photos }) => {
  const corkboardRef = useRef(null);
  const rotations = [
    "-8deg",
    "5deg",
    "-4deg",
    "7deg",
    "-6deg",
    "3deg",
    "-5deg",
    "6deg",
    "-3deg",
    "4deg",
  ];
  const captions = [
    "💕 Kỷ niệm 1 năm",
    "✨ Yêu thương",
    "🌸 Bên nhau",
    "💖 Hạnh phúc",
    "🦋 Mãi bên nhau",
    "💗 Ngọt ngào",
    "🌺 Tình yêu",
    "💝 Khoảnh khắc",
    "🌷 Đẹp đôi",
    "💞 Trọn đời",
  ];

  return (
    <div className="corkboard" ref={corkboardRef}>
      {photos.map((photo, idx) => (
        <DraggablePolaroid
          key={idx}
          photo={photo}
          rotation={rotations[idx]}
          caption={captions[idx]}
          corkboardRef={corkboardRef}
        />
      ))}
    </div>
  );
};

// Photo Scatter Component with spring animation
const PhotoScatter = ({ photos }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const positions = isMobile
    ? [
        { x: -30, y: -20, r: -5 },
        { x: 30, y: -20, r: 5 },
        { x: 0, y: 30, r: -2 },
      ]
    : [
        { x: -60, y: -20, r: -5 },
        { x: 60, y: -40, r: 5 },
        { x: 0, y: 50, r: -2 },
      ];

  const hoverPositions = isMobile
    ? [
        { x: 0, y: -140, r: 0 }, // Mobile: Top
        { x: 0, y: 140, r: 0 }, // Mobile: Bottom
        { x: 0, y: 0, r: 0 }, // Mobile: Center
      ]
    : [
        { x: -280, y: 0, r: 0 },
        { x: 280, y: 0, r: 0 },
        { x: 0, y: 0, r: 0 }, // Center photo
      ];

  return (
    <motion.div
      className="photo-scatter"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
    >
      {photos.map((photo, idx) => (
        <motion.div
          key={idx}
          className="scatter-photo"
          variants={{
            hidden: { opacity: 0, x: 0, y: 100, rotate: 0 },
            visible: {
              opacity: 1,
              x: positions[idx]?.x || 0,
              y: positions[idx]?.y || 0,
              rotate: positions[idx]?.r || 0,
              zIndex: idx === 2 ? 10 : 1, // Start with center photo on top if needed
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: idx * 0.15,
              },
            },
            hover: {
              x: hoverPositions[idx]?.x || 0,
              y: hoverPositions[idx]?.y || 0,
              rotate: 0,
              scale: 1.1,
              zIndex: 10,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
              },
            },
          }}
        >
          <img src={photo} alt="Đạt & Liên" loading="lazy" />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Photo Overlap Component with slide animation
const PhotoOverlap = ({ photos }) => (
  <motion.div className="photo-overlap" variants={staggerContainer}>
    <motion.div
      className="overlap-photo back"
      variants={{
        hidden: { opacity: 0, x: -50, rotate: -15 },
        visible: {
          opacity: 1,
          x: 0,
          rotate: -8,
          transition: { duration: 0.6 },
        },
      }}
      whileHover={{ scale: 1.05, zIndex: 5 }}
    >
      <img src={photos[0]} alt="Đạt & Liên" loading="lazy" />
    </motion.div>
    <motion.div
      className="overlap-photo front"
      variants={{
        hidden: { opacity: 0, x: 50, rotate: 15 },
        visible: {
          opacity: 1,
          x: 0,
          rotate: 5,
          transition: { duration: 0.6, delay: 0.2 },
        },
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <img src={photos[1]} alt="Đạt & Liên" loading="lazy" />
    </motion.div>
  </motion.div>
);

// Photo Fan Component with fan-out animation
const PhotoFan = ({ photos }) => {
  const fanAngles = [-15, 0, 15];

  return (
    <motion.div
      className="photo-fan"
      data-count={photos.length}
      variants={staggerContainer}
    >
      {photos.map((photo, idx) => (
        <motion.div
          key={idx}
          className="fan-photo"
          variants={{
            hidden: { opacity: 0, rotate: 0, y: 50 },
            visible: {
              opacity: 1,
              rotate: fanAngles[idx] || 0,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: idx * 0.1,
              },
            },
          }}
          whileHover={{ scale: 1.1, zIndex: 10, y: -20 }}
        >
          <img src={photo} alt="Đạt & Liên" loading="lazy" />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Photo Grid Component with stagger fade
const PhotoGrid = ({ photos }) => (
  <motion.div className="photo-grid-2x2" variants={staggerContainer}>
    {photos.map((photo, idx) => (
      <motion.div
        key={idx}
        className="grid-photo"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, delay: idx * 0.1 },
          },
        }}
        whileHover={{ scale: 1.05, zIndex: 5 }}
      >
        <img src={photo} alt="Đạt & Liên" loading="lazy" />
      </motion.div>
    ))}
  </motion.div>
);

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Countdown state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const weddingDate = new Date("2026-01-03T10:00:00");

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    // Auto-play music on first user interaction
    let played = false;

    const tryPlayMusic = async () => {
      if (played || !audioRef.current) return;

      try {
        await audioRef.current.play();
        played = true;
        setMusicPlaying(true);
        // Remove all listeners after successful play
        window.removeEventListener("scroll", tryPlayMusic);
        window.removeEventListener("click", tryPlayMusic);
        window.removeEventListener("touchstart", tryPlayMusic);
      } catch {
        // Silently ignore - will retry on next interaction
      }
    };

    window.addEventListener("scroll", tryPlayMusic, { passive: true });
    window.addEventListener("click", tryPlayMusic);
    window.addEventListener("touchstart", tryPlayMusic, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", tryPlayMusic);
      window.removeEventListener("click", tryPlayMusic);
      window.removeEventListener("touchstart", tryPlayMusic);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  // Photo data - paths must start with / for Vite public folder
  const chapter1Photos = [
    "/07-03-2023/480911344_2073965559789925_3452099769950847233_n.jpg",
    "/07-03-2023/481049847_2073965589789922_5866173013647316570_n.jpg",
  ];
  const chapter2Photos = [
    "/16-06-2023/481234757_2078548795998268_425754638656672977_n.jpg",
    "/16-06-2023/481478708_2078548975998250_4747658087357038674_n.jpg",
  ];
  const chapter3Photos = [
    "/30-05-2024/483662855_2087578345095313_7764061897654624010_n.jpg",
    "/30-05-2024/483744332_2087578548428626_7117031975629020460_n.jpg",
    "/30-05-2024/483877325_2087578658428615_1771209327777097844_n.jpg",
    "/30-05-2024/483897651_2087578718428609_8309969756911892970_n.jpg",
    "/30-05-2024/483959712_2087578801761934_6811008237813688295_n.jpg",
    "/30-05-2024/484045719_2087578388428642_4072639942117871812_n.jpg",
    "/30-05-2024/484076674_2087578688428612_4525682905185609947_n.jpg",
    "/30-05-2024/484120636_2087578585095289_9014245657571260620_n.jpg",
    "/30-05-2024/484498613_2087578591761955_5204981347272975782_n.jpg",
    "/30-05-2024/484909032_2087578641761950_8777737788823345956_n.jpg",
  ];
  const chapter4Photos = [
    "/23-12-2024/490177581_2115318188987995_4031137639155878720_n.jpg",
    "/23-12-2024/490318651_2115318078988006_1871272923969380536_n.jpg",
    "/23-12-2024/490637016_2115318108988003_2656352681179911448_n.jpg",
  ];
  const chapter5Photos = [
    "/12-05-2025/496122685_2139401473246333_2769459755772310235_n.jpg",
    "/12-05-2025/496684340_2139401713246309_3316416326408011543_n.jpg",
  ];
  const chapter6Photos = [
    "/17-10-2025/561657268_2274552126397933_6210759664882099494_n.jpg",
    "/17-10-2025/561817350_2274554656397680_6860696618232239030_n.jpg",
    "/17-10-2025/563606859_2274554639731015_3219767945613537979_n.jpg",
  ];
  const chapter7Photos = [
    "/15-12-2025/597874348_2325124948007317_478251592490053190_n.jpg",
    "/15-12-2025/598028130_2325124894673989_524279165618127103_n.jpg",
    "/15-12-2025/598169536_2325124861340659_3147064051963837246_n.jpg",
    "/15-12-2025/600217364_2325124844673994_2317955614536478118_n.jpg",
  ];

  return (
    <div className="wedding-app">
      {/* Particles */}
      <div id="particles"></div>

      {/* Audio */}
      <audio ref={audioRef} id="bg-music" loop>
        <source src="/music1.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle */}
      <button
        id="audio-toggle"
        className={`audio-btn ${musicPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
      >
        {musicPlaying ? "🎵" : "🔇"}
      </button>

      <main>
        {/* Hero Section */}
        {/* Hero Section */}
        <section id="hero" className="section hero">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p className="wedding-label" variants={fadeInUp}>
              We're Getting Married
            </motion.p>
            <motion.h1 className="hero-title" variants={scaleIn}>
              <span className="name groom">Tiến Đạt</span>
              <span className="ampersand">&</span>
              <span className="name bride">Nguyễn Liên</span>
            </motion.h1>
            <motion.div className="hero-date" variants={fadeInUp}>
              <span>03</span>
              <span className="separator">.</span>
              <span>01</span>
              <span className="separator">.</span>
              <span>2026</span>
            </motion.div>

            <motion.div className="countdown" variants={fadeInUp}>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">Ngày</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.hours}</span>
                <span className="countdown-label">Giờ</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.minutes}</span>
                <span className="countdown-label">Phút</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.seconds}</span>
                <span className="countdown-label">Giây</span>
              </div>
            </motion.div>

            <motion.div
              className="scroll-indicator"
              variants={fadeInUp}
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="mouse">
                <div className="mouse-wheel"></div>
              </div>
              <p>Cuộn xuống để khám phá</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Introduction */}
        <section id="intro" className="section intro">
          <motion.div
            className="intro-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.h2 className="section-title" variants={scaleIn}>
              Câu Chuyện Của Chúng Mình
            </motion.h2>
            <motion.p className="intro-text" variants={fadeInUp}>
              Có những cuộc gặp gỡ tưởng chừng như tình cờ,
            </motion.p>
            <motion.p className="intro-text" variants={fadeInUp}>
              nhưng lại là định mệnh đã được viết sẵn từ những vì sao...
            </motion.p>
            <motion.div className="decorative-hearts" variants={scaleIn}>
              💕
            </motion.div>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="section timeline-section">
          <Chapter
            number="01"
            title="Khởi Đầu Của Câu Chuyện"
            date="07 . 03 . 2023"
            quote="Trong hàng ngàn người qua lại, em là người duy nhất khiến trái tim anh dừng lại..."
          >
            <LookingGlass photos={chapter1Photos} />
          </Chapter>

          <Chapter
            number="02"
            title="Những Ngày Mùa Hè"
            date="16 . 06 . 2023"
            quote="Mùa hè năm ấy, nắng không còn chói chang vì đã có em che chở..."
          >
            <ParallaxPortal photos={chapter2Photos} />
          </Chapter>

          <Chapter
            number="03"
            title="Một Năm Bên Nhau"
            date="30 . 05 . 2024"
            quote="365 ngày trôi qua, nhưng mỗi ngày bên em đều như ngày đầu tiên..."
          >
            <PolaroidCorkboard photos={chapter3Photos} />
          </Chapter>

          <Chapter
            number="04"
            title="Giáng Sinh Ấm Áp"
            date="23 . 12 . 2024"
            quote="Món quà Giáng sinh đẹp nhất không nằm dưới cây thông, mà đang đứng cạnh anh..."
          >
            <PhotoScatter photos={chapter4Photos} />
          </Chapter>

          {/* Chapter 5 - No wrapper animation to test book opening */}
          <div className="chapter">
            <div className="chapter-header">
              <span className="chapter-number">05</span>
              <h2 className="chapter-title">Tình Yêu Lớn Dần</h2>
              <p className="chapter-date">12 . 05 . 2025</p>
              <p className="chapter-quote">
                "Tình yêu không cần phải hoàn hảo, chỉ cần có em là đủ..."
              </p>
            </div>
            <StoryPopUp photos={chapter5Photos} />
          </div>

          <Chapter
            number="06"
            title="Lời Hứa Trọn Đời"
            date="17 . 10 . 2025"
            quote="Anh không hứa cho em cả thế giới, nhưng anh hứa sẽ mang cả thế giới đến bên em..."
          >
            <LoveOrbit photos={chapter6Photos} />
          </Chapter>

          <Chapter
            number="07"
            title="Đếm Ngược Hạnh Phúc"
            date="15 . 12 . 2025"
            quote="Chỉ còn ít ngày nữa thôi, em sẽ chính thức là của anh mãi mãi..."
          >
            <FlyingMemories photos={chapter7Photos} />
          </Chapter>
        </section>

        {/* Photo Album */}
        <PhotoAlbum />

        {/* Wishes Section */}
        <section id="wishes" className="section wishes-section">
          <div className="wishes-container">
            <motion.div
              className="wishes-card"
              initial={{ opacity: 0, y: 100, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="wishes-decoration">
                <span>🌸</span>
                <span>💕</span>
                <span>🌸</span>
              </div>
              <h2 className="wishes-title">Lời Chúc Từ Anh Em Hảo Hán</h2>
              <div className="wishes-content">
                <p className="wishes-greeting">Gửi Đạt và Liên thân mến,</p>
                <p className="wishes-text">
                  Biết nhau từ hồi cấp 3, hôm nay thấy Đạt bước lên lễ đường,
                  anh em Hảo hán (VNUer) thật sự rất tự hào.
                </p>
                <p className="wishes-text">
                  Chúc mừng Đạt đã tìm được người phụ nữ tuyệt vời để cùng đi
                  hết chặng đường phía trước.
                </p>
                <p className="wishes-text">
                  Liên ơi, cảm ơn bạn đã yêu thương và đồng hành cùng thằng bạn
                  của anh em tôi.
                </p>
                <p className="wishes-text">
                  Chúc hai bạn trăm năm hạnh phúc, mãi yêu thương và sẻ chia
                  cùng nhau.
                </p>
                <p className="wishes-signature">
                  <span className="signature-name">Anh em Hảo hán (VNUer)</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Section */}
        <section id="final" className="section final-section">
          <motion.div
            className="final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="final-ring" variants={scaleIn}>
              <span className="ring-icon">💍</span>
            </motion.div>
            <motion.h2 className="final-title" variants={fadeInUp}>
              Chúc Mừng Hạnh Phúc
            </motion.h2>
            <motion.p className="final-names" variants={fadeInUp}>
              Tiến Đạt & Nguyễn Liên
            </motion.p>
            <motion.div className="final-date-box" variants={scaleIn}>
              <span>03</span>
              <span className="separator">•</span>
              <span>01</span>
              <span className="separator">•</span>
              <span>2026</span>
            </motion.div>
            <motion.p className="final-message" variants={fadeInUp}>
              Wishing you a lifetime of love and happiness
            </motion.p>
            <motion.div className="final-hearts" variants={scaleIn}>
              💕
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;
