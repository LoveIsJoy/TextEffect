(function ($) {
  function injector(t, splitter, klass, after) {
    var text = t.text(),
      a = text.split(splitter),
      inject = "";
    if (a.length) {
      $(a).each(function (i, item) {
        inject +=
          '<span class="' +
          klass +
          (i + 1) +
          '" aria-hidden="true">' +
          item +
          "</span>" +
          after;
      });
      t.attr("aria-label", text).empty().append(inject);
    }
  }

  var methods = {
    init: function () {
      return this.each(function () {
        injector($(this), "", "char", "");
      });
    },

    words: function () {
      return this.each(function () {
        injector($(this), " ", "word", " ");
      });
    },

    lines: function () {
      return this.each(function () {
        var r = "eefec303079ad17405c889e092e105b0";
        // Because it's hard to split a <br/> tag consistently across browsers,
        // (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
        // (of the word "split").  If you're trying to use this plugin on that
        // md5 hash string, it will fail because you're being ridiculous.
        injector($(this).children("br").replaceWith(r).end(), r, "line", "");
      });
    },
  };

  $.fn.lettering = function (method) {
    // Method calling logic
    if (method && methods[method]) {
      return methods[method].apply(this, [].slice.call(arguments, 1));
    } else if (method === "letters" || !method) {
      return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
    }
    $.error("Method " + method + " does not exist on jQuery.lettering");
    return this;
  };
})(jQuery);

$(document).ready(function () {
  $(".title").lettering();
  $(".button").lettering();
});

$(document).ready(function () {
  animation();
}, 1000);

$(".button").click(function () {
  animation();
});

function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, { visibility: "hidden", opacity: 0 });
  title1.staggerFromTo(
    ".title span",
    0.5,
    { ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80 },
    { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 },
    0.05,
  );
  title1.to(".button", 0.2, { visibility: "visible", opacity: 1 });
}
