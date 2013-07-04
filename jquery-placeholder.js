$.fn.fixPlaceholder = (function( $ ){
    if( !( 'placeholder' in document.createElement( 'input' ) ) ){
        return function( options ){
            var configs = {
                fontSize: '12px',
                color: 'gray',
                marginLeft: '3px',
                fontWeight: 'normal',
                top: '0px',
                left: '0px',
                visibility: 'visible',
                cursor: 'text'
            };
            $.extend( configs, options || {} );
            $( this ).each( function(){
                var $this = $( this ),
                    placeholder = $this.attr( 'placeholder' ),
                    idStr = $this.attr( 'id' ),
                    label,b,z;
                if( placeholder ){
                    if( !idStr ){
                        idStr = 'fixPlaceholder' + Math.random();
                    }
                    $this.attr( 'id', idStr );
                    label = $( '<label for="'+ idStr +'" style="position:absolute;visibility:hidden;"></label>');
                    if( $this.val() === '' ){
                        label.html( placeholder );
                    }
                    $this.before( label );
                    //用于设置label的位置
                    configs['top'] = $this.offset().top + 'px';
                    configs['left'] = $this.offset().left + 'px';
                    //用于让label中的文本在input里上下居中
                    b = parseInt( $this.css( 'borderTopWidth' ) );
                    configs['lineHeight'] = $this.height() + (b+1)*2 + 'px';
                            
                    //用于当input被定位时，label能居于input之上
                    z = $this.css( 'zIndex' );
                    configs['zIndex'] = z === 'auto' ? 1 : z + 1 ;
                    label.css( configs );
                                
                    //绑定事件
                    $this.bind({
                        focus: function(){
                            label.html( '' );
                        },
                        blur: function(){
                            if( $this.val() === '' ){
                                label.html( placeholder );
                            }
                        }
                    })
                }
            })
            return $;
        }
    }else{
        return $;
    }
})( $ );