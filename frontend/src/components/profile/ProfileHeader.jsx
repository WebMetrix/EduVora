export default function ProfileHeader({ t }) {
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-900">{t('profile.title')}</h1>
            <p className="text-[13px] font-medium text-slate-500">{t('profile.subtitle')}</p>
        </div>
    );
}