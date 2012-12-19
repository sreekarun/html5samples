(function (window, document, TODO, undefined) {
    "use strict";
    window.addEventListener('DOMContentLoaded', function () {
        var todoController = new TODO.Controller(),
            todoModel = new TODO.Model(),
            todoView = new TODO.View();
            
            todoModel.on('update', function () {
                this.log('updating');
            });
            todoModel.update();
            
            var model = new TODO.Model();
            model.on('update', function () {
                this.log('updating...');
            });
             model.on('update', function () {
                this.log('2 updating...');
            });
            model.update();
    }, false);
})(this, this.document, this.TODO);