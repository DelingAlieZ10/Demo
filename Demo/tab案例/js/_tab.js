    function Tab(tabs, mains) {
        this.tabItems = tabs;
        this.mains = mains;
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
        initTab: function(){
            this.each(function(){
                var child = $(this).children();
            console.log(child.eq(0).children());
            new Tab(child.eq(0).children(),child.eq(1).children()).on();
            })
        }
    })