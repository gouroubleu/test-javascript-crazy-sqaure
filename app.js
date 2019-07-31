$(function () {
    app.init();
});

let app = {
    mode:false,
    init() {

        this.createDad();
        $("#app").dblclick(()=>{

            this.mode = !this.mode;
            this.toggleMode();

        })

    },
    color(){
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    },
    createDad(){

        var dad = $("<div class='square'></div>")

        dad.appendTo("#app");

        const conf  = {
            width:"300px",
            height:"300px",
        };

        const position = this.positionRand(conf);

        dad.css({...conf,...position})

        dad.click( () => {
            this.createSquares(dad)
        });

    },
    positionRand(_conf) {

        var width = $("#app").width() - parseFloat(_conf.width);
        var height = $("#app").height() - parseFloat(_conf.height);

        return {
            top: Math.random() * height,
            left: Math.random() * width,
        }

    },
    createSquares(_parent) {

        let size = _parent.width();
        let top = parseFloat(_parent.css('top'));
        let left = parseFloat(_parent.css('left'));

        console.log(size,top,left)

        let __size = parseFloat(size * .5);

        this.createSquare(__size, top, left);
        this.createSquare(__size, top + __size, left);
        this.createSquare(__size, top, left + __size);
        this.createSquare(__size, top + __size, left + __size);

        _parent.remove();

    },
    createSquare(_size,_top,_left) {

        console.log(_size,_top,_left)

        var son = $("<div class='square'></div>")

        const conf = {
            width: _size + "px",
            height: _size + "px",
        };

        son.css({
            ...conf,
            top:_top,
            left:_left,
            backgroundColor:this.color()
        })

        son.appendTo("#app");

        const position = this.positionRand(conf);

        son.css(position)

        son.click(() => {
            this.createSquares(son)
        });
    },
    toggleMode() {

        if (this.mode) {

            $(".square").each(function(){

                const conf = {
                    width: $(this).width() + "px",
                    height: $(this).height() + "px",
                };

                $(this).css(app.positionRand(conf))

            });

            setTimeout(() => {

                if (this.mode) {

                    this.toggleMode();

                }

            }, 2000)
            
        }

    }

}
