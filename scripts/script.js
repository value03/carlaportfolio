var space_cover = false;

window.onpopstate = function (event) {
  console.log("pop: " + event.state);
  if (event.state == null) {
    var popUp = $(".komet:not(.inflight)");
    popUp.animate({ opacity: 0 }, 5000);
    popUp.css("left", -1 * popUp.width() - 10 + "px");
    popUp.css("height", [Math.random() * 30 + 3] + "%");
    popUp.css("left", -1 * popUp.width() - 10 + "px");

    popUp.css("opacity", 1);
    $(".komet.inflight").each(function () {
      $(this).removeClass("hidden");
    });
    popUp.addClass("inflight");
  }
};

function onKometLoad() {
  $("img.komet").on("load", function () {
    var $komet = $(this);
    console.log("i got loaded", $(this));
    console.log(history.state);
    if (history.state == null) {
      $komet.addClass("notransition");
      $komet.removeClass("hidden");
    }

    function animation() {
      $komet.css("top", [Math.random() * 79] + "%");
      $komet.css("height", [Math.random() * 30 + 3] + "%");
      $komet.css("left", -1 * $komet.width() - 10 + "px");

      $komet.toggleClass("inflight");
      $komet.css("animation-duration", [Math.random() * 20] + "s");
    }
    animation();

    $komet.one(
      "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function (e) {
        var target = e.target;
        console.log(target);
        $komet.toggleClass("inflight");
        animation();
      },
    );

    // when hovering over image
    $komet.hover(
      function () {
        console.log(history.state);
        console.log($(this));
        if (history.state == null) {
          console.log($(this));
          $(this).css("z-index", "1000");
          $(this).css("animation-play-state", "paused");
        }
      },
      function () {
        if (history.state == null) {
          $(this).css("animation-play-state", "running");
        }
      },
    );

    // when clicking image
    $komet.on("click", function () {
      if (history.state == null) {
        space_cover = true;
        var offsetLeft = $(this).offset().left;
        $(this).removeClass("inflight");
        $(this).css("left", offsetLeft + "px");

        $(".komet.inflight").each(function () {
          $(this).addClass("hidden");
        });

        $(this).animate(
          {
            left: [$(".space").width() / 2 - $(this).width() / 2] + "px",
            top: "0",
          },
          200,
        );
        $(this).css("position", "relative");

        $(".text").css("visibility", "visible");
        $(".text").addClass("shown");
        history.pushState("popUp", "", "index.html");
      }
    });
  });
}

var folder = "assets/";
$(document).ready(function () {
  $.ajax({
    url: folder,
    success: function (data) {
      $(data)
        .find("a")
        .attr("href", function (i, val) {
          if (val.match(/\.(jpg|png|gif)$/)) {
            $(".space").prepend(
              "<img src='" + folder + val + "' class='komet hidden'/>",
            );
          }
        });
    },
    // when images are loaded
    complete: onKometLoad,
  });
});
