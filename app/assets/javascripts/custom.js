function noBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}

function cancelDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    if (event.returnValue) {
        event.returnValue = false;
    }
    return false;
}

function addEvent(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    }
    else {
        target.attachEvent("on" + type,
                function(event) {
                    return handler.call(target, event);
                });
    }
}

var whenReady = (function() {
    var funcs = [];
    var ready = false;

    function handler(e) {
        if (ready) return;

        if (e.type === "readystatechange" && 
            document.readyState !== "complete")
        {
            return;
        }

        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }

        ready = true;
        funcs = null;
    }

    addEvent(document, "DOMContentLoaded", handler);
    addEvent(document, "readystatechange", handler);
    addEvent(window, "load", handler);

    return function whenReady(f) {
        if (ready) f.call(document);
        else funcs.push(f);
    }
}());

var countMicropostCharacters = (function() {
    var MAX_MICROPOST_LENGTH = 140;
    
    return function countMicropostCharacters() {
        var text = this.value;
        var charsLeft = MAX_MICROPOST_LENGTH - text.length;
        var div = document.getElementById("char_count").innerHTML = 
                charsLeft > 0 ? charsLeft : 0;
    };
}());

whenReady(function() {
    addEvent(
        document.getElementById("micropost_content"), 
        "keyup", 
        countMicropostCharacters);
    }
);
