import React, { useState, useEffect, useRef } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaStore,
  FaGlobe,
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
  FaHeadphones,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaBoxOpen,
} from "react-icons/fa";
import styles from "./LandingPage.module.css";

// ─── Product Categories ──────────────────────────────────────
const categories = [
  {
    name: "Brand New Phones",
    icon: <FaMobileAlt />,
    desc: "Latest models with full warranty",
  },
  {
    name: "UK Used Phones",
    icon: <FaGlobe />,
    desc: "Premium quality, excellent condition",
  },
  {
    name: "Nigeria Used Phones",
    icon: <FaStore />,
    desc: "Affordable & reliable",
  },
  {
    name: "Accessories",
    icon: <FaHeadphones />,
    desc: "Chargers, cases, screen protectors",
  },
];

// ─── Featured Products ──────────────────────────────────────
const featuredProducts = [
  {
    name: "iPhone 15 Pro Max",
    price: "₦1,200,000",
    tag: "New",
    image:
      "https://sellatease.com/public-blog/wp-content/uploads/2023/09/Apple-iPhone-15-Pro-lineup-natural-titanium-geo_inline.jpg.large_-653x470.webp",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: "₦1,100,000",
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
  },
  {
    name: "iPhone 13 Pro (UK Used)",
    price: "₦650,000",
    tag: "UK Used",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=300&fit=crop",
  },
  {
    name: "Tecno Camon 20 (Nigeria Used)",
    price: "₦280,000",
    tag: "Nigeria Used",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
  },
];

// ─── Trade / Swap Services ──────────────────────────────────
const tradeServices = [
  {
    icon: <FaExchangeAlt />,
    title: "Trade‑In",
    desc: "Swap your old phone for a new one – get the best value instantly.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Sell Used Phones",
    desc: "Turn your used device into cash. Fair prices, quick payment.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Sell Brand New Phones",
    desc: "We buy sealed, unused phones – even if you just changed your mind.",
  },
];

