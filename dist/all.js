!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,s){return void 0===s&&(s="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(s),s}:e(jQuery)}((function(e){"use strict";var t=e(document),s=e(window),i=["a","e","i","o","u","n","c","y"],l=[/[\xE0-\xE5]/g,/[\xE8-\xEB]/g,/[\xEC-\xEF]/g,/[\xF2-\xF6]/g,/[\xF9-\xFC]/g,/[\xF1]/g,/[\xE7]/g,/[\xFD-\xFF]/g],n=function(t,s){this.element=t,this.$element=e(t),this.state={multiple:!!this.$element.attr("multiple"),enabled:!1,opened:!1,currValue:-1,selectedIdx:-1,highlightedIdx:-1},this.eventTriggers={open:this.open,close:this.close,destroy:this.destroy,refresh:this.refresh,init:this.init},this.init(s)};n.prototype={utils:{isMobile:function(){return/android|ip(hone|od|ad)/i.test(navigator.userAgent)},escapeRegExp:function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},replaceDiacritics:function(e){for(var t=l.length;t--;)e=e.toLowerCase().replace(l[t],i[t]);return e},format:function(e){var t=arguments;return(""+e).replace(/\{(?:(\d+)|(\w+))\}/g,(function(e,s,i){return i&&t[1]?t[1][i]:t[s]}))},nextEnabledItem:function(e,t){for(;e[t=(t+1)%e.length].disabled;);return t},previousEnabledItem:function(e,t){for(;e[t=(t>0?t:e.length)-1].disabled;);return t},toDash:function(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()},triggerCallback:function(t,s){var i=s.element,l=s.options["on"+t],n=[i].concat([].slice.call(arguments).slice(1));e.isFunction(l)&&l.apply(i,n),e(i).trigger("selectric-"+this.toDash(t),n)},arrayToClassname:function(t){var s=e.grep(t,(function(e){return!!e}));return e.trim(s.join(" "))}},init:function(t){var s=this;if(s.options=e.extend(!0,{},e.fn.selectric.defaults,s.options,t),s.utils.triggerCallback("BeforeInit",s),s.destroy(!0),s.options.disableOnMobile&&s.utils.isMobile())s.disableOnMobile=!0;else{s.classes=s.getClassNames();var i=e("<input/>",{class:s.classes.input,readonly:s.utils.isMobile()}),l=e("<div/>",{class:s.classes.items,tabindex:-1}),n=e("<div/>",{class:s.classes.scroll}),a=e("<div/>",{class:s.classes.prefix,html:s.options.arrowButtonMarkup}),o=e("<span/>",{class:"label"}),r=s.$element.wrap("<div/>").parent().append(a.prepend(o),l,i),p=e("<div/>",{class:s.classes.hideselect});s.elements={input:i,items:l,itemsScroll:n,wrapper:a,label:o,outerWrapper:r},s.options.nativeOnMobile&&s.utils.isMobile()&&(s.elements.input=void 0,p.addClass(s.classes.prefix+"-is-native"),s.$element.on("change",(function(){s.refresh()}))),s.$element.on(s.eventTriggers).wrap(p),s.originalTabindex=s.$element.prop("tabindex"),s.$element.prop("tabindex",-1),s.populate(),s.activate(),s.utils.triggerCallback("Init",s)}},activate:function(){var e=this.elements.items.closest(":visible").children(":hidden").addClass(this.classes.tempshow),t=this.$element.width();e.removeClass(this.classes.tempshow),this.utils.triggerCallback("BeforeActivate",this),this.elements.outerWrapper.prop("class",this.utils.arrayToClassname([this.classes.wrapper,this.$element.prop("class").replace(/\S+/g,this.classes.prefix+"-$&"),this.options.responsive?this.classes.responsive:""])),this.options.inheritOriginalWidth&&t>0&&this.elements.outerWrapper.width(t),this.unbindEvents(),this.$element.prop("disabled")?(this.elements.outerWrapper.addClass(this.classes.disabled),this.elements.input&&this.elements.input.prop("disabled",!0)):(this.state.enabled=!0,this.elements.outerWrapper.removeClass(this.classes.disabled),this.$li=this.elements.items.removeAttr("style").find("li"),this.bindEvents()),this.utils.triggerCallback("Activate",this)},getClassNames:function(){var t=this,s=t.options.customClass,i={};return e.each("Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel".split(" "),(function(e,l){var n=s.prefix+l;i[l.toLowerCase()]=s.camelCase?n:t.utils.toDash(n)})),i.prefix=s.prefix,i},setLabel:function(){var t=this,s=t.options.labelBuilder;if(t.state.multiple){var i=e.isArray(t.state.currValue)?t.state.currValue:[t.state.currValue];i=0===i.length?[0]:i;var l=e.map(i,(function(s){return e.grep(t.lookupItems,(function(e){return e.index===s}))[0]}));l=e.grep(l,(function(t){return l.length>1||0===l.length?""!==e.trim(t.value):t})),l=e.map(l,(function(i){return e.isFunction(s)?s(i):t.utils.format(s,i)})),t.options.multiple.maxLabelEntries&&(l.length>=t.options.multiple.maxLabelEntries+1?(l=l.slice(0,t.options.multiple.maxLabelEntries)).push(e.isFunction(s)?s({text:"..."}):t.utils.format(s,{text:"..."})):l.slice(l.length-1)),t.elements.label.html(l.join(t.options.multiple.separator))}else{var n=t.lookupItems[t.state.currValue];t.elements.label.html(e.isFunction(s)?s(n):t.utils.format(s,n))}},populate:function(){var t=this,s=t.$element.children(),i=t.$element.find("option"),l=i.filter(":selected"),n=i.index(l),a=0,o=t.state.multiple?[]:0;l.length>1&&t.state.multiple&&(n=[],l.each((function(){n.push(e(this).index())}))),t.state.currValue=~n?n:o,t.state.selectedIdx=t.state.currValue,t.state.highlightedIdx=t.state.currValue,t.items=[],t.lookupItems=[],s.length&&(s.each((function(s){var i=e(this);if(i.is("optgroup")){var l={element:i,label:i.prop("label"),groupDisabled:i.prop("disabled"),items:[]};i.children().each((function(s){var i=e(this);l.items[s]=t.getItemData(a,i,l.groupDisabled||i.prop("disabled")),t.lookupItems[a]=l.items[s],a++})),t.items[s]=l}else t.items[s]=t.getItemData(a,i,i.prop("disabled")),t.lookupItems[a]=t.items[s],a++})),t.setLabel(),t.elements.items.append(t.elements.itemsScroll.html(t.getItemsMarkup(t.items))))},getItemData:function(t,s,i){return{index:t,element:s,value:s.val(),className:s.prop("class"),text:s.html(),slug:e.trim(this.utils.replaceDiacritics(s.html())),alt:s.attr("data-alt"),selected:s.prop("selected"),disabled:i}},getItemsMarkup:function(t){var s=this,i="<ul>";return e.isFunction(s.options.listBuilder)&&s.options.listBuilder&&(t=s.options.listBuilder(t)),e.each(t,(function(t,l){void 0!==l.label?(i+=s.utils.format('<ul class="{1}"><li class="{2}">{3}</li>',s.utils.arrayToClassname([s.classes.group,l.groupDisabled?"disabled":"",l.element.prop("class")]),s.classes.grouplabel,l.element.prop("label")),e.each(l.items,(function(e,t){i+=s.getItemMarkup(t.index,t)})),i+="</ul>"):i+=s.getItemMarkup(l.index,l)})),i+"</ul>"},getItemMarkup:function(t,s){var i=this.options.optionsItemBuilder,l={value:s.value,text:s.text,slug:s.slug,index:s.index};return this.utils.format('<li data-index="{1}" class="{2}">{3}</li>',t,this.utils.arrayToClassname([s.className,t===this.items.length-1?"last":"",s.disabled?"disabled":"",s.selected?"selected":""]),e.isFunction(i)?this.utils.format(i(s,this.$element,t),s):this.utils.format(i,l))},unbindEvents:function(){this.elements.wrapper.add(this.$element).add(this.elements.outerWrapper).add(this.elements.input).off(".sl")},bindEvents:function(){var t=this;t.elements.outerWrapper.on("mouseenter.sl mouseleave.sl",(function(s){e(this).toggleClass(t.classes.hover,"mouseenter"===s.type),t.options.openOnHover&&(clearTimeout(t.closeTimer),"mouseleave"===s.type?t.closeTimer=setTimeout(e.proxy(t.close,t),t.options.hoverIntentTimeout):t.open())})),t.elements.wrapper.on("click.sl",(function(e){t.state.opened?t.close():t.open(e)})),t.options.nativeOnMobile&&t.utils.isMobile()||(t.$element.on("focus.sl",(function(){t.elements.input.focus()})),t.elements.input.prop({tabindex:t.originalTabindex,disabled:!1}).on("keydown.sl",e.proxy(t.handleKeys,t)).on("focusin.sl",(function(e){t.elements.outerWrapper.addClass(t.classes.focus),t.elements.input.one("blur",(function(){t.elements.input.blur()})),t.options.openOnFocus&&!t.state.opened&&t.open(e)})).on("focusout.sl",(function(){t.elements.outerWrapper.removeClass(t.classes.focus)})).on("input propertychange",(function(){var s=t.elements.input.val(),i=new RegExp("^"+t.utils.escapeRegExp(s),"i");clearTimeout(t.resetStr),t.resetStr=setTimeout((function(){t.elements.input.val("")}),t.options.keySearchTimeout),s.length&&e.each(t.items,(function(e,s){if(!s.disabled){if(i.test(s.text)||i.test(s.slug))return t.highlight(e),!1;if(s.alt)for(var l=s.alt.split("|"),n=0;n<l.length&&l[n];n++)if(i.test(l[n].trim()))return t.highlight(e),!1}}))}))),t.$li.on({mousedown:function(e){e.preventDefault(),e.stopPropagation()},click:function(){return t.select(e(this).data("index")),!1}})},handleKeys:function(t){var s=t.which,i=this.options.keys,l=e.inArray(s,i.previous)>-1,n=e.inArray(s,i.next)>-1,a=e.inArray(s,i.select)>-1,o=e.inArray(s,i.open)>-1,r=this.state.highlightedIdx,p=l&&0===r||n&&r+1===this.items.length,u=0;if(13!==s&&32!==s||t.preventDefault(),l||n){if(!this.options.allowWrap&&p)return;l&&(u=this.utils.previousEnabledItem(this.lookupItems,r)),n&&(u=this.utils.nextEnabledItem(this.lookupItems,r)),this.highlight(u)}if(a&&this.state.opened)return this.select(r),void(this.state.multiple&&this.options.multiple.keepMenuOpen||this.close());o&&!this.state.opened&&this.open()},refresh:function(){this.populate(),this.activate(),this.utils.triggerCallback("Refresh",this)},setOptionsDimensions:function(){var e=this.elements.items.closest(":visible").children(":hidden").addClass(this.classes.tempshow),t=this.options.maxHeight,s=this.elements.items.outerWidth(),i=this.elements.wrapper.outerWidth()-(s-this.elements.items.width());!this.options.expandToItemText||i>s?this.finalWidth=i:(this.elements.items.css("overflow","scroll"),this.elements.outerWrapper.width(9e4),this.finalWidth=this.elements.items.width(),this.elements.items.css("overflow",""),this.elements.outerWrapper.width("")),this.elements.items.width(this.finalWidth).height()>t&&this.elements.items.height(t),e.removeClass(this.classes.tempshow)},isInViewport:function(){if(!0===this.options.forceRenderAbove)this.elements.outerWrapper.addClass(this.classes.above);else if(!0===this.options.forceRenderBelow)this.elements.outerWrapper.addClass(this.classes.below);else{var e=s.scrollTop(),t=s.height(),i=this.elements.outerWrapper.offset().top,l=i+this.elements.outerWrapper.outerHeight()+this.itemsHeight<=e+t,n=i-this.itemsHeight>e,a=!l&&n,o=!a;this.elements.outerWrapper.toggleClass(this.classes.above,a),this.elements.outerWrapper.toggleClass(this.classes.below,o)}},detectItemVisibility:function(t){var s=this.$li.filter("[data-index]");this.state.multiple&&(t=e.isArray(t)&&0===t.length?0:t,t=e.isArray(t)?Math.min.apply(Math,t):t);var i=s.eq(t).outerHeight(),l=s[t].offsetTop,n=this.elements.itemsScroll.scrollTop(),a=l+2*i;this.elements.itemsScroll.scrollTop(a>n+this.itemsHeight?a-this.itemsHeight:l-i<n?l-i:n)},open:function(s){var i=this;if(i.options.nativeOnMobile&&i.utils.isMobile())return!1;i.utils.triggerCallback("BeforeOpen",i),s&&(s.preventDefault(),i.options.stopPropagation&&s.stopPropagation()),i.state.enabled&&(i.setOptionsDimensions(),e("."+i.classes.hideselect,"."+i.classes.open).children().selectric("close"),i.state.opened=!0,i.itemsHeight=i.elements.items.outerHeight(),i.itemsInnerHeight=i.elements.items.height(),i.elements.outerWrapper.addClass(i.classes.open),i.elements.input.val(""),s&&"focusin"!==s.type&&i.elements.input.focus(),setTimeout((function(){t.on("click.sl",e.proxy(i.close,i)).on("scroll.sl",e.proxy(i.isInViewport,i))}),1),i.isInViewport(),i.options.preventWindowScroll&&t.on("mousewheel.sl DOMMouseScroll.sl","."+i.classes.scroll,(function(t){var s=t.originalEvent,l=e(this).scrollTop(),n=0;"detail"in s&&(n=-1*s.detail),"wheelDelta"in s&&(n=s.wheelDelta),"wheelDeltaY"in s&&(n=s.wheelDeltaY),"deltaY"in s&&(n=-1*s.deltaY),(l===this.scrollHeight-i.itemsInnerHeight&&n<0||0===l&&n>0)&&t.preventDefault()})),i.detectItemVisibility(i.state.selectedIdx),i.highlight(i.state.multiple?-1:i.state.selectedIdx),i.utils.triggerCallback("Open",i))},close:function(){this.utils.triggerCallback("BeforeClose",this),t.off(".sl"),this.elements.outerWrapper.removeClass(this.classes.open),this.state.opened=!1,this.utils.triggerCallback("Close",this)},change:function(){var t=this;t.utils.triggerCallback("BeforeChange",t),t.state.multiple?(e.each(t.lookupItems,(function(e){t.lookupItems[e].selected=!1,t.$element.find("option").prop("selected",!1)})),e.each(t.state.selectedIdx,(function(e,s){t.lookupItems[s].selected=!0,t.$element.find("option").eq(s).prop("selected",!0)})),t.state.currValue=t.state.selectedIdx,t.setLabel(),t.utils.triggerCallback("Change",t)):t.state.currValue!==t.state.selectedIdx&&(t.$element.prop("selectedIndex",t.state.currValue=t.state.selectedIdx).data("value",t.lookupItems[t.state.selectedIdx].text),t.setLabel(),t.utils.triggerCallback("Change",t))},highlight:function(e){var t=this.$li.filter("[data-index]").removeClass("highlighted");this.utils.triggerCallback("BeforeHighlight",this),void 0===e||-1===e||this.lookupItems[e].disabled||(t.eq(this.state.highlightedIdx=e).addClass("highlighted"),this.detectItemVisibility(e),this.utils.triggerCallback("Highlight",this))},select:function(t){var s=this,i=s.$li.filter("[data-index]");if(s.utils.triggerCallback("BeforeSelect",s,t),void 0!==t&&-1!==t&&!s.lookupItems[t].disabled){if(s.state.multiple){s.state.selectedIdx=e.isArray(s.state.selectedIdx)?s.state.selectedIdx:[s.state.selectedIdx];var l=e.inArray(t,s.state.selectedIdx);-1!==l?s.state.selectedIdx.splice(l,1):s.state.selectedIdx.push(t),i.removeClass("selected").filter((function(t){return-1!==e.inArray(t,s.state.selectedIdx)})).addClass("selected")}else i.removeClass("selected").eq(s.state.selectedIdx=t).addClass("selected");s.state.multiple&&s.options.multiple.keepMenuOpen||s.close(),s.change(),s.utils.triggerCallback("Select",s,t)}},destroy:function(e){this.state&&this.state.enabled&&(this.elements.items.add(this.elements.wrapper).add(this.elements.input).remove(),e||this.$element.removeData("selectric").removeData("value"),this.$element.prop("tabindex",this.originalTabindex).off(".sl").off(this.eventTriggers).unwrap().unwrap(),this.state.enabled=!1)}},e.fn.selectric=function(t){return this.each((function(){var s=e.data(this,"selectric");s&&!s.disableOnMobile?"string"==typeof t&&s[t]?s[t]():s.init(t):e.data(this,"selectric",new n(this,t))}))},e.fn.selectric.defaults={onChange:function(t){e(t).change()},maxHeight:300,keySearchTimeout:500,arrowButtonMarkup:'<b class="button">&#x25be;</b>',disableOnMobile:!1,nativeOnMobile:!0,openOnFocus:!0,openOnHover:!1,hoverIntentTimeout:500,expandToItemText:!1,responsive:!1,preventWindowScroll:!0,inheritOriginalWidth:!1,allowWrap:!0,forceRenderAbove:!1,forceRenderBelow:!1,stopPropagation:!0,optionsItemBuilder:"{text}",labelBuilder:"{text}",listBuilder:!1,keys:{previous:[37,38],next:[39,40],select:[9,13,27],open:[13,32,37,38,39,40],close:[9,27]},customClass:{prefix:"selectric",camelCase:!1},multiple:{separator:", ",keepMenuOpen:!0,maxLabelEntries:!1}}})),$(document).ready((function(){$(".loader").hide(),$("select").selectric();const e=e=>{$.ajax({url:`https://api.nytimes.com/svc/topstories/v2/${e}.json?api-key=uVsGON6UfLMCDT3ebpRGQZsw0MSqmPCU`,type:"GET",success:function(e){e.results;t(e.results)}})},t=e=>{if(e.length>=12)for(i=0;i<=11;i++){if(e[i].multimedia.length>0){const t=`<div class="article-container"><a href="${e[i].url}" title="${e[i].title}"><img src="${e[i].multimedia[0].url}" class="article-image" alt="" /><p class="article-desc">${e[i].abstract}</p></a></div>`;$(".top-stories").append(t)}$(".loader").hide()}};$(".myList").on("change",()=>{$(".top-stories").html(""),$(".loader").show(),""===$("option:selected").val()&&e("home");const t=$("option:selected").text().toLowerCase();e(t)}),e("home")}));