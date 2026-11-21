import pool, { sql } from '../config/db.js';
import logger from '../utils/logger.js';

// Helper to normalize Course Package summary from DB
const normalizePackage = (p) => {
    if (!p) return null;
    return {
        id: p.PackageId,
        packageId: p.PackageId,
        tag: p.PackageName || `Package ${p.PackageId || 'N/A'}`,
        name: p.PackageName || 'N/A',
        title: p.PackageName || 'N/A',
        price: Number(p.Price) || 0,
        description: p.Description || 'N/A',
        coverImagePath: p.CoverImagePath || null,
        purchasedDate: p.PurchaseDateFormatted || (p.PurchaseDate ? new Date(p.PurchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'),
        coursesCount: Number(p.TotalCourses) || 0,
        ebooksCount: Number(p.TotalEBooks) || 0,
        audioCount: Number(p.TotalAudioFiles) || 0,
        status: (p.OverallStatus || 'Not Started').toLowerCase().replace(/\s+/g, ''),
        statusLabel: p.OverallStatus || 'Not Started',
        statusColor: p.OverallStatus === 'Completed'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
            : p.OverallStatus === 'In Progress'
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
            : 'bg-slate-100 text-slate-500 border-slate-200/60',
        progressPercentage: Number(p.OverallProgressPercentage) || 0
    };
};

// Helper to normalize Course from DB
const normalizeCourse = (c) => {
    if (!c) return null;
    return {
        id: `course-${c.CourseId}`,
        courseId: c.CourseId,
        packageId: c.PackageId,
        packageName: c.PackageName || 'N/A',
        number: c.CourseNumber || `Course ${c.CourseId}`,
        title: c.CourseName || 'N/A',
        name: c.CourseName || 'N/A',
        description: c.CourseDescr || 'N/A',
        summary: c.CourseDescr || 'N/A',
        displayOrder: c.DisplayOrder || 1,
        ebooksCount: Number(c.TotalEBooksInCourse) || 0,
        audioCount: Number(c.TotalAudioInCourse) || 0,
        ebooks: []
    };
};

// Helper to normalize EBook item from DB
const normalizeEBook = (eb, chaptersList = []) => {
    if (!eb) return null;
    const ebChapters = chaptersList.filter(c => c.EBookId === eb.EBookId || c.ebookId === eb.EBookId);

    return {
        id: `eb-${eb.EBookId}`,
        ebookId: eb.EBookId,
        courseId: eb.CourseId,
        packageId: eb.PackageId,
        packageName: eb.PackageName || 'N/A',
        courseName: eb.CourseName || 'N/A',
        number: eb.EBookNumber || (eb.DisplayOrder ? `EBook ${eb.DisplayOrder}` : 'N/A'),
        title: eb.Title || 'N/A',
        summary: eb.Summary || 'N/A',
        duration: eb.DurationText || 'N/A',
        pages: eb.TotalPages ? `${eb.TotalPages} pages` : 'N/A',
        totalPages: Number(eb.TotalPages) || 0,
        coverImagePath: eb.CoverImagePath || null,
        pdfFilePath: eb.PdfFilePath || null,
        displayOrder: eb.DisplayOrder || 1,
        currentPage: Number(eb.CurrentPage) || 1,
        lastChapterId: eb.LastChapterId || null,
        isBookmarked: eb.IsBookmarked === true || eb.IsBookmarked === 1,
        audioPositionSeconds: Number(eb.AudioPositionSeconds) || 0,
        status: eb.Status || 'notStarted',
        progressPercentage: Number(eb.ProgressPercentage) || 0,
        chapterCount: Number(eb.ChapterCount) || ebChapters.length,
        chapters: ebChapters.length > 0 
            ? ebChapters.map(c => `${c.ChapterNumber || c.chapterNumber || 'N/A'}. ${c.Title || c.title || 'N/A'}`)
            : [],
        chaptersData: ebChapters.map(c => ({
            id: c.ChapterId ?? c.id,
            chapterId: c.ChapterId ?? c.id,
            ebookId: c.EBookId ?? c.ebookId,
            number: c.ChapterNumber ?? c.number ?? 'N/A',
            title: c.Title ?? c.title ?? 'N/A',
            subtitle: c.Subtitle ?? c.subtitle ?? 'N/A',
            pagesLabel: c.PagesLabel ?? c.pagesLabel ?? (c.StartPage && c.EndPage ? `Page ${c.StartPage} - ${c.EndPage}` : 'N/A'),
            startPage: c.StartPage ?? c.startPage ?? 1,
            endPage: c.EndPage ?? c.endPage ?? 1,
            audioTitle: c.AudioTitle ?? c.audioTitle ?? 'N/A',
            audioUrlPath: c.AudioUrlPath ?? c.audioUrlPath ?? null,
            audioDurationSeconds: Number(c.AudioDurationSeconds ?? c.audioDurationSeconds) || 0
        }))
    };
};

// GET /courses - Action 1: Main Courses Overview
export const getUserCourses = async (req, res) => {
    // #swagger.tags = ['Courses']
    try {
        const uuid = req.user.id;
        const packageId = req.query.packageId ? parseInt(req.query.packageId) : null;

        const request = pool.request();
        request.input('Action', sql.Int, 1);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('PackageId', sql.Int, packageId);

        const result = await request.execute('EV_GetUserCourses');

        const rawPackages = result.recordsets[0] || [];
        const rawCourses = result.recordsets[1] || [];
        const rawEBooks = result.recordsets[2] || [];
        const rawCurriculum = result.recordsets[3] || [];

        const packages = rawPackages.map(normalizePackage);
        const courses = rawCourses.map(normalizeCourse);
        const ebooks = rawEBooks.map(eb => normalizeEBook(eb, rawCurriculum));

        // Group EBooks under each Course
        const coursesWithEBooks = courses.map(crs => {
            const courseEBooks = ebooks.filter(eb => eb.courseId === crs.courseId);
            return {
                ...crs,
                ebooksCount: courseEBooks.length,
                ebooks: courseEBooks
            };
        });

        // Group Courses under each Package
        const packagesWithContent = packages.map(pkg => {
            const pkgCourses = coursesWithEBooks.filter(crs => crs.packageId === pkg.packageId);
            const pkgEBooks = ebooks.filter(eb => eb.packageId === pkg.packageId);
            return {
                ...pkg,
                coursesCount: Number(pkg.coursesCount) || pkgCourses.length,
                ebooksCount: Number(pkg.ebooksCount) || pkgEBooks.length,
                courses: pkgCourses,
                content: pkgCourses // backwards-compatible
            };
        });

        res.status(200).json({
            success: true,
            packages: packagesWithContent,
            courses: coursesWithEBooks,
            ebooks,
            curriculum: rawCurriculum
        });
    } catch (error) {
        logger.error(`Error fetching user courses: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses overview'
        });
    }
};

// GET /courses/reader/:ebookId - Action 2: EBook Interactive Reader Canvas & Audio Details
export const getEBookReaderDetails = async (req, res) => {
    // #swagger.tags = ['Courses']
    try {
        const uuid = req.user.id;
        const ebookId = parseInt(req.params.ebookId);
        const chapterId = req.query.chapterId ? parseInt(req.query.chapterId) : null;

        if (!ebookId) {
            return res.status(400).json({ success: false, message: 'Valid EBook ID is required' });
        }

        const request = pool.request();
        request.input('Action', sql.Int, 2);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('EBookId', sql.Int, ebookId);
        request.input('ChapterId', sql.Int, chapterId);

        const result = await request.execute('EV_GetUserCourses');

        const rawEBook = result.recordsets[0]?.[0] || null;
        const rawChapters = result.recordsets[1] || [];
        const rawActiveChapter = result.recordsets[2]?.[0] || null;

        if (!rawEBook) {
            return res.status(404).json({ success: false, message: 'EBook not found or access denied' });
        }

        const ebook = {
            id: rawEBook.EBookId,
            ebookId: rawEBook.EBookId,
            packageId: rawEBook.PackageId,
            packageName: rawEBook.PackageName || 'N/A',
            number: rawEBook.EBookNumber || 'N/A',
            title: rawEBook.Title || 'N/A',
            summary: rawEBook.Summary || 'N/A',
            duration: rawEBook.DurationText || 'N/A',
            totalPages: Number(rawEBook.TotalPages) || 0,
            coverImagePath: rawEBook.CoverImagePath || null,
            pdfFilePath: rawEBook.PdfFilePath || null,
            currentPage: Number(rawEBook.CurrentPage) || 1,
            lastChapterId: rawEBook.LastChapterId || null,
            isBookmarked: rawEBook.IsBookmarked === true || rawEBook.IsBookmarked === 1,
            audioPositionSeconds: Number(rawEBook.AudioPositionSeconds) || 0,
            status: rawEBook.Status || 'notStarted',
            progressPercentage: Number(rawEBook.ProgressPercentage) || 0
        };

        const chapters = rawChapters.map(ch => ({
            id: ch.ChapterId,
            chapterId: ch.ChapterId,
            ebookId: ch.EBookId,
            number: ch.ChapterNumber || 'N/A',
            title: ch.Title || 'N/A',
            subtitle: ch.Subtitle || 'N/A',
            pagesLabel: ch.PagesLabel || (ch.StartPage && ch.EndPage ? `Page ${ch.StartPage} - ${ch.EndPage}` : 'N/A'),
            pages: ch.PagesLabel || (ch.StartPage && ch.EndPage ? `Page ${ch.StartPage} - ${ch.EndPage}` : 'N/A'),
            startPage: Number(ch.StartPage) || 1,
            endPage: Number(ch.EndPage) || 1,
            displayOrder: Number(ch.DisplayOrder) || 1,
            audioTitle: ch.AudioTitle || 'N/A',
            audioUrlPath: ch.AudioUrlPath || null,
            audioDurationSeconds: Number(ch.AudioDurationSeconds) || 0,
            isCurrentActive: ch.IsCurrentActive === 1 || ch.IsCurrentActive === true,
            isLocked: ch.IsLocked === 1 || ch.IsLocked === true
        }));

        const activeChapter = rawActiveChapter ? {
            id: rawActiveChapter.ChapterId,
            chapterId: rawActiveChapter.ChapterId,
            ebookId: rawActiveChapter.EBookId,
            number: rawActiveChapter.ChapterNumber || 'N/A',
            title: rawActiveChapter.Title || 'N/A',
            subtitle: rawActiveChapter.Subtitle || 'N/A',
            pagesLabel: rawActiveChapter.PagesLabel || (rawActiveChapter.StartPage && rawActiveChapter.EndPage ? `Page ${rawActiveChapter.StartPage} - ${rawActiveChapter.EndPage}` : 'N/A'),
            startPage: Number(rawActiveChapter.StartPage) || 1,
            endPage: Number(rawActiveChapter.EndPage) || 1,
            leadParagraph: rawActiveChapter.LeadParagraph || 'N/A',
            contentBody: rawActiveChapter.ContentBody || 'N/A',
            illustrationPath: rawActiveChapter.IllustrationPath || null,
            audioTitle: rawActiveChapter.AudioTitle || 'N/A',
            audioDesc: rawActiveChapter.AudioDesc || 'N/A',
            audioUrlPath: rawActiveChapter.AudioUrlPath || null,
            audioDurationSeconds: Number(rawActiveChapter.AudioDurationSeconds) || 0,
            displayOrder: Number(rawActiveChapter.DisplayOrder) || 1,
            audioPositionSeconds: Number(rawActiveChapter.AudioPositionSeconds) || 0,
            isBookmarked: rawActiveChapter.IsBookmarked === true || rawActiveChapter.IsBookmarked === 1
        } : null;

        res.status(200).json({
            success: true,
            ebook,
            chapters,
            activeChapter
        });
    } catch (error) {
        logger.error(`Error fetching eBook reader details: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch eBook reader details'
        });
    }
};

// POST /courses/progress - Action 3: Save / Sync User Reading & Audio Progress
export const saveUserProgress = async (req, res) => {
    // #swagger.tags = ['Courses']
    try {
        const uuid = req.user.id;
        const {
            ebookId,
            currentPage,
            lastChapterId,
            isBookmarked,
            audioPositionSeconds,
            status
        } = req.body;

        if (!ebookId) {
            return res.status(400).json({ success: false, message: 'EBook ID is required' });
        }

        const request = pool.request();
        request.input('Action', sql.Int, 3);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('EBookId', sql.Int, parseInt(ebookId));
        request.input('CurrentPage', sql.Int, currentPage ? parseInt(currentPage) : null);
        request.input('LastChapterId', sql.Int, lastChapterId ? parseInt(lastChapterId) : null);
        request.input('IsBookmarked', sql.Bit, isBookmarked !== undefined ? (isBookmarked ? 1 : 0) : null);
        request.input('AudioPositionSeconds', sql.Int, audioPositionSeconds !== undefined ? parseInt(audioPositionSeconds) : null);
        request.input('Status', sql.VarChar(20), status || null);

        const result = await request.execute('EV_GetUserCourses');
        const statusRow = result.recordset?.[0] || { Success: 1, Message: 'Progress updated successfully.' };

        res.status(200).json({
            success: statusRow.Success === 1,
            message: statusRow.Message
        });
    } catch (error) {
        logger.error(`Error saving user course progress: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to save course progress'
        });
    }
};

// GET /courses/audio - Action 4: Single Chapter Audio Details Lookup
export const getChapterAudio = async (req, res) => {
    // #swagger.tags = ['Courses']
    try {
        const uuid = req.user.id;
        const chapterId = req.query.chapterId ? parseInt(req.query.chapterId) : null;
        const ebookId = req.query.ebookId ? parseInt(req.query.ebookId) : null;

        const request = pool.request();
        request.input('Action', sql.Int, 4);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('ChapterId', sql.Int, chapterId);
        request.input('EBookId', sql.Int, ebookId);

        const result = await request.execute('EV_GetUserCourses');
        const rawAudio = result.recordset || [];

        const audioList = rawAudio.map(a => ({
            chapterId: a.ChapterId,
            ebookId: a.EBookId,
            ebookTitle: a.EBookTitle || 'N/A',
            chapterNumber: a.ChapterNumber || 'N/A',
            chapterTitle: a.ChapterTitle || 'N/A',
            audioTitle: a.AudioTitle || a.ChapterTitle || 'N/A',
            audioDesc: a.AudioDesc || 'N/A',
            audioUrlPath: a.AudioUrlPath || null,
            audioDurationSeconds: Number(a.AudioDurationSeconds) || 0,
            audioPositionSeconds: Number(a.AudioPositionSeconds) || 0
        }));

        res.status(200).json({
            success: true,
            audio: audioList[0] || null,
            allAudios: audioList
        });
    } catch (error) {
        logger.error(`Error fetching chapter audio: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch audio track details'
        });
    }
};
