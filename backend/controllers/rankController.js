import pool, { sql } from '../config/db.js';
import logger from '../utils/logger.js';

// Helper to normalize Rank Summary and Progress Metrics
const normalizeRankSummary = (r) => {
    if (!r) return null;
    return {
        currentRankId: r.CurrentRankId ?? 1,
        currentRankName: r.CurrentRankName ?? 'Bronze',
        currentRankColor: r.CurrentRankColor ?? '#CD7F32',
        currentRankIconPath: r.CurrentRankIconPath ?? '/assets/icons/ranks/bronze.png',
        achievedDate: r.AchievedDate ?? new Date().toISOString(),
        currentRankBenefits: (r.CurrentRankBenefits || '').split('|').filter(Boolean),

        nextRankId: r.NextRankId ?? (r.CurrentRankId < 4 ? r.CurrentRankId + 1 : 4),
        nextRankName: r.NextRankName ?? (r.CurrentRankId === 1 ? 'Silver' : r.CurrentRankId === 2 ? 'Gold' : 'Diamond'),
        nextRankColor: r.NextRankColor ?? '#C0C0C0',
        nextRankIconPath: r.NextRankIconPath ?? '/assets/icons/ranks/silver.png',
        nextRankBenefits: (r.NextRankBenefits || '').split('|').filter(Boolean),

        requiredBusiness: Number(r.RequiredBusiness) || 0,
        currentBusiness: Number(r.CurrentBusiness) || 0,
        businessPercentage: Number(r.BusinessPercentage) || 0,

        requiredLevel1Members: Number(r.RequiredLevel1Members) || 0,
        currentLevel1Members: Number(r.CurrentLevel1Members) || 0,
        level1Percentage: Number(r.Level1Percentage) || 0,

        requiredQualifiedMembers: Number(r.RequiredQualifiedMembers) || 0,
        currentQualifiedMembers: Number(r.CurrentQualifiedMembers) || 0,
        qualifiedPercentage: Number(r.QualifiedPercentage) || 0,

        overallProgressPercentage: Number(r.OverallProgressPercentage) || 0
    };
};

// Helper to normalize Achievement items
const normalizeAchievement = (a) => {
    if (!a) return null;
    return {
        id: a.AchievementId ?? a.id,
        achievementId: a.AchievementId ?? a.id,
        title: a.Title ?? a.title ?? '',
        description: a.Description ?? a.description ?? '',
        criteria: a.Criteria ?? a.criteria ?? '',
        categoryId: a.CategoryId ?? a.categoryId ?? 1,
        category: a.CategoryName ?? a.category ?? 'General',
        categoryName: a.CategoryName ?? a.categoryName ?? 'General',
        reward: a.Reward ?? a.reward ?? '',
        points: Number(a.Points ?? a.points ?? 0),
        metricType: a.MetricType ?? a.metricType ?? '',
        targetValue: Number(a.TargetValue ?? a.targetValue ?? 0),
        iconName: a.IconName ?? a.iconName ?? 'Trophy',
        iconBg: a.IconBg ?? a.iconBg ?? 'bg-yellow-50',
        displayOrder: a.DisplayOrder ?? a.displayOrder ?? 1,
        progress: Number(a.CurrentProgress ?? a.progress ?? 0),
        currentProgress: Number(a.CurrentProgress ?? a.currentProgress ?? 0),
        total: Number(a.TargetValue ?? a.total ?? 0),
        isEarned: a.IsEarned === true || a.IsEarned === 1 || a.isEarned === 1 || a.isEarned === true,
        date: a.EarnedDate ?? a.date ?? null,
        earnedDate: a.EarnedDate ?? a.earnedDate ?? null,
        status: a.Status ?? a.status ?? (a.IsEarned ? 'Earned' : (a.CurrentProgress > 0 ? 'In Progress' : 'Locked'))
    };
};

