export default function ProfileTabs({ tabs, activeTab, setActiveTab }) {
    return (
        <div className="flex items-center gap-6 border-b border-slate-200 overflow-x-auto pb-px [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-3 border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                            ? 'border-indigo-600 text-indigo-700'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-[13px] font-bold">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}