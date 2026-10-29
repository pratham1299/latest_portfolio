// All content sourced verbatim from the live portfolio (portfolio-teal-mu-22.vercel.app)
const ASSET_BASE = "https://portfolio-teal-mu-22.vercel.app/assets";

export const profile = {
  name: "Priyanshi Gupta",
  role: "Market Associate",
  email: "guptapriyanshi1503@gmail.com",
  phone: "7398498519",
  location: "Gurgaon, India",
  linkedin: "https://www.linkedin.com/in/priyanshi-gupta-157006202",
  summary:
    "Dynamic Marketing Intelligence Analyst with 1+ years in B2B lead generation, performance marketing, and business development. Expertise in cold outreach via Apollo/Smartlead, CRO audits, buyer persona, market research, ad optimization on Meta/Google, analytics, and attribution tracking to drive growth across startups and consultancies.",
};

// In her own words — motto, origin story, and working style, as she described
// them directly. Kept separate from `profile` (resume-sourced) so voice stays
// distinct from credentials.
export const personal = {
  motto: "I like turning ideas into things people actually notice, understand, and act on.",
  intro:
    "Marketing Associate at Track Opinion — I work across B2B lead gen, performance marketing, and brand building, always chasing the “why” behind what works, not just what ships.",
  journey: {
    heading: "My Journey",
    subtext: "From small-town Jhansi to a Delhi University stall — the accidental start of a marketing career.",
    paragraph:
      "I'm from Jhansi, a small town in UP — not exactly a marketing hub. In Delhi for college, I ended up running a campus stall selling hair braiding, almost by accident, and got hooked on figuring out why it worked. That's the honest, unglamorous start of everything I do now.",
    milestones: [
      { place: "Jhansi, UP", caption: "Small town, big curiosity" },
      { place: "Delhi University", caption: "An elective I almost skipped" },
      { place: "The Campus Stall", caption: "My very first real pitch" },
      { place: "First Internship", caption: "Turned curiosity into a job" },
    ],
    takeaway: "That stall is where marketing stopped being a subject — and started being mine.",
  },
  languages: ["English", "Hindi"],
  values:
    "I grew up valuing adaptability and different perspectives, and I care about using marketing and content to simplify complex ideas so people can actually connect with them.",
  workingStyle: {
    quote: "A mix of “let me understand it properly” and “let me figure out how we can make it better.”",
    traits: ["Curious by default", "Detail-oriented", "Obsessive note-taker", "Comfortable juggling many threads"],
  },
};

export const hero = {
  badge: "Market Associate",
  tagline: "A Marketing Generalist",
  heading: "Driving Brand Growth Through Strategic Content, LinkedIn Marketing, and Marketing Operations",
  intro: "Hi there, my name is",
  quote: "Helping brands grow through content, campaigns, and marketing operations.",
  paragraph:
    "I'm a results-oriented Market Associate — currently owning LinkedIn strategy, content, vendor and certification management, and event execution at Track Opinion, built on an earlier foundation of B2B outbound, CRO, and market intelligence.",
  ctaPrimary: { label: "VIEW MY WORK", href: "#projects" },
  ctaSecondary: { label: "GET IN TOUCH", href: "#contact" },
};

// Real skills, surfaced as floating badges around the hero portrait.
export const heroBadges = [
  { emoji: "📱", label: "LinkedIn Strategy" },
  { emoji: "📝", label: "Content Strategy" },
  { emoji: "🎯", label: "Event Management" },
  { emoji: "🔍", label: "Market Intelligence" },
  { emoji: "🤝", label: "Vendor & Certifications" },
  { emoji: "📊", label: "Performance Marketing" },
];

export const heroStat = {
  value: "2+",
  label: "Years",
  detail: "Marketing & Brand Growth",
};

export const expertise = {
  badge: "My Expertise",
  heading: "What I Do Best",
  subtext:
    "My expertise spans content and LinkedIn strategy, marketing operations, and outbound growth — built across research, coordination, and hands-on execution.",
  cards: [
    {
      title: "LinkedIn & Content Strategy",
      description:
        "Own LinkedIn strategy and content end-to-end for Track Opinion and Opinionest — from an Employee Advocacy Campaign I pitched to leadership, to research-led posts and thought leadership.",
      icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Marketing Operations & Vendor Management",
      description:
        "Lead certification vendor management (ISO 20252, ISO 27001, HIPAA), website coordination, and flagship event execution.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Outbound & Growth Marketing",
      description:
        "Built B2B GTM systems and outbound campaigns, and ran CRO audits and off-page SEO for consulting clients.",
      icon: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2",
      gradient: "from-pink-500 to-pink-600",
    },
  ],
};

