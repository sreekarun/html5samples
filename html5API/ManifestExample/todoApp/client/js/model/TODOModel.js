(function (window, document, TODO, undefined) {
    "use strict";
    TODO.Model = Base.Model.extend({
        url: '/soemthing',
        init: function () {
            this._super();
        },
        update: function () {
            this.fire('update');
        }
    });
})(this, this.document, (this.TODO || (this.TODO = {})));