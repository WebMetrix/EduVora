import React, { useState, useEffect } from 'react';
import { Edit2, User as UserIcon, Check, X, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/profileSlice';
import api from '../../https/axios';
import { toast } from 'react-toastify';

export default function AboutMeCard({ t, profileData, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [aboutText, setAboutText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch();

    // Initialize text from profileData
    useEffect(() => {
        if (profileData && profileData.AboutNotes !== undefined) {
            setAboutText(profileData.AboutNotes || '');
        }
    }, [profileData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setAboutText(profileData?.AboutNotes || '');
        setIsEditing(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await api.put('/profile/updateAbout', { aboutNotes: aboutText });
            toast.success(response.data.message || t('toast.profile.aboutUpdateSuccess'));
            dispatch(fetchUserProfile());
            setIsEditing(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to update About Me:', error);
            toast.error(error.response?.data?.message || t('toast.profile.aboutUpdateFailed'));
        } finally {
            setIsSaving(false);
        }
    };

    // Calculate character count
    const charCount = aboutText.length;
    const maxChars = 200;

    const handleChange = (e) => {
        const text = e.target.value;
        
        // Prevent typing if max chars exceeded, unless they are deleting
        if (text.length <= maxChars) {
            setAboutText(text);
        }
    };

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 relative">
            <div className="absolute top-6 right-6 flex items-center gap-2">
                {!isEditing ? (
                    <button 
                        onClick={handleEditClick}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors text-[12px] font-bold shadow-sm"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                        {t('profile.personal.edit')}
                    </button>
                ) : (
                    <>
                        <button 
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-[12px] font-bold disabled:opacity-50"
                        >
                            <X className="w-3.5 h-3.5" />
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving || charCount > maxChars}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#4f3bf3] text-white hover:bg-indigo-700 transition-colors text-[12px] font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                            Save
                        </button>
                    </>
                )}
            </div>

            <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50">
                    <UserIcon className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-bold text-slate-900">{t('profile.about.title')}</h2>
            </div>

            <p className="text-[12px] font-medium text-slate-500 mb-4 ml-12">{t('profile.about.subtitle')}</p>

            <div className={`mt-2 transition-all ${isEditing ? '' : 'bg-white border border-slate-100 rounded-xl p-5 min-h-[100px] shadow-[0_2px_10px_rgb(0,0,0,0.02)]'}`}>
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <textarea 
                            value={aboutText}
                            onChange={handleChange}
                            placeholder="Write something about yourself (max 200 characters)..."
                            className="w-full min-h-[120px] p-4 text-[13px] text-slate-700 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-y bg-white shadow-inner"
                        />
                        <div className="flex justify-end text-[11px] font-medium">
                            <span className={charCount >= maxChars ? 'text-red-500' : 'text-slate-400'}>
                                {charCount} / {maxChars} characters
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-[13px] text-slate-600 leading-relaxed font-semibold whitespace-pre-wrap">
                        {aboutText || t('profile.about.empty')}
                    </p>
                )}
            </div>
        </div>
    );
}