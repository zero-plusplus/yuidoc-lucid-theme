module.exports = {
    publicClasses: function(context, options) {
        'use strict';
        var ret = "";

        for(var i=0; i < context.length; i++) {
            if(!context[i].itemtype && context[i].access === 'public') {
                ret = ret + options.fn(context[i]);
            } else if (context[i].itemtype) {
                ret = ret + options.fn(context[i]);
            }
        }

        return ret;
    },
    notEmpty: function(context, options) {
        'use strict';
        if (!context || !String(context).replace(/\s/g, '')) return options.inverse(this);
        return options.fn(this);
    },
    hasStaticMethods: function(context, options) {
        'use strict';
        var hasStatic = false;
        if (!context) return '';
        for(var i=0; i < context.length; i++) {
            if (context[i]['static']) {
                hasStatic = true;
                break;
            }
        }
        if (hasStatic) {
            return options.fn(this);
        }
        return '';
    },
    hasInstanceMethods: function(context, options) {
        'use strict';
        var hasInstance = false;
        if (!context) return '';
        for(var i=0; i < context.length; i++) {
            if (!context[i]['static']) {
                hasInstance = true;
                break;
            }
        }
        if (hasInstance) {
            return options.fn(this);
        }
        return '';
    },
    search : function(classes, modules) {
        'use strict';
        var ret = '';

        for(var i=0; i < classes.length; i++) {
            if(i > 0) {
                ret += ', ';
            }
            ret += "\"" + 'classes/' + classes[i].displayName + "\"";
        }

        if(ret.length > 0 && modules.length > 0) {
            ret += ', ';
        }

        for(var j=0; j < modules.length; j++) {
            if(j > 0) {
                ret += ', ';
            }
            ret += "\"" + 'modules/' + modules[j].displayName + "\"";
        }

        return ret;
    }
};