// Get Full Overview for Rank & Achievements Page (ActionType 1)
export const getUserRanksOverview = async (req, res) => {
    // #swagger.tags = ['Ranks']
    try {
        const uuid = req.user.id;

        const request = pool.request();
        request.input('ActionType', sql.Int, 1);
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_GetUserRanksAndAchievements');

        // Result Set 1: Current & Next Rank Summary
        const rawSummary = result.recordsets[0]?.[0];
        const rankSummary = normalizeRankSummary(rawSummary);

        // Result Set 2: All Ranks Master Catalog
        const rawCatalog = result.recordsets[1] || [];
        const ranksCatalog = rawCatalog.map((rk) => ({
            rankId: rk.RankId,
            rankName: rk.RankName,
            minimumBusiness: rk.MinimumBusiness,
            requiredLevel1Members: rk.RequiredLevel1Members,
            requiredQualifiedMembers: rk.RequiredQualifiedMembers,
            color: rk.Color,
            iconPath: rk.IconPath,
            benefits: (rk.RankBenefits || '').split('|').filter(Boolean)
        }));

        // Result Set 3: Achievements List & Tab Counts
        const rawAchievements = result.recordsets[2] || [];
        const achievements = rawAchievements.map(normalizeAchievement);

        const counts = {
            all: achievements.length,
            earned: achievements.filter(a => a.status === 'Earned').length,
            inProgress: achievements.filter(a => a.status === 'In Progress').length,
            locked: achievements.filter(a => a.status === 'Locked').length
        };

        // Result Set 4: Recent Achievements Feed
        const rawRecent = result.recordsets[3] || [];
        const recentAchievements = rawRecent.map(normalizeAchievement);

        res.status(200).json({
            success: true,
            rankSummary,
            ranksCatalog,
            achievements,
            counts,
            recentAchievements
        });
    } catch (error) {
        logger.error(`Error fetching user ranks overview: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch rank and achievements data'
        });
    }
};

// Get Filtered Achievements for View All Modal (ActionType 2)
export const getFilteredAchievements = async (req, res) => {
    // #swagger.tags = ['Ranks']
    try {
        const uuid = req.user.id;
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
        const statusFilter = req.query.status || req.query.statusFilter || null;
        const searchQuery = req.query.search || req.query.searchQuery || null;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const request = pool.request();
        request.input('ActionType', sql.Int, 2);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('CategoryId', sql.Int, categoryId);
        request.input('StatusFilter', sql.VarChar(20), statusFilter);
        request.input('SearchQuery', sql.NVarChar(100), searchQuery);
        request.input('PageNumber', sql.Int, page);
        request.input('PageSize', sql.Int, limit);

        const result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
        const rawList = result.recordset || [];
        const achievements = rawList.map(normalizeAchievement);

        res.status(200).json({
            success: true,
            achievements
        });
    } catch (error) {
        logger.error(`Error fetching filtered achievements: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch filtered achievements'
        });
    }
};

// Get Chronological History Audit Timeline (ActionType 3)
export const getAchievementHistory = async (req, res) => {
    // #swagger.tags = ['Ranks']
    try {
        const uuid = req.user.id;

        const request = pool.request();
        request.input('ActionType', sql.Int, 3);
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
        const rawList = result.recordset || [];
        const history = rawList.map(normalizeAchievement);

        res.status(200).json({
            success: true,
            history
        });
    } catch (error) {
        logger.error(`Error fetching achievement history: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch achievement history'
        });
    }
};

// Get Achievement Categories for Dropdown (ActionType 4)
export const getAchievementCategories = async (req, res) => {
    // #swagger.tags = ['Ranks']
    try {
        const uuid = req.user.id;

        const request = pool.request();
        request.input('ActionType', sql.Int, 4);
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
        const categories = (result.recordset || []).map(c => ({
            id: c.CategoryId,
            name: c.CategoryName
        }));

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        logger.error(`Error fetching achievement categories: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch achievement categories'
        });
    }
};
