USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[JobSkills_Update]    Script Date: 4/13/2023 5:28:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Casey Roy>
-- Create date: <04/11/2023>
-- Description: <Update proc for JobSkills Table>
-- Code Reviewer: Xizhou Zhu

-- MODIFIED BY: Casey Roy
-- MODIFIED DATE:04/12/2023
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[JobSkills_Update]
			@JobId int,
			@SkillId int,
			@ExperienceLevelId int,
			@YearsRangeStart int,
			@YearsRangeEnd int

as

/*

Declare @JobId int = 5,
		@SkillId int = 5,
		@ExperienceLevelId int = 4,
		@YearsRangeStart int = 5,
		@YearsRangeEnd int = 8


Execute dbo.JobSkills_Update
		@JobId,
		@SkillId,
		@ExperienceLevelId,
		@YearsRangeStart,
		@YearsRangeEnd

*/

BEGIN

DECLARE		@dateNow datetime2 = getutcdate()

UPDATE		[dbo].[JobSkills]
SET			[ExperienceLevelId] = @ExperienceLevelId,
			[YearsRangeStart] = @YearsRangeStart,
			[YearsRangeEnd] = @YearsRangeEnd,
			[DateModified] = @dateNow

WHERE		([JobId] = @JobId AND
			[SkillId] = @SkillId)


END
GO
