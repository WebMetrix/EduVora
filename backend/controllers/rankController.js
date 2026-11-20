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

// Fallback direct read query when stored procedure is being created in DB
const executeOverviewFallback = async (uuid) => {
    const query = `
    DECLARE @UUID VARCHAR(36) = @InputUUID;
    DECLARE @RootUserID NVARCHAR(100) = (SELECT TOP 1 UserID FROM [dbo].[Tb_UserDesc] WHERE UUID = @UUID);
    
    DECLARE @CurrentRankId INT = 1;
    DECLARE @AchievedDate DATETIME = NULL;

    SELECT TOP 1 
        @CurrentRankId = ISNULL(RankId, 1),
        @AchievedDate = AchievedDate
    FROM Tb_UserRank
    WHERE UserId = @UUID OR UserId = @RootUserID
    ORDER BY AchievedDate DESC;

    IF @AchievedDate IS NULL
    BEGIN
        SELECT @AchievedDate = ISNULL(CreatedDate, GETDATE()) FROM Tb_User WHERE UUID = @UUID;
    END

    DECLARE @NextRankId INT = CASE 
        WHEN @CurrentRankId < 4 THEN @CurrentRankId + 1 
        ELSE 4 
    END;

    DECLARE @CurrentLevel1Members INT = 0;
    SELECT @CurrentLevel1Members = COUNT(1)
    FROM Tb_UserRelationship
    WHERE (ParentUserId = @RootUserID OR ParentUserId = @UUID) AND Level = 1;

    DECLARE @TotalTeamMembers INT = 0;
    SELECT @TotalTeamMembers = COUNT(1)
    FROM Tb_UserRelationship
    WHERE (ParentUserId = @RootUserID OR ParentUserId = @UUID);

    DECLARE @CurrentLevel2Members INT = 0;
    SELECT @CurrentLevel2Members = COUNT(1)
    FROM Tb_UserRelationship
    WHERE (ParentUserId = @RootUserID OR ParentUserId = @UUID) AND Level = 2;

    DECLARE @ChildUUIDs TABLE (UUID VARCHAR(36));
    INSERT INTO @ChildUUIDs (UUID)
    SELECT ud.UUID 
    FROM Tb_UserRelationship ur
    JOIN Tb_UserDesc ud ON ud.UserID = ur.ChildUserId
    WHERE (ur.ParentUserId = @RootUserID OR ur.ParentUserId = @UUID) AND ur.Level = 1;

    DECLARE @CurrentBusiness DECIMAL(18,2) = 0.00;
    SELECT @CurrentBusiness = ISNULL(SUM(TotalAmount), 0.00)
    FROM Tb_Order
    WHERE OrderStatusId = '2'
      AND (UUID = @UUID OR UUID IN (SELECT UUID FROM @ChildUUIDs));

    DECLARE @CurrentQualifiedMembers INT = 0;
    SELECT @CurrentQualifiedMembers = COUNT(DISTINCT up.UUID)
    FROM Tb_UserPackage up
    WHERE up.IsActive = 1
      AND up.UUID IN (SELECT UUID FROM @ChildUUIDs);

    DECLARE @PackagePurchases INT = 0;
    SELECT @PackagePurchases = COUNT(1)
    FROM Tb_Order
    WHERE UUID = @UUID AND OrderStatusId = '2';

    DECLARE @TotalCommission DECIMAL(18,2) = 0.00;
    SELECT @TotalCommission = ISNULL(SUM(CommissionAmount), 0.00)
    FROM Tb_CommissionLedger
    WHERE UUID = @UUID;

    DECLARE @ReqBusiness DECIMAL(18,2) = 0.00;
    DECLARE @ReqLevel1 INT = 0;
    DECLARE @ReqQualified INT = 0;

    SELECT 
        @ReqBusiness = ISNULL(MinimumBusiness, 0),
        @ReqLevel1 = ISNULL(RequiredLevel1Members, 0),
        @ReqQualified = ISNULL(RequiredQualifiedMembers, 0)
    FROM Tb_RankMaster
    WHERE RankId = @NextRankId;

    DECLARE @BusinessPct DECIMAL(5,2) = CASE WHEN @ReqBusiness > 0 THEN ROUND(CASE WHEN (@CurrentBusiness / @ReqBusiness) * 100.0 > 100.0 THEN 100.0 ELSE (@CurrentBusiness / @ReqBusiness) * 100.0 END, 2) ELSE 100.0 END;
    DECLARE @Level1Pct DECIMAL(5,2) = CASE WHEN @ReqLevel1 > 0 THEN ROUND(CASE WHEN (CAST(@CurrentLevel1Members AS DECIMAL(18,2)) / @ReqLevel1) * 100.0 > 100.0 THEN 100.0 ELSE (CAST(@CurrentLevel1Members AS DECIMAL(18,2)) / @ReqLevel1) * 100.0 END, 2) ELSE 100.0 END;
    DECLARE @QualifiedPct DECIMAL(5,2) = CASE WHEN @ReqQualified > 0 THEN ROUND(CASE WHEN (CAST(@CurrentQualifiedMembers AS DECIMAL(18,2)) / @ReqQualified) * 100.0 > 100.0 THEN 100.0 ELSE (CAST(@CurrentQualifiedMembers AS DECIMAL(18,2)) / @ReqQualified) * 100.0 END, 2) ELSE 100.0 END;
    DECLARE @OverallPct DECIMAL(5,2) = ROUND((@BusinessPct + @Level1Pct + @QualifiedPct) / 3.0, 2);

    -- Result Set 1: Rank Summary
    SELECT 
        cr.RankId AS CurrentRankId,
        cr.RankName AS CurrentRankName,
        cr.Color AS CurrentRankColor,
        cr.IconPath AS CurrentRankIconPath,
        @AchievedDate AS AchievedDate,
        cr.RankBenefits AS CurrentRankBenefits,
        
        nr.RankId AS NextRankId,
        nr.RankName AS NextRankName,
        nr.Color AS NextRankColor,
        nr.IconPath AS NextRankIconPath,
        nr.RankBenefits AS NextRankBenefits,
        
        @ReqBusiness AS RequiredBusiness,
        @CurrentBusiness AS CurrentBusiness,
        @BusinessPct AS BusinessPercentage,
        
        @ReqLevel1 AS RequiredLevel1Members,
        @CurrentLevel1Members AS CurrentLevel1Members,
        @Level1Pct AS Level1Percentage,
        
        @ReqQualified AS RequiredQualifiedMembers,
        @CurrentQualifiedMembers AS CurrentQualifiedMembers,
        @QualifiedPct AS QualifiedPercentage,
        
        @OverallPct AS OverallProgressPercentage
    FROM Tb_RankMaster cr
    JOIN Tb_RankMaster nr ON nr.RankId = @NextRankId
    WHERE cr.RankId = @CurrentRankId;

    -- Result Set 2: Master Catalog
    SELECT 
        RankId,
        RankName,
        MinimumBusiness,
        RequiredLevel1Members,
        RequiredQualifiedMembers,
        Color,
        IconPath,
        RankBenefits
    FROM Tb_RankMaster
    WHERE IsActive = 1
    ORDER BY RankId ASC;

    -- Result Set 3: Achievements
    SELECT 
        am.AchievementId,
        am.Title,
        am.Description,
        am.Criteria,
        am.CategoryId,
        acm.CategoryName,
        am.Reward,
        am.Points,
        am.MetricType,
        am.TargetValue,
        am.IconName,
        am.IconBg,
        am.DisplayOrder,
        computed.Progress AS CurrentProgress,
        computed.IsEarned AS IsEarned,
        ISNULL(ua.EarnedDate, CASE WHEN computed.IsEarned = 1 THEN @AchievedDate ELSE NULL END) AS EarnedDate,
        computed.Status AS Status
    FROM Tb_AchievementMaster am
    JOIN Tb_AchievementCategoryMaster acm ON acm.CategoryId = am.CategoryId
    LEFT JOIN Tb_UserAchievement ua ON ua.AchievementId = am.AchievementId AND ua.UUID = @UUID
    CROSS APPLY (
        SELECT 
            prog.Val AS Progress,
            CASE WHEN ISNULL(ua.IsEarned, 0) = 1 OR prog.Val >= am.TargetValue THEN 1 ELSE 0 END AS IsEarned,
            CASE 
                WHEN ISNULL(ua.IsEarned, 0) = 1 OR prog.Val >= am.TargetValue THEN 'Earned'
                WHEN prog.Val > 0 THEN 'In Progress'
                ELSE 'Locked'
            END AS Status
        FROM (
            SELECT CASE 
                WHEN ua.CurrentProgress IS NOT NULL THEN ua.CurrentProgress
                WHEN am.MetricType = 'PACKAGE_PURCHASE' THEN CAST(@PackagePurchases AS DECIMAL(18,2))
                WHEN am.MetricType = 'DIRECT_REFERRALS' THEN CAST(@CurrentLevel1Members AS DECIMAL(18,2))
                WHEN am.MetricType = 'TEAM_MEMBERS' THEN CAST(@TotalTeamMembers AS DECIMAL(18,2))
                WHEN am.MetricType = 'LEVEL2_MEMBERS' THEN CAST(@CurrentLevel2Members AS DECIMAL(18,2))
                WHEN am.MetricType = 'TOTAL_COMMISSION' THEN @TotalCommission
                WHEN am.MetricType = 'RANK_REACHED' THEN CAST(@CurrentRankId AS DECIMAL(18,2))
                ELSE 0.00
            END AS Val
        ) prog
    ) computed
    WHERE am.IsActive = 1
    ORDER BY am.DisplayOrder ASC;

    -- Result Set 4: Recent Unlocks
    SELECT TOP 5
        am.AchievementId,
        am.Title,
        am.Description,
        am.Criteria,
        am.CategoryId,
        acm.CategoryName,
        am.Reward,
        am.Points,
        am.MetricType,
        am.TargetValue,
        am.IconName,
        am.IconBg,
        am.DisplayOrder,
        computed.Progress AS CurrentProgress,
        computed.IsEarned AS IsEarned,
        ISNULL(ua.EarnedDate, @AchievedDate) AS EarnedDate,
        'Earned' AS Status
    FROM Tb_AchievementMaster am
    JOIN Tb_AchievementCategoryMaster acm ON acm.CategoryId = am.CategoryId
    LEFT JOIN Tb_UserAchievement ua ON ua.AchievementId = am.AchievementId AND ua.UUID = @UUID
    CROSS APPLY (
        SELECT 
            prog.Val AS Progress,
            CASE WHEN ISNULL(ua.IsEarned, 0) = 1 OR prog.Val >= am.TargetValue THEN 1 ELSE 0 END AS IsEarned
        FROM (
            SELECT CASE 
                WHEN ua.CurrentProgress IS NOT NULL THEN ua.CurrentProgress
                WHEN am.MetricType = 'PACKAGE_PURCHASE' THEN CAST(@PackagePurchases AS DECIMAL(18,2))
                WHEN am.MetricType = 'DIRECT_REFERRALS' THEN CAST(@CurrentLevel1Members AS DECIMAL(18,2))
                WHEN am.MetricType = 'TEAM_MEMBERS' THEN CAST(@TotalTeamMembers AS DECIMAL(18,2))
                WHEN am.MetricType = 'LEVEL2_MEMBERS' THEN CAST(@CurrentLevel2Members AS DECIMAL(18,2))
                WHEN am.MetricType = 'TOTAL_COMMISSION' THEN @TotalCommission
                WHEN am.MetricType = 'RANK_REACHED' THEN CAST(@CurrentRankId AS DECIMAL(18,2))
                ELSE 0.00
            END AS Val
        ) prog
    ) computed
    WHERE am.IsActive = 1 AND computed.IsEarned = 1
    ORDER BY ISNULL(ua.EarnedDate, @AchievedDate) DESC;
    `;

    const request = pool.request();
    request.input('InputUUID', sql.VarChar(36), uuid);
    return await request.query(query);
};

