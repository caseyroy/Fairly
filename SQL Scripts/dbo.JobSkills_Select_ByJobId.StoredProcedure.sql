USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[JobSkills_Select_ByJobId]    Script Date: 4/13/2023 5:28:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobSkills_Select_ByJobId]
			@JobId int

as

/*

-- =============================================
-- Author: <Casey Roy>
-- Create date: <04/11/2023>
-- Description: <Select_ByJobId proc for JobSkills Table>
-- Code Reviewer: Xizhou Zhu

-- MODIFIED BY: Casey Roy
-- MODIFIED DATE:04/12/2023
-- Code Reviewer:
-- Note:
-- =============================================



Declare @JobId int = 1



Execute dbo.JobSkills_Select_ByJobId
			@JobId

*/

BEGIN

SELECT		[JobId],
			[SkillId],
			[ExperienceLevelId],
			[YearsRangeStart],
			[YearsRangeEnd],
			[DateCreated],
			[DateModified]


FROM		[dbo].[JobSkills]

WHERE		[JobId] = @JobId



END
GO
