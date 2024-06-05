var folder = "assets/";
var space_cover = false;

function onKometLoad() {
  $("img.komet").on("load", function () {
    var $komet = $(this);
    console.log("i got loaded", $(this));
    if (space_cover) {
      $komet.css("opacity", "0");
    }

    function animation() {
      $komet.css("visibility", "visible");
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
        if (!space_cover) {
          console.log($(this));
          $(this).css("z-index", "1000");
          $(this).css("animation-play-state", "paused");
        }
      },
      function () {
        if (!space_cover) {
          $(this).css("animation-play-state", "running");
        }
      },
    );
    // when clicking image
    $komet.on("click", function () {
      if (!space_cover) {
        space_cover = true;
        var offsetLeft = $(this).offset().left;
        $(this).removeClass("inflight");
        //$(this).css("position", "relative");
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
      }
    });
  });
}

$(document).ready(function () {
  $.ajax({
    url: folder,
    always: function (data) {
      $(data)
        .find("a")
        .attr("href", function (i, val) {
          if (val.match(/\.(jpg|png|gif)$/)) {
            $(".space").prepend(
              "<img src='" +
                folder +
                val +
                "' class='komet' style='visibility:hidden'/>",
            );
          }
        });
    },
    // when images are loaded
    complete: onKometLoad,
  });
});
