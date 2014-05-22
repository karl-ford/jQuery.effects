var Effects = {
	delayTimers : [],
	animateTime : 2000,
	delayTime   : 300,
	bodyHeight  : $(window).height() || 480,
	bodyWidth   : $(window).width() || 320,
	/* mask effect */
	showMask : function(color){
		color = color || 'rgba(51, 51, 51, 0.6)';
		var div    = '<div id="mask" style="overflow:hidden;display:none;position:fixed;left:0;top:0;z-index:9990;background-color:' + color + ';"></div>';
		var width  = Effects.bodyWidth == 320 ? $(window).width() : Effects.bodyWidth;
		var height = Effects.bodyHeight == 480 ? $(window).height() : Effects.bodyHeight;

		div = $(div);
		div.width(width);
		div.height(height);

		$('body').append(div);

		div.fadeIn(Effects.delayTime);

		return div;
	},
	hideMask : function(mask){
        mask = mask || $('#mask');
		if(mask != null){
			mask.fadeOut(Effects.delayTime);
			setTimeout(function() {
				mask.remove();
			}, Effects.delayTime);
		}
	},
	/* messagebox effect */
	messageBox : function(msg, have_mask, timeout){
		timeout   = timeout   || Effects.animateTime;
		have_mask = have_mask || false;

		var bgcolor = have_mask ? '#FFF' : 'rgba(51,51,51,0.8)';
		var color   = have_mask ? '#555' : '#FFF';

		var width  = Effects.bodyWidth == 320 ? $(window).width() : Effects.bodyWidth;
		var height = Effects.bodyHeight == 480 ? $(window).height() : Effects.bodyHeight;

		var div = '<p style="text-align:center;padding: 0 10px 0 10px;display:none;min-width:180px;height:50px;line-height:50px;border-radius:6px;font-size:12pt;color:' + color + ';background-color:' + bgcolor + ';position:fixed;z-index:9991;" id="messageBox"></p>';

		div = $(div);
		div.html(msg);
		$('body').append(div);

		var left = ( width - div.width() ) / 2;
		var top  = ( height - div.height() ) / 2;

		div.css({"left" : left , "top" : top});

		var mask = null;
		if(have_mask)
			mask = Effects.showMask();

		div.fadeIn(Effects.delayTime);

		setTimeout(function() {
			Effects.closeMessageBox(div, mask);
		}, timeout);
	},
	closeMessageBox : function(box, mask){
        box = box || $('#messageBox');
		if(box != null){
			box.hide(Effects.delayTime);
			setTimeout(function() {
				box.remove();
			}, Effects.delayTime);
		}
		Effects.hideMask(mask);
	},
	askBox : function(msg, have_mask, array, msg_style, callback_left, callback_right, data){
		have_mask = have_mask || false;
		array     = array || ['确定', '取消'];
        data      = data || null;

		msg_style = msg_style || {'text-align' : 'left', 'margin':'18px 10px 0 10px', 'width' : '94%', 'height':'auto', 'line-height':'1.5em'};

		callback_left  = callback_left  || Effects.closeAskBox;
		callback_right = callback_right || Effects.closeAskBox;


		var bgcolor = '#FFF';
		var color   = '#555';

		var width  = Effects.bodyWidth == 320 ? $(window).width() : Effects.bodyWidth;
		var height = Effects.bodyHeight == 480 ? $(window).height() : Effects.bodyHeight;

		var div_w = Effects.bodyWidth > 320 ? 420 : 250;
		var div_h = Effects.bodyWidth > 320 ? 270 : 150;

		var div = '<div style="text-align:center;box-shadow:0 0 15px #999;display:none;width:' + div_w + 'px;min-height:' + div_h + 'px;height:auto;line-height:50px;border-radius:6px;font-size:12pt;color:' + color + ';background-color:' + bgcolor + ';position:fixed;z-index:9991;" id="askBox"></div>';

		var p = $('<p></p>');

		var bt_h = Effects.bodyWidth > 320 ? 50 : 40;

		var right = $('<a href="javascript:void(0);" style="background-color:#ECF0F1;text-decoration:none;color:#333;border-bottom-right-radius:6px;position:absolute;width:' + (div_w / 2) + 'px;bottom:0;right:0;display:inline-block;height:' + bt_h + 'px;line-height:' + bt_h + 'px;">' + array[0] + '</a>');
		var left  = $('<a href="javascript:void(0);" style="background-color:#ECF0F1;text-decoration:none;color:#333;border-bottom-left-radius:6px;position:absolute;width:' + (div_w / 2) + 'px;bottom:0;left:0;display:inline-block;height:' + bt_h + 'px;line-height:' + bt_h + 'px;">' + array[1] + '</a>');

		left.css({
			'border-right' : '1px solid #FFF',
			'width' : '-=1px'
		});
		left.hover(function(e){
			$(this).css({
				'background-color' : '#E74C3C',
				'color' : '#FFF'
			});
		}, function(e){
			$(this).css({
				'background-color' : '#ECF0F1',
				'color' : '#333'
			});
		});

		right.hover(function(e){
			$(this).css({
				'background-color' : '#3498DB',
				'color' : '#FFF'
			});
		}, function(e){
			$(this).css({
				'background-color' : '#ECF0F1',
				'color' : '#333'
			});
		});

		div = $(div);
		p.html(msg).css(msg_style);

		div.append(p);

		div.append(left);
		div.append(right);

		$('body').append(div);

		div.css({"left" : ( width - div.width() ) / 2 , "top" : ( height - div.height() ) / 2});

		var mask = null;
		if(have_mask)
			mask = Effects.showMask();

		div.fadeIn(Effects.delayTime);


		left.on('click',  function(e){
            if(callback_left == Effects.closeAskBox)
                return callback_left(div, mask);
            else
                return callback_left(false, data, div, mask);
		});
		right.on('click', function(e){
            if(callback_right == Effects.closeAskBox)
                return callback_right(div, mask);
            else
                return callback_right(true, data, div, mask);
		});

		return div;
	},
	closeAskBox : function(box, mask){
        box = box || $('#askBox');
		if(box != null){
			box.hide(Effects.delayTime);
			setTimeout(function() {
				box.remove();
			}, Effects.delayTime);
		}
		Effects.hideMask(mask);
	},
	/* delay send */
	delaySend : function(function_code){
		Effects.clearTimer(Effects.clearTimer);

		var timer = setTimeout(function(){
			eval(function_code);
		}, Effects.delayTime);
		
		Effects.delayTimers.push(timer);
	},
	clearTimer : function(timers){
		for(var i in timers)
			clearTimeout(timers[i]);
	},
	showLoading : function(lang){
		lang = lang || 'en';
		var text = null;
		var dote = null;

		if(lang == 'en'){
			text = 'Loading';
			dote = '.';
		}else if(lang == 'zh-CN'){
			text = '加载中';
			dote = '·';
		}else{
			text = lang;
			dote = '·';
		}

		var p = $('<p id="loading" style="position:fixed;z-index:9999;display:none;font-size:30px;font-weight:bold;padding:5px;">' + text + '</p>');
		var i = 0;		

		$('body').append(p);

		var left = ( Effects.bodyWidth - p.width() ) / 2;
		var top  = ( Effects.bodyHeight - p.height() ) / 2;

		p.css({
			'left' : left,
			'top' : top,
			'color' : '#E74C3C'
		}).show();

		Effects.showMask();

		var i = 0;
		var interval = setInterval(function(){
			if(i == 4){
				p.text(text);
				i = 0;
			}else{
				pText = text;
				for(var j = 0; j < i; j++){
					pText += dote;
				}
				p.text(pText);
			}
			i++;
		}, Effects.delayTime);

		return interval;
	},
	closeLoading : function( object ){
		Effects.hideMask();
		clearInterval(object);
		setTimeout(function() {
			$('p#loading').remove();
		}, Effects.delayTime);
	},
	listBox : function( msg, have_mask, btn_name, width, height, msg_style, callback, data ){
		have_mask = have_mask || false;
		msg_style = msg_style || {'text-align' : 'left', 'margin':'18px 10px 0 10px', 'width' : '94%', 'height':'auto', 'line-height':'1.5em'};
		width  = width  || Effects.bodyWidth == 320 ? $(window).width() : Effects.bodyWidth;
		height = height || Effects.bodyHeight == 480 ? $(window).height() : Effects.bodyHeight;
		btn_name = btn_name || '关闭';

		callback  = callback || Effects.closelistBox;

		var bgcolor = '#FFF';
		var color   = '#555';

		var div_w = Effects.bodyWidth > 320 ? 420 : 250;
		var div_h = Effects.bodyWidth > 320 ? 270 : 150;
		var div = '<div style="text-align:center;box-shadow:0 0 15px #999;display:none;width:' + div_w + 'px;min-height:' + div_h + 'px;height:auto;line-height:50px;border-radius:6px;font-size:12pt;color:' + color + ';background-color:' + bgcolor + ';position:fixed;z-index:9991;" id="listBox"></div>';
		
		var p = $('<p></p>');

		var bt_h = Effects.bodyWidth > 320 ? 50 : 40;

		var btn = $('<a href="javascript:void(0);" style="background-color:#ECF0F1;color:#333;text-decoration:none;border-bottom-right-radius:6px;border-bottom-left-radius:6px;position:absolute;width:' + div_w + 'px;bottom:0;right:0;display:inline-block;height:' + bt_h + 'px;line-height:' + bt_h + 'px;">' + btn_name + '</a>');

		btn.hover(function(e){
			$(this).css({
				'background-color' : '#E74C3C',
				'color' : '#FFF'
			});
		}, function(e){
			$(this).css({
				'background-color' : '#ECF0F1',
				'color' : '#333'
			});
		});

		div = $(div);
		p.html(msg).css(msg_style);

		div.append(p);

		div.append(btn);

		$('body').append(div);

		div.css({"left" : ( width - div.width() ) / 2 , "top" : ( height - div.height() ) / 2});

		var mask = null;
		if(have_mask)
			mask = Effects.showMask();

		div.fadeIn(Effects.delayTime);

		btn.on('click',  function(e){
            if(callback == Effects.closelistBox)
                return callback(div, mask);
            else
                return callback(data, div, mask);
		});

		return div;
	},
	closelistBox : function( box , mask ){
		box = box || $('#listBox');
		if(box != null){
			box.hide(Effects.delayTime);
			setTimeout(function() {
				box.remove();
			}, Effects.delayTime);
		}

		Effects.hideMask( mask );
	}
}