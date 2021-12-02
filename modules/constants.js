const tblList = {
    //Tables
    'INVProduct': 'MTX.INVProductGrpMapping_Allocation',
    'AlertMaster': 'dbo.alertmaster',
    'Users': 'CRM.UserDetails',
    'UsersWFH': 'CRM.UserDetails',
    'CallingCom_CRMUserDetails': 'CRM.UserDetails',
    'UserGroup': 'CRM.UserGroupMaster',
    'vwUserGroup': 'CRM.UserGroupMaster (NOLOCK) UGM INNER JOIN CRM.ProductGroupMapping (NOLOCK) PGM ON UGM.UserGroupID = PGM.GroupId',
    'UserCallDetails': 'MTX.CallDataHistory (NOLOCK) CDH INNER JOIN CRM.UserDetails (NOLOCK) UD ON CDH.UserID = UD.UserID',
    'Suppliers': 'MTX.vwGetSupplierPlanName',
    'AgentGradeRules_Allocation': 'MTX.AgentGradeRules_Allocation',
    'AgentRules': 'MTX.AgentGradeRules_Allocation',
    'AgentRulesName': 'MTX.AgentGradeRules_Allocation',
    'AgentRulesWithId': 'MTX.AgentGradeRules_Allocation',
    'GradeRulesName': 'MTX.GradeRulesMapping_Allocation',
    'vwGradeRuleMapping': 'MTX.AgentGradeRules_Allocation (NOLOCK) AGR INNER JOIN mtx.GradeRulesMapping_Allocation (NOLOCK) GRM ON AGR.RuleID = GRM.RuleID',
    'GradeLimit': 'MTX.Grade_LimitMapping_Allocation',
    'HealthAgeGrpMapping': 'MTX.HealthAgeGrpMapping_Allocation',
    'NWHLogic': 'MTX.NWHLogic_Allocation',
    'TermProductGrpMapping': 'MTX.TermProductGrpMapping_Allocation',
    'ScoreMaster': '[MTX].[ScoreMaster]',
    'ProcessName_ScoreMaster': '[MTX].[ScoreMaster]',
    'PayTermBucketScore': '[MTX].[PayTermBucketScore]',
    'PremiumBucketScore': '[MTX].[PremiumBucketScore]',
    'ProcessName_PremiumBucketScore': '[MTX].[PremiumBucketScore]',
    'BrandScore': '[MTX].[BrandScore]',
    'AllocationProcessMaster': 'MTX.AllocationProcessMaster',
    'SupplierScore': '[MTX].[SupplierScore]',
    'AnnualIncomeScore': '[MTX].[AnnualIncomeScore]',
    'AgeBucketScoreMaster': '[MTX].[AgeBucketScoreMaster]',
    'CustomUtmScore': '[MTX].[CustomUtmScore]',
    'LeadSourceScore': '[MTX].[LeadSourceScore]',
    'LeadScoreRankMapping': '[MTX].[LeadScoreRankMapping]',
    'LeadAgentRankMapping': 'MTX.LeadAgentRankMapping_NewApp',
    'ProductGrpMapping': 'MTX.ProductGrpMapping_Allocation',
    'Products': 'dbo.Products',
    'UserMenu': 'CRM.UserMenuMap',


    //Stored Procedures
    'GetSupervisor': '[MTX].[GetSupervisor]',
    'GetProducts': '[MTX].[GetProducts]',
    'AgentLoginTracker': '[MTX].[AgentLoginTracker]',
    'GetAgentIdleTime': '[MTX].[GetAgentIdleTime]',
    'CallBackTracker': '[MTX].[CallBackTracker_New]',
    'AssignedToAgent': '[CRM].[Insert_AssignedToAgent]',
    'GetTLList': '[MTX].[GetTLList]',
    'GetAgentStats': '[MTX].[GetAgentStats]',
    'GetUserStats': '[MTX].[GetUserStats]',
    'AgentLeadsNotCalled': '[MTX].[AgentLeadsNotCalled]',

    // Mongo Collections
    'History': 'UpdateHistory',
    'livechat_department': 'rocketchat_livechat_department',
    'livechat_department_agents': 'rocketchat_livechat_department_agents',

};

module.exports = {
    ...tblList
};