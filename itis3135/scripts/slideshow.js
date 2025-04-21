$(document).ready(function () {
    const images = $(".thumbnail-list img");
    let currentIndex = 0;
    let interval;
  
    function showImage(index) {
      const selected = $(images[index]);
      const newSrc = selected.attr("src");
      const newCaption = selected.data("caption");
  
      $("#mainImage").fadeOut(200, function () {
        $(this).attr("src", newSrc).fadeIn(200);
      });
  
      $("#caption").fadeOut(200, function () {
        $(this).text(newCaption).fadeIn(200);
      });
    }
  
    function startSlideshow() {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 3000); // 3 seconds per image
    }
  
    function stopSlideshow() {
      clearInterval(interval);
    }
  
    images.on("click", function () {
      stopSlideshow();
      currentIndex = images.index(this);
      showImage(currentIndex);
      startSlideshow();
    });
  
    showImage(currentIndex);
    startSlideshow();
  });
  
  