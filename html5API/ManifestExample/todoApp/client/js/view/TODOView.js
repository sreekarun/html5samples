(function (window, document, TODO, undefined) {
    "use strict";
    TODO.View = Base.View.extend({
        debug: true,
        editing: false,
        template: {
            new: '<li><input type="checkbox" value="{{text}}" /> {{text}}</li>',
            edit: '<input type="text" name="editBox" value="{{text}}" />'
        },
        
        init: function () {
            this.bindEvents();
        },
        bindEvents: function () {
            var self = this,
                taskList = document.getElementById('taskList'),
                addTaskForm = document.getElementById('addTaskForm'),
                addTaskField = document.getElementById('addTaskField');
                
            addTaskForm.addEventListener('submit', function (e) {
                e.preventDefault();
            }, false);
            
            addTaskField.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    self.log('enter');
                    self.createTask(this.value);
                    this.value = '';
                } else if (e.keyCode === 27) {
                    self.log('esc');
                    this.value = '';
                    this.blur();
                }
            }, false);
            
            taskList.addEventListener('click', function (e) {
                var elem = e.target,
                    classList;
                if (elem.nodeName.toLowerCase() === 'input' && elem.type === 'checkbox') {
                    classList = elem.parentNode.classList;
                    if (elem.checked) {
                        if (!classList.contains('done')) {
                            classList.add('done');
                        }
                    } else {
                        if (classList.contains('done')) {
                            classList.remove('done');
                        }
                    }
                }
            }, false);
            
            taskList.addEventListener('dblclick', function (e) {
                var elem = e.target;
                
                if (elem.nodeName.toLowerCase() === 'li') {
                    self.editing = true;
                    self.editTask(elem);
                }
            }, false);
        },
        createTask: function (val) {
            var elem;
            this.log(val);
            elem = this.tmpl({text: val}, this.template.new);
            this.log(elem);
            document.getElementById('taskList').insertBefore(elem, document.getElementById('taskList').children[0]);
        },
        editTask: function (elem) {
            var editItem,
                taskName = elem.textContent.trim();
            elem.innerHTML = '';
            
            editItem = this.tmpl({text: taskName}, this.template.edit);
            
            elem.appendChild(editItem);
        },
        tmpl: function (data, tmpl) {
            var finalOutPut,
                dummyDiv = document.createElement('div'),
                documentFragment = document.createDocumentFragment();
            if (!this.isString(tmpl)) {
                throw Error("Template needs to be a string.");
            }
            
            finalOutPut = tmpl.replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function () {
                return data[arguments[2]];
            });
            
            dummyDiv.innerHTML = finalOutPut;
            for (var i = 0, len = dummyDiv.children.length; i < len; i++) {
                documentFragment.appendChild(dummyDiv.children[0]);
            }
            
            dummyDiv = null;
            return documentFragment;
        }
    });
})(this, this.document, (this.TODO || (this.TODO = {})));