export const education = [
  {
    institute: "Institute of Home Economics, Delhi University",
    degree: "B.Sc. Home Science",
    period: "08/2021 – 06/2024",
    location: "Delhi, India",
  },
  {
    institute: "SOCE IGNOU",
    degree: "Diploma in Nutrition and Health Education",
    period: "06/2023 – 06/2024",
    location: "Delhi, India",
  },
];

export const certificates = [
  "Stanford Introduction to Food and Health",
  "Public Speaking with Canva",
  "Child Nutrition and Cooking",
];

// Grouped under the same 3 pillars as "What I Do Best" above, so Toolkit &
// Skills reads as a breakdown of those pillars rather than one flat pile.
export const skillGroups = [
  {
    title: "LinkedIn & Content Strategy",
    items: ["Content Strategy & Creation", "Social Media Analytics", "Graphic Design", "AI-Assisted Prototyping (Claude Code)"],
  },
  {
    title: "Marketing Operations & Vendor Management",
    items: ["Vendor & Certification Management", "Event Management", "Process Wireframing"],
  },
  {
    title: "Outbound & Growth Marketing",
    items: ["Cold Outreach", "Email Automation", "Data Enrichment", "CRO Optimization", "Off Page SEO", "Google Ads (Search Campaigns)", "Competitor & Market Research", "Market Intelligence"],
  },
];

// Small inline case-study cards on the About page — each expands in place to
// show its image set. `images` stays empty until real files are supplied.
export const caseStudies = [
  {
    title: "Office Inauguration Event",
    gist: "Coordinated the flagship office launch end-to-end — vendors, signage, and on-ground flow.",
    images: [
      "/case-studies/office-2.jpg",
      "/case-studies/office-3.jpg",
      "/case-studies/office-1.jpg",
      "/case-studies/office-4.jpg",
    ],
  },
  {
    title: "Quirks Event Collaterals",
    gist: "Designed the collateral set for Quirks — banners, signage, and on-site creative.",
    images: ["/case-studies/quirks-1.png", "/case-studies/quirks-2.jpg"],
    video: "/case-studies/quirks-video.mp4",
  },
  {
    title: "LinkedIn Marketing Designs",
    gist: "Visual design for LinkedIn posts and carousels behind the content strategy.",
    images: [],
  },
  {
    title: "Instagram Stories",
    gist: "Story-format creative for Instagram — announcements, behind-the-scenes, engagement.",
    images: [],
  },
];

