/*
成功提示结尾用英文.
错误提示结尾用英文!
确认弹框结尾用英文?
规则提示不用
 */
export default {
  // 统一提示
  defaultError: 'Error!',
  defaultSuccess: 'Success.',
  10000: 'System error!', // system exception
  10001: 'Upload error!', // upload exception
  10002: 'Download error!', // download exception
  10003: 'Arguments error!', // arguments exception
  10004: 'Not found!', // not found exception
  10005: 'Keycloak error!', // keycloak exception
  10006: 'Product error!', // product exception
  10007: 'Trigger settings error!', // trigger settings exception
  10008: 'Not authorized!', // not authorized
  10009: 'Not authenticated!', // not authenticated
  10010: 'Cache error!', // cache exception
  10011: 'Password not match!', // password not match
  10012: 'Paxstore user login error!', // paxstore user not ever
  10013: 'The new password cannot be the same as the previous four passwords!', // password same
  10014: 'User already exists!', // data already exists
  10016: 'Your account has been locked.Please contact support team.',
  10017: 'Account error!', // user not exist
  400: 'Request error!',
  401: 'Unauthorized, please login!',
  403: 'You do not have permission!',
  404: 'Request address error!',
  408: 'Request timeout!',
  500: 'Internal server error!',
  501: 'Not implemented!',
  502: 'Bad gateway!',
  503: 'Service unavailable!',
  504: 'Gateway timeout!',
  505: 'HTTP version is not supported!',
  other_error: 'The network is slow. Please try again later'
}

// 自定义的提示
export let messageCustom = {
  login_error: 'Your account or password is not correct, please input again!',
  login_auth: 'You have to log in to see!',
  protocol: 'Please read the protocol first and agree to the protocol!',
  password_temporary: 'A temporary password has been sent to your email,please use it to reset your password.',
  password_invalid: 'Your password is invalid , please reset it.',
  password_reset: 'Please reset your password.',
  password_modified_success: 'The password has been modified successfully.',
  password_old_error: 'Your old password may not correct,Please input again!',
  email_existed: 'Email is not existed!',
  issue_normal: 'This issue can be viewed by users of your company only.',
  issue_public: 'This issue can be viewed by users of other partners.',
  issue_privacy: 'This issue can be viewed by yourself and admin of your company only.',
  issue_type_2: 'Select at least two levels of the issue type.',
  issue_auto: 'Automatic fetch failure, please select manually.',
  issue_create_sn: 'Input and press the enter button to create.',
  resourse_create_keyword: 'Input and press the enter button to create.',
  empty: 'This can not be empty.',
  resourse_delete_section: 'Fail to delete because this section contains some items! ', // 删除 发布中心板块的报错提示
  product_delete_setting: 'Fail to delete this category because there are products assigned to it! ', // 删除 产品设置
  follow_success: 'Thanks for following this item, you will be notified of any updates of this item hereafter.'
}

