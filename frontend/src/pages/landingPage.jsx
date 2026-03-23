import "./landingPage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Hero slides
const heroSlides = [
  {
    title: "MICROFABSTORE",
    subtitle: "Reliable Semiconductors · Delivered Fast",
    image: "/hero-bg1.jpg",
  },
  {
    title: "Premium ICs & Components",
    subtitle: "High-Quality Parts for Your Projects",
    image: "/hero-bg2.jpg",
  },
  {
    title: "Fast Global Shipping",
    subtitle: "Get Components Wherever You Are",
    image: "/hero-bg3.jpg",
  },
];

// Features
const features = [
  {
    icon: "🔌",
    title: "Wide Range of Semiconductors",
    desc: "Find ICs, transistors, diodes, and sensors – all with detailed specs and documentation.",
  },
  {
    icon: "⚡",
    title: "Engineered For Quality",
    desc: "Source parts from trusted suppliers. All products include datasheets and certifications.",
  },
  {
    icon: "💡",
    title: "Easy Ordering & Fast Shipping",
    desc: "Real-time inventory, secure checkout, and fast global shipment to keep projects on track.",
  },
];

// Sample products
const sampleProducts = [
  {
    name: "LM358 Operational Amplifier",
    desc: "Dual-package op-amp for signal conditioning and filter applications.",
    image:
      "https://assets.nexperia.com/image/upload/w_200/v1574169550/assets/images/product/LM358.png",
  },
  {
    name: "IRF540N Power MOSFET",
    desc: "100V, 33A N-channel. Great for motor drivers and high-speed switching.",
    image: "https://www.infineon.com/cms/_images/products/IRF540N_1.png",
  },
  {
    name: "ATmega328P Microcontroller",
    desc: "Leading 8-bit AVR MCU for embedded projects and rapid prototyping.",
    image: "https://cdn.sparkfun.com//assets/parts/1/1/1/8/11888-01.jpg",
  },
];

export default function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="landing-page">
      {/* Background */}
      <div className="hero-background">
        <Navbar />

        {/* === HERO SECTION === */}
        <section className="hero">
          <Slider {...sliderSettings}>
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className="hero-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                 <Link to="/categories" className="cta-button">
          Shop Now
        </Link>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* === FEATURES SECTION === */}
        <section className="features-section">
          <div className="section-divider"></div>
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* === FEATURED PRODUCTS === */}
        <section className="products-wrapper">
          <div className="section-divider"></div>
          <h2 className="section-title">Featured Products</h2>
          <div className="product-list">
            {sampleProducts.map((product, index) => (
              <div className="product-card" key={index}>
                <img
  src={product.image}
  alt={product.name}
  className="product-image"
  onError={(e) => {
    e.target.src = '/placeholder.jpg'; // fallback image
  }}
/>

                <div className="product-name">{product.name}</div>
                <div className="product-desc">{product.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* === CALL TO ACTION === */}
        <section className="cta">
          <div className="section-divider"></div>
          <h2 className="cta-title">Ready to build your next project?</h2>
          <p className="cta-text">
            Sign up to access thousands of parts, specs, and guides!
          </p>
          <Link to="/register" className="cta-button">
            Create Account
          </Link>
        </section>

        {/* === FOOTER === */}
        <footer className="footer">
          &copy; {new Date().getFullYear()} MicroFabStore. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