// Real professional experience, verbatim from her resume (PriyanshiGupta-Resume.pdf).
// `summary` condenses the bullets below into 3-5 lines; `metrics` are the exact
// real figures pulled from those same bullets, just surfaced as callouts.
export const workExperience = [
  {
    role: "Market Associate",
    company: "Track Opinion",
    period: "12/2025 – Present",
    location: "Noida, India",
    current: true,
    color: "purple",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    summary:
      "End-to-end marketing coordination across digital marketing, content, social media, SEO, website development, performance marketing, vendor management, certifications, market research, and corporate events. I move between strategic and executional work — researching opportunities and developing initiatives, then coordinating internal teams and external vendors, managing deliverables, analyzing performance, and presenting recommendations to management.",
    metrics: ["11 workstreams owned", "3 certifications led", "2 flagship events executed"],
    bullets: [
      "Conceptualised and pitched an Employee Advocacy Campaign to leadership — researched the strategy, built the business case into a presentation, and drove employee participation to lift organic reach and brand credibility.",
      "Own LinkedIn strategy end-to-end — tracking performance (impressions, reach, engagement) and planning content around research insights, industry trends, and thought leadership.",
      "Create and manage content across Track Opinion's LinkedIn and Opinionest's Instagram — ideation, copywriting, creative briefs, and publishing, tailored to each channel's voice.",
      "Reviewed the company website end-to-end — service-page requirements, Figma designs, and dev handoff — across Research Services, Enterprise Solutions, and more.",
      "Led certification vendor management for ISO 20252, ISO 27001, and HIPAA — researching, comparing, and finalizing consultancy partners.",
      "Executed two flagship events — Quirk's New York and the company's office inauguration — owning vendor coordination, collateral, and logistics end-to-end.",
      "Manage SEO/content freelancers and the website blog pipeline, aligning topics with SEO goals and keeping a steady content cadence.",
      "Built Google Ads from scratch — keyword strategy, GA4 integration, and conversion tracking — while coordinating with SEO on the website revamp.",
      "Researched vendor options for a new voice-agent project and corporate gifting, consolidating comparisons into presentations that shaped final decisions.",
      "Independently developed website prototype samples using Vibe Coding — Claude Code for AI-assisted frontend development and rapid iteration, deployed on Netlify for stakeholder review before formal development, cutting concept-validation turnaround time.",
    ],
  },
  {
    role: "Executive – Marketing Intelligence Analyst",
    company: "Medhavi Skill University",
    period: "08/2025 – 11/2025",
    location: "Gurgaon, India",
    current: false,
    color: "blue",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    summary:
      "Designing the B2B GTM playbook end-to-end — event lead lifecycle systems, buyer personas, and automated outreach across Apollo, Smartlead, and Zoho CRM.",
    metrics: ["500+ SPOCs enriched", "3 campaigns / week", "10+ tools evaluated"],
    bullets: [
      "Designed scalable event lead lifecycle system with hot/warm/cold classification, WhatsApp/email nurturing, and wireframes for team-wide adoption.",
      "Architected B2B GTM strategy with detailed buyer personas, creating core playbook for sales, marketing, and product alignment.",
      "Automated lead data extraction via Apollo, EasyLeadz, and browser extensions, enriching 500+ SPOCs for precision outreach; collaborated with sales to identify target industries weekly.",
      "Ran 3 email campaigns weekly using Smartlead, Apollo, and Zoho CRM, targeting POCs across industries; created smart links to track MQL-to-SQL conversion and CTR, driving measurable funnel progression.",
      "Enriched databases using data scrapers from company websites and tools like Hunter.io, Clearbit, and Snov.io to ensure high-quality, verified contact data.",
      "Crafted email content with AI tools (ChatGPT, Copy.ai) and initiated Zoho integrations (Zoho Calling, Zoho Email, Zoho CRM) to automate workflows and improve campaign efficiency.",
      "Coordinated team tasks, created marketing MOMs, and supported campaign monitoring; contributed to prompt templates for marketing content.",
      "Researched WhatsApp Business compliance, evaluated 10+ automation platforms, and delivered vendor-backed scalability recommendations.",
    ],
  },
  {
    role: "Outbound & Marketing Associate",
    company: "Seventh Triangle Consultancy",
    period: "11/2024 – 08/2025",
    location: "Noida, India",
    current: false,
    color: "pink",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    summary:
      "Ran C-suite LinkedIn and cold email campaigns while auditing conversion funnels for consulting clients — pairing outbound growth with hands-on CRO and off-page SEO.",
    metrics: ["25%+ qualified leads", "45+ CRO audits", "23%+ conversion"],
    bullets: [
      "Led high-impact LinkedIn and cold email campaigns targeting C-suite executives, boosting qualified leads by 25%+ using Apollo.io, Smartlead, and LinkedIn Sales Navigator.",
      "Conducted 45+ CRO audits for B2B prospects across consulting sectors, delivering in-depth funnel diagnostics, heatmaps, and conversion roadmaps; converted 23%+ into paying customers.",
      "Drove data-backed growth via competitive analysis and market intelligence, identifying untapped opportunities across brands.",
      "Pioneered outreach automation and growth hacks, aligning sales-marketing to accelerate lead velocity and shorten cycles.",
      "Managed full-cycle campaigns from research to A/B testing consistently surpassing response benchmarks.",
      "Executed off-page SEO strategies for brands like Hidesign, securing high-authority backlinks to elevate domain authority and organic visibility.",
    ],
  },
  {
    role: "Intern – Marketing and Creative Services",
    company: "Seventh Triangle Consultancy",
    period: "08/2024 – 11/2024",
    location: "Noida, India",
    current: false,
    color: "yellow",
    icon: "M13 7h8m0 0v8m0-8L13 15l-4-4-6 6",
    summary:
      "Set up and optimized Meta & Google Ads, building custom audiences and tracking attribution to lift ROAS and click-through across dozens of live campaigns.",
    metrics: ["25% higher ROAS", "200K+ users reached", "15+ clients audited"],
    bullets: [
      "Set up and optimized Meta & Google Ads campaigns, achieving 25% higher ROAS through targeted strategies and efficient budgeting.",
      "Gained hands-on experience with Google Analytics, Meta Pixel, and double-attribution tracking for insights across 20+ campaigns.",
      "Built custom, lookalike, and interest-based audiences, reaching 200,000+ qualified users with strong engagement.",
      "Analyzed ad creatives, bidding, and audience data to refine 25+ campaigns.",
      "Delivered CRO insights and website audits for 15+ clients, driving notable conversion gains.",
      "Supported ad copy, visuals, and A/B testing for creatives, lifting click-through rates.",
    ],
  },
];

