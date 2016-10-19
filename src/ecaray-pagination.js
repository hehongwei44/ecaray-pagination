/**
 * 分页的构造方法
 * @constructor
 * @param config {Object} : 自定义参数
 * */
var Pagination = function (config) {

    /*默认参数*/
    this.pagerid = 'kkpager';         //divID
    this.mode = 'click';              //模式(link 或者 click)
    this.pno = 1;                     //当前页码
    this.total = 1;                   //总页码
    this.totalRecords = 0;            //总数据条数
    this.isShowFirstPageBtn = true;   //是否显示首页按钮
    this.isShowLastPageBtn = true;    //是否显示尾页按钮
    this.isShowPrePageBtn = true;     //是否显示上一页按钮
    this.isShowNextPageBtn = true;    //是否显示下一页按钮
    this.isShowTotalPage = true;      //是否显示总页数
    this.isShowCurrPage = true;       //是否显示当前页
    this.isShowTotalRecords = false;  //是否显示总记录数
    this.isGoPage = true;	            //是否显示页码跳转输入框
    this.isWrapedPageBtns = true;	    //是否用span包裹住页码按钮
    this.isWrapedInfoTextAndGoPageBtn = true; //是否用span包裹住分页信息和跳转按钮
    this.hrefFormer = '';                     //链接前部
    this.hrefLatter = '';                     //链接尾部
    this.gopageWrapId = 'kkpager_gopage_wrap';
    this.gopageButtonId = 'kkpager_btn_go';
    this.gopageTextboxId = 'kkpager_btn_go_input';
    this.lang = {
        firstPageText: '首页',
        firstPageTipText: '首页',
        lastPageText: '尾页',
        lastPageTipText: '尾页',
        prePageText: '上一页',
        prePageTipText: '上一页',
        nextPageText: '下一页',
        nextPageTipText: '下一页',
        totalPageBeforeText: '共',
        totalPageAfterText: '页',
        currPageBeforeText: '当前第',
        currPageAfterText: '页',
        totalInfoSplitStr: '/',
        totalRecordsBeforeText: '共',
        totalRecordsAfterText: '条数据',
        gopageBeforeText: '&nbsp;转到',
        gopageButtonOkText: '确定',
        gopageAfterText: '页',
        buttonTipBeforeText: '第',
        buttonTipAfterText: '页'
    };

    /**
     * 链接算法（当处于link模式）
     * @param n {number} : 页码
     * */
    this.getLink = function (n) {
        //这里的算法适用于比如：
        //hrefFormer=http://www.xx.com/news/20131212
        //hrefLatter=.html
        //那么首页（第1页）就是http://www.xx.com/news/20131212.html
        //第2页就是http://www.xx.com/news/20131212_2.html
        //第n页就是http://www.xx.com/news/20131212_n.html
        if (n == 1) {
            return this.hrefFormer + this.hrefLatter;
        }
        return this.hrefFormer + '_' + n + this.hrefLatter;
    };

    /**
     * 页码单击事件处理函数（当处于mode模式）
     * @param n {number} : 页码
     * */
    this.click = function (n) {
        //这里自己实现,这里可以用this或者kkpager访问kkpager对象
        // console.log(n);
        return false;
    };

    /**
     * 获取href的值（当处于mode模式）
     * @param n {number} : 参数n为页码
     */
    this.getHref = function (n) {
        //默认返回'#'
        // console.log(n);
        return '#';
    };

    /**
     * 分页的初始化方法(私有)
     * @param config {Object} : 自定义参数
     * */
    this._init = function (config) {
        if (config == null) config = {};
        this.pno = isNaN(config.pno) ? 1 : parseInt(config.pno);
        this.total = isNaN(config.total) ? 1 : parseInt(config.total);
        this.totalRecords = isNaN(config.totalRecords) ? 0 : parseInt(config.totalRecords);
        if (config.pagerid) {
            this.pagerid = config.pagerid;
        }
        if (config.mode) {
            this.mode = config.mode;
        }
        if (config.gopageWrapId) {
            this.gopageWrapId = config.gopageWrapId;
        }
        if (config.gopageButtonId) {
            this.gopageButtonId = config.gopageButtonId;
        }
        if (config.gopageTextboxId) {
            this.gopageTextboxId = config.gopageTextboxId;
        }
        if (config.isShowFirstPageBtn != undefined) {
            this.isShowFirstPageBtn = config.isShowFirstPageBtn;
        }
        if (config.isShowLastPageBtn != undefined) {
            this.isShowLastPageBtn = config.isShowLastPageBtn;
        }
        if (config.isShowPrePageBtn != undefined) {
            this.isShowPrePageBtn = config.isShowPrePageBtn;
        }
        if (config.isShowNextPageBtn != undefined) {
            this.isShowNextPageBtn = config.isShowNextPageBtn;
        }
        if (config.isShowTotalPage != undefined) {
            this.isShowTotalPage = config.isShowTotalPage;
        }
        if (config.isShowCurrPage != undefined) {
            this.isShowCurrPage = config.isShowCurrPage;
        }
        if (config.isShowTotalRecords != undefined) {
            this.isShowTotalRecords = config.isShowTotalRecords;
        }
        if (config.isWrapedPageBtns) {
            this.isWrapedPageBtns = config.isWrapedPageBtns;
        }
        if (config.isWrapedInfoTextAndGoPageBtn) {
            this.isWrapedInfoTextAndGoPageBtn = config.isWrapedInfoTextAndGoPageBtn;
        }
        if (config.isGoPage != undefined) {
            this.isGoPage = config.isGoPage;
        }
        if (config.lang) {
            for (var key in config.lang) {
                this.lang[key] = config.lang[key];
            }
        }
        this.hrefFormer = config.hrefFormer || '';
        this.hrefLatter = config.hrefLatter || '';
        if (config.getLink && typeof(config.getLink) == 'function') {
            this.getLink = config.getLink;
        }
        if (config.click && typeof(config.click) == 'function') {
            this.click = config.click;
        }
        if (config.getHref && typeof(config.getHref) == 'function') {
            this.getHref = config.getHref;
        }
        if (!this._config) {
            this._config = config;
        }
        //validate
        if (this.pno < 1) this.pno = 1;
        this.total = (this.total <= 1) ? 1 : this.total;
        if (this.pno > this.total) this.pno = this.total;
        this.prv = (this.pno <= 2) ? 1 : (this.pno - 1);
        this.next = (this.pno >= this.total - 1) ? this.total : (this.pno + 1);
        this.hasPrv = (this.pno > 1);
        this.hasNext = (this.pno < this.total);

        this.inited = true;
    };
    //this._init(config);

};

