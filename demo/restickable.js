var restickable = {};


(function() {

  var getDocumentHeight = function(){
    var documentHeight = Math.max(  document.body.scrollHeight,
                                        document.body.offsetHeight,
                                        document.documentElement.clientHeight,
                                        document.documentElement.scrollHeight,
                                        document.documentElement.offsetHeight );
    return documentHeight;
  };

  var isWindow = function(obj) {
      return obj != null && obj === obj.window;
  };

  var getWindow = function(elem) {
      return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  };

  var getElementOffset = function(elem) {

      var docElem, win,
          box = {top: 0, left: 0},
          doc = elem && elem.ownerDocument;

      docElem = doc.documentElement;

      if (typeof elem.getBoundingClientRect !== typeof undefined) {
          box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
          top: box.top + win.pageYOffset - docElem.clientTop,
          left: box.left + win.pageXOffset - docElem.clientLeft
      };
  };

  function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  var getScrollTop = function(){
    var top  = window.pageYOffset || document.documentElement.scrollTop;
    return top;
  };

  var getStyleStringValue = function(elem, prop){
    var value = window.getComputedStyle(elem)[prop];
    return value;
  };

  var getStyleNumericValue = function(elem, prop){
    var value = parseFloat(window.getComputedStyle(elem)[prop].replace('px', ''));
    return value;
  };

  var getOuterWidth = function(el) {
      var width = getStyleNumericValue(el, "width") +
          getStyleNumericValue(el, "margin-left") +
          getStyleNumericValue(el, "margin-right");

      if (getStyleStringValue(el, "box-sizing") !== "border-box") {
        width += getStyleNumericValue(el, "border-left-width") +
              getStyleNumericValue(el, "border-right-width") +
              getStyleNumericValue(el, "padding-left") +
              getStyleNumericValue(el, "padding-right");
      }
      return width;
  };


  var stickInParent = function(opts, _element) {
    var doc, elm, isBottomingEnabled, innerScrolling, manualSpacer, offsetTop, parentSelector, recalcEvery, stickyClass, _fn, _i, _len, onUnstick, onStick, onBottom;


    if (opts == null) {
      opts = {};
    }
    stickyClass = opts.stickyClass,
    innerScrolling = opts.innerScrolling,
    recalcEvery = opts.recalcEvery,
    parentSelector = opts.parent,
    offsetTop = opts.offsetTop,
    manualSpacer = opts.spacer,
    isBottomingEnabled = opts.bottoming,
    onUnstick = opts.onUnstick,
    onBottom = opts.onBottom,
    onStick = opts.onStick;


    if (offsetTop == null) {
      offsetTop = 0;
    }
    if (parentSelector == null) {
      parentSelector = void 0;
    }
    if (innerScrolling == null) {
      innerScrolling = true;
    }
    if (stickyClass == null) {
      stickyClass = "stuck";
    }
    if (isBottomingEnabled == null) {
      isBottomingEnabled = true;
    }

    _fn = function(e_l_m, paddingBottom, parentTop, parentHeight, top, height, elmFloat, detached) {
      var bottomed, detach, fixed, lastPosition, lastScrollHeight, offset, p_a_r_e_n_t, recalc, recalcAndTick, recalcCounter, s_p_a_c_e_r, tick;

      //TODO: check if e_l_m is already sticky (by reading attached to element data)
      //TODO: if e_l_m is not sticky, attach data to element.

      lastScrollHeight = getDocumentHeight();

      p_a_r_e_n_t = e_l_m.parentElement;

      if (parentSelector != null) {
        p_a_r_e_n_t = document.querySelector(parentSelector);
      }

      if(! (p_a_r_e_n_t instanceof HTMLElement)){
        throw "failed to find stick parent";
      }

      fixed = false;
      bottomed = false;

      s_p_a_c_e_r = manualSpacer != null ? manualSpacer && document.querySelector(manualSpacer) : document.createElement('div');


      if(s_p_a_c_e_r){
        var position = getStyleStringValue(e_l_m, "position");
        s_p_a_c_e_r.style['position'] = position;
      }

      recalc = function() {
        var borderTopWidth, paddingTop, restore;

        if (detached) {
          return;
        }

        lastScrollHeight = getDocumentHeight();

        borderTopWidth = getStyleNumericValue(p_a_r_e_n_t, "border-top-width");

        paddingTop = getStyleNumericValue(p_a_r_e_n_t, "padding-top");

        paddingBottom = getStyleNumericValue(p_a_r_e_n_t, "padding-bottom");

        parentTop = getElementOffset(p_a_r_e_n_t).top;

        parentHeight = p_a_r_e_n_t.offsetHeight;

        if (fixed) {
          fixed = false;
          bottomed = false;
          if (manualSpacer == null) {
             insertAfter(s_p_a_c_e_r, e_l_m);
             s_p_a_c_e_r.remove();
          }

          e_l_m.style['position'] = "";
          e_l_m.style['top'] = "";
          e_l_m.style['width'] = "";
          e_l_m.style['bottom'] = "";
          e_l_m.classList.remove(stickyClass);

          restore = true;
        }
        top = getElementOffset(e_l_m).top - (getStyleNumericValue(e_l_m, 'margin-top') || 0) - offsetTop;

        height = e_l_m.offsetHeight + getStyleNumericValue(e_l_m, 'margin-top') + getStyleNumericValue(e_l_m, 'margin-bottom');

        elmFloat = getStyleStringValue(e_l_m, 'float');

        if(s_p_a_c_e_r){

          s_p_a_c_e_r.style["width"] = getOuterWidth(e_l_m) + "px";
          s_p_a_c_e_r.style["height"] = height + "px";
          s_p_a_c_e_r.style["display"] = getStyleStringValue(e_l_m, "display");
          s_p_a_c_e_r.style['vertical-align'] = getStyleStringValue(e_l_m, "vertical-align");
          s_p_a_c_e_r.style["float"] = elmFloat;
        }

        if (restore) {
          return tick();
        }
      };//end recalc

      recalc();

      if (height === parentHeight) {
        return;
      }

      lastPosition = void 0;
      offset = offsetTop;
      recalcCounter = recalcEvery;


      tick = function() {
        var css, delta, recalced, scroll, will_bottom, winHeight;

        if (detached) {
          return;
        }
        recalced = false;
        if (recalcCounter != null) {
          recalcCounter -= 1;
          if (recalcCounter <= 0) {
            recalcCounter = recalcEvery;
            recalc();
            recalced = true;
          }
        }

        var documentHeight = getDocumentHeight();

        if (!recalced && documentHeight !== lastScrollHeight) {
          recalc();
          recalced = true;
        }
        scroll = getScrollTop();

        if (lastPosition != null) {
          delta = scroll - lastPosition;
        }
        lastPosition = scroll;

        if (fixed) {
          if (isBottomingEnabled) {
            will_bottom = scroll + height + offset > parentHeight + parentTop;
            if (bottomed && !will_bottom) {
              bottomed = false;

              e_l_m.style.position = "fixed";
              e_l_m.style.bottom = "";
              e_l_m.style.top = offset + "px";

            }
          }
          if (scroll < top) {
            fixed = false;
            offset = offsetTop;
            if (manualSpacer == null) {
              if (elmFloat === "left" || elmFloat === "right") {
                insertAfter(s_p_a_c_e_r, e_l_m);
              }
              //TODO: remove element but keep attached data:
              s_p_a_c_e_r.remove();
            }

            e_l_m.style['position'] = "";
            e_l_m.style['width'] = "";
            e_l_m.style['top'] = "";
            e_l_m.classList.remove(stickyClass);

            //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>unstick");
            if(typeof onUnstick === 'function'){
              onUnstick();
            }
          }
          if (innerScrolling) {
            winHeight = window.innerHeight;

            if (height + offsetTop > winHeight) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(winHeight - height, offset);
                offset = Math.min(offsetTop, offset);
                if (fixed) {
                  e_l_m.style['top'] = offset + "px";
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;

            if(getStyleStringValue(e_l_m, 'box-sizing') === 'border-box'){
              e_l_m.style['width'] =  getOuterWidth(e_l_m) + "px";
            }else{
              e_l_m.style['width'] = e_l_m.clientWidth + "px";
            }
            e_l_m.style['position'] = "fixed";
            e_l_m.style['top'] = offset + "px";
            e_l_m.classList.add(stickyClass);

            if (manualSpacer == null) {
              insertAfter(s_p_a_c_e_r, e_l_m);

              if (elmFloat === "left" || elmFloat === "right") {
                s_p_a_c_e_r.appendChild(e_l_m);
              }
            }
          //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STICK")
            if(typeof onStick === 'function'){
              onStick();
            }
          }
        }
        if (fixed && isBottomingEnabled) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parentHeight + parentTop;
          }
          if (!bottomed && will_bottom) {
            bottomed = true;
            if(getStyleStringValue(p_a_r_e_n_t, 'position') === 'static'){
              p_a_r_e_n_t.style.position = "relative";
            };

            e_l_m.style.position = "absolute";
            e_l_m.style.bottom = paddingBottom + "px";
            e_l_m.style.top = "auto";
            //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BOTTOM");
            if(typeof onBottom === 'function'){
              onBottom();
            }
            return e_l_m;

          }
        }
      };//end tick;


      recalcAndTick = function() {
        recalc();
        return tick();
      };


      detach = function() {
          detached = true;
          window.removeEventListener("touchmove", tick);
          window.removeEventListener("scroll", tick);
          window.removeEventListener("resize", recalcAndTick);
          document.body.removeEventListener("restickable:recalc", recalcAndTick)
          window.removeEventListener("restickable:detach", detach);//TODO: should be on element

          //TODO: remove data that shows element is sticky.

          e_l_m.style["position"] = "";
          e_l_m.style["bottom"] = "";
          e_l_m.style["top"] = "";
          e_l_m.style["width"] = "";

          p_a_r_e_n_t.style["position"] = "";
          if (fixed) {
            if (manualSpacer == null) {
              if (elmFloat === "left" || elmFloat === "right") {
                insertAfter(s_p_a_c_e_r, e_l_m)
              }
              s_p_a_c_e_r.remove();
            }
            e_l_m.classList.remove(stickyClass);
            return e_l_m
          }
      };//end detach

      restickable.detach = detach;

      window.addEventListener("touchmove", tick);
      window.addEventListener("scroll", tick);
      window.addEventListener("resize", recalcAndTick);
      document.addEventListener("restickable:recalc", recalcAndTick)
      window.addEventListener("restickable:detach", detach); //TODO: should be on element

      return setTimeout(tick, 0);
    }; //end _fn

    //TODO: try to accept array of elements as well:
    _fn(_element)

    return this;
  }; //end stickInParent

  restickable.stickInParent = stickInParent;

}).call(this);


//export default restickable;

if(typeof module === 'object'){
  module.exports.restickable = restickable;
}