export const projects = [
  {
    title: "Employee Advocacy Campaign",
    description:
      "Conceived and pitched an Employee Advocacy Campaign to leadership at Track Opinion — researched the strategy, built the business case, and drove employee participation to lift organic LinkedIn reach.",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    title: "Certification & Vendor Management",
    description:
      "Led end-to-end certification vendor management for ISO 20252, ISO 27001, and HIPAA at Track Opinion — researching, comparing, and finalizing consultancy partners.",
    icon: "M5 13l4 4L19 7",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    title: "LinkedIn Outreach Campaigns",
    description:
      "Executed targeted LinkedIn outreach campaigns to connect with C-suite executives and decision-makers across industries.",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Account-Based Marketing",
    description:
      "Executed personalized outreach strategies targeting high-value accounts across LinkedIn and email. Aligned messaging with decision-maker pain points to improve engagement.",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Competitor & Market Research",
    description:
      "Performed in-depth market and competitor research to guide strategy for new product launches and market positioning.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    title: "Lead Generation Workflows (Outbound)",
    description:
      "Designed multi-step Lead Generation Workflows (Outbound) to improve lead quality and response rates in cold outreach. Learned bulk extraction, email campaigns on Smartlead, and buyer personas.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    gradient: "from-green-500 to-green-600",
  },
];