// Get Full Overview for Rank & Achievements Page (ActionType 1)
export const getUserRanksOverview = async (req, res) => {
    // #swagger.tags = ['Ranks']
    try {
        const uuid = req.user.id;
        let result;

        try {
            const request = pool.request();
            request.input('ActionType', sql.Int, 1);
            request.input('UUID', sql.VarChar(36), uuid);
            result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
        } catch (spErr) {
            logger.warn(`SP execution failed, falling back to direct query: ${spErr.message}`);
            result = await executeOverviewFallback(uuid);
        }

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

        let result;
        try {
            const request = pool.request();
            request.input('ActionType', sql.Int, 2);
            request.input('UUID', sql.VarChar(36), uuid);
            request.input('CategoryId', sql.Int, categoryId);
            request.input('StatusFilter', sql.VarChar(20), statusFilter);
            request.input('SearchQuery', sql.NVarChar(100), searchQuery);
            request.input('PageNumber', sql.Int, page);
            request.input('PageSize', sql.Int, limit);
            result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
        } catch (spErr) {
            const overviewRes = await executeOverviewFallback(uuid);
            result = { recordset: overviewRes.recordsets[2] || [] };
        }

        const rawList = result.recordset || [];
        let achievements = rawList.map(normalizeAchievement);

        // Apply filters in memory if fallback was used
        if (categoryId) {
            achievements = achievements.filter(a => a.categoryId === categoryId);
        }
        if (statusFilter && statusFilter.toLowerCase() !== 'all') {
            achievements = achievements.filter(a => a.status.toLowerCase() === statusFilter.toLowerCase());
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            achievements = achievements.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
        }

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
        let result;

        try {
            const request = pool.request();
            request.input('ActionType', sql.Int, 3);
            request.input('UUID', sql.VarChar(36), uuid);
            result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
        } catch (spErr) {
            const overviewRes = await executeOverviewFallback(uuid);
            result = { recordset: overviewRes.recordsets[2] || [] };
        }

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
        let categories = [];

        try {
            const request = pool.request();
            request.input('ActionType', sql.Int, 4);
            request.input('UUID', sql.VarChar(36), uuid);
            const result = await request.execute('dbo.EV_GetUserRanksAndAchievements');
            categories = (result.recordset || []).map(c => ({
                id: c.CategoryId,
                name: c.CategoryName
            }));
        } catch (spErr) {
            const catRes = await pool.request().query("SELECT CategoryId, CategoryName FROM Tb_AchievementCategoryMaster WHERE IsActive = 1 ORDER BY CategoryId ASC");
            categories = (catRes.recordset || []).map(c => ({
                id: c.CategoryId,
                name: c.CategoryName
            }));
        }

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
