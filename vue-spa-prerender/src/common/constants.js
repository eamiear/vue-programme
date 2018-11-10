/**
 * Created by skz on 2017/10/10 17:48
 * Constants
 */
// system constants
export const AUTHORITY_KEY = 'account_session_authinfo'
export const INTERFACE_VERSION = '1.0'
export const USER_TOKEN_KEY = 'utopa_token_key'
export const USER_ID_KEY = 'utopa_uid_key'
export const SESSION_REQUEST = 'account.session.gen'
export const IS_FIRST_LOGIN = 'is_first_login'
export const RENEW_SESSION_REQUEST = 'account.session.renew'
export const RENEW_TOKEN_REQUEST = 'account.access.renewToken'
export const RENEW_REQUEST_TIMES = 3

// locales
export const LOCALES_LANG_KEY = 'locales.key'

// third part constants
export const QINIU_IMAGE_REQUEST_BASEURL = 'http://ox2m2b48s.bkt.clouddn.com/'

// export const QINIU_UPLOAD_URL = 'http://upload-z2.qiniu.com'
export const QINIU_UPLOAD_URL = 'https://up-z2.qbox.me/'

// request status code
export const REQUEST_SUCCESS = 0                  // 请求成功
export const REQUEST_FAIL = 1                     // 请求失败

// APP
export const SESSION_EXPIRE = 99950001           // 会话过期
export const SESSION_RENEW = 99950002            // 会话续约
export const INVALID_SESSION = 99950003          // 无效会话
export const INVALID_SIGN = 99950004             // 签名失败

export const NOT_LOGIN_USER = 99950005           // 未登录用户
export const TOKEN_EXPIRE = 99950006             // 令牌过期
export const TOKEN_RENEW = 99950007              // 令牌续约

export const PARENT_TOKEN_ERROR = 10010017          // 父令牌有误


export const PAGINATION_PAGENO = 1
export const PAGINATION_PAGESIZE = 10
export const PAGINATION_PAGETOTAL = 0
