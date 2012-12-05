(function (window, document, TODO, undefined) {
    "use strict";
    TODO.View = Base.View.extend({
        init: function () {
            this.bindEvents();
        },
        bindEvents: function () {
            var self = this,
                addTaskForm = document.getElementById('addTaskForm'),
                addTaskField = document.getElementById('addTaskField');
                
            addTaskForm.addEventListener('submit', function (e) {
                e.preventDefault();
            }, false);
            
            addTaskField.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    console.log('enter');
                    self.createTask(this.value);
                    this.value = '';
                } else if (e.keyCode === 27) {
                    console.log('esc');
                    this.value = '';
                    this.blur();
                }
            }, false);
        },
        createTask: function (val) {
            console.log(val);
        }
    });
})(this, this.document, (this.TODO || (this.TODO = {})));