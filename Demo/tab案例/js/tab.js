    function Tab(tabSelector, mainSelector) {
        this.tabItems = document.querySelectorAll(tabSelector);
        this.mains = document.querySelectorAll(mainSelector);
    }
    Tab.prototype.on = function () {
        var _this = this;
        for (var i = 0; i < this.tabItems.length; i++) {
            this.tabItems[i].index = i;
            this.tabItems[i].onclick = function () {
                var index = this.index;
                _this.changeTab(index);
                _this.changeMain(index);
            }
        }
    }
    Tab.prototype.changeTab = function (index) {
        for (var i = 0; i < this.tabItems.length; i++) {
            if (i === index) {
                this.tabItems[i].className = 'tab-item active';
            } else {
                this.tabItems[i].className = 'tab-item';
            }
        }
    }
    Tab.prototype.changeMain = function(index){
        for(var i = 0; i< this.mains.length; i++){
            if(i === index){
                this.mains[i].className = 'main selected';
            }else{
                this.mains[i].className = 'main';
            }
        }
    }
    $.fn.extend({
        initTab: function(tabSelector,mainSelector){
            new Tab(tabSelector,mainSelector).on();
        }
    })