// 规则表单提示
export let messageRule = {
  Inputbox: 'Support English, Chinese, numerals, minus signs, underscores, Spaces, single quotes',
  charrule: 'Please enter the specified character',
  firstname: 'Please enter first name',
  lastname: 'Please enter last name',
  jobtitle: 'Please enter the job title',
  job_number: 'Please enter the job number',
  job_number_format: 'The job number must be no more than 4 digits.',
  department: 'Please enter the department',
  address: 'Please enter the address',
  email: 'Please enter email',
  email_or_number: 'Please enter email address or job number',
  phone_format: 'Please enter the correct phone format',
  keyword: 'Please enter keyword',
  releasenote: 'Please enter release note',
  email_format: 'Please enter the correct email format',
  description: 'Please enter description',
  content: 'Please enter content',
  inputimage: 'Please enter one image',
  existed: 'This name has already existed',
  existed_email: 'This email has already been registered.',
  user_name: 'Please enter user name',
  group_name: 'Please enter group name',
  group_select: 'Please select a group',
  role_name: 'Please enter role name',
  sale_name: 'Please enter sale name',
  sale: 'Please select a sale',
  client_name: 'Please enter client name',
  client_name_select: 'Please select company name',
  client_type: 'Please select the client type',
  project_name: 'Please enter project name',
  area: 'Please select the area',
  type: 'Please select the type',
  password: 'Password can not be empty',
  password_length: 'Password length should not be less than 7',
  password_format: 'Password should be made up of letters and numbers , more than 7 characters',
  password_old: 'Please input your old password',
  password_new: 'Please input a new password',
  password_same: 'New password can not be the same',
  password_again: 'Please input the password again',
  password_nomatch: 'The two passwords you entered did not match',
  customer_target: 'Please enter target customer',
  product: 'Please select the hardware product',
  copied: 'Please select the copied',
  copied_rule_name: 'Please enter rule name',
  reason: 'Please enter the reason',
  terminal: 'Please select the terminal',
  device: 'Please select the device',
  background: 'Please enter the background',
  series: 'Please enter the series',
  os: 'Please enter the os',
  model: 'Please enter the product name',
  img_format: 'Only accept one image which type is jpg/jpeg/png/gif',

  user_inactive: 'Account will be locked.',
  user_active: 'Account will be reactived.',
  user_resigned: 'Account will be abolished.',

  client_inactive: 'Client frozen and all user accounts will be inactive.', // 代理商状态提示信息
  client_active: 'Client Reactived.',

  vacation_applicant: 'Please select the applicant',
  vacation_date: 'Please select the date',

  // issue
  // issue assignee
  issue_assignee_groupname: 'Please enter group name',
  // issue_assignee_checkgroupname:'The name has existed',
  issue_assignee_members: 'Please select the group members',
  issue_assignee_leader: 'Please select the group leader',
  issue_assignee_remarks: 'Please enter remarks',
  // issue type
  issue_assignee_typename: 'Please enter type name',
  // issue_assignee_checktypename:'The name has existed',
  issue_assignee_parent: 'Please select parent',
  issue_assignee_targetviewer: 'Please select target viewer',

  issue_rule_assignee: 'Please select a assignee',

  // add issue
  issue_add_username: 'Please select username',
  issue_add_title: 'Please enter title',
  issue_add_SN: 'Please enter SN',
  issue_add_terminals: 'Please select teminals',
  issue_add_checkSN: 'SN should contain 8 or 10 letters and numbers',
  issue_add_typeId: 'Please select issue type',
  issue_add_description: 'Please enter description',

  // resourse
  // add item添加文章
  resourse_add_targetuser: 'Please select target user',
  resourse_add_checkkeyword: 'Keywords should be made up of letters or numbers',
  resourse_add_checkkeyword_nums: 'Keywords should be no more than three',
  resourse_add_checkkeyword_repeat: 'Keywords are not allowed to repeat',
  resourse_section_name: 'Please select a section',
  resourse_section_type: 'Please select a type',
  resourse_section_targetroles: 'Please select target role',
  resourse_section_enter_name: 'Please enter section name',
  resourse_enter_title: 'Please enter item title',
  resourse_checktitle: 'The title has existed',
  resourse_check_Keyword: 'Keywords cannot be the same',

  // client info
  clieninfo_add_companyName: 'Please enter company name',
  clieninfo_add_clientType: 'Please select client type',
  clieninfo_add_priority: 'Please select priority',

  // product
  product_category_name: 'Please enter category name',
  product_category_parent: 'Please select a parent type',
  product_category_hardware_type: 'Please select a hardware type',
  product_add_hardwareType: 'Please select a hardware type',
  product_add_categoryId: 'Please select a parent type',
  product_add_name: 'Please enter product name',
  product_add_osId: 'Please select a OS',
  product_add_formId: 'Please select a form',
  product_add_productUseId: 'Please select a product use',
  product_add_seriesId: 'Please select a series',
  product_add_pnList: 'Please enter PN',
  product_pnList_unique: 'PN cant not be the same',
  product_pnList_exist: 'PN has already existed',
  product_add_branchName: 'Please enter branch name',

  // 长度
  max20: 'cannot be longer than 20 character',
  max30: 'cannot be longer than 30 character',
  max50: 'cannot be longer than 50 character',
  max100: 'cannot be longer than 100 character',
  max200: 'cannot be longer than 200 character',
  max500: 'cannot be longer than 500 character',
  max1000: 'cannot be longer than 1000 character',
  max5000: 'cannot be longer than 5000 character',
  max10000: 'cannot be longer than 10000 character'
}

