import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout, PageHero } from '../components/site/SiteLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react'

export const Route = createFileRoute('/faq')({
  component: FAQ,
})

const FAQS = [
  {
    category: "General Questions",
    items: [
      { q: "Team Bangladesh কী?", a: "Team Bangladesh হলো একটি জাতীয় স্বেচ্ছাসেবী ও সামাজিক উন্নয়নমূলক প্ল্যাটফর্ম, যার লক্ষ্য দেশ ও মানুষের কল্যাণে ঐক্যবদ্ধভাবে কাজ করা।" },
      { q: "Team Bangladesh-এর ভিশন কী?", a: "আমাদের ভিশন হলো একটি সবুজ, শিক্ষিত এবং আত্মনির্ভরশীল বাংলাদেশ গড়ে তোলা, যেখানে তরুণরা পরিবর্তনের চালিকাশক্তি হিসেবে কাজ করবে।" },
      { q: "Team Bangladesh-এর মিশন কী?", a: "আমাদের মিশন হলো পরিবেশ রক্ষা, সামাজিক উন্নয়ন এবং যুবসমাজের ক্ষমতায়নের মাধ্যমে একটি টেকসই সমাজ বিনির্মাণ করা।" },
      { q: "Team Bangladesh কি কোনো রাজনৈতিক সংগঠন?", a: "না, Team Bangladesh সম্পূর্ণ অরাজনৈতিক এবং স্বেচ্ছাসেবী একটি প্ল্যাটফর্ম।" },
      { q: "Team Bangladesh কি একটি নিবন্ধিত প্রতিষ্ঠান?", a: "হ্যাঁ, এটি যথাযথ কর্তৃপক্ষের মাধ্যমে নিবন্ধিত একটি সেবামূলক প্রতিষ্ঠান।" },
      { q: "Team Bangladesh-এর মূল কার্যক্রম কী কী?", a: "আমাদের মূল কার্যক্রমের মধ্যে রয়েছে পরিবেশ সংরক্ষণ, বৃক্ষরোপণ, শিক্ষামূলক সহায়তা, দুর্যোগ ব্যবস্থাপনা এবং স্বাস্থ্য ও পরিচ্ছন্নতা কর্মসূচি।" }
    ]
  },
  {
    category: "Membership",
    items: [
      { q: "কে Team Bangladesh-এর সদস্য হতে পারবেন?", a: "বাংলাদেশের যেকোনো সচেতন ও দায়িত্বশীল নাগরিক, যিনি সমাজ ও দেশের উন্নয়নে স্বেচ্ছায় কাজ করতে আগ্রহী, তিনি সদস্য হতে পারবেন।" },
      { q: "সদস্য হওয়ার জন্য কী যোগ্যতা প্রয়োজন?", a: "স্বেচ্ছাসেবী মনোভাব, সামাজিক দায়বদ্ধতা এবং সংগঠনের নীতিমালা মেনে চলার মানসিকতা থাকা আবশ্যক।" },
      { q: "কীভাবে সদস্য হতে পারি?", a: "আমাদের ওয়েবসাইটের 'Join Us' বা 'Volunteer' সেকশনে গিয়ে ফর্ম পূরণের মাধ্যমে সদস্য পদের জন্য আবেদন করা যাবে।" },
      { q: "সদস্য হতে কোনো রেজিস্ট্রেশন ফি আছে কি?", a: "প্রাথমিক সদস্যপদের জন্য কোনো ফি নেই, তবে কিছু বিশেষ ক্যাটাগরির সদস্যপদের জন্য নির্ধারিত ফি প্রযোজ্য হতে পারে।" },
      { q: "মাসিক সদস্য ফি কত?", a: "সদস্যপদের ধরন অনুযায়ী মাসিক ফি নির্ধারিত হয়। বিস্তারিত তথ্য সদস্য নীতিমালায় উল্লেখ রয়েছে।" },
      { q: "সদস্যদের কী কী সুবিধা রয়েছে?", a: "সদস্যরা বিভিন্ন প্রশিক্ষণ, ইভেন্টে অংশগ্রহণ, লিডারশিপ ডেভেলপমেন্ট এবং নেটওয়ার্কিং-এর সুযোগ পান।" },
      { q: "সদস্য পরিচয়পত্র (ID Card) দেওয়া হবে কি?", a: "হ্যাঁ, নিয়মিত সদস্যদের জন্য অফিসিয়াল ID Card এবং টি-শার্ট প্রদান করা হয়।" },
      { q: "সদস্যপদ বাতিল হতে পারে কি?", a: "সংগঠনের শৃঙ্খলা পরিপন্থী কাজ করলে বা নীতিমালার লঙ্ঘন হলে সদস্যপদ বাতিল হতে পারে।" }
    ]
  },
  {
    category: "Volunteer",
    items: [
      { q: "স্বেচ্ছাসেবক হিসেবে কীভাবে যুক্ত হবো?", a: "ওয়েবসাইটে থাকা Volunteer ফর্মটি পূরণ করে আপনি আমাদের সাথে যুক্ত হতে পারেন।" },
      { q: "ছাত্রছাত্রীরা কি অংশগ্রহণ করতে পারবে?", a: "অবশ্যই! ছাত্রছাত্রীদের জন্য আমাদের বিশেষ সুযোগ ও প্রোগ্রাম রয়েছে।" },
      { q: "নারীদের জন্য আলাদা সুযোগ রয়েছে কি?", a: "হ্যাঁ, নারীদের অংশগ্রহণকে আমরা অত্যন্ত গুরুত্ব দিই এবং তাদের জন্য নিরাপদ ও সহায়ক পরিবেশ নিশ্চিত করি।" }
    ]
  },
  {
    category: "Organization Structure",
    items: [
      { q: "Team Bangladesh-এর সাংগঠনিক কাঠামো কী?", a: "আমাদের একটি কেন্দ্রীয় কমিটি রয়েছে, যার অধীনে জেলা, উপজেলা এবং ইউনিয়ন পর্যায়ে কমিটি কাজ করে।" },
      { q: "জেলা, উপজেলা ও ইউনিয়ন কমিটি কীভাবে গঠিত হয়?", a: "স্থানীয় পর্যায়ে সক্রিয় সদস্যদের মধ্যে থেকে যোগ্যতা ও দক্ষতার ভিত্তিতে নেতৃত্ব নির্বাচন করে কমিটি গঠন করা হয়।" },
      { q: "নেতৃত্ব নির্বাচন কীভাবে হয়?", a: "সদস্যদের কাজের মূল্যায়ন এবং গণতান্ত্রিক প্রক্রিয়ার মাধ্যমে নেতৃত্ব নির্বাচন করা হয়।" }
    ]
  },
  {
    category: "Projects",
    items: [
      { q: "বর্তমানে কোন কোন প্রকল্প চলছে?", a: "বর্তমানে গ্রীন ক্যাম্পাস, ট্রি-প্লান্টেশন ড্রাইভ, ক্লিন-আপ ক্যাম্পেইন এবং ইকো-লিটারেসি প্রকল্প চলছে।" },
      { q: "নতুন প্রকল্প কীভাবে প্রস্তাব করা যায়?", a: "যেকোনো সদস্য বা শুভাকাঙ্ক্ষী আমাদের ইমেইলের মাধ্যমে নতুন প্রকল্পের প্রস্তাব পাঠাতে পারেন।" },
      { q: "পরিবেশ, শিক্ষা, স্বাস্থ্য ও দুর্যোগ ব্যবস্থাপনায় কী কী কাজ করা হয়?", a: "বৃক্ষরোপণ, সুবিধাবঞ্চিত শিশুদের শিক্ষা উপকরণ বিতরণ, বিনামূল্যে চিকিৎসা ক্যাম্প এবং দুর্যোগে ত্রাণ বিতরণ কার্যক্রম পরিচালনা করা হয়।" }
    ]
  },
  {
    category: "Donation & Finance",
    items: [
      { q: "Team Bangladesh-এ কীভাবে অনুদান দিতে পারি?", a: "আমাদের ওয়েবসাইটের 'Donation' পেজে গিয়ে মোবাইল ব্যাংকিং বা ব্যাংক ট্রান্সফারের মাধ্যমে অনুদান দেওয়া যাবে।" },
      { q: "অনুদানের অর্থ কোথায় ব্যয় হয়?", a: "অনুদানের ১০০% অর্থ আমাদের পরিচালিত সামাজিক ও পরিবেশগত প্রকল্পগুলোতে ব্যয় করা হয়।" },
      { q: "আর্থিক স্বচ্ছতা কীভাবে নিশ্চিত করা হয়?", a: "প্রতিটি প্রকল্পের আয়-ব্যয়ের হিসাব সংরক্ষণ করা হয় এবং নিয়মিত অডিট করা হয়।" },
      { q: "বার্ষিক আর্থিক প্রতিবেদন প্রকাশ করা হয় কি?", a: "হ্যাঁ, আমরা আমাদের ডোনার এবং সদস্যদের জন্য বার্ষিক আর্থিক প্রতিবেদন প্রকাশ করি।" }
    ]
  },
  {
    category: "Training",
    items: [
      { q: "সদস্যদের প্রশিক্ষণ দেওয়া হয় কি?", a: "হ্যাঁ, দক্ষতা উন্নয়ন এবং লিডারশিপের ওপর সদস্যদের নিয়মিত প্রশিক্ষণ দেওয়া হয়।" },
      { q: "অনলাইন প্রশিক্ষণের সুযোগ আছে কি?", a: "হ্যাঁ, আমাদের নিজস্ব প্ল্যাটফর্ম ও জুমের মাধ্যমে অনলাইন প্রশিক্ষণের ব্যবস্থা রয়েছে।" },
      { q: "সার্টিফিকেট দেওয়া হয় কি?", a: "প্রশিক্ষণ সফলভাবে সম্পন্ন করলে অফিসিয়াল সার্টিফিকেট প্রদান করা হয়।" }
    ]
  },
  {
    category: "Events",
    items: [
      { q: "Team Bangladesh কী ধরনের ইভেন্ট আয়োজন করে?", a: "বৃক্ষরোপণ কর্মসূচি, ক্লিন-আপ ড্রাইভ, যুব সম্মেলন, ও সেমিনার আয়োজন করা হয়।" },
      { q: "ইভেন্টে কীভাবে অংশগ্রহণ করবো?", a: "ওয়েবসাইটের 'Events' পেজ থেকে ইভেন্টের বিস্তারিত জেনে রেজিস্ট্রেশন করা যাবে।" }
    ]
  },
  {
    category: "Digital Platform",
    items: [
      { q: "অফিসিয়াল ওয়েবসাইট কোনটি?", a: "আমাদের অফিসিয়াল ওয়েবসাইট হলো: www.teambangladesh.org" },
      { q: "অফিসিয়াল ফেসবুক ও ইউটিউব চ্যানেল কী?", a: "ফেইসবুকে 'Team Bangladesh' লিখে সার্চ করলে আমাদের ভেরিফাইড পেইজ এবং গ্রুপ পাবেন।" },
      { q: "মোবাইল অ্যাপ আছে কি?", a: "খুব শিগগিরই আমাদের অফিশিয়াল মোবাইল অ্যাপ চালু হতে যাচ্ছে।" }
    ]
  },
  {
    category: "Support",
    items: [
      { q: "অভিযোগ বা পরামর্শ কোথায় পাঠাবো?", a: "Contact.TeamBangladesh@gmail.com ইমেইলে বা আমাদের ওয়েবসাইটের Contact ফর্মে জানাতে পারেন।" },
      { q: "সদস্যপদ সংক্রান্ত সমস্যায় কার সাথে যোগাযোগ করবো?", a: "সদস্যপদ সংক্রান্ত যেকোনো সমস্যায় আমাদের হটলাইন নম্বরে বা WhatsApp-এ যোগাযোগ করুন।" },
      { q: "অফিস কোথায় অবস্থিত?", a: "আমাদের প্রধান কার্যালয় বনানী, ঢাকা, বাংলাদেশে অবস্থিত।" },
      { q: "জরুরি যোগাযোগ নম্বর কী?", a: "আমাদের জরুরি যোগাযোগ নম্বর: +880 1911-480021।" }
    ]
  },
  {
    category: "Legal",
    items: [
      { q: "Team Bangladesh-এর নীতিমালা (Policy) কোথায় পাওয়া যাবে?", a: "ওয়েবসাইটের 'Legal' বা 'Policies' পেজে আমাদের সকল নীতিমালা বিস্তারিত দেওয়া আছে।" },
      { q: "Privacy Policy কী?", a: "আমাদের ওয়েবসাইটে ব্যবহারকারীদের তথ্য সংরক্ষণের নিয়মাবলিই হলো প্রাইভেসি পলিসি।" },
      { q: "সদস্যদের আচরণবিধি (Code of Conduct) কী?", a: "সদস্যদের সম্মানজনক আচরণ, সততা ও শৃঙ্খলা বজায় রাখার নির্দেশিকাই হলো কোড অব কন্ডাক্ট।" },
      { q: "তথ্য কীভাবে সুরক্ষিত রাখা হয়?", a: "আধুনিক এনক্রিপশন ও সিকিউরিটি সিস্টেমের মাধ্যমে আমরা সকল ডেটা সুরক্ষিত রাখি।" }
    ]
  },
  {
    category: "Media",
    items: [
      { q: "Team Bangladesh-এর লোগো ব্যবহারের নিয়ম কী?", a: "আমাদের পূর্বানুমতি ছাড়া লোগো ব্যবহার সম্পূর্ণ নিষিদ্ধ। অনুমতির জন্য ইমেইল করতে হবে।" },
      { q: "মিডিয়া বা সংবাদমাধ্যম কীভাবে যোগাযোগ করবে?", a: "যেকোনো মিডিয়া বা সংবাদমাধ্যম আমাদের অফিসিয়াল ইমেইল বা হটলাইনে যোগাযোগ করতে পারে।" }
    ]
  },
  {
    category: "Future",
    items: [
      { q: "ভবিষ্যৎ পরিকল্পনা কী?", a: "সারা দেশে কার্যক্রম সম্প্রসারণ এবং একটি টেকসই ইকোসিস্টেম তৈরি করাই ওয়েবসাইটে আমাদের মূল লক্ষ্য।" },
      { q: "দেশের বাইরে বসবাসকারী বাংলাদেশিরা কীভাবে যুক্ত হতে পারবেন?", a: "প্রবাসী বাংলাদেশিরা আমাদের 'International Wing'-এর মাধ্যমে যুক্ত হতে পারবেন।" },
      { q: "বিদেশে Team Bangladesh-এর শাখা থাকবে কি?", a: "হ্যাঁ, পর্যায়ক্রমে বিশ্বের বিভিন্ন দেশে প্রবাসীদের নিয়ে শাখা খোলার পরিকল্পনা রয়েছে।" },
      { q: "কর্পোরেট প্রতিষ্ঠান কীভাবে অংশীদার হতে পারে?", a: "কর্পোরেট প্রতিষ্ঠানগুলো CSR ফান্ডের মাধ্যমে আমাদের প্রজেক্টগুলোতে স্পন্সর বা পার্টনার হতে পারে।" },
      { q: "কেন Team Bangladesh-এ যোগ দেবো?", a: "দেশের ইতিবাচক পরিবর্তনে ভূমিকা রাখতে এবং নিজেকে একজন দক্ষ ও মানবিক মানুষ হিসেবে গড়ে তুলতে।" }
    ]
  }
];

