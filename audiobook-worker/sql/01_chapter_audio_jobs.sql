-- ============================================================================
-- EduVora Audiobook Worker — SQL Server Schema & Stored Procedures
-- ============================================================================

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'ChapterAudioJobs')
BEGIN
    CREATE TABLE dbo.ChapterAudioJobs (
        JobId           UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        CourseId        INT NOT NULL,
        ChapterNumber   INT NOT NULL,
        ChapterTitle    NVARCHAR(255) NOT NULL,
        SourcePdfPath   NVARCHAR(500) NOT NULL,
        ScriptFilePath  NVARCHAR(500) NULL,
        AudioFilePath   NVARCHAR(500) NULL,
        DurationSec     INT NULL,
        Status          VARCHAR(30) NOT NULL DEFAULT 'QUEUED',
        ErrorMessage    NVARCHAR(MAX) NULL,
        CreatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt       DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END;
GO

CREATE OR ALTER PROCEDURE dbo.EV_CreateChapterAudioJob
    @CourseId       INT,
    @ChapterNumber  INT,
    @ChapterTitle   NVARCHAR(255),
    @SourcePdfPath  NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @NewJobId UNIQUEIDENTIFIER = NEWID();

    INSERT INTO dbo.ChapterAudioJobs (JobId, CourseId, ChapterNumber, ChapterTitle, SourcePdfPath, Status)
    VALUES (@NewJobId, @CourseId, @ChapterNumber, @ChapterTitle, @SourcePdfPath, 'QUEUED');

    SELECT @NewJobId AS JobId;
END;
GO

CREATE OR ALTER PROCEDURE dbo.EV_UpdateChapterAudioJobStatus
    @JobId          UNIQUEIDENTIFIER,
    @Status         VARCHAR(30),
    @ScriptFilePath NVARCHAR(500) = NULL,
    @AudioFilePath  NVARCHAR(500) = NULL,
    @DurationSec    INT = NULL,
    @ErrorMessage   NVARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.ChapterAudioJobs
    SET
        Status         = @Status,
        ScriptFilePath = COALESCE(@ScriptFilePath, ScriptFilePath),
        AudioFilePath  = COALESCE(@AudioFilePath, AudioFilePath),
        DurationSec    = COALESCE(@DurationSec, DurationSec),
        ErrorMessage   = @ErrorMessage,
        UpdatedAt      = SYSUTCDATETIME()
    WHERE JobId = @JobId;
END;
GO

CREATE OR ALTER PROCEDURE dbo.EV_GetChapterAudioJob
    @JobId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    SELECT JobId, CourseId, ChapterNumber, ChapterTitle, SourcePdfPath,
           ScriptFilePath, AudioFilePath, DurationSec, Status, ErrorMessage,
           CreatedAt, UpdatedAt
    FROM dbo.ChapterAudioJobs
    WHERE JobId = @JobId;
END;
GO