// ─── Main Component ──────────────────────────────────────────
const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved || "dark";
    }
    return "dark";
  });
  const navbarRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme handler – now with logging
  useEffect(() => {
    console.log("Theme changed to:", theme);
    if (theme === "light") {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
      console.log("✅ light-theme class added to body");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
      console.log("✅ light-theme class removed from body");
    }
  }, [theme]);

  // Close nav on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        isNavOpen
      ) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isNavOpen]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      `.${styles.sectionReveal}`,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition =
        "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Parallax orb effect
  useEffect(() => {
    const orbs = document.querySelectorAll(`.${styles.glowOrb}`);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbs.forEach((orb, i) => {
        const speed = 0.02 + i * 0.01;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);
  const toggleTheme = () => {
    console.log("🔄 Toggle clicked, current theme:", theme);
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      console.log("🔄 Setting theme to:", newTheme);
      return newTheme;
    });
  };

  const phoneNumber = "08032835371";
  const mapLink = "https://maps.app.goo.gl/mM4ffw5RXScfbaLEA?g_st=ic";
  const instagramLink =
    "https://www.instagram.com/c_to_c_global?igsh=eTk0MHZjYTJvcnRw&utm_source=qr";
  const tiktokLink =
    "https://www.tiktok.com/@c.to.c.gadgets.an?_r=1&_t=ZS-97gC00jtFRt";
  const whatsappLink = `https://wa.me/2348032835371`;

  return (
    <div className={styles.pageWrapper}>
      {/* Glow Orbs */}
      <div className={`${styles.glowOrb} ${styles.glowOrb1}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb2}`}></div>

      {/* ─── Navbar ─── */}
      <nav
        ref={navbarRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <a href="#" className={styles.navbarBrand}>
            <img
              className={styles.footerLogo}
              src="/cLogo.PNG"
              alt="Global Phones Logo"
            />
            <span className={styles.brandName}>Global Phones</span>
          </a>

          <ul
            className={`${styles.navbarLinks} ${isNavOpen ? styles.navbarLinksOpen : ""}`}
          >
            <li>
              <a href="#products" onClick={closeNav}>
                Products
              </a>
            </li>
            <li>
              <a href="#trade" onClick={closeNav}>
                Swap & Trade
              </a>
            </li>
            <li>
              <a href="#about" onClick={closeNav}>
                About
              </a>
            </li>
            <li>
              <a href="#location" onClick={closeNav}>
                Location
              </a>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.themeToggle} ${theme === "light" ? styles.themeToggleLight : ""}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className={styles.toggleTrack}>
                  <FaSun />
                  <FaMoon />
                </span>
                <span className={styles.toggleThumb}></span>
              </button>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navbarCta}
                onClick={closeNav}
              >
                <FaWhatsapp /> Contact Us
              </a>
            </li>
          </ul>

          <button
            className={styles.navbarHamburger}
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.pulseDot}></span>
                Since 2010 – Trusted Phone Vendor • Trade‑in Available
              </div>
              <h1 className={styles.heroTitle}>
                <span className={styles.highlight}>Global</span> Phones
                <br />& Accessories
              </h1>
              <p className={styles.heroDesc}>
                Your one‑stop shop for <strong>brand new</strong>,{" "}
                <strong>UK used</strong>, and <strong>Nigeria used</strong>{" "}
                phones. Quality guaranteed.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  <FaWhatsapp /> Inquire Now
                </a>
                <a
                  href="#products"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Browse Phones →
                </a>
              </div>
              <div className={styles.heroStats}>
                <div>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Happy Customers</span>
                </div>
                <div>
                  <span className={styles.statNumber}>4.8★</span>
                  <span className={styles.statLabel}>Google Rating</span>
                </div>
                <div>
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>Years Experience</span>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualOrb}></div>
              <div className={styles.heroFloatingCards}>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <FaMobileAlt />
                  </span>
                  <span className={styles.floatingText}>iPhone 15 Pro</span>
                </div>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <FaStore />
                  </span>
                  <span className={styles.floatingText}>UK Used Stock</span>
                </div>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <FaGlobe />
                  </span>
                  <span className={styles.floatingText}>Nigeria Used</span>
                </div>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <FaExchangeAlt />
                  </span>
                  <span className={styles.floatingText}>Trade‑in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Products / Categories ─── */}
      <section
        className={`${styles.productsSection} ${styles.sectionReveal}`}
        id="products"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>📱 Our Range</span>
            <h2 className={styles.sectionTitle}>Phones for Every Need</h2>
            <p className={styles.sectionSub}>
              From flagship to budget, we have it all.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((cat, idx) => (
              <div key={idx} className={styles.categoryCard}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.featuredGrid}>
            {featuredProducts.map((prod, idx) => (
              <div key={idx} className={styles.featuredCard}>
                <img src={prod.image} alt={prod.name} loading="lazy" />
                <span className={styles.productTag}>{prod.tag}</span>
                <h4>{prod.name}</h4>
                {/* <span className={styles.productPrice}>{prod.price}</span> */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.productCta}
                >
                  <FaWhatsapp /> Enquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Swap & Trade ─── */}
      <section
        className={`${styles.tradeSection} ${styles.sectionReveal}`}
        id="trade"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>🔄 Swap & Trade</span>
            <h2 className={styles.sectionTitle}>Upgrade or Sell with Ease</h2>
            <p className={styles.sectionSub}>
              Turn your old device into cash or a brand new phone – we make it
              simple.
            </p>
          </div>

          <div className={styles.tradeGrid}>
            {tradeServices.map((service, idx) => (
              <div key={idx} className={styles.tradeCard}>
                <span className={styles.tradeIcon}>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.tradeCta}
                >
                  <FaWhatsapp /> Inquire Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section
        className={`${styles.aboutSection} ${styles.sectionReveal}`}
        id="about"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>🌟 Why Us</span>
            <h2 className={styles.sectionTitle}>Your Trusted Phone Partner</h2>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <FaShieldAlt className={styles.featureIcon} />
              <h3>100% Authentic</h3>
              <p>All phones verified and tested before sale.</p>
            </div>
            <div className={styles.featureCard}>
              <FaCheckCircle className={styles.featureIcon} />
              <h3>Warranty Included</h3>
              <p>Peace of mind with our warranty on all devices.</p>
            </div>
            <div className={styles.featureCard}>
              <FaClock className={styles.featureIcon} />
              <h3>Fast Service</h3>
              <p>Quick response and same‑day pickup available.</p>
            </div>
            <div className={styles.featureCard}>
              <FaStar className={styles.featureIcon} />
              <h3>Top Ratings</h3>
              <p>Rated 4.8★ by our happy customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Location & Contact ─── */}
      <section
        className={`${styles.locationSection} ${styles.sectionReveal}`}
        id="location"
      >
        <div className={styles.container}>
          <div className={styles.locationGrid}>
            <div className={styles.locationInfo}>
              <span className={styles.sectionTag}>📍 Visit Us</span>
              <h2>Find Our Showroom</h2>
              <p className={styles.address}>
                Suite FC8, Old Banex Plaza
                <br />
                Wuse 2, Abuja
              </p>
              <div className={styles.contactDetails}>
                <a href={`tel:${phoneNumber}`} className={styles.phoneLink}>
                  <FaPhoneAlt /> {phoneNumber}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappLink}
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  <FaMapMarkerAlt /> Open in Maps
                </a>
              </div>
              <div className={styles.socialLinks}>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
            <div className={styles.locationMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.999!2d7.489!3d9.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOScwNCczMy42Ik4gN8cyOSczMi4wIkU!5e0!3m2!1sen!2sng!4v1700000000000"
                allowFullScreen=""
                loading="lazy"
                title="Global Phones Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className={`${styles.ctaSection} ${styles.sectionReveal}`}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2>Ready to Upgrade?</h2>
            <p>Get the best deals on new and used phones. Contact us today.</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              <FaWhatsapp /> Message Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <img
                className={styles.footerLogo}
                src="/cLogo.PNG"
                alt="Global Phones Logo"
              />
              <span>Global Phones & Accessories</span>
            </div>
            <div className={styles.footerCopy}>
              &copy; 2026 Global Phones — Abuja's Trusted Phone Store
            </div>
            <div className={styles.footerSocials}>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={tiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
