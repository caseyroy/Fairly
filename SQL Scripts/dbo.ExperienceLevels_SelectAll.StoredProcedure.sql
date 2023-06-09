USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ExperienceLevels_SelectAll]    Script Date: 4/13/2023 5:28:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[ExperienceLevels_SelectAll]

as

/*

-- =============================================
-- Author: <Casey Roy>
-- Create date: <04/11/2023>
-- Description: <SelectAll proc for ExperienceLevels Table>
-- Code Reviewer:

-- MODIFIED BY: Casey Roy
-- MODIFIED DATE:04/12/2023
-- Code Reviewer:
-- Note:
-- =============================================


Execute dbo.ExperienceLevels_SelectAll

*/

BEGIN

SELECT	[Id],
		[Name],
		[Description]

FROM	[dbo].[ExperienceLevels]

END
GO
