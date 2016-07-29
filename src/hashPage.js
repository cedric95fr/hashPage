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
            onBeforeChange: function(){},
            onAfterChange: function(){}
        }

        for(var k in opts){
            this.settings[k] = opts[k]
        }

        this.hash = location.hash;
        this.index = 1;

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
        if(hash){
            var matchHash = hash.match(/\d+/ig);
            this.index = matchHash[0];    
        }else{
            this.index = 1
        }
        return this.index;
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
