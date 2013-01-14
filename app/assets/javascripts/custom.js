var MAX_MICROPOST_LENGTH = 140;
function countMicropostCharacters() {
    var textarea = document.getElementById("micropost_content");
    var text = textarea.value;
    var charsLeft = MAX_MICROPOST_LENGTH - text.length;
    var div = document.getElementById("char_count").innerHTML = 
                charsLeft > 0 ? charsLeft : 0;
    return false;
}

window.addEventListener(
        'load', 
        function() { 
            document.getElementById("micropost_content").addEventListener(
                "keyup",
                countMicropostCharacters,
                false);
        },
    false);



//document.addEventListener('onload', function() { alert("FUCK"); }, false);
/*document.getElementById("micropost_content").onkeypress = function(event) {
    alert("FUCK");
    countMicropostCharacters();
    return false;
};*/
