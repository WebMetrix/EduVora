import { Camera, Edit2, Calendar, ChevronDown, CheckCircle, User as UserIcon, Heart, Flag, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../https/axios';
import { toast } from 'react-toastify';

export default function PersonalInformationCard({ t, profileData, onPictureUpdated }) {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);
    const [imageHash, setImageHash] = useState(Date.now());

    //New File Upload State & Refs
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    //Trigger hidden file picker
    const handleCameraClick = () => {
        if (fileInputRef.current && !isUploading) {
            fileInputRef.current.click();
        }
    };

    //Handle the file selection and upload instantly
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('profileImage', file);

            await api.put('/profile/updatepicture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success(t('profile.personal.ProfilePictureSuccessfullyUpdated'));

            setImageHash(Date.now());

            if (onPictureUpdated) {
                onPictureUpdated();
            }
        } catch (error) {
            console.error("Upload error", error);
            toast.error(error.response?.data?.message || 'Failed to update picture.');
        } finally {
            setIsUploading(false);
            event.target.value = null;
        }
    };

    const getImageUrl = (dbPath) => {
        if (!dbPath) return null;

        // Strip the exact base network path from the DB string
        let formattedPath = dbPath.replace(/^\\\\EduVora-001\\EduVora-001\\UserData\\Profile\\/i, '');

        // Convert remaining Windows backslashes (\) to web forward slashes (/)
        formattedPath = formattedPath.replace(/\\/g, '/');

        // Construct the final URL using import.meta.env for Vite
        const baseUrl = import.meta.env.VITE_API_URL;

        return `${baseUrl}/avatars/${formattedPath}?t=${imageHash}`;
    }

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50 flex flex-col overflow-hidden group">
            <div className="flex flex-row items-start justify-between gap-3 mb-6 sm:mb-8">
                <h2 className="text-[16px] sm:text-[18px] font-bold text-slate-900 min-w-0 truncate pr-2 mt-1">{t('profile.personal.title')}</h2>
                <button
                    onClick={() => {
                        setIsNavigating(true);
                        setTimeout(() => navigate('/completeprofile'), 400);
                    }}
                    disabled={isNavigating}
                    className={`shrink-0 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 font-bold shadow-sm text-[12px] transition-all ${isNavigating ? 'opacity-50 cursor-not-allowed bg-indigo-50' : 'hover:bg-indigo-50'}`}
                >
                    <Edit2 className={`w-3.5 h-3.5 ${isNavigating ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">{isNavigating ? t('common.editing') : t('profile.personal.edit')}</span>
                    <span className="sm:hidden">{isNavigating ? t('common.loadingDots') : t('profile.personal.edit')}</span>
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Avatar */}
                {/* <div className="flex flex-col items-center min-w-[140px]">
                    
                    <div className="relative mb-4">
                        <div className="w-[100px] h-[100px] rounded-full bg-slate-200 overflow-hidden shadow-md">
                            <div className="w-full h-full bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 font-bold text-3xl">
                                {profileData?.FullName ? profileData.FullName.substring(0, 2).toUpperCase() : 'U'}
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all z-10">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="text-[16px] font-extrabold text-slate-900 flex items-center gap-1.5 leading-tight">
                        {profileData?.FullName || '-'} {profileData?.RoleID === 2 && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1.5 text-amber-500 font-bold text-[12.5px]">
                        {t('profile.personal.goldRank')}
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('profile.personal.memberSince')}</p>
                        <p className="text-[12px] font-semibold text-slate-700 mt-0.5">
                            {profileData?.CreatedDate ? new Date(profileData.CreatedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </p>
                    </div>
                </div> */}

                {/* Avatar */}
                <div className="flex flex-col items-center min-w-[140px]">

                    {/* Avatar Wrapper (Locks everything to 100x100) */}
                    <div className="relative mb-4 w-[100px] h-[100px]">

                        {/* The Circle Container (Cuts off corners) */}
                        <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden shadow-md flex items-center justify-center">

                            {/* Real Image */}
                            {profileData?.ProfilePicturePath && (
                                <img
                                    key={imageHash}
                                    src={getImageUrl(profileData.ProfilePicturePath)}
                                    alt="Profile"
                                    // w-full h-full forces it to fit the 100px div, object-cover prevents stretching
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback: If image fails, hide image and show initials
                                        e.target.style.display = 'none';
                                        if (e.target.nextSibling) {
                                            e.target.nextSibling.style.display = 'flex';
                                        }
                                    }}
                                />
                            )}

                            {/* Fallback Initials */}
                            <div
                                className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 items-center justify-center text-indigo-500 font-bold text-3xl"
                                // Hide this by default if we have an image path
                                style={{ display: profileData?.ProfilePicturePath ? 'none' : 'flex' }}
                            >
                                {profileData?.FullName ? profileData.FullName.substring(0, 2).toUpperCase() : 'U'}
                            </div>

                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                        />

                        {/* Camera Button */}
                        {/* <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all z-20">
                            <Camera className="w-4 h-4" />
                        </button> */}
                        <button
                            onClick={handleCameraClick}
                            disabled={isUploading}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all z-20 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {isUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                            ) : (
                                <Camera className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    <h3 className="text-[16px] font-extrabold text-slate-900 flex items-center gap-1.5 leading-tight">
                        {profileData?.FullName || '-'} {profileData?.RoleID === 2 && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1.5 text-amber-500 font-bold text-[12.5px]">
                        {t('profile.personal.goldRank')}
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('profile.personal.memberSince')}</p>
                        <p className="text-[12px] font-semibold text-slate-700 mt-0.5">
                            {profileData?.CreatedDate ? new Date(profileData.CreatedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </p>
                    </div>
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                            <UserIcon className="w-4 h-4" />
                            <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.fullName')}</label>
                        </div>
                        <div className="pl-6 text-[14px] text-slate-900 font-bold">
                            {profileData?.FullName || '-'}
                        </div>
                    </div>

                    <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                            <UserIcon className="w-4 h-4" />
                            <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.username')}</label>
                        </div>
                        <div className="pl-6 text-[14px] text-slate-900 font-bold">
                            {profileData?.Username || '-'}
                        </div>
                    </div>

                    <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                            <Calendar className="w-4 h-4" />
                            <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.dob')}</label>
                        </div>
                        <div className="pl-6 text-[14px] text-slate-900 font-bold">
                            {profileData?.DateOfBirth ? new Date(profileData.DateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                    </div>

                    <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                            <UserIcon className="w-4 h-4" />
                            <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.gender')}</label>
                        </div>
                        <div className="pl-6 text-[14px] text-slate-900 font-bold">
                            {profileData?.Gender || '-'}
                        </div>
                    </div>


                    <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                            <Flag className="w-4 h-4" />
                            <label className="text-[11px] font-bold uppercase tracking-wider">{t('completeProfile.nationality')}</label>
                        </div>
                        <div className="pl-6 text-[14px] text-slate-900 font-bold">
                            {profileData?.Nationality || t('completeProfile.options.in') || 'Indian'}
                        </div>
                    </div>

                    {/* <div className="group flex flex-col gap-1 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-indigo-50/60 hover:border-indigo-200 shadow-sm transition-all duration-300 md:col-span-2">
                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-indigo-500 transition-colors">
                            <Calendar className="w-4 h-4" />
                            <label className="text-[11px] font-bold uppercase tracking-wider">{t('profile.personal.dateOfJoining')}</label>
                        </div>
                        <div className="pl-6 text-[14px] text-slate-900 font-bold">
                            {profileData?.CreatedDate ? new Date(profileData.CreatedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}