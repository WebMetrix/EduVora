import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  BookOpen,
  Wallet,
  Users,
  ShieldCheck,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Mail,
  Clock,
  Upload,
  X,
  Send,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Plus,
} from 'lucide-react';

const CATEGORIES = ['All', 'Courses', 'Wallet & Payouts', 'Network & Referrals', 'Account & KYC'];

const INITIAL_FAQS = [
  {
    id: 1,
    category: 'Wallet & Payouts',
    question: 'How long do payout withdrawals take to reflect in my bank account?',
    answer:
      'Payout requests are processed within 24–48 business hours once your KYC is verified. IMPS transfers usually reflect within a few hours of approval, while NEFT transfers may take up to 1 working day.',
  },
  {
    id: 2,
    category: 'Network & Referrals',
    question: 'When is my referral commission credited to my wallet?',
    answer:
      'Level 1 and Level 2 referral commissions are credited automatically as soon as your referred member completes their course package payment.',
  },
  {
    id: 3,
    category: 'Account & KYC',
    question: 'Why was my KYC document rejected?',
    answer:
      'Common reasons include blurry images, cropped corners, or mismatched names between your PAN/Aadhaar and bank account. Re-upload a clear, well-lit photo with all four corners visible.',
  },
  {
    id: 4,
    category: 'Courses',
    question: 'Can I upgrade my package from Bronze or Silver to Gold or Diamond?',
    answer:
      'Yes. Go to Courses or click "Upgrade Now" in the sidebar to upgrade your plan. You only pay the difference, and your unlocked courses and commission tier update immediately.',
  },
  {
    id: 5,
    category: 'Courses',
    question: 'How do I download course eBooks and listen to chapter audiobooks?',
    answer:
      'Open any enrolled course from the Courses tab. Each chapter includes an inline reader, downloadable watermarked PDF, and built-in audio player.',
  },
  {
    id: 6,
    category: 'Wallet & Payouts',
    question: 'What is the minimum withdrawal amount?',
    answer:
      'The minimum payout threshold is ₹500. Standard TDS deductions apply as per government regulations and are visible in your Payouts & Reports tab.',
  },
];

const INITIAL_TICKETS = [
  {
    id: 'TKT-1042',
    subject: 'KYC verification pending for 48 hours',
    category: 'Account & KYC',
    status: 'In Progress',
    priority: 'High',
    updatedAt: 'Today, 10:30 AM',
    messages: [
      {
        sender: 'user',
        text: 'I uploaded my Aadhaar and PAN two days ago, but the status still shows Pending.',
        time: '2 days ago',
      },
      {
        sender: 'support',
        text: 'Hi! Our verification team is reviewing your documents. You will receive an update by today evening.',
        time: 'Today, 10:30 AM',
      },
    ],
  },
  {
    id: 'TKT-1038',
    subject: 'Level 2 referral bonus not showing in wallet',
    category: 'Network & Referrals',
    status: 'Resolved',
    priority: 'Medium',
    updatedAt: 'Nov 22, 2026',
    messages: [
      {
        sender: 'user',
        text: 'My referral purchased the Gold package yesterday, please check the commission entry.',
        time: 'Nov 21, 2026',
      },
      {
        sender: 'support',
        text: 'Checked and synced! The commission has been credited to your wallet ledger.',
        time: 'Nov 22, 2026',
      },
    ],
  },
];

const QUICK_TOPICS = [
  {
    title: 'Courses & Learning',
    desc: 'Access eBooks, audiobooks, and upgrades',
    category: 'Courses',
    icon: BookOpen,
  },
  {
    title: 'Wallet & Payouts',
    desc: 'Withdrawals, TDS, and transaction status',
    category: 'Wallet & Payouts',
    icon: Wallet,
  },
  {
    title: 'Network & Referrals',
    desc: 'Referral links, levels, and commissions',
    category: 'Network & Referrals',
    icon: Users,
  },
  {
    title: 'Account & KYC',
    desc: 'Document verification and security',
    category: 'Account & KYC',
    icon: ShieldCheck,
  },
];

