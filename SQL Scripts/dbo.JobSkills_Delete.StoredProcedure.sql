USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[JobSkills_Delete]    Script Date: 4/13/2023 5:28:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobSkills_Delete]
			@JobId int,
			@SkillId int

as

/*

-- =============================================
-- Author: <Casey Roy>
-- Create date: <04/11/2023>
-- Description: <Delete proc for JobSkills Table>
-- Code Reviewer:Xizhou Zhu

-- MODIFIED BY: Casey Roy
-- MODIFIED DATE:04/12/2023
-- Code Reviewer:
-- Note:
-- =============================================

Declare @JobId int = 1,
		@SkillId int = 2



Execute dbo.JobSkills_Delete
			@JobId,
			@SkillId

*/

BEGIN

DELETE FROM	[dbo].[JobSkills]

WHERE		([JobId] = @JobId AND
			[SkillId] = @SkillId)


END
GO
