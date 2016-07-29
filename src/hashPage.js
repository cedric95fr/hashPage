(function(){

    umd("HashSwipe", HashSwipe);

    var e = {
        nextAll: function(s) {
            var $els = $(), $el = this.next()
            while( $el.length ) {
                if(typeof s === 'undefined' || $el.is(s)) $els = $els.add($el)
                $el = $el.next()
            }
            return $els
        },
        prevAll: function(s) {
            var $els = $(), $el = this.prev()
            while( $el.length ) {
                if(typeof s === 'undefined' || $el.is(s)) $els = $els.add($el)
                $el = $el.prev()
            }
            return $els
        }
    }

    $.fn.nextAll = e.nextAll
    $.fn.prevAll = e.prevAll

    function HashSwipe(opts){

        this.settings = {
            duration: 300,
            pageIndex: 1,
            onBeforeChange: function(){},
            onAfterChange: function(){}
        }

        for(var k in opts){
            this.settings[k] = opts[k]
        }
        
        this.hash = location.hash;

        this._init();
    }

    HashSwipe.prototype._init = function(){   
        var self = this;
        var timer = null;

        this._changePage()

        window.addEventListener('hashchange',function(){
            self.settings.onBeforeChange()

            self._changePage()        

            timer = setTimeout(function(){
                timer && clearTimeout(timer)
                self.settings.onAfterChange()    
            },self.settings.duration)
            
        })
    }

    HashSwipe.prototype._changePage = function(){
        var index = this.getIndex();

        $('.page'+index).addClass('page-active').removeClass('page-next')
            .nextAll()
            .removeClass('page-active').addClass('page-next')
    }

    HashSwipe.prototype.getHash = function(){
        return location.hash;
    }

    HashSwipe.prototype.getIndex = function(){
        var hash = this.getHash();
        var pageIndex = 0;
        if(hash){
            var matchHash = hash.match(/\d+/ig);
            pageIndex = matchHash[0];    
        }else{
            if(this.settings.pageIndex != 1){
                pageIndex = this.settings.pageIndex;
            }else{
                pageIndex = 1
            }    
        }
        return pageIndex;
    }

    function umd(name, component) {
        switch (true) {
        case typeof module === 'object' && !!module.exports:
            module.exports = component;
            break;
        case typeof define === 'function' && !!define.amd:
            define(name, function() {
                return component;
            });
          break;
        default:
            try { /* Fuck IE8- */
            if (typeof execScript === 'object') execScript('var ' + name);
            } catch (error) {}
            window[name] = component;
        }
    };

})()