function FAQ() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const activeFaqs = FAQS.find(f => f.category === activeCategory)?.items || [];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help & Support"
        title="Frequently Asked Questions"
        subtitle="সবচেয়ে বেশি জানতে চাওয়া প্রশ্নগুলো ও তার উত্তর।"
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
      />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[300px_1fr] gap-12">
          
          {/* Sidebar / Mobile Dropdown */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h3 className="hidden lg:block font-bold text-lg mb-6 px-4">Categories</h3>
            
            {/* Mobile Dropdown */}
            <div className="lg:hidden mb-8">
              <label htmlFor="category-select" className="sr-only">Select Category</label>
              <div className="relative">
                <select
                  id="category-select"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-card border border-border px-5 py-4 font-bold text-foreground outline-none focus:ring-2 focus:ring-leaf transition-all"
                >
                  {FAQS.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-muted-foreground">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Desktop List */}
            <div className="hidden lg:block space-y-2">
              {FAQS.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`w-full text-left px-5 py-3 rounded-2xl font-medium transition-all ${
                    activeCategory === cat.category
                      ? "bg-leaf text-white shadow-md shadow-leaf/20"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold mb-8">{activeCategory}</h2>
            
            <AnimatePresence mode="popLayout">
              {activeFaqs.map((item, idx) => {
                const key = `${activeCategory}-${idx}`;
                const isOpen = openItems[key];

                return (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border border-border rounded-3xl bg-card overflow-hidden transition-all hover:border-leaf/50"
                  >
                    <button
                      onClick={() => toggleItem(activeCategory, idx)}
                      className="w-full flex items-center justify-between p-6 text-left gap-4"
                    >
                      <span className="font-bold text-lg">{item.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                          isOpen ? 'bg-leaf text-white' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Support Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 rounded-3xl bg-gradient-to-br from-ink to-ink/95 text-white p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-leaf/20 blur-3xl" />
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-amber-glow font-bold text-xs uppercase tracking-wider mb-4 border border-white/10">
                    <HelpCircle className="h-4 w-4" /> Still have questions?
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4">Didn't find your answer?</h3>
                  <p className="text-white/70 mb-8 max-w-md">
                    Our support team is always here to help you. Reach out to us via Email or WhatsApp for a quick response.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="mailto:Contact.TeamBangladesh@gmail.com"
                      className="inline-flex items-center gap-2 bg-leaf hover:bg-leaf-deep text-white px-6 py-3 rounded-full font-bold transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" /> Email Support
                    </a>
                    <a 
                      href="https://wa.me/8801911480021"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold transition-colors border border-white/10"
                    >
                      WhatsApp: +880 1911-480021
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
