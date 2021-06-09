/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  sendgridSecret: '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',
  jwtSecret: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbnRvbmlvIENhc3RlbGxhbm9zIExveWEiLCJpYXQiOjE2MjMyNjM4OTMsImV4cCI6MTY1NDc5OTg5MywiYXVkIjoidHRwbi5jb20ubXgiLCJzdWIiOiJhbnRvbmlvLmNhc3RlbGxhbm9zQHR0cG4uY29tLm14IiwiR2l2ZW5OYW1lIjoiQW50b25pbyIsIlN1cm5hbWUiOiJDYXN0ZWxsYW5vcyIsIkVtYWlsIjoiYW50b25pby5jYXN0ZWxsYW5vc0B0dHBuLmNvbS5teCJ9.n1S7GnhlL9UHrfTcoMg_7io6EOsYWRFGQCGmzfBTwvs",
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  emailProofTokenTTL: 24 * 60 * 60 * 1000, // 24 hours
  passwordResetTokenTTL: 24 * 60 * 60 * 1000, // 24 hours
  baseUrl: 'http://localhost:1337',
};
