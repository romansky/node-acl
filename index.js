// Generated by CoffeeScript 1.4.0
(function() {
  var ACL, logr,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  logr = require('node-logr').getLogger(__filename);

  /* @param [ { role:"..", model:"..", crudOps:[..] }, .. ]  rulesList
  */


  exports.acl = function(rulesList) {
    return new ACL(rulesList);
  };

  exports.CRUD = {
    "create": "create",
    "read": "read",
    "update": "update",
    "delete": "delete",
    "patch": "patch"
  };

  ACL = (function() {
    /* @type { role : { model: {[crudOps,..]} } }
    */

    ACL.prototype.rules = null;

    function ACL(rulesList) {
      this.validate = __bind(this.validate, this);

      var crudOp, rule, _i, _j, _len, _len1, _ref;
      this.rules = {};
      for (_i = 0, _len = rulesList.length; _i < _len; _i++) {
        rule = rulesList[_i];
        if (!(rule.role in this.rules)) {
          this.rules[rule.role] = {};
        }
        if (!(rule.model in this.rules[rule.role])) {
          this.rules[rule.role][rule.model] = [];
        }
        _ref = rule.crudOps;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          crudOp = _ref[_j];
          this.rules[rule.role][rule.model].push(crudOp);
        }
      }
    }

    /* @param { role:"..", model:"..", crudOps:[..] } options
    */


    /* @return String - null if validation passed OK
    */


    ACL.prototype.validate = function(options) {
      var allowedOps, _ref;
      allowedOps = (_ref = this.rules[options.role]) != null ? _ref[options.model] : void 0;
      if (!allowedOps || (options.crudOps.filter(function(ao) {
        return allowedOps.indexOf(ao) === -1;
      }).length > 0)) {
        logr.notice("failed validation:" + (JSON.stringify(options)));
        return "failed validation:" + (JSON.stringify(options));
      } else {
        return null;
      }
    };

    return ACL;

  })();

}).call(this);