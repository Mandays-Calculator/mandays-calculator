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
    idleTimeOutTitle: "common.idleTimeOut.title",
    idleTimeOutButtonLoggedIn: "common.idleTimeOut.stayLogged",
    logout: "common.idleTimeOut.logout",
    logoutConfirmLabel: "common.idleTimeOut.logoutConfirmLabel",
    logoutErrorLabel: "common.idleTimeOut.logoutError",
    unauthorizedTitle: "common.unauthorized.title",
    systemErrorTitle: "common.systemError.title",
    header: {
      projectPlaceholder: "common.header.project.placeholder",
      toolTipTitle: "common.header.tooltip.title",
    },
  },
  mandaysCalculator: {
    sharedLinkSuccessMessage: "mandaysCalculator.sharedLinkSuccessMessage",
    errorMessages: {
      resourceRequired: "mandaysCalculator.errorMessages.resource.required",
      pleaseSelect1Resource:
        "mandaysCalculator.errorMessages.resource.pleaseSelect1Resource",
      exceedResources:
        "mandaysCalculator.errorMessages.resource.exceedResources",
      assignedResource:
        "mandaysCalculator.errorMessages.resource.assignedResource",
      pleaseSelect1Task:
        "mandaysCalculator.errorMessages.task.pleaseSelect1Task",
      utilRateValidValue:
        "mandaysCalculator.errorMessages.summary.utilRateValidValue",
      endDateisLater: "mandaysCalculator.errorMessages.summary.endDate",
    },
    generatingPDFLabel: "mandaysCalculator.generatingPDFLabel",
    label: "mandaysCalculator.label",
    sprintListLabel: "mandaysCalculator.sprintList.label",
    sprintListLoader: "mandaysCalculator.sprintList.loader",
    addEstimationBtn: "mandaysCalculator.sprintList.addEstimation",
    modalConfirmDeleteEstimation:
      "mandaysCalculator.modalLabels.confirmDeleteEstimation",
    exportConfirmation: "mandaysCalculator.modalLabels.exportConfirmation",
    modal: {
      shareTitle: "mandaysCalculator.modalLabels.shareTitle",
      shareSubtitle: "mandaysCalculator.modalLabels.shareSubtitle",
      accessExpiry: "mandaysCalculator.modalLabels.accessExpiry",
      link: "mandaysCalculator.modalLabels.link",
      generate: "mandaysCalculator.modalLabels.generate",
      redirect: "mandaysCalculator.modalLabels.redirect",
      copyLink: "mandaysCalculator.modalLabels.copyLink",
    },
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
    summaryLabels: {
      grandTotal: "mandaysCalculator.summary.labels.grandTotal",
      hrs: "mandaysCalculator.summary.labels.hrs",
      numberOfDays: "mandaysCalculator.summary.labels.numberOfDays",
      numberOfOTDays: "mandaysCalculator.summary.labels.numberOfOTDays",
      days: "mandaysCalculator.summary.labels.days",
    },
    summaryTitle: "mandaysCalculator.summary.title",
    summaryTitle2: "mandaysCalculator.summary.title2",
    summarySubtitle: "mandaysCalculator.summary.subtitle",
    resourcesTitle: "mandaysCalculator.resourceList.title",
    resourceList: {
      labels: {
        totalResources: "mandaysCalculator.resourceList.label.totalResources",
        addODC: "mandaysCalculator.resourceList.label.addODC",
      },
      errorMessage: {
        duplicateODC:
          "mandaysCalculator.resourceList.errorMessage.duplicateODC",
      },
    },
    resourceListTableColumns: {
      odc: "mandaysCalculator.resourceList.table.columns.odc",
      resourceCount:
        "mandaysCalculator.resourceList.table.columns.resourceCount",
      annualLeaves: "mandaysCalculator.resourceList.table.columns.annualLeaves",
      addResourceLabel:
        "mandaysCalculator.resourceList.table.addResourceButton",
      noResourceLabel: "mandaysCalculator.resourceList.table.noResourceLabel",
    },
    summaryForm: {
      name: "mandaysCalculator.summary.form.name",
      team: "mandaysCalculator.summary.form.team",
      utilization: "mandaysCalculator.summary.form.utilization",
      startDate: "mandaysCalculator.summary.form.startDate",
      noOfResources: "mandaysCalculator.summary.form.noOfResources",
      leaves: "mandaysCalculator.summary.form.leaves",
      endDate: "mandaysCalculator.summary.form.endDate",
    },
    tasksTitle: "mandaysCalculator.tasks.title",
    taskGrandTotalManHours: "mandaysCalculator.tasks.labels.grandTotalManhours",
    taskGrandTotalManDays: "mandaysCalculator.tasks.labels.grandTotalManDays",
    noTaskLabel: "mandaysCalculator.tasks.toTaskLabel",
    noSelectedTaskLabel: "mandaysCalculator.tasks.noSelectedTaskLabel",
    taskDescriptionLabel: "mandaysCalculator.tasks.descriptionLabel",
    tasksListLabel: "mandaysCalculator.tasks.tasksListLabel",
    selectedTask: "mandaysCalculator.tasks.selectedTask",
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
      labelLoader: "mandaysCalculator.estimation.label.loader",
      addPhaseLabel: "mandaysCalculator.estimation.label.addPhase",
      estimationColumns: {
        taskName: "mandaysCalculator.estimation.estimationColumns.taskName",
        complexity: "mandaysCalculator.estimation.estimationColumns.complexity",
        noOfResources:
          "mandaysCalculator.estimation.estimationColumns.noOfResources",
        totalManHours:
          "mandaysCalculator.estimation.estimationColumns.totalManHours",
        totalManDays:
          "mandaysCalculator.estimation.estimationColumns.totalManDays",
      },
    },
  },
  accountInfo: {
    label: "account.info.label",
  },
  tasks: {
    createTask: {
      modalTitle: "tasks.createTask.modalTitle",
      complexity: "tasks.createTask.complexity",
      label: {
        taskTitle: "tasks.createTask.label.taskTitle",
        description: "tasks.createTask.label.description",
        functionality: "tasks.createTask.label.functionality",
        complexity: "tasks.createTask.label.complexity",
        tags: "tasks.createTask.label.tags",
      },
      placeholder: {
        taskTitle: "tasks.createTask.placeholder.taskTitle",
        description: "tasks.createTask.placeholder.description",
        functionality: "tasks.createTask.placeholder.functionality",
        complexity: "tasks.createTask.placeholder.complexity",
        tags: "tasks.createTask.placeholder.tags",
      },
      btnLabel: {
        create: "tasks.createTask.btnLabel.create",
        close: "tasks.createTask.btnLabel.close",
      },
    },
    updateTask: {
      modalTitle: "tasks.updateTask.modalTitle",
      btnLabel: {
        update: "tasks.updateTask.btnLabel.update",
      },
    },
    taskDetails: {
      sprint: "tasks.taskDetails.sprint",
      complexity: "tasks.taskDetails.complexity",
      deleteConfirm: "tasks.taskDetails.deleteConfirm",
    },
    viewTaskDetails: {
      label: {
        description: "tasks.viewTaskDetails.label.description",
        functionality: "tasks.viewTaskDetails.label.functionality",
        complexity: "tasks.viewTaskDetails.label.complexity",
        createdDate: "tasks.viewTaskDetails.label.createdDate",
        completionDate: "tasks.viewTaskDetails.label.completionDate",
        markComplete: "tasks.viewTaskDetails.label.markComplete",
        sprint: "tasks.viewTaskDetails.label.sprint",
        tags: "tasks.viewTaskDetails.label.tags",
        comments: "tasks.viewTaskDetails.label.comments",
      },
      placeholder: {
        description: "tasks.viewTaskDetails.placeholder.description",
        sprint: "tasks.viewTaskDetails.placeholder.sprint",
        comments: "tasks.viewTaskDetails.placeholder.comments",
        avatar: "tasks.viewTaskDetails.placeholder.avatar",
        user: "tasks.viewTaskDetails.placeholder.user",
      },
      modal: {
        markComplete: "tasks.viewTaskDetails.modal.markComplete",
        confirmMarkComplete: "tasks.viewTaskDetails.modal.confirmMarkComplete",
        closeMarkComplete: "tasks.viewTaskDetails.modal.closeMarkComplete",
      },
    },
    errorMessage: {
      error: "tasks.errorMessage.error",
      started: "tasks.errorMessage.started",
      created: "tasks.errorMessage.created",
      fetch: "tasks.errorMessage.fetch",
    },
    noTask: "tasks.noTask",
    teamFilter: "tasks.teamFilter",
  },
  history: {
    detailsBtn: "history.button.details",
    filterPlacholder: "history.filter.placeholder",
    loadingHistory: "history.label.loadingHistory",
    noEstimation: "history.label.noEstimation",
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
  odc: {
    management: "odc.management.label",
    label: {
      name: "odc.label.name",
      abbreviation: "odc.label.abbreviation",
      location: "odc.label.location",
      holidays: "odc.label.holidays",
      date: "odc.label.date",
      holiday: "odc.label.holiday",
      noHolidays: "odc.label.noHolidays",
    },
    modal: {
      deleteLabel: "odc.modal.deleteLabel",
      yesPleaseBtn: "odc.modal.yesPleaseBtn",
      noThanksBtn: "odc.modal.noThanksBtn",
    },
    btnlabel: {
      addOdc: "odc.btnlabel.addOdc",
      addHoliday: "odc.btnlabel.addHoliday",
      save: "odc.btnlabel.save",
      cancel: "odc.btnlabel.cancel",
      edit: "odc.btnlabel.edit",
    },
    validationInfo: {
      nameReq: "odc.validationInfo.nameReq",
      nameUnq: "odc.validationInfo.nameUnq",
      abbrUnq: "odc.validationInfo.abbrUnq",
      locReq: "odc.validationInfo.locReq",
      submitError: "odc.validationInfo.submitError",
      submitSuccess: "odc.validationInfo.submitSuccess",
      deleteError: "odc.validationInfo.deleteError",
      deleteSuccess: "odc.validationInfo.deleteSuccess",
    },
    placeholder: "odc.placeholder",
  },
  complexity: {
    title: "complexity.title",
    label: {
      complexity: "complexity.label.complexity",
      hours: "complexity.label.hours",
      days: "complexity.label.days",
      name: "complexity.label.name",
      noOfHours: "complexity.label.noOfHours",
      noOfDays: "complexity.label.noOfDays",
      noOfFeatures: "complexity.label.noOfFeatures",
      description: "complexity.label.description",
      samples: "complexity.label.samples",
      addComplexity: "complexity.label.addComplexity",
      editComplexity: "complexity.label.editComplexity",
    },
    table: {
      columns: {
        complexity: "complexity.table.columns.complexity",
        noOfHours: "complexity.table.columns.noOfHours",
        noOfDays: "complexity.table.columns.noOfDays",
        noOfFeatures: "complexity.table.columns.noOfFeatures",
        description: "complexity.table.columns.description",
        samples: "complexity.table.columns.samples",
      },
    },
    btnLabel: {
      addComplexity: "complexity.btnLabel.addComplexity",
      edit: "complexity.btnLabel.edit",
      delete: "complexity.btnLabel.delete",
      save: "complexity.btnLabel.save",
      cancel: "complexity.btnLabel.cancel",
    },
    validationInfo: {
      maxComplexityName: "complexity.validationInfo.maxComplexityName",
      maxDescription: "complexity.validationInfo.maxDescription",
      maxSamples: "complexity.validationInfo.maxSamples",
      noOfHours: "complexity.validationInfo.noOfHours",
      minNoOfHours: "complexity.validationInfo.minNoOfHours",
      maxNoOfHours: "complexity.validationInfo.maxNoOfHours",
      posNoOfHours: "complexity.validationInfo.posNoOfHours",
      intNoOfHours: "complexity.validationInfo.intNoOfHours",
      minNoOfFeatures: "complexity.validationInfo.minNoOfFeatures",
      maxNoOfFeatures: "complexity.validationInfo.maxNoOfFeatures",
      posNoOfFeatures: "complexity.validationInfo.posNoOfFeatures",
      intNoOfFeatures: "complexity.validationInfo.intNoOfFeatures",
      submitError: "complexity.validationInfo.submitError",
      submitSuccess: "complexity.validationInfo.submitSuccess",
      deleteError: "complexity.validationInfo.deleteError",
      deleteSuccess: "complexity.validationInfo.deleteSuccess",
    },
  },
};

export default LocalizationKey;
