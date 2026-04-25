const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    /* ── Nav ───────────────────────────────────────────── */
    const scrolled  = ref(false);
    const menuOpen  = ref(false);

    const navLinks = [
      { id: 'about',     label: 'About' },
      { id: 'products',  label: 'Products' },
      { id: 'markets',   label: 'Markets' },
      { id: 'strengths', label: 'Strengths' },
      { id: 'quality',   label: 'Quality' },
      { id: 'contact',   label: 'Contact' },
    ];

    function scrollTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    onMounted(() => {
      window.addEventListener('scroll', () => {
        scrolled.value = window.scrollY > 40;
      });
    });

    /* ── Hero Stats ────────────────────────────────────── */
    const stats = [
      { value: '5+',    label: 'Product Categories' },
      { value: '4+',    label: 'Export Regions' },
      { value: '100%',  label: 'Quality Checked' },
      { value: 'FOB/CIF', label: 'Shipment Terms' },
    ];

    /* ── Company Details ───────────────────────────────── */
    const companyDetails = [
      { label: 'Company Name',       value: 'PBG Global Exim' },
      { label: 'Proprietor',         value: 'Pradip Giri' },
      { label: 'Nature of Business', value: 'Exporter & Supplier' },
      { label: 'GST Number',         value: '27ABWPG5074H2Z6' },
      { label: 'Address',            value: 'E-402, Wisdom Park, Pimpri, Pune – 411018, India' },
      { label: 'Mobile',             value: '+91 7558260860' },
      { label: 'Email',              value: 'pbgglobalexim@gmail.com' },
    ];

    /* ── Products ──────────────────────────────────────── */
    const categories = ['All', 'Textiles', 'Herbal'];
    const activeCategory = ref('All');

    const products = [
      {
        name: 'Cotton T-Shirts',
        category: 'Textiles',
        icon: '👕',
        items: [
          'Round Neck Cotton T-Shirts',
          'Premium Round Neck T-Shirts',
          'Polo Cotton T-Shirts',
          'Oversized Cotton T-Shirts',
        ],
      },
      {
        name: 'Newborn Baby Garments',
        category: 'Textiles',
        icon: '🍼',
        items: [
          'Baby Rompers',
          'Bodysuits',
          'Baby Clothing Sets',
          'Nightwear',
          'Soft Cotton & Organic Options',
        ],
      },
      {
        name: 'Towels',
        category: 'Textiles',
        icon: '🛁',
        items: [
          'Bath Towels (Various GSM)',
          'Kitchen Towels',
          'Bulk Export Packing Available',
        ],
      },
      {
        name: 'Ashwagandha',
        category: 'Herbal',
        icon: '🌿',
        items: [
          'High-quality Dried Ashwagandha',
          'Powder / Raw Form Available',
          'Suitable for Herbal & Pharma Use',
        ],
      },
      {
        name: 'Moringa Powder',
        category: 'Herbal',
        icon: '🌱',
        items: [
          '100% Natural Moringa Powder',
          'Rich in Nutrients & Antioxidants',
          'Export-Grade Hygienic Packaging',
        ],
      },
    ];

    const filteredProducts = computed(() =>
      activeCategory.value === 'All'
        ? products
        : products.filter(p => p.category === activeCategory.value)
    );

    const allProducts = products.map(p => p.name);

    /* ── Export Markets ────────────────────────────────── */
    const exportMarkets = [
      { flag: '🇪🇺', region: 'Europe',          countries: 'Germany, France, Italy' },
      { flag: '🇺🇸', region: 'USA',              countries: 'United States of America' },
      { flag: '🇦🇪', region: 'UAE & Middle East', countries: 'UAE, Saudi Arabia, Qatar' },
      { flag: '🌍', region: 'Asia & Africa',     countries: 'Multiple emerging markets' },
    ];

    /* ── Strengths ─────────────────────────────────────── */
    const strengths = [
      { icon: '🏆', title: 'Premium Quality Sourcing',    desc: 'Carefully selected raw materials and finished goods meeting international standards.' },
      { icon: '💰', title: 'Competitive Global Pricing',  desc: 'Factory-direct relationships ensure the best value for buyers worldwide.' },
      { icon: '🎨', title: 'Customization Available',     desc: 'Size, GSM, packaging, and private labeling tailored to your brand.' },
      { icon: '🔗', title: 'Reliable Supply Chain',       desc: 'Established network of trusted manufacturers and logistics partners.' },
      { icon: '🚚', title: 'On-Time Delivery',            desc: 'Strict timelines and pre-shipment checks ensure punctual dispatch.' },
      { icon: '📦', title: 'Multi-Product Capability',    desc: 'One partner for Textiles, Garments, and Herbal products.' },
    ];

    /* ── Quality & Packaging ───────────────────────────── */
    const qualityPoints = [
      'Fabric & material inspection at source',
      'Hygienic processing for herbal products',
      'Export-compliant packaging standards',
      'Pre-shipment quality checks',
    ];

    const packagingPoints = [
      'Export-standard carton packaging',
      'Private labeling available',
      'FOB / CIF shipment support',
      'Secure and timely dispatch',
    ];

    /* ── Contact Info ──────────────────────────────────── */
    const contactInfo = [
      { icon: '📍', label: 'Address',  value: 'E-402, Wisdom Park, Pimpri, Pune – 411018', href: 'https://maps.google.com/?q=Pimpri,Pune,India' },
      { icon: '📞', label: 'Phone',    value: '+91 7558260860',          href: 'tel:+917558260860' },
      { icon: '✉️', label: 'Email',    value: 'pbgglobalexim@gmail.com', href: 'mailto:pbgglobalexim@gmail.com' },
    ];

    /* ── Contact Form ──────────────────────────────────── */
    const form     = ref({ name: '', email: '', product: '', message: '' });
    const formSent = ref(false);

    function submitForm() {
      const { name, email, product, message } = form.value;
      const subject = encodeURIComponent(`Inquiry from ${name}${product ? ' – ' + product : ''}`);
      const body    = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nProduct: ${product}\n\n${message}`
      );
      window.location.href = `mailto:pbgglobalexim@gmail.com?subject=${subject}&body=${body}`;
      formSent.value = true;
      form.value = { name: '', email: '', product: '', message: '' };
    }

    /* ── Footer ────────────────────────────────────────── */
    const currentYear = new Date().getFullYear();

    return {
      scrolled, menuOpen, navLinks, scrollTo,
      stats,
      companyDetails,
      categories, activeCategory, filteredProducts, allProducts,
      exportMarkets,
      strengths,
      qualityPoints, packagingPoints,
      contactInfo,
      form, formSent, submitForm,
      currentYear,
    };
  },
}).mount('#app');