//跳转框得到输入焦点时
Pagination.prototype.focusGoPage = function ($parent) {
    var btnGo = $parent.find('.' + this.gopageButtonId),
        $gopageTextbox = $parent.find('.' + this.gopageTextboxId);

    $gopageTextbox.attr('hideFocus', true);
    btnGo.show();
    btnGo.css('left', '10px');
    $gopageTextbox.addClass('focus');
    btnGo.animate({left: '+=30'}, 50);
};

//跳转框失去输入焦点时
Pagination.prototype.blurGoPage = function ($parent) {
    var _this = this;
    var btnGo = $parent.find('.' + _this.gopageButtonId);

    setTimeout(function () {
        btnGo.animate({
            left: '-=25'
        }, 100, function () {
            btnGo.hide();
            $('.' + _this.gopageTextboxId).removeClass('focus');
        });
    }, 200);
};

//跳转输入框按键操作
Pagination.prototype.keypressGopage = function (event, $parent) {

    var event = arguments[0] || window.event;
    var code = event.keyCode || event.charCode;
    //delete key
    if (code == 8) return true;
    //enter key
    if (code == 13) {
        this.goPage($parent);
        return false;
    }

    //非数字不允许输入
    if (code < 48 || code > 57) return false;
    //copy and paste
    if (event.ctrlKey && (code == 99 || code == 118)) return true;
    return true;
};

//跳转框页面跳转
Pagination.prototype.goPage = function ($parent) {
    var $goPage = $parent.find('.' + this.gopageTextboxId),
        str_page = $goPage.val();

    if (isNaN(str_page)) {
        $goPage.val(this.next);
        return false;
    }

    var n = parseInt(str_page);
    if (n < 1) n = 1;
    if (n > this.total) n = this.total;
    if (this.mode == 'click') {
        this._clickHandler(n);
    } else {
        window.location = this.getLink(n);
    }
};

