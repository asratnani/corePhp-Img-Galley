var $ = jQuery.noConflict();
$.extend({
    handleError: function(b, d, a, c) {
        if (b.error) {
            b.error(d, a, c)
        } else {
            if (d.responseText) {
                console.log(d.responseText)
            }
        }
    },
    createUploadIframe: function(d, b) {
        var a = "jUploadFrame" + d;
        var c = '<iframe id="' + a + '" name="' + a + '" style="position:absolute; top:-9999px; left:-9999px"';
        if (window.ActiveXObject) {
            if (typeof b == "boolean") {
                c += ' src="javascript:false"'
            } else {
                if (typeof b == "string") {
                    c += ' src="' + b + '"'
                }
            }
        }
        c += " />";
        $(c).appendTo(document.body);
        return $("#" + a).get(0)
    },
    createUploadForm: function(a, j, d) {
        var h = "jUploadForm" + a;
        var c = "jUploadFile" + a;
        var b = $('<form  action="" method="POST" name="' + h + '" id="' + h + '" enctype="multipart/form-data"></form>');
        if (d) {
            for (var e in d) {
                $('<input type="hidden" name="' + e + '" value="' + d[e] + '" />').appendTo(b)
            }
        }
        var f = $("#" + j);
        var g = $(f).clone();
        $(f).attr("id", c);
        $(f).before(g);
        $(f).appendTo(b);
        $(b).css("position", "absolute");
        $(b).css("top", "-1200px");
        $(b).css("left", "-1200px");
        $(b).appendTo("body");
        return b
    },
    ajaxFileUpload: function(k) {


        k = $.extend({}, $.ajaxSettings, k);
        var fileInput = $('#'+k.fileElementId);
        //alert(fileInput);
        var maxSize = 3000000;
        if(typeof  fileInput.data('max-size')!='undefined'){
            maxSize =fileInput.data('max-size');
        }

        if(fileInput.get(0).files.length){
            var fileSize = fileInput.get(0).files[0].size; // in bytes
            if(fileSize>maxSize){
                swal('Upload max-size is 3MB.');
                return false;
            }
        }
        var a = new Date().getTime();
        var b = $.createUploadForm(a, k.fileElementId, (typeof(k.data) == "undefined" ? false : k.data));
        var i = $.createUploadIframe(a, k.secureuri);
        var h = "jUploadFrame" + a;
        var j = "jUploadForm" + a;
        if (k.global && !$.active++) {
            $.event.trigger("ajaxStart")
        }
        var c = false;
        var f = {};
        if (k.global) {
            $.event.trigger("ajaxSend", [f, k])
        }
        var d = function(l) {
            var p = document.getElementById(h);
            try {
                if (p.contentWindow) {
                    f.responseText = p.contentWindow.document.body ? p.contentWindow.document.body.innerHTML : null;
                    f.responseXML = p.contentWindow.document.XMLDocument ? p.contentWindow.document.XMLDocument : p.contentWindow.document
                } else {
                    if (p.contentDocument) {
                        f.responseText = p.contentDocument.document.body ? p.contentDocument.document.body.innerHTML : null;
                        f.responseXML = p.contentDocument.document.XMLDocument ? p.contentDocument.document.XMLDocument : p.contentDocument.document
                    }
                }
            } catch (o) {
                $.handleError(k, f, null, o)
            }
            if (f || l == "timeout") {
                c = true;
                var m;
                try {
                    m = l != "timeout" ? "success" : "error";
                    if (m != "error") {
                        var n = $.uploadHttpData(f, k.dataType);
                        if (k.success) {
                            k.success(n, m)
                        }
                        if (k.global) {
                            $.event.trigger("ajaxSuccess", [f, k])
                        }
                    } else {
                        $.handleError(k, f, m)
                    }
                } catch (o) {
                    m = "error";
                    $.handleError(k, f, m, o)
                }
                if (k.global) {
                    $.event.trigger("ajaxComplete", [f, k])
                }
                if (k.global && !--$.active) {
                    $.event.trigger("ajaxStop")
                }
                if (k.complete) {
                    k.complete(f, m)
                }
                $(p).unbind();
                setTimeout(function() {
                    try {
                        $(p).remove();
                        $(b).remove()
                    } catch (q) {
                        $.handleError(k, f, null, q)
                    }
                }, 100);
                f = null
            }
        };
        if (k.timeout > 0) {
            setTimeout(function() {
                if (!c) {
                    d("timeout")
                }
            }, k.timeout)
        }
        try {
            var b = $("#" + j);
            $(b).attr("action", k.url);
            $(b).attr("method", "POST");
            $(b).attr("target", h);
            if (b.encoding) {
                $(b).attr("encoding", "multipart/form-data")
            } else {
                $(b).attr("enctype", "multipart/form-data")
            }
            $(b).submit()
        } catch (g) {
            $.handleError(k, f, null, g)
        }
        $("#" + h).load(d);
        return {
            abort: function() {}
        }
    },
    uploadHttpData: function(r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        if (type == "script") {
            $.globalEval(data)
        }
        if (type == "json") {
            eval("data = " + data)
        }
        if (type == "html") {
            $("<div>").html(data).evalScripts()
        }
        return data
    }
});