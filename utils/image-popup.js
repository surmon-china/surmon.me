//定义事件
	function alwaysClickImg(){
		//首先寻找到图片
		var $contextImg = $('.context img');
		//获取显示区域有效高度和宽度
		var screenWidth = $(window).width();
		var screenHeight = $(window).height();
		//如果包含图片则开始执行以下操作
		if ($contextImg) {
			//如果图片包含链接，则给此链接定义点击事件，事件内容为：点击后创建一个div，div的内容为图片已百分百显示，全屏居中，同时全站加上遮罩效果
			//定义空的点击图片位置信息
			var contextImgTop ='45%';
			var contextImgLeft ='45%';
			//需要先遍历
			$contextImg.each(function(){
				if ($(this).parent()[0].tagName == 'A') {
					//如果图片的父元素是a说明，a图片有链接，则给a链接替换为空连接
					$(this).parent().attr('href','javascript:;').attr('target','_blank');
				}else{
					$(this).wrap('<a href="javascript:;"  target="_blank"></a>');
				}
				$(this).parent().click(function(){return false;});
				//开始定义点击事件
				$(this).click(function(){
					//如果存在弹出层图片则清空她，然后再执行
					if ($('#clickImg')) {$('#clickImg').remove()}
					//给body添加遮罩层和弹出层图片元素
					$('body').append('<div id="clickImgBg" style="width: 100%; height:100%; z-index: 9; opacity: 0; position: fixed; top: 0px; left: 0px; display: none; background-color: rgb(170, 170, 170);"></div>');
					$('body').append('<div id="clickImg"><img src="' + $(this).attr('src') + '"></div>');
					//打印保存的点击图片对象
					//获取图片大小
					var clickImgWidth = $('#clickImg>img').width();
					var clickImgHeight = $('#clickImg>img').height();
					//获得图片dom相对于window的位置信息
					contextImgTop = this.getBoundingClientRect().top;
					contextImgLeft = this.getBoundingClientRect().left;
					$('#clickImg').css({zIndex:'10','position':'fixed','top':contextImgTop,'left':contextImgLeft,'height':clickImgHeight,'width':clickImgWidth,'overflow':'inherit','box-sizing':'content-box','opacity':'0','padding':'10px','background-color':'#eee'});
					$('#clickImg').animate({'top':screenHeight/2-clickImgHeight/2,'left':screenWidth/2-clickImgWidth/2,'height':clickImgHeight,'width':clickImgWidth,'opacity':'1','overflow':'inherit'},200);
					$('#clickImgBg').css({'display':'block'});
					$('#clickImgBg').animate({'opacity':'0.7'},200);
				});
				//定义关闭事件
				//给遮罩层和弹出图片层添加点击事件
				$(window).scroll(closeImg);
				$('body').on('click','#clickImg',closeImg);
				$('body').on('click','#clickImgBg',closeImg);
				//定义事件
				function closeImg(){
					$('#clickImgBg').animate({'opacity':'0'},200,function(){$('#clickImgBg').remove()});
					$('#clickImg').animate({'opacity':'0',},200,function(){$('#clickImg').remove()});
				}
			});
		}
	}