// 弹框提示
export let messageDialog = {
  ok: 'OK',
  cancel: 'Cancel',
  EULA_agree: {
    title: 'Warning',
    message: 'Please agree the EULA first!'
  },
  login_expired: {
    title: 'Login expired',
    message: 'Login expired, please login again!'
  },
  group_delete: {
    title: 'Delete Group',
    message: 'Confirm to delete group?'
  },
  sign_delete: {
    title: 'Delete Sign',
    message: 'Confirm to delete sign?'
  },
  role_delete: {
    title: 'Delete Role',
    message: 'Confirm to delete role?'
  },
  sale_delete: {
    title: 'Delete Sale',
    message: 'Confirm to delete sale?'
  },
  rule_delete: {
    title: 'Delete',
    message: 'Confirm to delete this rule?'
  },
  article_delete: {
    title: 'Delete - ',
    message: 'Confirm to delete item - '
  },
  article_update: {
    title: 'Update - ',
    message: 'Confirm to update this item - '
  },
  article_reject: {
    title: 'Reject - ',
    message: 'Please enter the reason.'
  },
  article_approve: {// 通过
    title: 'Submit - ',
    message: 'Confirm to pass this item - '
  },
  active: {
    title: 'Active',
    message: 'Confirm to active this account?'
  },
  inactive: {
    title: 'Inactive',
    message: 'Confirm to inactive this account?'
  },
  active_client: {
    title: 'Active',
    message: 'Confirm to active this client?'
  },
  inactive_client: {
    title: 'Inactive',
    message: 'Confirm to inactive this client and inactivating all accounts?'
  },
  resigned: {
    title: 'Warning',
    message: 'Abolished accounts cannot be reactivated! Confirm to abolish this account?'
  },
  password_reset: {
    title: 'Reset Password',
    message: 'Confirm to reset password?'
  },
  password_to_login: {
    title: 'Tips',
    message: 'The password has been modified successfully,Please login again!'
  },
  client_sync: {
    title: 'Sync Client Data',
    message: 'Confirm to sync client data?'
  },
  delete: {
    title: 'Delete',
    message: 'Confirm to delete - '
  },
  isv_locked: {
    title: 'Unsupported Login',
    message: 'Your account has been locked.Please contact support team.'
  },
  isv_notGlobal: {
    title: 'Unsupported Login',
    message: 'Support PAXSTORE Developer Signed Directly with PAX ONLY.'
  },
  isv_other: {
    title: 'Unsupported Login',
    message: 'For PAXSTORE developer only, please get this account registered as PAXSTORE developer first.'
  },
  issue_close: {
    title: 'Close',
    message: 'Confirm to close this issue?'
  },
  issue_cancel: {
    title: 'Cancel',
    message: 'Confirm to cancel this issue?'
  },
  resourse_publish: {
    title: 'Publish - ',
    message: 'Confirm to publish - '
  },
  resourse_submit: {
    title: 'Submit - ',
    message: 'Confirm to submit - '
  },
  resourse_save: {
    title: 'Save - ',
    message: 'Confirm to save - '
  },
  item_edit_cancle: {// 取消编辑文章
    title: 'Cancel',
    message: 'Confirm to cancel without save ?'
  },
  unfollow: {
    title: 'Unfollow',
    message: 'You will not be notified of the updates of this item, confirm to unfollow?'
  },
  vacation_end: {
    title: 'Confirm',
    message: 'Confirm to end the vacation?'
  }
}