// "Works" mega-menu — real case-study documents linked from the original site
export const works = {
  // Awaiting real documents from Priyanshi — subcategories stay empty until
  // she sends them, at which point the matching project card starts flipping
  // automatically (see ProjectCard's subcategories.length guard).
  "Employee Advocacy Campaign": {
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    color: "teal",
    subcategories: [],
  },
  "Certification & Vendor Management": {
    icon: "M5 13l4 4L19 7",
    color: "emerald",
    subcategories: [],
  },
  "Account-Based Marketing": {
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    color: "indigo",
    subcategories: [
      { name: "Event Lead Lifecycle", url: "https://docs.google.com/document/d/1ch2zMgXc19gAJxrAGu61F7Q0KrtBgvbF4n6wuB-kvCU/edit?usp=sharing" },
      { name: "Post Event Wireframe", url: `${ASSET_BASE}/Event%20Leads%20Lifecycle%20From%20Event%20to%20Engagement-B9faUdjb.pdf` },
      { name: "Buyer's Persona for Industrial Partnership", url: `${ASSET_BASE}/User%20Personas%20Presentation-WIgLHhT1.pdf` },
      { name: "Buyer's Persona for Consultancy", url: `${ASSET_BASE}/Professional%20Marketing%20Buyer%20Persona%20A4%20Document%20(1)-C3T6h1tz.pdf` },
      { name: "Countries Business Culture", url: "https://docs.google.com/document/d/1LO46wPrM15zIE8WPpPWahJlUX3IxSdCL63RV_DS-Blw/edit?usp=sharing" },
      { name: "One pager-CRO Action Plan", url: "https://docs.google.com/presentation/d/15qEWEcjXVkJdgqPsB7pnaEKyE07_TtFneWtgCCQZrrQ/edit?usp=sharing" },
      { name: "Business Development: Outbound", url: "https://docs.google.com/presentation/d/1CQ6AVHrZIubkZ45jEU6oORRB9IPjZ3jFF-Zo6JG9aZI/edit?usp=sharing" },
      { name: "CRO Audit Template", url: "https://docs.google.com/presentation/d/1NoY9NDFuqIiZzFX58FCVI8b7pxdmuxn9x6zlZwuAB0g/edit?usp=sharing" },
      { name: "CRO Excel Template", url: "https://docs.google.com/spreadsheets/d/1r90kfRsW_Vv0NXJO6KI6k_cmcvaHLqUSMwlUn12yL-U/edit?usp=sharing" },
    ],
  },
  "Market Research": {
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    color: "pink",
    subcategories: [
      { name: "Cosmetic and Skincare Brand Suggestions", url: "https://docs.google.com/spreadsheets/d/1-HSEP8EPO_Vna4MKsiAMkEv-gpngZlGVy4D7z1FdjLA/edit?usp=sharing" },
      { name: "Personal Care Growth Hacks", url: "https://docs.google.com/spreadsheets/u/2/d/1a9nn4fDFpBKdXBVMEtWd_XG0KctjjLScIww3fsPNnA8/edit?usp=sharing" },
      { name: "Functionalities for a D2C Jewellery Store", url: "https://docs.google.com/document/d/1FaSEjfRH0uqR2wf4F1f5CFiNRLypYNPHyaugwWMqWiw/edit?usp=sharing" },
      { name: "Business Plan Document for the Upcoming Year", url: "https://docs.google.com/document/d/1M6UFJ-qoyHyithVumgco5YKfQeHauS9lQBzYz2C3slI/edit?usp=sharing" },
      { name: "Business Plan Template for an Established Business", url: `${ASSET_BASE}/PG-BUaA6aNs.pdf` },
      { name: "Content Framework Template", url: "https://docs.google.com/spreadsheets/d/15KYfJgBCMdN6xasRhPgyoHKein0p2bFoxdwsr69dL04/edit?usp=sharing" },
      { name: "Quora Marketing Plan for ABC Company", url: "https://docs.google.com/document/d/19AolS9hnQ53GgA3vThboX324c84aIRJYx_5iKUoxo9Q/edit?usp=sharing" },
      { name: "Direct Gift Marketing Campaign", url: "https://docs.google.com/presentation/d/11t_pes8vYTczSRb2z2cBtlTjW6lerbksbULhBLFzqEc/edit?usp=sharing" },
      { name: "ORM (Online Reputation Management)", url: "https://docs.google.com/document/d/11kvdozO65yImotxygUYNan8kZ6ZaLN0E9wIHq_R6V1A/edit?usp=sharing" },
    ],
  },
  "Lead Generation": {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "green",
    subcategories: [
      { name: "Outbound Process", url: "https://docs.google.com/document/d/1rDi2dh8VJ-r0fHJCAr-EdVEn4nLhV1dlVv7VP4_s0c4/edit?usp=sharing" },
      { name: "Apollo Outbound Process", url: "https://docs.google.com/document/d/1wNGdhMstvGotL65JRDWgX0_osKTYIlyyUdV-q0wEPzg/edit?usp=sharing" },
      { name: "Outbound Follow-Up Emails", url: "https://docs.google.com/document/d/14828VRfwj2wZmKO2U1wcGEK2htaNyzk-512sdXYnFzM/edit?usp=sharing" },
      { name: "Mail Templates (Platform Change)", url: "https://docs.google.com/document/d/1adeiRqYQz-3-Lkuq8D9YmEDLXFioa-0c_m5EA8-4_ig/edit?usp=sharing" },
      { name: "White Labelling Email Template", url: "https://docs.google.com/document/d/1-c-tDsdJ9SgsKw2NBzceyEZX8UxfT1ELwBRKa4ikHS4/edit?usp=sharing" },
      { name: "Additional Contributions", url: "https://docs.google.com/document/d/14iWeVlvrdGLSolxubok76L2ZBd4b9f83GjgTAmRJots/edit?usp=sharing" },
    ],
  },
  "Marketing Funnel": {
    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
    color: "orange",
    subcategories: [
      { name: "LinkedIn Marketing Funnels", url: "https://docs.google.com/document/d/1fQ6n8P7aad9Czy29_0KwAiP7atfz92a8o4n1pZXMmD8/edit?usp=sharing" },
    ],
  },
  "LinkedIn Outreach": {
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    color: "blue",
    subcategories: [
      { name: "LinkedIn Marketing Strategy", url: "https://docs.google.com/document/d/1uA7pC3kF-IKRyERv0uuc8py7h7PexrZJI5D7WC3J-rA/edit?usp=sharing" },
      { name: "How to Enhance Your LinkedIn Page", url: "https://docs.google.com/document/d/14DQX5Go5LEX02ipjUPt8970b2FNugiFMhX9ZRK1RS6Q/edit?usp=sharing" },
      { name: "LinkedIn Course - Vaibhav Sisinty", url: "https://docs.google.com/document/d/1kdwHFkiJMyb-lR0KH_bvt_HfFHv-Xf1JPQuV5FrtrGo/edit?usp=sharing" },
    ],
  },
  "Performance & SEO Marketing": {
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    color: "purple",
    subcategories: [
      { name: "Performance Marketing Expertise", url: "https://docs.google.com/document/d/1wi96QhPeDqUaFyPcJKykgqpcdkN2ZCoqTaUdiEaEHTg/edit?usp=sharing" },
      { name: "SEO & Backlinking Experience", url: "https://docs.google.com/document/d/1vT2A9rd-EHZnau1ZUeMpWQyiSxdk0AdzNQuDq7y58CE/edit?usp=sharing" },
    ],
  },
};

