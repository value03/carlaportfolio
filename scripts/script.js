$(document).ready(function () {
  $("img.komet").each(function () {
    var $komet = $(this);
    $komet.css("top", [Math.random() * 79] + "%");
    $komet.css("height", [Math.random() * 40] + "%");
    $komet.css("left", -1 * $komet.width() + "px");
  });
});

$(document).ready(function () {
  $("img.komet").each(function () {
    var $komet = $(this);
    startAnimation();

    function startAnimation() {
      $komet.css("top", [Math.random() * 79] + "%");
      $komet.css("height", [Math.random() * 30] + "%");
      $komet.css("left", -1 * $komet.width() - 10 + "px");
      $komet.animate(
        { left: $(".space").width() + 10 + "px" },
        {
          duration: Math.random() * 10000 + 3000,
          easing: "linear",
          complete: startAnimation,
        },
      );
    }
  });
});
