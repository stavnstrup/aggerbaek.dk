
<? $page_title = "Galleri" ?>
<?php include("includes/_header.php"); ?>
  
  <div class="row">
    <div class="twelve columns">
      <div class="contain-to-grid">
        <nav class="top-bar" id="menubar">
          <ul>
            <li class="toggle-topbar"><a href="#"></a></li>
          </ul>
          <section>
            <ul class="left">
              <li><a href="index.php" title="News">nyheder</a></li>
              <li><a href="presse.php" title="Press">presse</a></li>
              <li><a href="biografi.php" title="">biografi</a></li>
              <li><a href="diskografi.php" title="">diskografi</a></li>
              <li class="active"><a href="galleri.php" title="">galleri</a></li>
              <li><a href="tekster.php" title="">tekster</a></li>
              <li><a href="audiovideo.php" title="">audio/video</a></li>
              <li><a href="kalender.php" title="">kalender</a></li>
              <li><a href="kontakt.php" title="">kontakt</a></li>
            </ul>
          </section>
        </nav>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="twelve columns">
      <h5>Galleri</h5>

      <div class="row">
        <div class="six columns offset-by-three end">
          <div id="featured">
            <img src="images/gallery/n5546874241_535543_5214.jpg" />
            <img src="images/gallery/n570772078_1096633_4976.jpg" />
            <img src="images/gallery/n570772078_1096634_5191.jpg" />
            <img src="images/gallery/n570772078_1096635_5442.jpg" />
            <img src="images/gallery/n570772078_1096636_5679.jpg" />
            <img src="images/gallery/n570772078_1096637_5927.jpg" />
            <img src="images/gallery/n570772078_1096638_6201.jpg" />
            <img src="images/gallery/n570772078_1096639_6439.jpg" />
            <img src="images/gallery/n570772078_1096640_6700.jpg" />
            <img src="images/gallery/n570772078_1096641_6918.jpg" />
            <img src="images/gallery/n570772078_1096647_8560.jpg" />
            <img src="images/gallery/n570772078_1096648_8841.jpg" />
            <img src="images/gallery/n570772078_1096652_9911.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php include("includes/_footer.php"); ?>

  <script src="/javascripts/foundation/jquery.foundation.orbit.js"></script>

  <script type="text/javascript">
     $(window).load(function() {
         $("#featured").orbit({
            directionalNav: true,
            bullets: true
         });
     });
  </script>
</body>
</html>