// Real hobbies she's told me about directly — not inferred, not decorative filler.
export const hobbies = [
  {
    title: "Cooking",
    tagline: "Kitchen experiments > kitchen rules",
    description:
      "Nutrition-backed recipes, weekend plating projects, and the occasional kitchen disaster — food is where my creative brain unwinds.",
    emoji: "🍳",
    bg: "var(--pill-yellow)",
    tape: "#F3B8CE",
    rotate: -4,
  },
  {
    title: "Content Creation",
    tagline: "Script it, shoot it, ship it",
    description:
      "I write, shoot, and edit my own reels end to end — the same instinct I bring to campaigns, just pointed at myself.",
    emoji: "🎬",
    bg: "var(--pill-blue)",
    tape: "#E4D875",
    rotate: 3,
  },
  {
    title: "Exploring New Places",
    tagline: "Passport stamps > to-do lists",
    description:
      "New cities, new food, new strangers to strike up a conversation with — travel is my favorite form of market research.",
    emoji: "✈️",
    bg: "var(--pill-mint)",
    tape: "#A9E3F7",
    rotate: -2,
  },
];

// Real Instagram content — the exact handle, view count, and reel links she provided.
// Framed as a case study (personal channel used as a live testbed for SMM tactics),
// not a social feed embed — keep copy in that register when editing.
export const instagram = {
  username: "calll_me_piya",
  handle: "@calll_me_piya",
  url: "https://www.instagram.com/calll_me_piya/",
  badge: "Case Study — Organic Social Growth",
  heading: "2.8M+ Views on a Self-Run Instagram Channel",
  subtext:
    "I write, shoot, and edit every reel myself — a live testbed for the SMM instincts I bring to client work, and now a channel brands partner with directly.",
  stats: [
    { value: 2.8, decimals: 1, suffix: "M+", label: "Total Views", detail: "Across self-produced reels on this channel" },
    { value: 3, suffix: "", label: "Featured Reels", detail: "Scripted, shot, and edited end to end" },
  ],
  tactics: ["Hook-first scripting", "Trend-jacking", "Brand collaborations"],
  reels: [
    "https://www.instagram.com/reel/DTr_9rzieRr/",
    "https://www.instagram.com/reel/DVGHIa_CSEX/",
    "https://www.instagram.com/reel/DcgRYRYJzJf/",
  ],
};

export const footer = {
  tagline: "Smart with research, sharp with outreach, and built for impact. Let's bring your brand's voice to life.",
  quickLinks: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/#contact" },
  ],
};

// Spec sheet for the About section — reorganizes her real role/skills/education
// into a resume-style rundown. No new facts, just a different presentation.
export const spec = {
  role: ["Market Associate", "Track Opinion"],
  focus: ["LinkedIn & Content Strategy", "Marketing Operations", "Outbound & Growth Marketing", "CRO Audits", "Website Management"],
  worksWith: "C-suite executives, vendors & leadership teams",
  education: education.map((e) => e.degree),
};

// A 3-step framing of her real workflow, paraphrased from her own project
// and expertise descriptions above — not new claims, just organized differently.
export const process = [
  {
    title: "Research & Discover",
    description:
      "I start with market and competitor research, audience insights, and buyer personas to build a solid strategic foundation for every campaign.",
  },
  {
    title: "Execute & Engage",
    description:
      "I translate strategy into content, campaigns, and outbound outreach — coordinating with teams and partners to bring initiatives to life.",
  },
  {
    title: "Optimize & Report",
    description:
      "I track performance through CRO, SEO, and analytics — refining what's working and reporting clear, actionable results.",
  },
];
