const LocalizationKey = {
  login: {
    management: "login.management",
    label: {
      signIn: "login.label.signIn",
      userName: "login.label.userName",
      password: "login.label.password",
      forgotPassword: "login.label.forgotPassword",
    },
    btnlabel: {
      signIn: "login.btnlabel.signIn",
    },
    placeholder: {
      userName: "login.placeholder.userName",
      password: "login.placeholder.password",
    },
    error: {
      usernameRequired: "common.errorMessage.auth.login.usernameRequired",
      passwordRequired: "common.errorMessage.auth.login.passwordRequired",
    },
  },
  changePassword: {
    label: {
      createNewPassword: "changePassword.label.createNewPassword",
      enterNewPassword: "changePassword.label.enterNewPassword",
      confirmNewPassword: "changePassword.label.confirmNewPassword",
      success: "changePassword.label.success",
      title: "changePassword.label.title",
    },
    btnlabel: {
      changePassword: "changePassword.btnlabel.changePassword",
      cancel: "changePassword.btnlabel.cancel",
    },
    validationInfo: {
      charCount: "changePassword.validationInfo.charCount",
      uppercase: "changePassword.validationInfo.uppercase",
      lowercase: "changePassword.validationInfo.lowercase",
      number: "changePassword.validationInfo.number",
      symbol: "changePassword.validationInfo.symbol",
      match: "changePassword.validationInfo.match",
    },
    placeholder: {
      password: "changePassword.placeholder.password",
      confirmPassword: "changePassword.placeholder.confirmPassword",
    },
    error: {
      minLength: "common.errorMessage.auth.changePassword.minLength",
      uppercaseRequired:
        "common.errorMessage.auth.changePassword.uppercaseRequired",
      lowercaseRequired:
        "common.errorMessage.auth.changePassword.lowercaseRequired",
      numberRequired: "common.errorMessage.auth.changePassword.numberRequired",
      specialCharRequired:
        "common.errorMessage.auth.changePassword.specialCharRequired",
      required: "common.errorMessage.auth.changePassword.required",
      match: "common.errorMessage.auth.changePassword.match",
      confirmRequired:
        "common.errorMessage.auth.changePassword.confirmRequired",
    },
  },
  forgotPassword: {
    label: {
      enterUsername: "forgotPassword.label.enterUsername",
      link: "forgotPassword.label.link",
      success: "forgotPassword.label.success",
    },
    btnlabel: {
      send: "forgotPassword.btnlabel.send",
      back: "forgotPassword.btnlabel.back",
      process: "forgotPassword.btnlabel.process",
    },
    placeholder: "forgotPassword.placeholder",
    errorRequired: "common.errorMessage.auth.forgotPassword.required",
  },
  footerLabel: "footer.label",
  common: {
    noDataLabel: "common.noData",
    complexity: "common.complexity",
    submit: "common.submit",
    somethingWentWrongTitle: "common.somethingWentWrong.title",
    configurationErrorDesc: "common.configurationError.description",
    somethingWentWrongDesc: "common.somethingWentWrong.description",
    pageNotFoundTitle: "common.notFound.title",
    pageNotFoundDesc: "common.notFound.description",
    permissionDeniedTitle: "common.permissionDenied.title",
    permissionDeniedDesc: "common.permissionDenied.description",
    permissionErrorTitle: "common.permissionError.title",
    permissionErrorDesc: "common.permissionError.description",
    pageInProgressTitle: "common.label.pageInProgressTitle",
    pageInProgressDesc: "common.label.pageInProgressDescription",
    goBackHomeBtnLabel: "common.button.goBackHome",
    collapse: "common.button.collapse",
    backBtn: "common.button.back",
    shareBtn: "common.button.share",
    nextBtn: "common.button.next",
    exportBtn: "common.button.export",
    saveBtn: "common.button.save",
    okayBtn: "common.button.okay",
    cancelBtn: "common.button.cancel",
    createdDateLabel: "common.label.createdDate",
    selectedLabel: "common.label.selected",
    loadingLabel: "common.label.loading",
    userManagement: {
      authSignInLoading: "common.userManagement.auth.signInLoading",
      authSignOutLoading: "common.userManagement.auth.signOutLoading",
      authPermissionLoading: "common.userManagement.auth.permissionLoading",
    },
    errorMessage: {
      genericError: "common.errorMessage.genericError",
      required: "common.errorMessage.required",
      fieldRequired: "common.errorMessage.fieldRequired",
      unauthorized: "common.errorMessage.unauthorized",
    },
    idleTimeOutLabel: "common.idleTimeOut.label",
    idleTimeOutButtonLoggedIn: "common.idleTimeOut.stayLogged",
    logout: "common.idleTimeOut.logout",
  },
  mandaysCalculator: {
    generatingPDFLabel: "mandaysCalculator.generatingPDFLabel",
    label: "mandaysCalculator.label",
    sprintListLabel: "mandaysCalculator.sprintList.label",
    addEstimationBtn: "mandaysCalculator.sprintList.addEstimation",
    modalConfirmDeleteEstimation:
      "mandaysCalculator.modalLabels.confirmDeleteEstimation",
    exportConfirmation: "mandaysCalculator.modalLabels.exportConfirmation",
    sprintListTableColumns: {
      sprintName: "mandaysCalculator.sprintList.table.columns.sprintName",
      team: "mandaysCalculator.sprintList.table.columns.team",
      startedDate: "mandaysCalculator.sprintList.table.columns.startedDate",
      status: "mandaysCalculator.sprintList.table.columns.status",
    },
    summaryTableColumns: {
      functionality: "mandaysCalculator.summary.table.columns.functionality",
      totalManHours: "mandaysCalculator.summary.table.columns.totalManHours",
      totalManDays: "mandaysCalculator.summary.table.columns.totalManDays",
    },
    summaryTitle: "mandaysCalculator.summary.title",
    resourcesTitle: "mandaysCalculator.resourceList.title",
    resourceListTableColumns: {
      odc: "mandaysCalculator.resourceList.table.columns.odc",
      resourceCount:
        "mandaysCalculator.resourceList.table.columns.resourceCount",
      annualLeaves: "mandaysCalculator.resourceList.table.columns.annualLeaves",
    },
    summaryForm: {
      name: "mandaysCalculator.summary.form.name",
      team: "mandaysCalculator.summary.form.team",
      utilization: "mandaysCalculator.summary.form.utilization",
      startDate: "mandaysCalculator.summary.form.startDate",
      endDate: "mandaysCalculator.summary.form.endDate",
    },
    tasksTitle: "mandaysCalculator.tasks.title",
    noTaskLabel: "mandaysCalculator.tasks.toTaskLabel",
    noSelectedTaskLabel: "mandaysCalculator.tasks.noSelectedTaskLabel",
    taskDescriptionLabel: "mandaysCalculator.tasks.taskDescriptionLabel",
    tasksListLabel: "mandaysCalculator.tasks.tasksListLabel",
    tasksTableColumns: {
      tasks: "mandaysCalculator.tasks.table.columns.tasks",
      complexity: "mandaysCalculator.tasks.table.columns.complexity",
      i03: "mandaysCalculator.tasks.table.columns.i03",
      i04: "mandaysCalculator.tasks.table.columns.i04",
      i05: "mandaysCalculator.tasks.table.columns.i05",
      i06: "mandaysCalculator.tasks.table.columns.i06",
      i07: "mandaysCalculator.tasks.table.columns.i07",
    },
    legend: {
      title: "mandaysCalculator.legend.title",
      tableTitle: "mandaysCalculator.legend.table.title",
    },
    options: {
      excel: "mandaysCalculator.options.excel",
      pdf: "mandaysCalculator.options.pdf",
    },
    estimation: {
      title: "mandaysCalculator.estimation.title",
    },
  },
  accountInfo: {
    label: "account.info.label",
  },
  history: {
    detailsBtn: "history.button.details",
    filterPlacholder: "history.filter.placeholder",
  },
  userManagement: {
    label: {
      firstName: "userManagement.label.firstName",
      lastName: "userManagement.label.lastName",
      middleName: "userManagement.label.middleName",
      suffix: "userManagement.label.suffix",
      gender: "userManagement.label.gender",
      email: "userManagement.label.email",
      careerStep: "userManagement.label.careerStep",
      employeeId: "userManagement.label.employeeId",
      odcId: "userManagement.label.odcId",
      joiningDate: "userManagement.label.joiningDate",
      joiningDateEdit: "userManagement.label.joiningDateEdit",
      joiningAtLaterDate: "userManagement.label.joiningAtLaterDate",
      projectId: "userManagement.label.projectId",
      teamId: "userManagement.label.teamId",
      roles: "userManagement.label.roles",
    },

    errorMessage: {
      email: "userManagement.errorMessage.email",
    },
  },
};

export default LocalizationKey;