const STATUS_STYLES = {
  Open: 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function HelpSupport() {
  // FAQ state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState(1);
  const [faqFeedback, setFaqFeedback] = useState({});

  // Tickets state
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Create Ticket form state
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Wallet & Payouts',
    priority: 'Medium',
    description: '',
    attachment: null,
  });
  const [formSuccess, setFormSuccess] = useState('');

  // Misc UI state
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! Need quick help with EduVora? Ask a question or pick a topic below.' },
  ]);

  const faqSectionRef = useRef(null);
  const ticketFormRef = useRef(null);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return INITIAL_FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleTopicClick = (category) => {
    setActiveCategory(category);
    faqSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) return;

    const newTicket = {
      id: `TKT-${Math.floor(1050 + Math.random() * 900)}`,
      subject: formData.subject.trim(),
      category: formData.category,
      status: 'Open',
      priority: formData.priority,
      updatedAt: 'Just now',
      messages: [
        {
          sender: 'user',
          text: formData.description.trim(),
          time: 'Just now',
        },
      ],
    };

    // TODO: Replace with your API call / Redux thunk (e.g., dispatch(createSupportTicket(payload)))
    setTickets((prev) => [newTicket, ...prev]);
    setFormData({
      subject: '',
      category: 'Wallet & Payouts',
      priority: 'Medium',
      description: '',
      attachment: null,
    });
    setFormSuccess(`Ticket ${newTicket.id} submitted successfully.`);
    setTimeout(() => setFormSuccess(''), 4000);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newMsg = { sender: 'user', text: replyText.trim(), time: 'Just now' };

    // TODO: Replace with your reply API endpoint
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, updatedAt: 'Just now', messages: [...t.messages, newMsg] }
          : t
      )
    );
    setSelectedTicket((prev) => ({
      ...prev,
      updatedAt: 'Just now',
      messages: [...prev.messages, newMsg],
    }));
    setReplyText('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('support@eduvora.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendChat = (text) => {
    const content = (text ?? chatInput).trim();
    if (!content) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: content },
      {
        sender: 'bot',
        text: 'Thanks for reaching out! An agent will review this shortly, or you can raise a ticket for priority tracking.',
      },
    ]);
    setChatInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero & Search Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5D1CF5] to-[#4312B8] p-6 sm:p-10 text-white shadow-sm">
        <div className="max-w-2xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white mb-3">
            Help & Support Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How can we help you today?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-purple-100">
            Search our knowledge base, track your support tickets, or connect directly with our team.
          </p>

          <div className="mt-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for payouts, KYC, referrals, courses..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Quick Topic Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_TOPICS.map((topic) => {
          const Icon = topic.icon;
          const isSelected = activeCategory === topic.category;
          return (
            <button
              key={topic.title}
              type="button"
              onClick={() => handleTopicClick(topic.category)}
              className={`text-left p-5 rounded-2xl border bg-white transition-all hover:shadow-md ${
                isSelected
                  ? 'border-[#5D1CF5] ring-1 ring-[#5D1CF5]'
                  : 'border-slate-200/80 hover:border-purple-200'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] text-[#5D1CF5] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">{topic.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{topic.desc}</p>
            </button>
          );
        })}
      </section>

      {/* Main 2-Column Content: FAQs + Contact Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* FAQs */}
        <section
          ref={faqSectionRef}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Quick answers to common platform questions
              </p>
            </div>
            <button
              type="button"
              onClick={() => ticketFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5D1CF5] hover:underline self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              Raise a Ticket
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#5D1CF5] text-white'
                    : 'bg-[#F3EEFF] text-[#5D1CF5] hover:bg-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-slate-100">
            {filteredFaqs.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-500">
                No matching FAQs found. Try another keyword or submit a support ticket below.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                const feedback = faqFeedback[faq.id];
                return (
                  <div key={faq.id} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-4 text-left"
                    >
                      <span className="font-medium text-sm text-slate-900">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#5D1CF5]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-3 text-sm text-slate-600 leading-relaxed space-y-3">
                        <p>{faq.answer}</p>
                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-xs text-slate-400">Was this helpful?</span>
                          <button
                            type="button"
                            onClick={() => setFaqFeedback((p) => ({ ...p, [faq.id]: 'up' }))}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                              feedback === 'up'
                                ? 'bg-[#F3EEFF] border-[#5D1CF5] text-[#5D1CF5]'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" /> Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setFaqFeedback((p) => ({ ...p, [faq.id]: 'down' }))}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                              feedback === 'down'
                                ? 'bg-red-50 border-red-300 text-red-600'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" /> No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Direct Support Channels */}
        <aside className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Direct Support</h2>

            {/* Live Chat */}
            <div className="p-4 rounded-xl bg-[#F3EEFF]/70 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#5D1CF5] text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Live Chat</h3>
                  <p className="text-xs text-slate-500">Typical reply under 5 mins</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className="mt-3 w-full py-2 rounded-lg bg-[#5D1CF5] hover:bg-[#4B14CC] text-white text-xs font-medium transition-colors"
              >
                Start Live Chat
              </button>
            </div>

            {/* Email Support */}
            <div className="p-4 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email Support</p>
                  <p className="text-sm font-medium text-slate-900 truncate">support@eduvora.in</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#5D1CF5] transition-colors"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Support Hours */}
            <div className="p-4 rounded-xl border border-slate-200/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Support Hours (IST)</p>
                <p className="text-sm font-medium text-slate-900">Mon – Sat, 9:30 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* My Tickets + Raise a Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* My Support Tickets */}
        <section className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">My Support Tickets</h2>
              <p className="text-xs text-slate-500">Click any ticket to view conversation or reply</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3EEFF] text-[#5D1CF5]">
              {tickets.length} Total
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
                  <th className="py-3 pr-4">Ticket ID</th>
                  <th className="py-3 pr-4">Subject</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className="hover:bg-[#F3EEFF]/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 pr-4 font-semibold text-[#5D1CF5] whitespace-nowrap">
                      {ticket.id}
                    </td>
                    <td className="py-3.5 pr-4">
                      <p className="font-medium text-slate-900 line-clamp-1">{ticket.subject}</p>
                      <p className="text-xs text-slate-500">{ticket.category}</p>
                    </td>
                    <td className="py-3.5 pr-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          STATUS_STYLES[ticket.status] || STATUS_STYLES.Open
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-xs text-slate-500 whitespace-nowrap">
                      {ticket.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="sm:hidden space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-[#5D1CF5] cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#5D1CF5]">{ticket.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      STATUS_STYLES[ticket.status] || STATUS_STYLES.Open
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900">{ticket.subject}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{ticket.category}</span>
                  <span>{ticket.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Raise a New Ticket Form */}
        <section
          ref={ticketFormRef}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs"
        >
          <h2 className="text-lg font-semibold text-slate-900">Raise a Support Ticket</h2>
          <p className="text-xs text-slate-500 mt-0.5 mb-5">
            Couldn&apos;t find your answer? Send us the details.
          </p>

          {formSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary of your issue"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D1CF5]/30 focus:border-[#5D1CF5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5D1CF5]/30 focus:border-[#5D1CF5]"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5D1CF5]/30 focus:border-[#5D1CF5]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Include order ID, transaction reference, or steps to reproduce..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D1CF5]/30 focus:border-[#5D1CF5] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Attachment (Optional)
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-slate-300 hover:border-[#5D1CF5] hover:bg-[#F3EEFF]/30 cursor-pointer transition-colors text-xs text-slate-600">
                <Upload className="w-4 h-4 text-[#5D1CF5]" />
                <span>
                  {formData.attachment ? formData.attachment.name : 'Upload screenshot or PDF (max 5MB)'}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({ ...formData, attachment: e.target.files?.[0] || null })
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#5D1CF5] hover:bg-[#4B14CC] text-white text-sm font-medium transition-colors shadow-xs"
            >
              Submit Ticket
            </button>
          </form>
        </section>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#5D1CF5]">{selectedTicket.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      STATUS_STYLES[selectedTicket.status] || STATUS_STYLES.Open
                    }`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-1">
                  {selectedTicket.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
              {selectedTicket.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#5D1CF5] text-white rounded-br-sm'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendReply}
              className="p-4 border-t border-slate-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#5D1CF5]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#5D1CF5] hover:bg-[#4B14CC] text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Live Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-[#5D1CF5] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-semibold">EduVora Live Support</span>
            </div>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="p-1 rounded-lg hover:bg-white/15"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto space-y-2.5 bg-slate-50">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#5D1CF5] text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChat();
            }}
            className="p-3 border-t border-slate-100 flex gap-2 bg-white"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#5D1CF5]"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-[#5D1CF5] text-white hover:bg-[#4B14CC]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}