//不刷新页面直接手动调用选中某一页码
Pagination.prototype.selectPage = function (n) {
    this._config['pno'] = n;
    this.generatePageHTML(this._config, true);
};

Pagination.prototype.generatePageHTML = function (config, enforceInit) {
    var _self = this;
    if (enforceInit || !this.inited) {
        this._init(config);
    }

    var str_first = '', str_prv = '', str_next = '', str_last = '';

    /*是否显示首页按钮*/
    if (this.isShowFirstPageBtn) {
        if (this.hasPrv) {  //是否首页
            str_first = '<a ' + this._getHandlerStr(1) + ' title="'
                + (this.lang.firstPageTipText || this.lang.firstPageText) + '">' + this.lang.firstPageText + '</a>';
        } else {
            str_first = '<span class="disabled">' + this.lang.firstPageText + '</span>';
        }
    }

    /*是否显示上一页按钮*/
    if (this.isShowPrePageBtn) {
        if (this.hasPrv) {
            str_prv = '<a ' + this._getHandlerStr(this.prv) + ' title="'
                + (this.lang.prePageTipText || this.lang.prePageText) + '">' + this.lang.prePageText + '</a>';
        } else {
            str_prv = '<span class="disabled">' + this.lang.prePageText + '</span>';
        }
    }

    /*是否显示下一页按钮*/
    if (this.isShowNextPageBtn) {
        if (this.hasNext) {
            str_next = '<a ' + this._getHandlerStr(this.next) + ' title="'
                + (this.lang.nextPageTipText || this.lang.nextPageText) + '">' + this.lang.nextPageText + '</a>';
        } else {
            str_next = '<span class="disabled">' + this.lang.nextPageText + '</span>';
        }
    }

    /*是否显示尾页按钮*/
    if (this.isShowLastPageBtn) {
        if (this.hasNext) {
            str_last = '<a ' + this._getHandlerStr(this.total) + ' title="'
                + (this.lang.lastPageTipText || this.lang.lastPageText) + '">' + this.lang.lastPageText + '</a>';
        } else {
            str_last = '<span class="disabled">' + this.lang.lastPageText + '</span>';
        }
    }

    var str = '';
    var dot = '<span class="spanDot">...</span>';
    var total_info = '<span class="totalText">';
    var total_info_splitstr = '<span class="totalInfoSplitStr">' + this.lang.totalInfoSplitStr + '</span>';


    if (this.isShowCurrPage) {  /*是否显示当前页*/
        total_info += this.lang.currPageBeforeText + '<span class="currPageNum">' + this.pno + '</span>' + this.lang.currPageAfterText;
        if (this.isShowTotalPage) {
            total_info += total_info_splitstr;
            total_info += this.lang.totalPageBeforeText + '<span class="totalPageNum">' + this.total + '</span>' + this.lang.totalPageAfterText;
        } else if (this.isShowTotalRecords) {
            total_info += total_info_splitstr;
            total_info += this.lang.totalRecordsBeforeText + '<span class="totalRecordNum">' + this.totalRecords + '</span>' + this.lang.totalRecordsAfterText;
        }
    } else if (this.isShowTotalPage) {  /*是否显示总页数*/
        total_info += this.lang.totalPageBeforeText + '<span class="totalPageNum">' + this.total + '</span>' + this.lang.totalPageAfterText;
        if (this.isShowTotalRecords) {
            total_info += total_info_splitstr;
            total_info += this.lang.totalRecordsBeforeText + '<span class="totalRecordNum">' + this.totalRecords + '</span>' + this.lang.totalRecordsAfterText;
        }
    } else if (this.isShowTotalRecords) {   /*是否显示总记录数*/
        total_info += this.lang.totalRecordsBeforeText + '<span class="totalRecordNum">' + this.totalRecords + '</span>' + this.lang.totalRecordsAfterText;
    }
    total_info += '</span>';

    var gopage_info = '';

    if (this.isGoPage) {    /*是否显示跳转容器*/
        gopage_info = '<span class="goPageBox">' + this.lang.gopageBeforeText + '<span class="' + this.gopageWrapId + '">' +
            '<input type="button" class="' + this.gopageButtonId + '" value="' + this.lang.gopageButtonOkText + '" />' +
            '<input type="text" class="' + this.gopageTextboxId + '"  value="' + this.next + '" /></span>' + this.lang.gopageAfterText + '</span>';
    }

    //分页处理
    if (this.total <= 8) {  /*页码数不够8页时，全部显示*/
        for (var n = 1; n <= this.total; n++) {
            if (this.pno == n) {
                str += '<span class="curr">' + n + '</span>';
            } else {
                str += '<a ' + this._getHandlerStr(n) + ' title="'
                    + this.lang.buttonTipBeforeText + n + this.lang.buttonTipAfterText + '">' + n + '</a>';
            }
        }
    } else {
        if (this.pno <= 5) {    //当前页小于或等于5页时
            for (var j = 1; j <= 7; j++) {
                if (this.pno == j) {
                    str += '<span class="curr">' + j + '</span>';
                } else {
                    str += '<a ' + this._getHandlerStr(j) + ' title="' +
                        this.lang.buttonTipBeforeText + j + this.lang.buttonTipAfterText + '">' + j + '</a>';
                }
            }
            str += dot;
        } else {
            str += '<a ' + this._getHandlerStr(1) + ' title="'
                + this.lang.buttonTipBeforeText + '1' + this.lang.buttonTipAfterText + '">1</a>';
            str += '<a ' + this._getHandlerStr(2) + ' title="'
                + this.lang.buttonTipBeforeText + '2' + this.lang.buttonTipAfterText + '">2</a>';
            str += dot;

            var begin = this.pno - 2;
            var end = this.pno + 2;

            if (end > this.total) {
                end = this.total;
                begin = end - 4;
                if (this.pno - begin < 2) {
                    begin = begin - 1;
                }
            } else if (end + 1 == this.total) {
                end = this.total;
            }

            for (var i = begin; i <= end; i++) {
                if (this.pno == i) {
                    str += '<span class="curr">' + i + '</span>';
                } else {
                    str += '<a ' + this._getHandlerStr(i) + ' title="'
                        + this.lang.buttonTipBeforeText + i + this.lang.buttonTipAfterText + '">' + i + '</a>';
                }
            }
            if (end != this.total) {
                str += dot;
            }
        }
    }

    var pagerHtml = '<div>';
    if (this.isWrapedPageBtns) {
        pagerHtml += '<span class="pageBtnWrap">' + str_first + str_prv + str + str_next + str_last + '</span>'
    } else {
        pagerHtml += str_first + str_prv + str + str_next + str_last;
    }
    if (this.isWrapedInfoTextAndGoPageBtn) {
        pagerHtml += '<span class="infoTextAndGoPageBtnWrap">' + total_info + gopage_info + '</span>';
    } else {
        pagerHtml += total_info + gopage_info;
    }
    pagerHtml += '</div><div style="clear:both;"></div>';

    var $pagerWrap = $("#" + this.pagerid);

    $pagerWrap.html(pagerHtml);
    $pagerWrap.find("a").unbind("").bind("click", function () {
        var index = $(this).attr("data-index");
        _self._clickHandler(index);
    });

    $pagerWrap.find("." + this.gopageTextboxId).bind("focus", function () {
        _self.focusGoPage($pagerWrap);
    }).bind("keypress", function (event) {
        _self.keypressGopage(event, $pagerWrap);
    }).bind("blur", function () {
        _self.blurGoPage($pagerWrap);
    });

    $pagerWrap.find("." + this.gopageButtonId).bind("click", function () {
        _self.goPage($pagerWrap);
    });

};

Pagination.prototype._getHandlerStr = function (n) {
    if (this.mode == 'click') {
        return 'href="' + this.getHref(n) + '" data-index="' + n + '"';

    }
    //link模式，也是默认的
    return 'href="' + this.getLink(n) + '"';
};

Pagination.prototype._clickHandler = function (n) {
    var res = false;
    if (this.click && typeof this.click == 'function') {
        res = this.click.call(this, n) || false;
    }
    return res;
};


